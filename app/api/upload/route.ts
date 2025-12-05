import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()

    // For the visualizer, we allow unauthenticated uploads
    // but we don't store them permanently

    const body = await req.json()
    const { image } = body

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'No image provided' },
        { status: 400 }
      )
    }

    const imageId = uuidv4()

    // If user is authenticated, store the image in Supabase Storage
    if (userId) {
      const supabase = createAdminClient()
      const buffer = Buffer.from(image, 'base64')
      const fileName = `uploads/${userId}/${imageId}.jpg`

      const { error } = await supabase.storage
        .from('photos')
        .upload(fileName, buffer, {
          contentType: 'image/jpeg',
          upsert: false
        })

      if (error) {
        console.error('Failed to upload image:', error)
        // Continue anyway - we can still process the image in memory
      }
    }

    return NextResponse.json({
      success: true,
      imageId,
      // Return the base64 image so we can use it for processing
      imageData: image
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    )
  }
}
