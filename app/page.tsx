import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Calendar, MessageSquare, TrendingUp, Zap } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/events')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Trade Bulletin
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            The real-time digital trade board for local game stores. Connect traders, list cards, and manage events seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/login"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Get Started
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div id="features" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Updates</h3>
            <p className="text-slate-400">
              See new listings instantly as they're posted. No refresh needed.
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Event Management</h3>
            <p className="text-slate-400">
              Create events that auto-close when the tournament ends.
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Market Prices</h3>
            <p className="text-slate-400">
              Powered by Scryfall API for accurate card data and pricing.
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Private Messaging</h3>
            <p className="text-slate-400">
              Coordinate trades privately without sharing phone numbers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
