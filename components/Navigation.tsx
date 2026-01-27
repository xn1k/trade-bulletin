import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import UserMenu from '@/components/auth/UserMenu'
import { Calendar, Home } from 'lucide-react'

export default async function Navigation() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">TB</span>
              </div>
              <span className="text-xl font-bold text-white hidden sm:block">
                Trade Bulletin
              </span>
            </Link>

            {user && (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Link>
                <Link
                  href="/events"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Events
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <UserMenu user={user} />
            ) : (
              <Link
                href="/auth/login"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
