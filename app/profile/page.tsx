import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getProfile } from '@/lib/profile/actions'
import ProfileForm from '@/components/profile/ProfileForm'
import { User } from 'lucide-react'

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const profile = await getProfile()

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-slate-400">
            Manage your display name and privacy settings
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-700">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              {user.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt={user.email}
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <User className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{user.email}</h2>
              <p className="text-sm text-slate-400 capitalize">{profile?.role || 'user'}</p>
            </div>
          </div>

          <ProfileForm profile={profile} />
        </div>
      </div>
    </div>
  )
}
