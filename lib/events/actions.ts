'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { Event } from '@/lib/types/database'

export async function createEvent(data: {
  name: string
  start_time: string
  end_time: string
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Must be logged in to create events')
  }

  const { data: event, error } = await supabase
    .from('events')
    .insert({
      name: data.name,
      start_time: data.start_time,
      end_time: data.end_time,
      creator_id: user.id,
      is_active: true,
    })
    .select()
    .single()

  if (error) {
    console.error('Supabase error:', error)
    throw new Error(error.message)
  }

  if (!event) {
    throw new Error('Failed to create event - no data returned')
  }

  revalidatePath('/events')
  return event.id
}

export async function getActiveEvents() {
  const supabase = await createClient()

  const { data: events, error } = await supabase
    .from('events')
    .select(`
      *,
      profiles!creator_id (
        email,
        display_name
      )
    `)
    .eq('is_active', true)
    .order('start_time', { ascending: false })

  if (error) {
    console.error('Get active events error:', error)
    throw new Error(error.message)
  }

  return events as (Event & { profiles: { email: string; display_name?: string } })[]
}

export async function getEvent(eventId: string) {
  const supabase = await createClient()

  const { data: event, error } = await supabase
    .from('events')
    .select(`
      *,
      profiles!creator_id (
        email,
        display_name
      )
    `)
    .eq('id', eventId)
    .single()

  if (error) {
    console.error('Get event error:', error)
    throw new Error(error.message)
  }

  return event as Event & { profiles: { email: string; display_name?: string } }
}

export async function deleteEvent(eventId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Must be logged in to delete events')
  }

  // Check if user is creator or moderator
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const { data: event } = await supabase
    .from('events')
    .select('creator_id')
    .eq('id', eventId)
    .single()

  if (!event) {
    throw new Error('Event not found')
  }

  const isModerator = profile?.role === 'moderator' || profile?.role === 'admin'
  const isCreator = event.creator_id === user.id

  if (!isModerator && !isCreator) {
    throw new Error('Not authorized to delete this event')
  }

  const { error } = await supabase.from('events').delete().eq('id', eventId)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/events')
  redirect('/events')
}

export async function closeEvent(eventId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Must be logged in')
  }

  const { error } = await supabase
    .from('events')
    .update({ is_active: false })
    .eq('id', eventId)
    .eq('creator_id', user.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath(`/event/${eventId}`)
  revalidatePath('/events')
}
