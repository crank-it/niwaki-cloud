import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { generateNiwakiVisualization, getStyleDisplayName, isConfigured } from '@/lib/gemini'
import type { UserPreferences, VisualizationResult } from '@/types'

// In-memory job store (in production, use Redis or database)
const jobs = new Map<string, {
  status: 'pending' | 'analysing' | 'generating' | 'completed' | 'failed'
  progress: number
  results?: VisualizationResult[]
  error?: string
  imageData?: string
  preferences?: UserPreferences
}>()

export async function POST(req: NextRequest) {
  try {
    if (!isConfigured()) {
      return NextResponse.json(
        { success: false, error: 'AI service not configured' },
        { status: 503 }
      )
    }

    const body = await req.json()
    const { imageId, preferences, imageData } = body

    if (!imageId || !preferences) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const jobId = uuidv4()

    // Store job info
    jobs.set(jobId, {
      status: 'pending',
      progress: 0,
      imageData,
      preferences
    })

    // Start processing in the background
    processJob(jobId, imageData, preferences)

    return NextResponse.json({
      success: true,
      jobId
    })

  } catch (error) {
    console.error('Visualize error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to start visualization' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const jobId = searchParams.get('jobId')

  if (!jobId) {
    return NextResponse.json(
      { error: 'Missing jobId' },
      { status: 400 }
    )
  }

  const job = jobs.get(jobId)

  if (!job) {
    return NextResponse.json(
      { error: 'Job not found' },
      { status: 404 }
    )
  }

  return NextResponse.json({
    id: jobId,
    status: job.status,
    progress: job.progress,
    results: job.results,
    error: job.error
  })
}

async function processJob(jobId: string, imageData: string, preferences: UserPreferences) {
  const job = jobs.get(jobId)
  if (!job) return

  try {
    job.status = 'analysing'
    job.progress = 10
    jobs.set(jobId, job)

    const results: VisualizationResult[] = []
    const totalStyles = preferences.styles.length
    let completed = 0

    job.status = 'generating'
    job.progress = 20
    jobs.set(jobId, job)

    for (const style of preferences.styles) {
      try {
        const generatedImage = await generateNiwakiVisualization(
          imageData,
          style,
          preferences.years,
          preferences.pruningFrequency,
          preferences.resolution
        )

        results.push({
          id: uuidv4(),
          style,
          styleName: getStyleDisplayName(style),
          imageUrl: `data:image/jpeg;base64,${generatedImage}`,
          thumbnailUrl: `data:image/jpeg;base64,${generatedImage}`
        })

        completed++
        job.progress = 20 + (completed / totalStyles) * 75
        jobs.set(jobId, job)

      } catch (styleError) {
        console.error(`Failed to generate ${style} style:`, styleError)
        // Continue with other styles
      }
    }

    if (results.length === 0) {
      throw new Error('Failed to generate any visualizations')
    }

    job.status = 'completed'
    job.progress = 100
    job.results = results
    jobs.set(jobId, job)

    // Clean up job after 1 hour
    setTimeout(() => {
      jobs.delete(jobId)
    }, 3600000)

  } catch (error) {
    console.error('Job processing error:', error)
    job.status = 'failed'
    job.error = error instanceof Error ? error.message : 'Unknown error'
    jobs.set(jobId, job)
  }
}
