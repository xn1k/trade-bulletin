'use client'

import { DollarSign, User, Trash2 } from 'lucide-react'
import type { Item } from '@/lib/types/database'
import { deleteItem } from '@/lib/items/actions'
import { getDisplayName } from '@/lib/utils/profile'
import { useState } from 'react'

interface ItemCardProps {
  item: Item & { profile: { email: string; display_name?: string } }
}

export default function ItemCard({ item }: ItemCardProps) {
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this listing?')) {
      return
    }

    setDeleting(true)
    try {
      await deleteItem(item.id)
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete item')
      setDeleting(false)
    }
  }

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
    <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-slate-600 transition-colors">
      {item.image_url && (
        <div className="w-full h-64 bg-slate-900 flex items-center justify-center">
          <img
            src={item.image_url}
            alt={item.card_name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">{item.card_name}</h3>
          <span
            className={`px-2 py-1 text-xs font-bold text-white rounded ${
              typeColors[item.type]
            }`}
          >
            {item.type}
          </span>
        </div>

        {item.notes && (
          <p className="text-sm text-slate-400 mb-3 italic">"{item.notes}"</p>
        )}

        <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
          <div className="flex items-center gap-1">
            <span>{modeIcons[item.mode]}</span>
            <span>{item.mode}</span>
          </div>
          {item.price && (
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>${item.price.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-700">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <User className="w-4 h-4" />
            <span className="truncate">{getDisplayName(item.profile)}</span>
          </div>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors disabled:opacity-50"
            title="Delete listing"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
