import { GoogleGenerativeAI } from '@google/generative-ai'
import type { GardenAnalysis, NiwakiStyle, MaturityYears, PruningFrequency, Resolution } from '@/types'

// Resolution config for output image sizes
const RESOLUTION_CONFIG: Record<Resolution, { width: number; height: number; quality: string }> = {
  low: { width: 512, height: 512, quality: 'fast preview' },
  medium: { width: 768, height: 768, quality: 'balanced' },
  high: { width: 1024, height: 1024, quality: 'high detail' }
}

// Initialise Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// Models
const VISION_MODEL = 'gemini-2.0-flash'
const IMAGE_GEN_MODEL = 'gemini-2.0-flash-exp-image-generation'

/**
 * Generate a maturity description based on years (1-10)
 */
function getMaturityDescription(years: number): string {
  if (years <= 1) {
    return 'very early-stage with initial shaping just begun, basic structure being established, training wire may still be visible, first tentative cloud shapes emerging'
  } else if (years === 2) {
    return 'early formation stage with emerging cloud shapes starting to take form, training structure visible, branch selection beginning to define the future form'
  } else if (years === 3) {
    return 'developing with distinct foliage pads beginning to form, branch structure becoming visible between cloud layers, the characteristic niwaki silhouette emerging'
  } else if (years === 4) {
    return 'progressing nicely with cloud pads becoming more defined, spacing between tiers becoming clearer, trunk and primary branches showing deliberate training'
  } else if (years === 5) {
    return 'maturing with well-defined cloud layers and exposed branch architecture, showing years of careful cultivation, distinct separation between foliage masses'
  } else if (years === 6) {
    return 'well-established with refined cloud formations, excellent branch ramification, the tree showing clear artistic intent and horticultural skill'
  } else if (years === 7) {
    return 'approaching maturity with elegant sculptural presence, clouds showing excellent density and definition, visible signs of patient long-term development'
  } else if (years === 8) {
    return 'mature specimen with dramatic cloud formations, bark beginning to show character, branch structure displaying years of skilled manipulation'
  } else if (years === 9) {
    return 'highly refined with exceptional sculptural quality, clouds showing perfect balance and proportion, approaching the character of ancient specimens'
  } else {
    return 'fully mature masterpiece with dramatic sculptural cloud formations showing ancient character, refined over a decade of patient pruning, museum-quality presence'
  }
}

const COMPLEXITY_DESCRIPTIONS: Record<PruningFrequency, string> = {
  minimal: 'simple, approachable rounded forms requiring only seasonal maintenance - natural and relaxed appearance suitable for beginners',
  monthly: 'refined cloud shapes with moderate sculptural detail showing balanced elegance - the sweet spot between effort and impact',
  weekly: 'intricate multi-layered formations with fine definition and artistic precision - showing dedicated craftsmanship',
  expert: 'competition-grade precision with exquisite artistic detail - museum-quality craftsmanship demanding constant attention'
}

const STYLE_NOTES: Record<NiwakiStyle, string> = {
  spherical: `SPHERICAL/TAMATSUKURI STYLE:
    - Round, ball-shaped cloud pads arranged in elegant tiers
    - Each cloud should be distinctly spherical with even foliage density
    - Clear negative space between clouds revealing branch structure
    - Trunk and primary branches visible and highlighted
    - Classic, formal Japanese garden aesthetic
    - Clouds should vary in size - larger at bottom, smaller toward top`,

  tiered: `TIERED/DAN-ZUKURI STYLE:
    - Horizontal layers of foliage creating distinct flat platforms
    - Each tier should be clearly defined and separate from others
    - Branch structure dramatically visible between layers
    - Creates a sense of great age and architectural gravitas
    - Reminiscent of ancient pines on windswept mountainsides
    - Tiers should have slight variation - not perfectly identical`,

  windswept: `WINDSWEPT/FUKINAGASHI STYLE:
    - Asymmetrical clouds suggesting persistent wind direction
    - More naturalistic and dynamic appearance than formal styles
    - Foliage concentrated on the leeward side of branches
    - Trunk and branches may show slight lean or sweep
    - Evokes coastal trees or mountain-top survivors
    - Dramatic, storytelling quality with movement implied`,

  naturalistic: `NATURALISTIC/INFORMAL STYLE:
    - Organic cloud shapes that enhance the plant's natural character
    - Softer, flowing forms rather than strict geometric shapes
    - Maintains niwaki essence while appearing almost effortless
    - Branch selection emphasises the tree's innate beauty
    - Suitable for informal garden settings and mixed borders
    - Should look like nature perfected, not overtly manicured`
}

