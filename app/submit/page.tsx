'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser, SignInButton } from '@clerk/nextjs'
import { SubmissionForm } from '@/components/map/SubmissionForm'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function SubmitPage() {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (data: {
    name: string
    description: string
    latitude: number
    longitude: number
    photos: File[]
    city?: string
    country?: string
  }) => {
    // Upload photos
    const photoFormData = new FormData()
    data.photos.forEach((photo, index) => {
      photoFormData.append(`photo_${index}`, photo)
    })

    // In a real implementation, you would:
    // 1. Upload photos to Supabase Storage
    // 2. Create the garden_location record
    // 3. Create photo records linked to the garden

    // For now, we'll simulate success
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitted(true)
  }

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-stone-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-stone-200 rounded w-64 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-light text-stone-800 tracking-wide mb-2">
            Submit Your Garden
          </h1>
          <p className="text-xs text-stone-500 tracking-widest uppercase mb-8">
            庭園を投稿
          </p>
          <div className="card">
            <p className="text-stone-600 mb-6">
              Please sign in to submit your garden to our community map.
            </p>
            <SignInButton mode="modal">
              <button className="btn-primary">
                Sign in to Continue
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card">
            <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-light text-stone-800 mb-2">
              Submission Received
            </h2>
            <p className="text-stone-600 mb-6">
              Thank you for sharing your garden! Our team will review your submission
              and it will appear on the map once approved.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/map" className="btn-secondary">
                View Map
              </Link>
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-primary"
              >
                Submit Another
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-stone-800 tracking-wide mb-2">
            Submit Your Garden
          </h1>
          <p className="text-xs text-stone-500 tracking-widest uppercase mb-4">
            庭園を投稿
          </p>
          <p className="text-stone-600">
            Share your niwaki with the world. Your garden will be reviewed by our
            moderation team before appearing on the community map.
          </p>
        </div>

        <div className="card">
          <SubmissionForm
            onSubmit={handleSubmit}
            onCancel={() => router.back()}
          />
        </div>

        <div className="mt-6 text-center text-sm text-stone-500">
          <p>
            By submitting, you confirm that you have the right to share these images
            and agree to our terms of service.
          </p>
        </div>
      </div>
    </div>
  )
}
