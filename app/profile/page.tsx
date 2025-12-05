'use client'

import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function ProfilePage() {
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded && user) {
      redirect(`/profile/${user.id}`)
    } else if (isLoaded && !user) {
      redirect('/sign-in')
    }
  }, [isLoaded, user])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-pulse">
          <div className="w-24 h-24 rounded-full bg-stone-200 mx-auto mb-4" />
          <div className="h-6 bg-stone-200 rounded w-48 mx-auto mb-2" />
          <div className="h-4 bg-stone-200 rounded w-32 mx-auto" />
        </div>
      </div>
    </div>
  )
}
