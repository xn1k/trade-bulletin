'use client'

import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'

interface CardAutocompleteProps {
  onSelect: (cardName: string, imageUrl: string) => void
  value?: string
}

export default function CardAutocomplete({ onSelect, value = '' }: CardAutocompleteProps) {
  const [query, setQuery] = useState(value)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 3) {
        setSuggestions([])
        return
      }

      setLoading(true)
      try {
        const res = await fetch(
          `https://api.scryfall.com/cards/autocomplete?q=${encodeURIComponent(query)}`
        )
        const data = await res.json()
        setSuggestions(data.data || [])
        setShowSuggestions(true)
      } catch (error) {
        console.error('Error fetching suggestions:', error)
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }

    const debounce = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounce)
  }, [query])

  const handleSelect = async (cardName: string) => {
    setQuery(cardName)
    setSelectedCard(cardName)
    setShowSuggestions(false)

    // Fetch the full card data to get image URL
    try {
      const res = await fetch(
        `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`
      )
      const card = await res.json()
      const imageUrl = card.image_uris?.normal || card.image_uris?.large || ''
      onSelect(cardName, imageUrl)
    } catch (error) {
      console.error('Error fetching card details:', error)
      onSelect(cardName, '')
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      <label htmlFor="cardName" className="block text-sm font-medium text-slate-300 mb-2">
        Card Name
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input
          type="text"
          id="cardName"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setSelectedCard(null)
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search for a card..."
          className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {showSuggestions && (query.length >= 3) && (
        <div className="absolute z-10 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-64 overflow-y-auto">
          {loading ? (
            <div className="px-4 py-3 text-slate-400 text-center">Searching...</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(suggestion)}
                className="w-full text-left px-4 py-3 hover:bg-slate-700 text-white transition-colors border-b border-slate-700 last:border-b-0"
              >
                {suggestion}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-slate-400 text-center">
              No cards found. Try a different search.
            </div>
          )}
        </div>
      )}

      {selectedCard && (
        <p className="mt-2 text-sm text-green-400">✓ Card selected: {selectedCard}</p>
      )}
    </div>
  )
}
