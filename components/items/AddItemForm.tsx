'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DollarSign, Repeat } from 'lucide-react'
import CardAutocomplete from '@/components/cards/CardAutocomplete'
import { createItem } from '@/lib/items/actions'
import type { ItemType, ItemMode } from '@/lib/types/database'

interface AddItemFormProps {
  eventId: string
}

export default function AddItemForm({ eventId }: AddItemFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardName, setCardName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [type, setType] = useState<ItemType>('WTS')
  const [mode, setMode] = useState<ItemMode>('Any')
  const [price, setPrice] = useState('')
  const [notes, setNotes] = useState('')

  const handleCardSelect = (name: string, image: string) => {
    setCardName(name)
    setImageUrl(image)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!cardName) {
      setError('Please select a card')
      setLoading(false)
      return
    }

    try {
      await createItem({
        event_id: eventId,
        card_name: cardName,
        image_url: imageUrl,
        type,
        mode,
        price: price ? parseFloat(price) : undefined,
        notes: notes || undefined,
      })

      router.push(`/event/${eventId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create listing')
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

      <CardAutocomplete onSelect={handleCardSelect} value={cardName} />

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Listing Type
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setType('WTS')}
            className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
              type === 'WTS'
                ? 'bg-green-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Want to Sell (WTS)
          </button>
          <button
            type="button"
            onClick={() => setType('WTB')}
            className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
              type === 'WTB'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Want to Buy (WTB)
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          <Repeat className="w-4 h-4 inline mr-1" />
          Transaction Mode
        </label>
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setMode('Trade')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'Trade'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Trade Only
          </button>
          <button
            type="button"
            onClick={() => setMode('Cash')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'Cash'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Cash Only
          </button>
          <button
            type="button"
            onClick={() => setMode('Any')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'Any'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Any
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-slate-300 mb-2">
          <DollarSign className="w-4 h-4 inline mr-1" />
          Price (Optional)
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
          min="0"
          placeholder="0.00"
          className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-slate-300 mb-2">
          Notes (Optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="e.g., Near Mint, Japanese, Foil, specific set or version..."
          className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
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
          disabled={loading || !cardName}
          className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          {loading ? 'Creating...' : 'List Card'}
        </button>
      </div>
    </form>
  )
}
