'use client'

import { useState, useCallback } from 'react'
import type { UserPreferences, VisualizationResult } from '@/types'

type VisualizationStatus =
  | 'idle'
  | 'uploading'
  | 'analysing'
  | 'generating'
  | 'complete'
  | 'error'

interface UseVisualizationReturn {
  generate: (imageDataUrl: string, preferences: UserPreferences) => Promise<void>
  status: VisualizationStatus
  results: VisualizationResult[]
  error: string | null
  progress: number
  reset: () => void
}

export function useVisualization(): UseVisualizationReturn {
  const [status, setStatus] = useState<VisualizationStatus>('idle')
  const [results, setResults] = useState<VisualizationResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const reset = useCallback(() => {
    setStatus('idle')
    setResults([])
    setError(null)
    setProgress(0)
  }, [])

  const generate = useCallback(
    async (imageDataUrl: string, preferences: UserPreferences) => {
      try {
        setStatus('uploading')
        setProgress(10)
        setError(null)

        // Extract base64 data from data URL
        const base64Data = imageDataUrl.split(',')[1]

        // Upload image
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Data })
        })

        const uploadData = await uploadRes.json()

        if (!uploadData.success) {
          throw new Error(uploadData.error || 'Upload failed')
        }

        const { imageId } = uploadData

        setStatus('analysing')
        setProgress(30)

        // Start visualisation job
        const jobRes = await fetch('/api/visualize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageId, preferences })
        })

        const jobData = await jobRes.json()

        if (!jobData.success) {
          throw new Error(jobData.error || 'Failed to start visualisation')
        }

        const { jobId } = jobData

        setStatus('generating')

        // Poll for completion
        let complete = false
        let pollAttempts = 0
        const maxPolls = 120 // 4 minutes max (2s intervals)

        while (!complete && pollAttempts < maxPolls) {
          await new Promise((r) => setTimeout(r, 2000))
          pollAttempts++

          const statusRes = await fetch(`/api/visualize?jobId=${jobId}`)
          const job = await statusRes.json()

          if (job.error && !job.results) {
            throw new Error(job.error)
          }

          // Update progress based on job progress
          const jobProgress = job.progress || 0
          setProgress(30 + jobProgress * 0.7)

          if (job.status === 'completed') {
            complete = true
            setResults(job.results || [])
            setStatus('complete')
            setProgress(100)
          } else if (job.status === 'failed') {
            throw new Error(job.error || 'Generation failed')
          }
        }

        if (!complete) {
          throw new Error('Generation timed out. Please try again.')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        setStatus('error')
      }
    },
    []
  )

  return { generate, status, results, error, progress, reset }
}
