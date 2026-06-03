'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: "eintercon",
    category: "Global Connections",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    color: "from-blue-600/20 to-blue-900/40"
  },
  {
    title: "Mutle",
    category: "Trust Graph",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    color: "from-sky-600/20 to-sky-900/40"
  },
  {
    title: "Yenhyia",
    category: "Smart Matching",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    color: "from-teal-600/20 to-teal-900/40"
  },
  {
    title: "OrcBot",
    category: "Strategic AI Agent",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    color: "from-cyan-600/20 to-cyan-900/40"
  },
  {
    title: "PSON5",
    category: "Personalization Infrastructure",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    color: "from-slate-600/20 to-slate-900/40"
  }
];

export default function FeaturedWork() {
  return (
    <section className="bg-white py-32 z-20 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Intro Header */}
        <div className="mb-24">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-6 flex items-center gap-3">
            <span className="w-12 h-px bg-primary"></span>
            Selected Work
          </h2>
          <h3 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 leading-[1.05] mb-8">
            Proprietary <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Ventures</span>.
          </h3>
          <p className="text-slate-500 font-medium text-lg md:text-xl max-w-2xl leading-relaxed">
            Our specialized portfolio of products built by the BuzzChat team, ranging from global networking to AI personalization.
          </p>
        </div>

        {/* Stacking Project Cards Container */}
        <div className="flex flex-col gap-24 md:gap-32">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ scale, opacity }}
      className="sticky top-32 group w-full"
    >
      <div className={`relative h-[60vh] md:h-[80vh] w-full rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-slate-900 shadow-2xl shadow-slate-200/50 border border-slate-100`}>
        {/* Image Background */}
        <img 
          src={project.image} 
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60 mix-blend-multiply group-hover:opacity-80 transition-opacity duration-700`}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

        {/* Content */}
        <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-sm mb-4">
                {project.category} // PROJ_{index.toString().padStart(3, '0')}
              </div>
              <h4 className="text-4xl md:text-7xl font-extrabold text-white tracking-tighter mb-6">
                {project.title}
              </h4>
            </div>
            
            <div className="flex-shrink-0">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all duration-500 cursor-pointer shadow-xl">
                <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
