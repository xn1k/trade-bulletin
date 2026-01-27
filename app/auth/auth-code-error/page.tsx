import Link from 'next/link'

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-md w-full mx-4">
        <div className="bg-slate-800 border border-red-900/50 rounded-lg shadow-2xl p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-400 mb-4">
              Authentication Error
            </h1>
            <p className="text-slate-300 mb-6">
              There was a problem signing you in. Please try again.
            </p>
            <Link
              href="/auth/login"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
