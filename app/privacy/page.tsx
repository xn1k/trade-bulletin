export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-slate-800 border border-slate-700 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
        <p className="text-sm text-slate-400 mb-8">Last updated: January 28, 2026</p>

        <div className="space-y-6 text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Introduction</h2>
            <p>
              Trade Bulletin ("we", "our", or "us") operates mtg.xnik.no. This page informs you of our
              policies regarding the collection, use, and disclosure of personal data when you use our
              Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Information We Collect</h2>
            <p className="mb-2">We collect the following information when you use our Service:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Google Account Information:</strong> When you sign in with Google, we collect
                your email address, name, and profile picture (if available).
              </li>
              <li>
                <strong>Trade Listings:</strong> Information you provide when creating trade listings,
                including card names, prices, and optional notes.
              </li>
              <li>
                <strong>Display Name:</strong> An optional display name you can set to protect your
                privacy on public listings.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">How We Use Your Information</h2>
            <p className="mb-2">We use the collected information for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To authenticate you and provide access to the Service</li>
              <li>To display your identity on trade listings you create</li>
              <li>To enable other users to contact you about trades</li>
              <li>To maintain and improve our Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Data Storage</h2>
            <p>
              Your data is stored securely using Supabase, a trusted backend-as-a-service provider. We
              implement appropriate technical and organizational measures to protect your personal data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Data Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties.
              Your email address and display name (or email username) are visible to other users of the
              Service when you create trade listings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Your Rights</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access your personal data</li>
              <li>Delete your account and associated data</li>
              <li>Update your display name and profile information</li>
              <li>Remove your trade listings at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Cookies</h2>
            <p>
              We use cookies to maintain your authentication session. These cookies are essential for
              the Service to function and are automatically deleted when you sign out.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by
              posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:hans.wilhelmsen@gmail.com" className="text-blue-400 hover:text-blue-300">
                hans.wilhelmsen@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
