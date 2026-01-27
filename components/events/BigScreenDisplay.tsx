'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Item } from '@/lib/types/database'
import { DollarSign } from 'lucide-react'
import { getDisplayName } from '@/lib/utils/profile'

interface BigScreenDisplayProps {
  eventId: string
  initialItems: (Item & { profile: { email: string; display_name?: string } })[]
}

export default function BigScreenDisplay({
  eventId,
  initialItems,
}: BigScreenDisplayProps) {
  const [items, setItems] = useState(initialItems)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel(`event-${eventId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'items',
          filter: `event_id=eq.${eventId}`,
        },
        async (payload) => {
          // Fetch the full item with profile data
          const { data: newItem } = await supabase
            .from('items')
            .select(`
              *,
              profile:user_id (
                email
              )
            `)
            .eq('id', payload.new.id)
            .single()

          if (newItem) {
            setItems((prev) => [newItem as any, ...prev])
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'items',
          filter: `event_id=eq.${eventId}`,
        },
        (payload) => {
          setItems((prev) => prev.filter((item) => item.id !== payload.old.id))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [eventId, supabase])

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let scrollSpeed = 1 // pixels per interval
    const scrollInterval = 50 // milliseconds

    const autoScroll = setInterval(() => {
      const maxScroll = container.scrollHeight - container.clientHeight

      if (maxScroll <= 0) {
        // Not enough content to scroll
        return
      }

      if (container.scrollTop >= maxScroll - 10) {
        // Reached bottom, scroll back to top
        container.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        // Continue scrolling down
        container.scrollTop += scrollSpeed
      }
    }, scrollInterval)

    return () => clearInterval(autoScroll)
  }, [items])

  const typeColors = {
    WTS: 'bg-green-600',
    WTB: 'bg-blue-600',
  }

  const modeIcons = {
    Trade: '🃏',
    Cash: '💰',
    Any: '🔄',
  }

  return (
    <div
      ref={scrollContainerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-h-[calc(100vh-200px)] overflow-y-auto"
      style={{ scrollBehavior: 'smooth' }}
    >
      {items.length === 0 ? (
        <div className="col-span-full text-center py-20">
          <p className="text-3xl text-slate-400">
            No cards listed yet. Scan the QR code to add one!
          </p>
        </div>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="bg-slate-800 border-2 border-slate-700 rounded-xl overflow-hidden shadow-2xl"
          >
            {item.image_url && (
              <div className="w-full h-72 bg-slate-900 flex items-center justify-center">
                <img
                  src={item.image_url}
                  alt={item.card_name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}

            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-2xl font-bold text-white flex-1">
                  {item.card_name}
                </h3>
                <span
                  className={`px-3 py-1 text-sm font-bold text-white rounded-lg ${
                    typeColors[item.type]
                  }`}
                >
                  {item.type}
                </span>
              </div>

              {item.notes && (
                <p className="text-base text-slate-300 mb-3 italic">"{item.notes}"</p>
              )}

              <div className="flex items-center gap-4 text-lg text-slate-300 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{modeIcons[item.mode]}</span>
                  <span className="font-semibold">{item.mode}</span>
                </div>
                {item.price && (
                  <div className="flex items-center gap-1 text-green-400 font-bold">
                    <DollarSign className="w-5 h-5" />
                    <span>{item.price.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t-2 border-slate-700">
                <p className="text-lg text-slate-400 truncate">
                  {getDisplayName(item.profile)}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
