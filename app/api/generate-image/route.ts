import { GoogleGenAI } from '@google/genai'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt, image, mimeType } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google AI API key not configured' },
        { status: 500 }
      )
    }

    const ai = new GoogleGenAI({ apiKey })

    // Build content array - include reference image if provided
    type ContentPart = { text: string } | { inlineData: { mimeType: string; data: string } }
    const contents: ContentPart[] = []

    // If reference image provided, include it first
    if (image && mimeType) {
      contents.push({
        inlineData: {
          mimeType: mimeType,
          data: image,
        }
      })
    }

    // Add the prompt
    contents.push({ text: prompt })

    // Use Gemini 3 Pro Image (Nano Banana Pro) for image generation
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: contents,
      config: {
        responseModalities: ['IMAGE'],
      },
    })

    // Extract images from response
    const images: string[] = []
    const candidate = response.candidates?.[0]

    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData?.data) {
          const partMimeType = part.inlineData.mimeType || 'image/png'
          images.push(`data:${partMimeType};base64,${part.inlineData.data}`)
        }
      }
    }

    if (images.length === 0) {
      return NextResponse.json(
        { error: 'No images were generated' },
        { status: 500 }
      )
    }

    return NextResponse.json({ images })
  } catch (error) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate image' },
      { status: 500 }
    )
  }
}
