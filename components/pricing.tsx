"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check, Sparkles, Zap, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Free",
    description: "Perfect for trying out GlowUp Scanner",
    price: "$0",
    period: "forever",
    icon: Zap,
    features: [
      "3 skin scans per month",
      "Basic acne analysis",
      "General skincare tips",
      "Community access",
      "Mobile app access",
    ],
    cta: "Get Started",
    popular: false,
    gradient: "from-gray-500 to-gray-600"
  },
  {
    name: "Pro",
    description: "For teens serious about their skin health",
    price: "$9.99",
    period: "per month",
    icon: Sparkles,
    features: [
      "Unlimited skin scans",
      "Advanced AI analysis",
      "Personalized routines",
      "Progress tracking dashboard",
      "Diet & sleep recommendations",
      "AI skincare chatbot",
      "PDF report downloads",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
    gradient: "from-purple-500 to-cyan-500"
  },
  {
    name: "Family",
    description: "For families with multiple teens",
    price: "$19.99",
    period: "per month",
    icon: Crown,
    features: [
      "Everything in Pro",
      "Up to 5 family members",
      "Shared family dashboard",
      "Parental insights",
      "Family skincare tips",
      "Dedicated support line",
      "Early access to features",
    ],
    cta: "Contact Sales",
    popular: false,
    gradient: "from-pink-500 to-purple-500"
  },
]

const PricingCard = ({ plan, index }: { plan: typeof plans[0]; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative group ${plan.popular ? "lg:-mt-4 lg:mb-4" : ""}`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-medium">
            Most Popular
          </div>
        </div>
      )}

      <div className={`h-full glass rounded-3xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 ${
        plan.popular ? "border-purple-500/50 glow-purple" : "hover:bg-white/10"
      }`}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
            <plan.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
            <p className="text-sm text-muted-foreground">{plan.description}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl md:text-5xl font-bold text-foreground">{plan.price}</span>
            <span className="text-muted-foreground">/{plan.period}</span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center flex-shrink-0`}>
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          className={`w-full py-6 rounded-2xl text-lg ${
            plan.popular
              ? "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
              : "bg-secondary hover:bg-secondary/80 text-foreground"
          }`}
        >
          {plan.cta}
        </Button>
      </div>
    </motion.div>
  )
}

export function Pricing() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-muted-foreground">Simple Pricing</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Choose Your</span>
            <br />
            <span className="text-gradient">Skin Journey</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed text-balance">
            Start for free and upgrade when you are ready. All plans include our core AI 
            skin analysis technology.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground">
            <span className="text-foreground font-medium">30-day money-back guarantee.</span>
            {" "}No questions asked. Try risk-free today.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
