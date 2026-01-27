import { createClient } from '@/lib/supabase/server'
import { getEvent } from '@/lib/events/actions'
import { getEventItems } from '@/lib/items/actions'
import BigScreenDisplay from '@/components/events/BigScreenDisplay'
import { format } from 'date-fns'

export default async function DisplayPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { id } = await params
  const event = await getEvent(id)
  const initialItems = await getEventItems(id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-8 py-6">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">{event.name}</h1>
          <div className="flex items-center justify-center gap-6 text-xl text-slate-300">
            <span>{format(new Date(event.start_time), 'MMM d, yyyy')}</span>
            <span>•</span>
            <span>
              {format(new Date(event.start_time), 'h:mm a')} -{' '}
              {format(new Date(event.end_time), 'h:mm a')}
            </span>
          </div>
        </div>

        <BigScreenDisplay eventId={id} initialItems={initialItems} />
      </div>
    </div>
  )
}
