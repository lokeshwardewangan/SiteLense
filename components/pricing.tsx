"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/landing/section-wrapper";
import { GradientText } from "@/components/landing/gradient-text";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Zap, Rocket, Building } from "lucide-react";
import { fadeIn } from "@/lib/animations";

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      icon: <Zap className="size-5 text-amber-500" />,
      price: "$0",
      description: "Perfect for personal blogs and small projects.",
      features: ["3 Scans per day", "Mobile Audit", "SEO Basics", "Standard Speed Report"],
      cta: "Start for free",
      popular: false
    },
    {
      name: "Professional",
      icon: <Rocket className="size-5 text-indigo-600" />,
      price: "$29",
      description: "For growing teams that need deeper insights.",
      features: ["Unlimited Scans", "Advanced Security Header Audit", "Detailed SEO Roadmaps", "API Access", "Email Reports"],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Enterprise",
      icon: <Building className="size-5 text-purple-600" />,
      price: "Custom",
      description: "Full customization and dedicated support.",
      features: ["Global Network Testing", "Custom SLAs", "SSO & SAML", "Priority Support", "Dedicated Infrastructure"],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <SectionWrapper id="pricing" variant="light">
      <div className="flex flex-col items-center text-center mb-16 space-y-4">
        <motion.div variants={fadeIn("up", 0.1)}>
          <Badge variant="secondary" className="px-4 py-1 text-xs font-bold uppercase tracking-wider">
            Pricing Plans
          </Badge>
        </motion.div>
        <motion.h2 
          variants={fadeIn("up", 0.2)}
          className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl"
        >
          Choose your <GradientText>Scale</GradientText>.
        </motion.h2>
        <motion.p 
          variants={fadeIn("up", 0.3)}
          className="max-w-2xl text-lg font-medium text-gray-500"
        >
          From solo developers to large enterprises, we have the right tools to keep your sites running at peak performance.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            variants={fadeIn("up", 0.1 * index + 0.4)}
            className="h-full"
          >
            <Card className={`relative flex flex-col h-full border-2 ${plan.popular ? "border-indigo-600 shadow-2xl shadow-indigo-100/50 md:scale-105 z-10" : "border-gray-100"} rounded-[2rem] overflow-hidden transition-transform hover:translate-y-[-4px]`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 p-4">
                  <Badge className="bg-indigo-600 text-white font-bold uppercase tracking-widest text-[10px] px-3">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="p-8 pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">{plan.icon}</div>
                  <CardTitle className="text-xl font-black">{plan.name}</CardTitle>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-gray-500 font-medium">/month</span>}
                </div>
                <CardDescription className="pt-2 font-medium">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-4 flex-1">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 flex size-4 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                        <Check className="size-3" />
                      </div>
                      <span className="text-sm font-semibold text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-8 pt-0 mt-auto bg-transparent border-t-0">
                <Button className={`w-full h-12 rounded-xl font-bold text-sm ${plan.popular ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200" : "bg-gray-900 hover:bg-gray-800 text-white"}`}>
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

// History update: 2026-03-12T23:00:30
