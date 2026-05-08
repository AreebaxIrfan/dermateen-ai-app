"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Star, Quote, Heart } from "lucide-react"

const testimonials = [
  {
    name: "Emma S.",
    age: 16,
    avatar: "ES",
    rating: 5,
    text: "GlowUp Scanner completely changed my skincare routine! I went from severe acne to clear skin in just 3 months. The personalized recommendations were spot on.",
    improvement: "90% improvement",
    gradient: "from-purple-500 to-cyan-500"
  },
  {
    name: "Marcus T.",
    age: 17,
    avatar: "MT",
    rating: 5,
    text: "I was skeptical at first, but the AI analysis was incredibly accurate. It identified my acne type and gave me a routine that actually works. So grateful!",
    improvement: "Clear skin in 8 weeks",
    gradient: "from-cyan-500 to-purple-500"
  },
  {
    name: "Sofia L.",
    age: 15,
    avatar: "SL",
    rating: 5,
    text: "The progress tracking feature keeps me motivated. Seeing my skin score go up every week is so satisfying. Best app for teen skincare!",
    improvement: "Confidence restored",
    gradient: "from-purple-600 to-pink-500"
  },
  {
    name: "James K.",
    age: 18,
    avatar: "JK",
    rating: 5,
    text: "Finally an app that understands teen skin! The diet and sleep recommendations made a huge difference. My skin has never looked better.",
    improvement: "75% fewer breakouts",
    gradient: "from-pink-500 to-purple-500"
  },
  {
    name: "Olivia R.",
    age: 16,
    avatar: "OR",
    rating: 5,
    text: "I love how the AI chatbot answers all my skincare questions 24/7. It is like having a dermatologist in my pocket. Highly recommend to all teens!",
    improvement: "Daily skin confidence",
    gradient: "from-cyan-600 to-purple-600"
  },
  {
    name: "Noah B.",
    age: 17,
    avatar: "NB",
    rating: 5,
    text: "The before and after photos in my dashboard blow my mind every time. GlowUp Scanner is the real deal. Worth every penny of the Pro plan!",
    improvement: "Complete transformation",
    gradient: "from-purple-500 to-cyan-500"
  },
]

const communityStats = [
  { value: "50K+", label: "Active Users" },
  { value: "1M+", label: "Skin Analyses" },
  { value: "4.9", label: "App Rating" },
  { value: "92%", label: "See Results" },
]

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="glass rounded-3xl p-6 h-full hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
        {/* Quote icon */}
        <Quote className="absolute top-4 right-4 w-8 h-8 text-purple-500/20" />
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-semibold`}>
            {testimonial.avatar}
          </div>
          <div>
            <div className="font-semibold text-foreground">{testimonial.name}</div>
            <div className="text-sm text-muted-foreground">Age {testimonial.age}</div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Text */}
        <p className="text-muted-foreground leading-relaxed mb-4">
          {testimonial.text}
        </p>

        {/* Improvement Badge */}
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${testimonial.gradient} bg-opacity-10`}>
          <Heart className="w-4 h-4 text-white" />
          <span className="text-sm font-medium text-white">{testimonial.improvement}</span>
        </div>
      </div>
    </motion.div>
  )
}

export function Testimonials() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  return (
    <section id="community" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl" />
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
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-muted-foreground">Community Stories</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Loved by Teens</span>
            <br />
            <span className="text-gradient">Worldwide</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed text-balance">
            Join thousands of teenagers who have transformed their skin and boosted their 
            confidence with GlowUp Scanner.
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16"
        >
          {communityStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Motivational Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 glass-strong rounded-3xl p-8 md:p-12 text-center glow-cyan"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="text-gradient">Your Clear Skin Journey Starts Today</span>
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
            Every transformation starts with a single step. Join our community of confident teens 
            who have taken control of their skin health with AI-powered insights.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>No credit card required</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>3 free scans/month</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>Cancel anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
