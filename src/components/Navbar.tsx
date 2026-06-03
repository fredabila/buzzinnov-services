import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="w-full max-w-5xl rounded-full border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] pointer-events-auto">
        <div className="px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="https://www.buzzinnovations.co.uk/brand/buzzchat-site-logo.png" 
              alt="Buzz Innovations Logo" 
              className="w-8 h-8 object-contain group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col justify-center">
              <span className="font-bold tracking-tight text-lg text-slate-900 leading-none">
                BuzzInnovations
              </span>
              <span className="text-slate-500 font-medium text-[0.7rem] uppercase tracking-widest mt-0.5">Services</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link href="#services" className="hover:text-slate-900 transition-colors">Services</Link>
            <Link href="#process" className="hover:text-slate-900 transition-colors">Process</Link>
            <Link href="/lead-engine" className="hover:text-slate-900 transition-colors">Lead Engine</Link>
            <Link href="#quote" className={cn(buttonVariants(), "rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-md shadow-slate-900/10 transition-all px-6")}>
              Get in Touch
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <Link href="#quote" className={cn(buttonVariants({ size: "sm" }), "rounded-full bg-slate-900 text-white hover:bg-slate-800 px-4")}>
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
