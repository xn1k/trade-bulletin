import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus, Calendar, Clock, User } from 'lucide-react'
import { getActiveEvents } from '@/lib/events/actions'
import { format } from 'date-fns'
import { getDisplayName } from '@/lib/utils/profile'

export default async function EventsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const events = await getActiveEvents()

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Events</h1>
            <p className="text-slate-400">
              Browse active trading events or create your own
            </p>
          </div>
          <Link
            href="/events/create"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Event
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
            <p className="text-slate-400 text-lg">
              No events yet. Create your first event to get started!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/event/${event.id}`}
                className="bg-slate-800 border border-slate-700 hover:border-blue-500 rounded-lg p-6 transition-colors group"
              >
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  {event.name}
                </h3>

                <div className="space-y-2 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {format(new Date(event.start_time), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {format(new Date(event.start_time), 'h:mm a')} -{' '}
                      {format(new Date(event.end_time), 'h:mm a')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{getDisplayName(event.profiles)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700">
                  <span className="text-green-400 text-sm font-medium">
                    Active
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
