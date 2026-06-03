import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="glass-panel-heavy p-8 md:p-16 rounded-[2rem] text-slate-700">
          <Link href="/" className="text-primary font-medium hover:underline mb-8 inline-block">&larr; Back to Home</Link>
          
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Buzz Innovations Ltd ("we", "us", or "our"), trading as BuzzChat, collects, uses, and discloses your information when you use our services.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you request a quote, including your name, email address, company details, and project specifications.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. How We Use Your Information</h2>
            <p>
              We use the information we collect to communicate with you about your project requirements, provide estimates, and deliver our services.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us via our main website or the contact details provided in your service agreement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
