import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'

// POST - create or update a vote
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
    const { photoId, value } = body

    if (!photoId || (value !== 1 && value !== -1)) {
      return NextResponse.json(
        { error: 'Invalid vote data' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Upsert the vote
    const { error } = await supabase
      .from('votes')
      .upsert({
        user_id: userId,
        photo_id: photoId,
        value
      }, {
        onConflict: 'user_id,photo_id'
      })

    if (error) {
      console.error('Failed to create vote:', error)
      return NextResponse.json(
        { error: 'Failed to create vote' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Vote POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - remove a vote
export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const photoId = searchParams.get('photoId')

    if (!photoId) {
      return NextResponse.json(
        { error: 'Missing photoId' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from('votes')
      .delete()
      .eq('user_id', userId)
      .eq('photo_id', photoId)

    if (error) {
      console.error('Failed to delete vote:', error)
      return NextResponse.json(
        { error: 'Failed to delete vote' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Vote DELETE error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET - get user's vote for a photo
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ vote: null })
    }

    const { searchParams } = new URL(req.url)
    const photoId = searchParams.get('photoId')

    if (!photoId) {
      return NextResponse.json(
        { error: 'Missing photoId' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('votes')
      .select('value')
      .eq('user_id', userId)
      .eq('photo_id', photoId)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Failed to get vote:', error)
      return NextResponse.json(
        { error: 'Failed to get vote' },
        { status: 500 }
      )
    }

    return NextResponse.json({ vote: data?.value || null })

  } catch (error) {
    console.error('Vote GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
