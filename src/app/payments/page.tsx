import Link from 'next/link';

export default function PaymentsPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="glass-panel-heavy p-8 md:p-16 rounded-[2rem] text-slate-700">
          <Link href="/" className="text-primary font-medium hover:underline mb-8 inline-block">&larr; Back to Home</Link>
          
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Payments & Billing Policy</h1>
          
          <div className="space-y-8 text-lg leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Overview</h2>
              <p>
                This page explains how we handle payments, invoices, and project billing. Our goal is to keep everything clear, transparent, and fair for both parties before any work begins.
              </p>
              <p className="mt-4">
                By engaging our services, clients agree to the terms outlined below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Payment Structure</h2>
              <p className="mb-4">We operate using three standard payment models depending on the type of work:</p>
              
              <div className="space-y-6">
                <div className="bg-white/50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <span className="text-primary">🔹</span> One-Off Projects
                  </h3>
                  <p className="text-sm text-slate-500 mb-3">(e.g. websites, design, builds)</p>
                  <p className="mb-2 font-medium">For fixed-scope projects:</p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>50% upfront payment required before work begins</li>
                    <li>50% final payment due upon completion and before delivery of final files or launch</li>
                  </ul>
                  <p className="text-sm text-slate-500 italic">Work will only begin once the initial payment is received.</p>
                </div>

                <div className="bg-white/50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <span className="text-primary">🔹</span> Small Tasks / Quick Services
                  </h3>
                  <p className="mb-2 font-medium">For smaller jobs:</p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>100% upfront payment is required before work starts</li>
                  </ul>
                  <p className="mb-2 font-medium">This applies to tasks such as:</p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>Landing pages</li>
                    <li>Minor edits</li>
                    <li>Logo or design tasks</li>
                    <li>One-time setups</li>
                  </ul>
                </div>

                <div className="bg-white/50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <span className="text-primary">🔹</span> Monthly Services / Retainers
                  </h3>
                  <p className="mb-2 font-medium">For ongoing services such as marketing, maintenance, automation, or lead generation:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Payment is billed monthly in advance</li>
                    <li>First payment is required before onboarding begins</li>
                    <li>Services continue on a rolling monthly basis unless cancelled</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Invoicing & Payment Terms</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>All invoices must be paid before the stated start date or continuation of work</li>
                <li>Standard payment terms: due upon receipt unless otherwise agreed</li>
                <li>We reserve the right to pause or delay work if payment is not received on time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Project Start Conditions</h2>
              <p className="mb-2">Work on any project begins only when:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Payment has been received (full or deposit as agreed)</li>
                <li>Project requirements have been confirmed by the client</li>
              </ul>
              <p className="text-sm font-medium text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                Delays in payment may result in delays in project timelines.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Refund Policy</h2>
              <p className="mb-2">Due to the nature of digital services:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Payments for work already started are non-refundable</li>
                <li>Deposits are used to secure time, resources, and project scheduling</li>
                <li>If a project is cancelled after work begins, the deposit is retained</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Revisions & Scope Changes</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Each project includes a defined scope agreed before starting</li>
                <li>Additional work outside the agreed scope may incur extra charges</li>
                <li>Any scope changes must be confirmed in writing before execution</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Late Payments</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Overdue invoices may result in paused work</li>
                <li>Continued delays may lead to project cancellation</li>
                <li>Access to deliverables may be restricted until payment is completed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Accepted Payment Methods</h2>
              <p className="mb-2">We accept:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Bank transfers</li>
                <li>Mobile money (if applicable)</li>
                <li>Card payments (if enabled via payment processor)</li>
              </ul>
              <p className="text-sm text-slate-500 italic">Details will be provided on the invoice.</p>
            </section>

            <section className="pt-6 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Agreement</h2>
              <p className="font-medium">
                By paying an invoice or deposit, the client confirms they have read and agreed to this payment policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
