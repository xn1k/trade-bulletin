import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getEvent } from '@/lib/events/actions'
import { getEventItems } from '@/lib/items/actions'
import { format } from 'date-fns'
import { Calendar, Clock, Monitor, Plus, ArrowLeft } from 'lucide-react'
import ItemCard from '@/components/items/ItemCard'

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { id } = await params

  // Validate id
  if (!id || id === 'undefined') {
    redirect('/events')
  }

  const event = await getEvent(id)
  const items = await getEventItems(id)

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{event.name}</h1>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(event.start_time), 'MMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    {format(new Date(event.start_time), 'h:mm a')} -{' '}
                    {format(new Date(event.end_time), 'h:mm a')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/event/${id}/display`}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
              >
                <Monitor className="w-5 h-5" />
                Big Screen
              </Link>
              <Link
                href={`/event/${id}/add-item`}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                List Card
              </Link>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
            <p className="text-slate-400 text-lg mb-4">
              No cards listed yet. Be the first to add one!
            </p>
            <Link
              href={`/event/${id}/add-item`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              List Your First Card
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
