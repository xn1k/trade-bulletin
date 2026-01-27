'use client'

import { useState } from 'react'
import { updateDisplayName } from '@/lib/profile/actions'
import type { Profile } from '@/lib/types/database'

interface ProfileFormProps {
  profile: Profile | null
}

export default function ProfileForm({ profile }: ProfileFormProps) {
  const [displayName, setDisplayName] = useState(profile?.display_name || '')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await updateDisplayName(displayName)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="bg-green-900/20 border border-green-900 text-green-400 px-4 py-3 rounded-lg">
          Profile updated successfully!
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-900 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="displayName" className="block text-sm font-medium text-slate-300 mb-2">
          Display Name
        </label>
        <input
          type="text"
          id="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Enter your display name or nickname"
          className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="mt-2 text-sm text-slate-400">
          This name will be shown on your listings instead of your email address. Leave empty to use the first part of your email.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-white mb-2">Privacy Note</h3>
        <p className="text-sm text-slate-400">
          Setting a display name helps protect your privacy by not showing your full email address on public trade listings.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  )
}