export function buildSinglePrompt(
  style: NiwakiStyle,
  years: MaturityYears | number,
  frequency: PruningFrequency,
  resolution: Resolution = 'medium',
  qualityDesc: string = 'balanced'
): string {
  const maturityDesc = getMaturityDescription(years)
  const complexityDesc = COMPLEXITY_DESCRIPTIONS[frequency] || COMPLEXITY_DESCRIPTIONS['monthly']
  const styleNotes = STYLE_NOTES[style]

  const detailLevel = resolution === 'low'
    ? 'Focus on overall shape and silhouette. Simplify fine details.'
    : resolution === 'high'
    ? 'Render with maximum detail - fine foliage texture, bark detail, subtle shadow gradations.'
    : 'Balance detail with efficiency - clear forms with good definition.'

  return `Transform the plants in this garden photograph to show authentic ${style} style Japanese cloud pruning (niwaki).

MATURITY: ${years} year${years > 1 ? 's' : ''} of development - ${maturityDesc}

MAINTENANCE LEVEL: ${complexityDesc}

${styleNotes}

OUTPUT QUALITY: ${qualityDesc}
${detailLevel}

ABSOLUTE REQUIREMENTS:
1. PRESERVE the exact background - all structures, sky, ground, walls, paths, lighting must be identical
2. MAINTAIN the original photograph's perspective, depth of field, and camera angle
3. KEEP the same lighting direction, shadows, and colour temperature
4. ONLY modify plants, shrubs, and trees to show cloud-pruned forms
5. Each cloud pad must have visible branch structure connecting to the trunk
6. Result must be photorealistic - indistinguishable from a real photograph
7. Do NOT add or remove any plants - transform only what exists
8. Preserve all hardscaping, fencing, garden ornaments exactly

AUTHENTICITY:
- The transformation must look achievable through real horticultural techniques
- Show forms that a skilled gardener could actually create over ${years} year${years > 1 ? 's' : ''}
- Include realistic details like slightly irregular cloud edges, natural bark texture
- Foliage should look healthy with appropriate density for the species`
}

export function buildAnalysisPrompt(): string {
  return `Analyse this garden photograph for Japanese cloud pruning (niwaki) potential.

Examine each plant, shrub, and tree visible in the image and assess its suitability for niwaki transformation.

Return a valid JSON object with this exact structure:
{
  "plants": [
    {
      "id": "plant_1",
      "species": "suspected species name or general description",
      "location": "description of position in the image (e.g., 'left foreground', 'centre back')",
      "niwakiSuitability": 8,
      "recommendedStyle": "spherical"
    }
  ],
  "overallAssessment": "Brief 2-3 sentence description of this garden's overall niwaki potential and what styles would work best."
}

SUITABILITY GUIDELINES:
- 9-10: Pines, junipers, yew, boxwood - classic niwaki subjects
- 7-8: Privet, holly, azaleas, podocarpus - excellent candidates
- 5-6: Most evergreen shrubs, some conifers - good potential
- 3-4: Deciduous trees, less dense shrubs - challenging but possible
- 1-2: Annual flowers, herbaceous perennials, very young plants - not suitable

STYLE RECOMMENDATIONS:
- "spherical": Best for dense, fine-textured evergreens
- "tiered": Suits trees with horizontal branching habit
- "windswept": Good for naturally asymmetrical specimens
- "naturalistic": Works with most plants, especially informal gardens

Only return the JSON object, no additional text or markdown.`
}

/**
 * Analyse a garden image to identify plants suitable for niwaki
 */
export async function analyzeGarden(imageBase64: string): Promise<GardenAnalysis> {
  const model = genAI.getGenerativeModel({ model: VISION_MODEL })

  const response = await model.generateContent([
    {
      inlineData: {
        mimeType: 'image/jpeg',
        data: imageBase64
      }
    },
    { text: buildAnalysisPrompt() }
  ])

  const responseText = response.response.text()

  // Parse JSON from response, handling potential markdown code blocks
  let jsonStr = responseText
  const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
  if (jsonMatch) {
    jsonStr = jsonMatch[1]
  }

  try {
    return JSON.parse(jsonStr.trim()) as GardenAnalysis
  } catch {
    console.error('Failed to parse garden analysis:', responseText)
    return {
      plants: [{
        id: 'plant_1',
        species: 'Unknown plant',
        location: 'Garden area',
        niwakiSuitability: 5,
        recommendedStyle: 'naturalistic'
      }],
      overallAssessment: 'This garden has potential for niwaki transformation. We recommend trying different styles to see what works best.'
    }
  }
}

/**
 * Generate a niwaki visualisation of a garden
 */
export async function generateNiwakiVisualization(
  imageBase64: string,
  style: NiwakiStyle,
  years: MaturityYears,
  pruningFrequency: PruningFrequency,
  resolution: Resolution = 'medium'
): Promise<string> {
  const resConfig = RESOLUTION_CONFIG[resolution]
  const prompt = buildSinglePrompt(style, years, pruningFrequency, resolution, resConfig.quality)

  const model = genAI.getGenerativeModel({
    model: IMAGE_GEN_MODEL,
    generationConfig: {
      // @ts-expect-error - responseModalities is valid for imagen models
      responseModalities: ['image', 'text']
    }
  })

  const response = await model.generateContent([
    {
      inlineData: {
        mimeType: 'image/jpeg',
        data: imageBase64
      }
    },
    { text: prompt }
  ])

  const candidates = response.response.candidates
  if (!candidates || candidates.length === 0) {
    throw new Error('No response generated from Gemini')
  }

  const parts = candidates[0].content?.parts
  if (!parts) {
    throw new Error('No content parts in response')
  }

  // Find the image part in the response
  for (const part of parts) {
    if ('inlineData' in part && part.inlineData) {
      const inlineData = part.inlineData
      if (inlineData.mimeType?.startsWith('image/') && inlineData.data) {
        return inlineData.data
      }
    }
  }

  throw new Error('No image generated by Gemini')
}

export function getStyleDisplayName(style: NiwakiStyle): string {
  const names: Record<NiwakiStyle, string> = {
    spherical: 'Spherical Clouds',
    tiered: 'Tiered Layers',
    windswept: 'Windswept',
    naturalistic: 'Naturalistic'
  }
  return names[style]
}

/**
 * Check if the Gemini API key is configured
 */
export function isConfigured(): boolean {
  return !!process.env.GEMINI_API_KEY
}
