export type UserRole = 'user' | 'moderator' | 'admin'

export type ItemType = 'WTB' | 'WTS'

export type ItemMode = 'Trade' | 'Cash' | 'Any'

export interface Profile {
  id: string
  email: string
  role: UserRole
  display_name?: string
  created_at?: string
  updated_at?: string
}

export interface Event {
  id: string
  creator_id: string
  name: string
  start_time: string
  end_time: string
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface Item {
  id: string
  event_id: string
  user_id: string
  card_name: string
  image_url: string | null
  type: ItemType
  mode: ItemMode
  price?: number
  notes?: string
  created_at?: string
  updated_at?: string
  profile?: Profile
}

export interface Message {
  id: string
  item_id: string
  sender_id: string
  receiver_id: string
  content: string
  is_read?: boolean
  created_at?: string
}
