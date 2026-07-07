import { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'Terms of Service — Ventiq',
 description: 'Terms and conditions governing the use of the Ventiq platform.',
};

export default function TermsPage() {
 return (
 <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
 <h1 className="text-4xl font-bold text-fg mb-8">Terms of Service</h1>
 <p className="text-fg-faint text-sm mb-10">Last updated: July 2026</p>

 <div className="prose-invert space-y-8 text-fg-muted leading-relaxed text-sm">
 <section>
 <h2 className="text-xl font-semibold text-fg mb-3">1. Acceptance of Terms</h2>
 <p>By accessing or using Ventiq ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree, you may not use the Platform.</p>
 </section>

 <section>
 <h2 className="text-xl font-semibold text-fg mb-3">2. Description of Service</h2>
 <p>Ventiq provides AI-powered startup pitch evaluation and investor matching services. The Platform uses AI language models to analyze submitted pitches and generate evaluation scores and reports.</p>
 </section>

 <section>
 <h2 className="text-xl font-semibold text-fg mb-3">3. User Accounts</h2>
 <p>You must provide accurate information when creating an account. You are responsible for maintaining the security of your account credentials. You must be at least 18 years old to use the Platform.</p>
 </section>

 <section>
 <h2 className="text-xl font-semibold text-fg mb-3">4. Intellectual Property</h2>
 <p>You retain all intellectual property rights to the content you submit. By submitting a pitch, you grant Ventiq a limited license to process your content through our AI evaluation pipeline. We do not claim ownership of your ideas or pitch content.</p>
 </section>

 <section>
 <h2 className="text-xl font-semibold text-fg mb-3">5. AI Evaluation Disclaimer</h2>
 <p>AI evaluations are provided for informational purposes only and should not be considered as professional investment advice, legal counsel, or a guarantee of business success. Scores reflect the AI's analysis based on the information provided and should be used as one data point among many.</p>
 </section>

 <section>
 <h2 className="text-xl font-semibold text-fg mb-3">6. Investor Verification</h2>
 <p>Investor accounts are subject to verification by the Ventiq team. Providing false or misleading information about your investor status may result in account suspension or termination.</p>
 </section>

 <section>
 <h2 className="text-xl font-semibold text-fg mb-3">7. Prohibited Conduct</h2>
 <p>You may not use the Platform to submit fraudulent, misleading, or harmful content. You may not attempt to reverse-engineer the AI evaluation system, scrape data, or use the Platform for any unlawful purpose.</p>
 </section>

 <section>
 <h2 className="text-xl font-semibold text-fg mb-3">8. Limitation of Liability</h2>
 <p>Ventiq is provided "as is" without warranty of any kind. We are not liable for any damages arising from your use of the Platform, including but not limited to investment decisions made based on AI evaluations.</p>
 </section>

 <section>
 <h2 className="text-xl font-semibold text-fg mb-3">9. Contact</h2>
 <p>For questions about these Terms, contact us at <span className="text-fg">legal@ventiq.ai</span>.</p>
 </section>
 </div>
 </div>
 );
}
