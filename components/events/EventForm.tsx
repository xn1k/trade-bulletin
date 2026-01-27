'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock } from 'lucide-react'
import { createEvent } from '@/lib/events/actions'

export default function EventForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const startTime = formData.get('startTime') as string
    const endTime = formData.get('endTime') as string

    if (!name || !startTime || !endTime) {
      setError('All fields are required')
      setLoading(false)
      return
    }

    const startDate = new Date(startTime)
    const endDate = new Date(endTime)

    if (endDate <= startDate) {
      setError('End time must be after start time')
      setLoading(false)
      return
    }

    try {
      const eventId = await createEvent({
        name,
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
      })

      if (!eventId) {
        throw new Error('Failed to create event - no ID returned. Make sure you have run the database schema in Supabase (see SETUP.md)')
      }

      router.push(`/event/${eventId}`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create event'
      console.error('Event creation error:', err)
      setError(errorMessage)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-900/20 border border-red-900 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
          Event Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Tuesday Night Modern"
          required
          className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-slate-300 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Start Time
          </label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            required
            className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-slate-300 mb-2">
            <Clock className="w-4 h-4 inline mr-1" />
            End Time
          </label>
          <input
            type="datetime-local"
            id="endTime"
            name="endTime"
            required
            className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </div>
    </form>
  )
}
