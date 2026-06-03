'use client';

import { useRef } from 'react';
import { ArrowRight, Code2, PenTool, Zap, Sparkles } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const floatY1 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const floatY3 = useTransform(scrollYProgress, [0, 1], ["0%", "140%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 pb-40 md:pt-48 md:pb-56 min-h-[90vh] flex items-center bg-white">
      {/* Floating 3D-like Liquid Glass Cards */}
      <motion.div style={{ opacity: opacityFade }} className="absolute inset-0 z-0 pointer-events-none hidden lg:block overflow-hidden max-w-[1400px] mx-auto">
        <motion.div style={{ y: floatY1 }} className="absolute top-[15%] left-[5%]">
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="glass-panel-heavy p-5 rounded-3xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Digital Ecosystems</div>
                <div className="text-xs text-slate-500 font-medium">Scalable Platforms</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: floatY2 }} className="absolute top-[25%] right-[2%]">
          <motion.div 
            animate={{ y: [0, 25, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="glass-panel-heavy p-5 rounded-3xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <PenTool className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Product Design</div>
                <div className="text-xs text-slate-500 font-medium">Premium Aesthetics</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: floatY3 }} className="absolute bottom-[15%] left-[12%]">
          <motion.div 
            animate={{ y: [0, -25, 0], rotate: [0, -1, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="glass-panel-heavy p-5 rounded-3xl"
          >
             <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Innovation</div>
                <div className="text-xs text-slate-500 font-medium">Next-Gen Solutions</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border-white/60 text-slate-800 text-sm font-semibold mb-10 shadow-[0_4px_20px_rgb(0,0,0,0.05)]"
          >
            <div className="relative flex h-3 w-3 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-50"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </div>
            Setting new standards in digital excellence
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-extrabold tracking-tighter mb-8 text-slate-900 leading-[1.05]"
          >
            Engineering the <br className="hidden md:block" />
            <span className="text-gradient-primary animate-gradient-text bg-[linear-gradient(to_right,#2563eb,#0ea5e9,#14b8a6,#2563eb)]">
              Physical & Digital
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-slate-600 mb-14 max-w-3xl leading-relaxed font-medium"
          >
            We transform complex problems into beautiful, high-performance platforms and award-winning products. Welcome to the new era of innovation.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
          >
            <a href="#quote" className={cn(
              buttonVariants({ size: "lg" }), 
              "rounded-full px-10 py-7 text-lg font-semibold bg-slate-900 hover:bg-slate-800 text-white shadow-[0_10px_40px_-10px_rgba(15,23,42,0.5)] hover:shadow-[0_15px_50px_-10px_rgba(15,23,42,0.6)] hover:-translate-y-1 transition-all duration-300 group"
            )}>
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#services" className={cn(
              buttonVariants({ size: "lg", variant: "outline" }), 
              "rounded-full px-10 py-7 text-lg font-semibold bg-white/50 backdrop-blur-md border-white/60 hover:bg-white/80 hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-slate-900"
            )}>
              View Capabilities
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}