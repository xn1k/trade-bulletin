import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Profile } from '@/lib/types/database'

export async function requireAuth() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return user
}

export async function getUserProfile() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile as Profile | null
}

export async function requireModerator() {
  const profile = await getUserProfile()

  if (!profile || (profile.role !== 'moderator' && profile.role !== 'admin')) {
    redirect('/')
  }

  return profile
}

export async function requireAdmin() {
  const profile = await getUserProfile()

  if (!profile || profile.role !== 'admin') {
    redirect('/')
  }

  return profile
}
