'use client';

import { Code, Palette, Monitor, PenTool, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    title: "Web Development",
    description: "Bespoke web applications and platforms built with precision, performance, and scalability in mind. We leverage modern architectures to deliver lightning-fast experiences.",
    icon: Code,
    category: "Digital Platform",
    span: "md:col-span-2 md:row-span-2",
    gradient: "from-blue-500/10 to-indigo-500/5",
    border: "group-hover:border-blue-500/30"
  },
  {
    title: "UI/UX Design",
    description: "Elegant, user-centric interfaces that bridge complex engineering and intuitive user experience.",
    icon: Palette,
    category: "Experience",
    span: "md:col-span-1 md:row-span-1",
    gradient: "from-emerald-500/10 to-teal-500/5",
    border: "group-hover:border-emerald-500/30"
  },
  {
    title: "Product Design",
    description: "Full-lifecycle physical product design, transforming initial concepts into manufacturable realities.",
    icon: PenTool,
    category: "Physical",
    span: "md:col-span-1 md:row-span-2",
    gradient: "from-cyan-500/10 to-blue-500/5",
    border: "group-hover:border-cyan-500/30"
  },
  {
    title: "Digital Strategy",
    description: "Product-led growth strategies ensuring your products find market fit and scale efficiently.",
    icon: Monitor,
    category: "Consulting",
    span: "md:col-span-1 md:row-span-1",
    gradient: "from-amber-500/10 to-orange-500/5",
    border: "group-hover:border-amber-500/30"
  },
  {
    title: "Innovation Lab",
    description: "Experimental R&D exploring AI integrations and advanced ecosystem infrastructure.",
    icon: Sparkles,
    category: "Future",
    span: "md:col-span-2 md:row-span-1",
    gradient: "from-slate-500/10 to-slate-400/5",
    border: "group-hover:border-slate-500/30"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-white relative z-20 border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="mb-20 max-w-3xl">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-primary"></span>
            Our Capabilities
          </h2>
          <h3 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            End-to-End <span className="text-slate-400">Innovation</span>
          </h3>
          <p className="text-slate-600 text-xl font-medium max-w-2xl leading-relaxed">
            We bring ideas to life in the digital realm, ensuring seamless execution from high-level concept to global launch.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(250px,auto)] gap-6 max-w-7xl mx-auto spotlight-group">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative rounded-[2rem] liquid-glass transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-1 ${service.span} ${service.border}`}
            >
              {/* Background Gradient & Icon */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-50 transition-opacity duration-500 group-hover:opacity-100`}></div>
              <service.icon className="absolute -right-8 -bottom-8 w-48 h-48 text-slate-900/5 -rotate-12 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-110" />
              
              <div className="relative h-full p-8 md:p-10 flex flex-col">
                <div className="flex justify-between items-start mb-auto">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-100 text-slate-700 group-hover:scale-110 transition-transform duration-500">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm border border-slate-200 flex items-center justify-center opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5 text-slate-900" />
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">{service.category}</div>
                  <h4 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 tracking-tight">{service.title}</h4>
                  <p className="text-slate-600 font-medium leading-relaxed max-w-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
