'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function QuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceType: '',
    budget: '',
    description: ''
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 30 : -30,
      opacity: 0,
      scale: 0.95
    })
  };

  if (submitted) {
    return (
      <section id="quote" className="py-32 relative overflow-hidden flex items-center justify-center min-h-[70vh]">
        <div className="aurora-bg opacity-50"></div>
        <div className="container mx-auto px-4 max-w-2xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel-heavy p-12 md:p-16 rounded-[2.5rem] text-center"
          >
            <motion.div 
              initial={{ scale: 0, rotate: -180 }} 
              animate={{ scale: 1, rotate: 0 }} 
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-28 h-28 bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/30"
            >
              <CheckCircle2 className="w-14 h-14" />
            </motion.div>
            <h3 className="text-4xl font-extrabold mb-4 text-slate-900 tracking-tight">Request Received</h3>
            <p className="text-slate-600 mb-10 text-lg leading-relaxed max-w-md mx-auto font-medium">
              Thank you, {formData.name.split(' ')[0]}. Our engineering team has received your inquiry and will be in touch within 24 hours to map out the next steps.
            </p>
            <Button onClick={() => { setSubmitted(false); setStep(1); }} variant="outline" className="rounded-full px-8 py-6 text-base bg-white/50 backdrop-blur-sm border-slate-200 hover:bg-white/80 transition-all shadow-sm">
              Start New Request
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Get in Touch</h2>
          <h3 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Conversation</span></h3>
        </div>

        <div className="glass-panel-heavy rounded-[2.5rem] overflow-hidden relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border-white/60">
          {/* Animated Glowing Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100/50 backdrop-blur-sm">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 relative" 
              initial={{ width: '25%' }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/50 blur-[2px]"></div>
            </motion.div>
          </div>

          <div className="p-8 md:p-14 pt-16 md:pt-20">
            <form onSubmit={handleSubmit}>
              <div className="relative min-h-[350px]">
                <AnimatePresence mode="wait" custom={1}>
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      custom={1}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-6 absolute inset-0"
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">1</div>
                        <div className="text-lg font-bold text-slate-900 tracking-tight">Your Details</div>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-slate-600">Full Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="bg-white/70 border-slate-200 h-14 rounded-xl shadow-sm focus-visible:ring-primary/20 text-lg transition-all" placeholder="Jane Doe" />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-slate-600">Email Address</Label>
                        <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required className="bg-white/70 border-slate-200 h-14 rounded-xl shadow-sm focus-visible:ring-primary/20 text-lg transition-all" placeholder="jane@company.com" />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="company" className="text-slate-600">Company <span className="text-slate-400 font-normal">(Optional)</span></Label>
                        <Input id="company" name="company" value={formData.company} onChange={handleChange} className="bg-white/70 border-slate-200 h-14 rounded-xl shadow-sm focus-visible:ring-primary/20 text-lg transition-all" placeholder="Acme Corp" />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      custom={1}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-6 absolute inset-0"
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">2</div>
                        <div className="text-lg font-bold text-slate-900 tracking-tight">Service Required</div>
                      </div>
                      <div className="space-y-4">
                        <Label className="text-slate-600">What can we help you with?</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                          {['Web Development', 'UI/UX Design', 'Product Design', 'Consultancy'].map((type) => (
                            <label key={type} className={`
                              relative flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden
                              ${formData.serviceType === type ? 'border-primary bg-white shadow-[0_8px_30px_rgb(59,130,246,0.12)] ring-1 ring-primary' : 'border-slate-200 bg-white/50 hover:bg-white hover:border-slate-300 hover:shadow-sm'}
                            `}>
                              {formData.serviceType === type && (
                                <motion.div layoutId="activeService" className="absolute inset-0 bg-primary/5 pointer-events-none" />
                              )}
                              <input 
                                type="radio" 
                                name="serviceType" 
                                value={type}
                                checked={formData.serviceType === type}
                                onChange={(e) => handleSelectChange('serviceType', e.target.value)}
                                className="hidden"
                              />
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${formData.serviceType === type ? 'border-primary' : 'border-slate-300'}`}>
                                {formData.serviceType === type && <motion.div initial={{scale:0}} animate={{scale:1}} className="w-3 h-3 bg-primary rounded-full"></motion.div>}
                              </div>
                              <span className="font-semibold text-slate-800 text-lg relative z-10">{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div 
                      key="step3"
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      custom={1}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-6 absolute inset-0"
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">3</div>
                        <div className="text-lg font-bold text-slate-900 tracking-tight">Project Scale</div>
                      </div>
                      <div className="space-y-3">
                        <Label className="text-slate-600">Estimated Budget</Label>
                        <Select value={formData.budget} onValueChange={(val) => handleSelectChange('budget', val || '')}>
                          <SelectTrigger className="w-full h-16 bg-white/70 border-slate-200 rounded-xl text-lg shadow-sm focus:ring-primary/20 transition-all">
                            <SelectValue placeholder="Select a budget range" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                            <SelectItem value="500-2k" className="text-base py-3">£500 - £2,000</SelectItem>
                            <SelectItem value="2k-5k" className="text-base py-3">£2,000 - £5,000</SelectItem>
                            <SelectItem value="5k-15k" className="text-base py-3">£5,000 - £15,000</SelectItem>
                            <SelectItem value="15k+" className="text-base py-3">£15,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div 
                      key="step4"
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      custom={1}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-6 absolute inset-0"
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">4</div>
                        <div className="text-lg font-bold text-slate-900 tracking-tight">Final Details</div>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="description" className="text-slate-600">Project Brief</Label>
                        <Textarea 
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          className="w-full bg-white/70 border-slate-200 min-h-[180px] rounded-xl shadow-sm focus-visible:ring-primary/20 text-lg transition-all resize-none p-4"
                          placeholder="Tell us a bit about your goals, timeline, and any specific requirements..."
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-200/50 flex justify-between items-center relative z-20">
                <Button 
                  type="button"
                  variant="ghost"
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`rounded-full px-6 py-6 text-base font-medium transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-slate-100'}`}
                >
                  <ChevronLeft className="w-5 h-5 mr-2" /> Back
                </Button>
                
                {step < 4 ? (
                  <Button 
                    type="button"
                    onClick={nextStep}
                    disabled={step === 1 && (!formData.name || !formData.email)}
                    className="rounded-full px-8 py-6 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all group"
                  >
                    Continue <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    className="rounded-full px-10 py-6 text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all group border-0"
                  >
                    Submit Request <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
