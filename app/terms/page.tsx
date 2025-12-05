import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for niwaki.cloud',
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-light text-stone-800 tracking-wide mb-2">
          Terms of Service
        </h1>
        <p className="text-xs text-stone-500 tracking-widest uppercase mb-8">
          利用規約
        </p>

        <div className="prose prose-stone max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-light text-stone-800 mb-3">1. Acceptance of Terms</h2>
            <p className="text-stone-600 leading-relaxed">
              By accessing and using niwaki.cloud, you accept and agree to be bound by these
              terms of service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light text-stone-800 mb-3">2. User Content</h2>
            <p className="text-stone-600 leading-relaxed">
              You retain ownership of content you submit. By submitting content, you grant us a
              non-exclusive license to display, reproduce, and distribute your content on our platform.
              You must have the right to share any content you submit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light text-stone-800 mb-3">3. Acceptable Use</h2>
            <p className="text-stone-600 leading-relaxed">
              You agree not to submit content that is illegal, offensive, or violates the rights of others.
              Garden submissions must be genuine and accurately represent the location. We reserve the
              right to remove content that violates these guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light text-stone-800 mb-3">4. AI Visualiser</h2>
            <p className="text-stone-600 leading-relaxed">
              The AI visualiser is provided for entertainment and inspiration purposes only.
              Generated images are AI interpretations and may not reflect actual landscaping possibilities.
              We are not responsible for landscaping decisions made based on AI-generated content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light text-stone-800 mb-3">5. Disclaimer</h2>
            <p className="text-stone-600 leading-relaxed">
              Our services are provided &quot;as is&quot; without warranties of any kind. We do not guarantee
              the accuracy of user-submitted content or the availability of our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light text-stone-800 mb-3">6. Changes to Terms</h2>
            <p className="text-stone-600 leading-relaxed">
              We may update these terms from time to time. Continued use of our services after
              changes constitutes acceptance of the new terms.
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
