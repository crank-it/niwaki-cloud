import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const lat = parseFloat(searchParams.get('lat') || '0')
    const lng = parseFloat(searchParams.get('lng') || '0')
    const radius = parseFloat(searchParams.get('radius') || '50')
    const limit = parseInt(searchParams.get('limit') || '20')

    if (lat === 0 && lng === 0) {
      return NextResponse.json(
        { error: 'Invalid coordinates' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Call the nearby_gardens function
    const { data, error } = await supabase
      .rpc('nearby_gardens', {
        lat,
        lng,
        radius_km: radius,
        limit_count: limit
      })

    if (error) {
      console.error('Failed to fetch nearby gardens:', error)
      return NextResponse.json(
        { error: 'Failed to fetch nearby gardens' },
        { status: 500 }
      )
    }

    return NextResponse.json({ gardens: data })

  } catch (error) {
    console.error('Nearby gardens error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
