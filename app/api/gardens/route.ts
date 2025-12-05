import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

// GET - fetch gardens
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const featured = searchParams.get('featured') === 'true'
    const limit = parseInt(searchParams.get('limit') || '50')

    const supabase = await createClient()

    let query = supabase
      .from('garden_locations')
      .select(`
        id,
        name,
        description,
        city,
        country,
        is_featured,
        created_at,
        user:users(id, display_name, avatar_url),
        photos(id, storage_path, vote_count, is_primary)
      `)
      .eq('status', 'approved')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (featured) {
      query = query.eq('is_featured', true)
    }

    const { data, error } = await query

    if (error) {
      console.error('Failed to fetch gardens:', error)
      return NextResponse.json(
        { error: 'Failed to fetch gardens' },
        { status: 500 }
      )
    }

    return NextResponse.json({ gardens: data })

  } catch (error) {
    console.error('Gardens GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - create a new garden
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const {
      name,
      description,
      latitude,
      longitude,
      city,
      country,
      species_ids = []
    } = body

    if (!name || !latitude || !longitude) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Create the garden location
    const { data: garden, error } = await supabase
      .from('garden_locations')
      .insert({
        user_id: userId,
        name,
        description,
        // Note: In production, you'd use PostGIS geography type
        // For now, we store as separate columns
        address: `${latitude}, ${longitude}`,
        city,
        country,
        species_ids,
        status: 'pending' // Requires moderation
      })
      .select()
      .single()

    if (error) {
      console.error('Failed to create garden:', error)
      return NextResponse.json(
        { error: 'Failed to create garden' },
        { status: 500 }
      )
    }

    // Also add to moderation queue
    await supabase
      .from('moderation_queue')
      .insert({
        content_type: 'garden',
        content_id: garden.id,
        status: 'pending'
      })

    return NextResponse.json({
      success: true,
      garden
    })

  } catch (error) {
    console.error('Gardens POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
