import { Globe, Share2, ExternalLink, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full relative overflow-hidden bg-slate-50 pt-24 pb-12 mt-auto">
      {/* Decorative gradient blur in footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="liquid-glass p-8 md:p-16 rounded-[2.5rem] mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="col-span-1 md:col-span-5">
              <Link href="/" className="flex items-center gap-3 mb-6 group inline-flex">
                <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src="https://www.buzzinnovations.co.uk/brand/buzzchat-site-logo.png" 
                    alt="Buzz Innovations Logo" 
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold tracking-tight text-xl text-slate-900 leading-none">
                    BuzzInnovations
                  </span>
                  <span className="text-slate-500 font-medium text-[0.7rem] uppercase tracking-widest mt-1">Services</span>
                </div>
              </Link>
              <p className="max-w-md text-slate-600 leading-relaxed font-medium">
                This is the Services provision wing. Services operates under BuzzChat. 
                BuzzChat is a trading name of Buzz Innovations Ltd., registered in England and Wales (Company No. 17212684).
              </p>
            </div>
            
            <div className="col-span-1 md:col-span-3">
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Capabilities</h4>
              <ul className="space-y-4 font-medium text-slate-600">
                <li><Link href="#services" className="hover:text-primary transition-colors">Web Development</Link></li>
                <li><Link href="#services" className="hover:text-primary transition-colors">UI/UX Design</Link></li>
                <li><Link href="#services" className="hover:text-primary transition-colors">Custom Software</Link></li>
                <li><Link href="#services" className="hover:text-primary transition-colors">Digital Strategy</Link></li>
              </ul>
            </div>
            
            <div className="col-span-1 md:col-span-4">
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Connect</h4>
              <div className="flex flex-wrap gap-3">
                <a href="#" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary shadow-sm hover:shadow-primary/20 transition-all duration-300 group">
                  <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary shadow-sm hover:shadow-primary/20 transition-all duration-300 group">
                  <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary shadow-sm hover:shadow-primary/20 transition-all duration-300 group">
                  <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary shadow-sm hover:shadow-primary/20 transition-all duration-300 group">
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 font-medium px-4">
          <p>© {new Date().getFullYear()} Buzz Innovations Ltd. All rights reserved.</p>
          <div className="flex gap-6 flex-wrap justify-center">
            <Link href="/payments" className="hover:text-primary transition-colors">Payments Policy</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
