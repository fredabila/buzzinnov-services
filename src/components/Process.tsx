'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Discovery & Audit",
    description: "We dive deep into your requirements, market space, and technical constraints to map out the ideal, scalable solution."
  },
  {
    number: "02",
    title: "Blueprint & Design",
    description: "Whether it's a strategic wireframe or a high-fidelity prototype, we build the precise, detailed blueprint of the final product."
  },
  {
    number: "03",
    title: "Agile Engineering",
    description: "Our team builds in rapid, iterative sprints, ensuring transparency, high velocity, and quality at every milestone."
  },
  {
    number: "04",
    title: "Quality Assurance",
    description: "Rigorous, uncompromising testing across all devices and browsers to ensure absolute reliability and performance."
  },
  {
    number: "05",
    title: "Deployment & Scale",
    description: "We handle the final rollout and provide the infrastructure for your product to scale globally."
  }
];

export default function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="process" className="py-32 bg-slate-50 relative z-10 overflow-hidden">
      {/* Decorative large text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black text-slate-900/[0.02] whitespace-nowrap pointer-events-none tracking-tighter">
        WORKFLOW
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="mb-24 text-center">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">The Blueprint</h2>
          <h3 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">Precision Process</h3>
        </div>
        
        <div ref={containerRef} className="relative pl-8 md:pl-0">
          {/* Animated Vertical line */}
          <div className="absolute left-[15px] md:left-1/2 md:-translate-x-[1px] top-0 bottom-0 w-[2px] bg-slate-200">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-primary origin-top"
              style={{ scaleY }}
            />
          </div>
          
          <div className="space-y-24 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Text Content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="liquid-glass p-8 md:p-10 rounded-3xl hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
                    <div className="text-primary font-bold font-mono mb-2">{step.number}</div>
                    <h4 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 tracking-tight">{step.title}</h4>
                    <p className="text-slate-500 leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Number node / Dot */}
                <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-10 h-10 bg-white border-4 border-slate-200 rounded-full flex items-center justify-center shadow-lg transition-colors duration-500">
                  <motion.div 
                    className="w-3 h-3 bg-primary rounded-full"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: "spring" }}
                  />
                </div>
                
                {/* Spacer for alternate layout */}
                <div className="hidden md:block w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
