'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: "eintercon",
    category: "Global Connections",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
  },
  {
    title: "Mutle",
    category: "Trust Graph",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
  },
  {
    title: "Yenhyia",
    category: "Smart Matching",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
  },
  {
    title: "OrcBot",
    category: "Strategic AI Agent",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
  },
  {
    title: "PSON5",
    category: "Personalization Infrastructure",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
  }
];

export default function FeaturedWork() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Translate the flex container to the left by its full width minus 1 viewport width,
  // effectively stopping when the last item reaches the right edge.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "calc(-100% + 100vw)"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-slate-900 border-t border-slate-800 z-20">
      {/* Sticky container pins to the top of the viewport */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Animated horizontal flex container */}
        <motion.div style={{ x }} className="flex gap-8 px-4 md:px-20 items-center">
          
          {/* Introductory Title Card */}
          <div className="w-[85vw] md:w-[40vw] max-w-xl flex-shrink-0 flex flex-col justify-center pr-10">
            <h2 className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-6 flex items-center gap-3">
              <span className="w-12 h-px bg-cyan-400"></span>
              Selected Work
            </h2>
            <h3 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-[1.05] mb-8">
              Crafting <br/>
              experiences <br/>
              that <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">inspire</span>.
            </h3>
            <p className="text-slate-400 font-medium text-lg md:text-xl max-w-md leading-relaxed">
              Scroll to explore our proprietary portfolio of products built by BuzzChat, spanning intelligent networking, global connections, and AI infrastructure.
            </p>
          </div>

          {/* Project Cards */}
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`w-[85vw] md:w-[60vw] max-w-4xl h-[60vh] md:h-[70vh] flex-shrink-0 group relative rounded-[2.5rem] overflow-hidden bg-slate-800 shadow-2xl shadow-black/50 ${index === projects.length - 1 ? 'mr-4 md:mr-20' : ''}`}
            >
              {/* Image Background */}
              <img 
                src={project.image} 
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Content Overlay (Liquid Glass style info box) */}
              <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex items-end justify-between">
                <div className="liquid-glass p-6 md:p-8 rounded-[2rem] w-full flex items-center justify-between border-white/20 bg-white/10 backdrop-blur-3xl shadow-2xl">
                  <div>
                    <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">{project.category}</div>
                    <h4 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{project.title}</h4>
                  </div>
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white text-slate-900 flex items-center justify-center -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 shadow-2xl">
                    <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
