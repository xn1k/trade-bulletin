import type { Profile } from '@/lib/types/database'

export function getDisplayName(profile: { email: string; display_name?: string } | null): string {
  if (!profile) return 'Unknown User'
  return profile.display_name || profile.email.split('@')[0]
}
