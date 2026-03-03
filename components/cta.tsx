"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/landing/section-wrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { fadeIn } from "@/lib/animations";

export function CTA() {
  return (
    <SectionWrapper variant="gradient" className="py-20 md:py-24 mb-16 rounded-[3rem] mx-6 lg:mx-8 shadow-2xl shadow-indigo-200">
      <div className="flex flex-col items-center text-center space-y-8">
        <motion.div 
          variants={fadeIn("up", 0.1)}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest backdrop-blur-sm border border-white/20"
        >
          <Sparkles className="size-3.5" />
          Ready to scale?
        </motion.div>
        
        <motion.h2 
          variants={fadeIn("up", 0.2)}
          className="text-4xl font-black tracking-tight text-white sm:text-6xl max-w-3xl leading-[1.1]"
        >
          Stop guessing. Start <br />
          <span className="text-indigo-200 italic">optimizing</span> your web.
        </motion.h2>
        
        <motion.p 
          variants={fadeIn("up", 0.3)}
          className="max-w-xl text-lg font-medium text-indigo-100/80"
        >
          Join thousands of developers using SiteLens to monitor, audit, and 
          perfect their web performance. Your first audit is free.
        </motion.p>

        <motion.div 
          variants={fadeIn("up", 0.4)}
          className="flex flex-col sm:flex-row gap-4 pt-4"
        >
          <Button size="lg" className="h-14 px-10 rounded-2xl bg-white text-indigo-600 font-bold text-lg hover:bg-gray-50 hover:scale-105 transition-all shadow-xl">
            Get Started Now
            <ArrowRight className="ml-2 size-5" />
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-10 rounded-2xl border-white/30 text-white font-bold text-lg hover:bg-white/10 transition-all">
            Contact Support
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
