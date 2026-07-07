import { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'Privacy Policy — Ventiq',
 description: 'How Ventiq collects, uses, and protects your personal data.',
};

export default function PrivacyPage() {
 return (
 <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
 <h1 className="text-4xl font-bold text-fg mb-8">Privacy Policy</h1>
 <p className="text-fg-faint text-sm mb-10">Last updated: July 2026</p>

 <div className="prose-invert space-y-8 text-fg-muted leading-relaxed text-sm">
 <section>
 <h2 className="text-xl font-semibold text-fg mb-3">1. Information We Collect</h2>
 <p>We collect information you provide directly, including your name, email address, Google profile data (via OAuth), startup pitch details, and investor profile information. We also collect usage data such as page views, feature usage, and device information.</p>
 </section>

 <section>
 <h2 className="text-xl font-semibold text-fg mb-3">2. How We Use Your Information</h2>
 <p>We use your information to provide and improve the Ventiq platform, including AI-powered pitch evaluations, investor matching, account management, and customer support. We do not sell your personal data to third parties.</p>
 </section>

 <section>
 <h2 className="text-xl font-semibold text-fg mb-3">3. Data Storage & Security</h2>
 <p>Your data is stored on secure, encrypted servers. Pitch data and evaluation results are associated with your account and are not shared publicly. Investor access to your evaluation data requires your explicit approval.</p>
 </section>

 <section>
 <h2 className="text-xl font-semibold text-fg mb-3">4. AI Processing</h2>
 <p>Your pitch data is processed by AI language models to generate evaluations. This data is transmitted securely and is not used to train third-party AI models. Evaluation results are stored in your account.</p>
 </section>

 <section>
 <h2 className="text-xl font-semibold text-fg mb-3">5. Third-Party Services</h2>
 <p>We use Google OAuth for authentication, Pinecone for similarity search, and standard cloud infrastructure providers for hosting. Each service is governed by its own privacy policy.</p>
 </section>

 <section>
 <h2 className="text-xl font-semibold text-fg mb-3">6. Your Rights</h2>
 <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us. You may also export your evaluation data or close your account.</p>
 </section>

 <section>
 <h2 className="text-xl font-semibold text-fg mb-3">7. Contact</h2>
 <p>For privacy-related inquiries, contact us at <span className="text-fg">privacy@ventiq.ai</span>.</p>
 </section>
 </div>
 </div>
 );
}
