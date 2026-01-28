export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-slate-800 border border-slate-700 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
        <p className="text-sm text-slate-400 mb-8">Last updated: January 28, 2026</p>

        <div className="space-y-6 text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Acceptance of Terms</h2>
            <p>
              By accessing and using Trade Bulletin (the "Service"), you accept and agree to be bound by
              the terms and provisions of this agreement. If you do not agree to these Terms of Service,
              please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Description of Service</h2>
            <p>
              Trade Bulletin is a platform that allows users to post and view trading card listings for
              local game store events. The Service facilitates connections between traders but does not
              directly facilitate, mediate, or complete any transactions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">User Accounts</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You must sign in with a Google account to use the Service</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must provide accurate and complete information</li>
              <li>You may not impersonate others or create false identities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Acceptable Use</h2>
            <p className="mb-2">You agree to use the Service only for lawful purposes. You must not:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Post false, misleading, or fraudulent listings</li>
              <li>Use the Service to harass, abuse, or harm others</li>
              <li>Attempt to gain unauthorized access to the Service or other users' accounts</li>
              <li>Post spam, malware, or malicious content</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights of others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Trading and Transactions</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>All trades and transactions are conducted directly between users</li>
              <li>Trade Bulletin is not responsible for the quality, safety, or legality of items listed</li>
              <li>We do not guarantee the accuracy of listings or the reliability of users</li>
              <li>Users are solely responsible for evaluating trades before completing them</li>
              <li>Trade Bulletin is not liable for any disputes, losses, or damages arising from trades</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Content Ownership</h2>
            <p>
              You retain ownership of the content you post on the Service. By posting content, you grant
              Trade Bulletin a non-exclusive license to display and distribute your content on the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Content Moderation</h2>
            <p>
              We reserve the right to remove any content or suspend any user account that violates these
              Terms of Service or is deemed inappropriate, without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Disclaimer of Warranties</h2>
            <p>
              The Service is provided "as is" and "as available" without warranties of any kind, either
              express or implied. We do not warrant that the Service will be uninterrupted, secure, or
              error-free.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Limitation of Liability</h2>
            <p>
              Trade Bulletin and its operators shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use of or inability to use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be effective
              immediately upon posting. Your continued use of the Service after changes constitutes
              acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Termination</h2>
            <p>
              We reserve the right to terminate or suspend your access to the Service at any time, without
              prior notice, for conduct that we believe violates these Terms of Service or is harmful to
              other users or the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:{' '}
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
