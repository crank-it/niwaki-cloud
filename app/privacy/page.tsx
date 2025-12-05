import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for niwaki.cloud',
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-light text-stone-800 tracking-wide mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs text-stone-500 tracking-widest uppercase mb-8">
          プライバシーポリシー
        </p>

        <div className="prose prose-stone max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-light text-stone-800 mb-3">1. Information We Collect</h2>
            <p className="text-stone-600 leading-relaxed">
              When you create an account, we collect your email address and profile information.
              When you submit a garden, we collect the images you upload and location data you provide.
              We also collect anonymous usage data to improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light text-stone-800 mb-3">2. How We Use Your Information</h2>
            <p className="text-stone-600 leading-relaxed">
              We use your information to provide and improve our services, display your submissions
              on the community map, and communicate with you about your account. We do not sell
              your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light text-stone-800 mb-3">3. Data Storage</h2>
            <p className="text-stone-600 leading-relaxed">
              Your data is stored securely using industry-standard encryption. Images are stored
              in secure cloud storage. We automatically strip EXIF data from uploaded images to
              protect your privacy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light text-stone-800 mb-3">4. Your Rights</h2>
            <p className="text-stone-600 leading-relaxed">
              You can request access to, correction of, or deletion of your personal data at any time.
              You can delete your account and all associated data through your account settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light text-stone-800 mb-3">5. Contact</h2>
            <p className="text-stone-600 leading-relaxed">
              If you have questions about this privacy policy, please contact us at privacy@niwaki.cloud.
            </p>
          </section>

          <p className="text-sm text-stone-400 pt-6 border-t border-stone-200">
            Last updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  )
}
