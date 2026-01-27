import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import EventForm from '@/components/events/EventForm'

export default async function CreateEventPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Event</h1>
          <p className="text-slate-400">
            Set up a new trading event for your local game store
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <EventForm />
        </div>
      </div>
    </div>
  )
}
