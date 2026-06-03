'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: "Global FinTech Platform",
    category: "Digital Ecosystem",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    span: "md:col-span-8 md:row-span-2",
  },
  {
    title: "SaaS Dashboard",
    category: "UI/UX Experience",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    span: "md:col-span-4 md:row-span-1",
  },
  {
    title: "Smart Home Interface",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    span: "md:col-span-4 md:row-span-1",
  },
  {
    title: "Mobile Application",
    category: "Digital Retail",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    span: "md:col-span-12 md:row-span-1 lg:col-span-6 lg:row-span-1",
  },
  {
    title: "E-Commerce Strategy",
    category: "Consulting",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    span: "md:col-span-12 md:row-span-1 lg:col-span-6 lg:row-span-1",
  }
];

export default function FeaturedWork() {
  return (
    <section className="py-32 bg-slate-50 relative z-20 border-t border-slate-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-primary"></span>
              Selected Work
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Crafting experiences that <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">inspire</span>
            </h3>
          </div>
          <p className="text-slate-500 font-medium max-w-md md:text-right">
            A glimpse into our proprietary portfolio of products built by BuzzChat, spanning intelligent networking, global connections, and AI infrastructure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[280px] gap-6">
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative rounded-[2rem] overflow-hidden bg-slate-200 transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.15)] hover:-translate-y-1 ${project.span}`}
            >
              {/* Image Background */}
              <img 
                src={project.image} 
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

              {/* Content Overlay (Liquid Glass style info box) */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div className="liquid-glass p-5 rounded-2xl w-full flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{project.category}</div>
                    <h4 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">{project.title}</h4>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 shadow-lg">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
