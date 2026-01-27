import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getEvent } from '@/lib/events/actions'
import AddItemForm from '@/components/items/AddItemForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function AddItemPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { id } = await params
  const event = await getEvent(id)

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href={`/event/${id}`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Event
          </Link>

          <h1 className="text-3xl font-bold text-white mb-2">List a Card</h1>
          <p className="text-slate-400">Add a card to {event.name}</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <AddItemForm eventId={id} />
        </div>
      </div>
    </div>
  )
}
