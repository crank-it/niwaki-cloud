import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

// GET - fetch moderation queue
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is moderator/admin
    const supabase = await createClient()
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single()

    if (!user || !['moderator', 'admin'].includes(user.role)) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') || 'pending'

    let query = supabase
      .from('moderation_queue')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (status !== 'all') {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      console.error('Failed to fetch moderation queue:', error)
      return NextResponse.json(
        { error: 'Failed to fetch moderation queue' },
        { status: 500 }
      )
    }

    return NextResponse.json({ items: data })

  } catch (error) {
    console.error('Moderation GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - perform moderation action
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is moderator/admin
    const supabase = await createClient()
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single()

    if (!user || !['moderator', 'admin'].includes(user.role)) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { itemId, action, notes } = body

    if (!itemId || !['approved', 'rejected'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid moderation data' },
        { status: 400 }
      )
    }

    const adminClient = createAdminClient()

    // Get the moderation item
    const { data: item, error: fetchError } = await adminClient
      .from('moderation_queue')
      .select('*')
      .eq('id', itemId)
      .single()

    if (fetchError || !item) {
      return NextResponse.json(
        { error: 'Moderation item not found' },
        { status: 404 }
      )
    }

    // Update the moderation queue item
    const { error: updateError } = await adminClient
      .from('moderation_queue')
      .update({
        status: action,
        moderator_id: userId,
        moderator_notes: notes,
        resolved_at: new Date().toISOString()
      })
      .eq('id', itemId)

    if (updateError) {
      console.error('Failed to update moderation item:', updateError)
      return NextResponse.json(
        { error: 'Failed to update moderation item' },
        { status: 500 }
      )
    }

    // Update the content status
    if (item.content_type === 'garden') {
      await adminClient
        .from('garden_locations')
        .update({ status: action })
        .eq('id', item.content_id)
    } else if (item.content_type === 'comment') {
      await adminClient
        .from('comments')
        .update({ is_visible: action === 'approved' })
        .eq('id', item.content_id)
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Moderation POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
