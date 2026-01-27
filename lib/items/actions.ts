'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Item, ItemType, ItemMode } from '@/lib/types/database'

export async function createItem(data: {
  event_id: string
  card_name: string
  image_url: string
  type: ItemType
  mode: ItemMode
  price?: number
  notes?: string
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Must be logged in to create items')
  }

  const { data: item, error } = await supabase
    .from('items')
    .insert({
      event_id: data.event_id,
      user_id: user.id,
      card_name: data.card_name,
      image_url: data.image_url,
      type: data.type,
      mode: data.mode,
      price: data.price,
      notes: data.notes,
    })
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath(`/event/${data.event_id}`)
  return item.id
}

export async function getEventItems(eventId: string) {
  const supabase = await createClient()

  const { data: items, error } = await supabase
    .from('items')
    .select(`
      *,
      profile:profiles!user_id (
        email,
        display_name
      )
    `)
    .eq('event_id', eventId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Get event items error:', error)
    throw new Error(error.message)
  }

  return items as (Item & { profile: { email: string; display_name?: string } })[]
}

export async function deleteItem(itemId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Must be logged in to delete items')
  }

  // Check if user is owner or moderator
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const { data: item } = await supabase
    .from('items')
    .select('user_id, event_id')
    .eq('id', itemId)
    .single()

  if (!item) {
    throw new Error('Item not found')
  }

  const isModerator = profile?.role === 'moderator' || profile?.role === 'admin'
  const isOwner = item.user_id === user.id

  if (!isModerator && !isOwner) {
    throw new Error('Not authorized to delete this item')
  }

  const { error } = await supabase.from('items').delete().eq('id', itemId)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath(`/event/${item.event_id}`)
}
