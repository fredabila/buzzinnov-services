import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="glass-panel-heavy p-8 md:p-16 rounded-[2rem] text-slate-700">
          <Link href="/" className="text-primary font-medium hover:underline mb-8 inline-block">&larr; Back to Home</Link>
          
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing our website and requesting a quote, you agree to be bound by these Terms of Service. These services are provided by Buzz Innovations Ltd, trading as BuzzChat.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Quotes and Estimates</h2>
            <p>
              Any quotes or estimates provided through our web forms are preliminary and subject to change upon detailed project scoping and formal contract agreement.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Intellectual Property</h2>
            <p>
              All materials, code, and designs produced during the discovery phase remain the property of Buzz Innovations Ltd unless explicitly transferred via a separate written agreement.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of England and Wales. Buzz Innovations Ltd is a registered company in England and Wales (Company No. 17212684).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
