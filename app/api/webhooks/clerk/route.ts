import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Missing CLERK_WEBHOOK_SECRET environment variable')
  }

  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Webhook verification failed:', err)
    return new Response('Invalid webhook signature', { status: 400 })
  }

  const supabase = createAdminClient()

  switch (evt.type) {
    case 'user.created':
    case 'user.updated': {
      const { id, email_addresses, username, first_name, last_name, image_url } = evt.data

      const email = email_addresses?.[0]?.email_address
      if (!email) {
        console.error('No email found for user:', id)
        return new Response('No email found', { status: 400 })
      }

      const displayName = [first_name, last_name].filter(Boolean).join(' ') || username || null

      const { error } = await supabase
        .from('users')
        .upsert({
          id,
          email,
          username: username || null,
          display_name: displayName,
          avatar_url: image_url || null,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id'
        })

      if (error) {
        console.error('Failed to upsert user:', error)
        return new Response('Failed to sync user', { status: 500 })
      }

      break
    }

    case 'user.deleted': {
      const { id } = evt.data

      if (!id) {
        return new Response('No user ID', { status: 400 })
      }

      const { error } = await supabase
        .from('users')
        .update({ is_active: false })
        .eq('id', id)

      if (error) {
        console.error('Failed to deactivate user:', error)
        return new Response('Failed to deactivate user', { status: 500 })
      }

      break
    }
  }

  return new Response('OK', { status: 200 })
}
