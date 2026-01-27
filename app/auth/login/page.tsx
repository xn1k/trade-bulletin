import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LoginButton from '@/components/auth/LoginButton'

export default async function LoginPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-md w-full mx-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Trade Bulletin</h1>
            <p className="text-slate-400">
              Digital trade board for local game stores
            </p>
          </div>

          <div className="space-y-4">
            <LoginButton />

            <p className="text-center text-sm text-slate-500 mt-6">
              Sign in to create events, list cards, and connect with traders
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
