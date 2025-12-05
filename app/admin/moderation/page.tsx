'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Shield, Check, X, Clock, Eye, AlertTriangle } from 'lucide-react'
import Image from 'next/image'

interface ModerationItem {
  id: string
  content_type: 'garden' | 'photo' | 'comment'
  content_id: string
  reported_by: string | null
  reason: string | null
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  // Joined data
  garden?: {
    name: string
    description: string | null
    city: string | null
    country: string | null
  }
  photo?: {
    storage_path: string
    title: string | null
  }
}

export default function ModerationPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [items, setItems] = useState<ModerationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending')
  const supabase = createClient()

  const isAdmin = user?.publicMetadata?.role === 'admin' || user?.publicMetadata?.role === 'moderator'

  useEffect(() => {
    if (isLoaded && !isAdmin) {
      router.push('/')
      return
    }

    if (isLoaded && isAdmin) {
      loadModerationItems()
    }
  }, [isLoaded, isAdmin, router])

  async function loadModerationItems() {
    setLoading(true)
    try {
      let query = supabase
        .from('moderation_queue')
        .select('*')
        .order('created_at', { ascending: false })

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      const { data, error } = await query.limit(50)

      if (error) throw error
      setItems(data || [])
    } catch (err) {
      console.error('Failed to load moderation items:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleAction(id: string, action: 'approved' | 'rejected') {
    try {
      const { error } = await supabase
        .from('moderation_queue')
        .update({
          status: action,
          moderator_id: user?.id,
          resolved_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) throw error

      // If approving a garden, update its status too
      const item = items.find(i => i.id === id)
      if (item && item.content_type === 'garden') {
        await supabase
          .from('garden_locations')
          .update({ status: action })
          .eq('id', item.content_id)
      }

      // Refresh the list
      loadModerationItems()
    } catch (err) {
      console.error('Failed to process action:', err)
    }
  }

  if (!isLoaded || loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-stone-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-stone-200 rounded w-64 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-light text-stone-800 mb-2">Access Denied</h1>
          <p className="text-stone-600">
            You do not have permission to access this page.
          </p>
        </div>
      </div>
    )
  }

  // Mock data for demonstration
  const mockItems: ModerationItem[] = [
    {
      id: '1',
      content_type: 'garden',
      content_id: 'garden-1',
      reported_by: null,
      reason: null,
      status: 'pending',
      created_at: new Date().toISOString(),
      garden: {
        name: 'New Submission: Backyard Niwaki',
        description: 'A collection of cloud-pruned holly and yew',
        city: 'Bristol',
        country: 'UK'
      }
    },
    {
      id: '2',
      content_type: 'photo',
      content_id: 'photo-1',
      reported_by: 'user-123',
      reason: 'Not actually niwaki',
      status: 'pending',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      photo: {
        storage_path: '/placeholder.jpg',
        title: 'My Garden'
      }
    }
  ]

  const displayItems = items.length > 0 ? items : mockItems

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-stone-800 tracking-wide mb-2 flex items-center justify-center gap-3">
            <Shield className="w-8 h-8 text-stone-600" />
            <span>Moderation Queue</span>
          </h1>
          <p className="text-xs text-stone-500 tracking-widest uppercase">
            管理キュー
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-8">
          {(['pending', 'approved', 'rejected', 'all'] as const).map((status) => (
            <button
              key={status}
              onClick={() => {
                setFilter(status)
                loadModerationItems()
              }}
              className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${
                filter === status
                  ? 'bg-stone-800 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="space-y-4">
          {displayItems.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <Clock className="w-12 h-12 mx-auto mb-4 text-stone-300" />
              <p>No items in the moderation queue</p>
            </div>
          ) : (
            displayItems.map((item) => (
              <div key={item.id} className="card">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs uppercase ${
                        item.content_type === 'garden'
                          ? 'bg-emerald-100 text-emerald-700'
                          : item.content_type === 'photo'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.content_type}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        item.status === 'pending'
                          ? 'bg-stone-100 text-stone-600'
                          : item.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    {item.garden && (
                      <div>
                        <h3 className="font-medium text-stone-800">{item.garden.name}</h3>
                        <p className="text-sm text-stone-600 mt-1">{item.garden.description}</p>
                        <p className="text-xs text-stone-400 mt-1">
                          {item.garden.city}, {item.garden.country}
                        </p>
                      </div>
                    )}

                    {item.photo && (
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-stone-100 rounded-lg overflow-hidden">
                          {item.photo.storage_path && (
                            <Image
                              src={item.photo.storage_path}
                              alt={item.photo.title || 'Photo'}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-stone-800">
                            {item.photo.title || 'Untitled Photo'}
                          </h3>
                          {item.reason && (
                            <p className="text-sm text-red-600 mt-1">
                              Report: {item.reason}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-stone-400 mt-2">
                      Submitted {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  {item.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAction(item.id, 'approved')}
                        className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center hover:bg-emerald-200 transition-colors"
                        title="Approve"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleAction(item.id, 'rejected')}
                        className="w-10 h-10 bg-red-100 text-red-700 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors"
                        title="Reject"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <button
                        className="w-10 h-10 bg-stone-100 text-stone-600 rounded-lg flex items-center justify-center hover:bg-stone-200 transition-colors"
                        title="View details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
