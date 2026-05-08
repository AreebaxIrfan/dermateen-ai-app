"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "How accurate is the AI skin analysis?",
    answer: "Our AI model has been trained on over 500,000 dermatologist-verified images and achieves 94% accuracy in detecting acne severity and type. The model is continuously updated with new data to improve accuracy."
  },
  {
    question: "Is my photo data secure and private?",
    answer: "Absolutely. All images are encrypted end-to-end and processed securely. We never store your photos without explicit consent, and you can delete your data at any time. GlowUp Scanner is HIPAA compliant."
  },
  {
    question: "Can GlowUp Scanner replace a dermatologist?",
    answer: "GlowUp Scanner is designed to supplement, not replace, professional dermatological care. While our AI provides accurate analysis and recommendations, we always recommend consulting with a dermatologist for severe conditions."
  },
  {
    question: "What age group is GlowUp Scanner designed for?",
    answer: "GlowUp Scanner is specifically designed for teenagers aged 13-19, with recommendations tailored to teen skin biology, lifestyle, and needs. Our interface and content are age-appropriate and teen-friendly."
  },
  {
    question: "How often should I scan my skin?",
    answer: "We recommend scanning once a week to track progress effectively. This frequency allows you to see meaningful changes while building a consistent skincare routine."
  },
  {
    question: "Can I use GlowUp Scanner with my current skincare products?",
    answer: "Yes! Our recommendations take into account that you may already have a skincare routine. The AI suggests improvements and additions rather than complete replacements, unless your current products are potentially harmful."
  },
  {
    question: "What if the AI analysis seems incorrect?",
    answer: "While our AI is highly accurate, it is not perfect. You can flag any analysis for review, and our dermatology advisors will manually check it. This feedback also helps improve our AI model."
  },
  {
    question: "Is there a family plan for multiple teens?",
    answer: "Yes! Our Family plan allows up to 5 family members to have their own profiles under one subscription, with a shared family dashboard for parents to monitor progress while respecting each teen&apos;s privacy."
  },
]

const FAQItem = ({ faq, index, isOpen, onToggle }: { 
  faq: typeof faqs[0]; 
  index: number; 
  isOpen: boolean; 
  onToggle: () => void 
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <button
        onClick={onToggle}
        className="w-full glass rounded-2xl p-5 text-left hover:bg-white/10 transition-all duration-300"
      >
        <div className="flex items-center justify-between gap-4">
          <span className="font-medium text-foreground">{faq.question}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </div>
        
        <motion.div
          initial={false}
          animate={{ 
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
            marginTop: isOpen ? 16 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-muted-foreground leading-relaxed">
            {faq.answer}
          </p>
        </motion.div>
      </button>
    </motion.div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl" />
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
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-muted-foreground">FAQ</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Frequently Asked</span>
            <br />
            <span className="text-gradient">Questions</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed text-balance">
            Everything you need to know about GlowUp Scanner. Can&apos;t find what you are looking for? 
            Chat with our AI assistant.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
