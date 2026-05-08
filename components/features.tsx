"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { 
  Brain, 
  Camera, 
  ChartLine, 
  Droplets, 
  Heart, 
  Moon, 
  Shield, 
  Sparkles, 
  Stethoscope,
  Zap
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning models analyze your skin with 94% accuracy, detecting acne severity and type.",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: Camera,
    title: "Instant Scanning",
    description: "Simply upload a selfie and get comprehensive skin analysis in seconds. No appointments needed.",
    gradient: "from-cyan-500 to-cyan-600",
  },
  {
    icon: ChartLine,
    title: "Progress Tracking",
    description: "Monitor your skin improvement over time with detailed charts and personalized insights.",
    gradient: "from-pink-500 to-pink-600",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    description: "Get personalized skincare routines based on your unique skin type and acne condition.",
    gradient: "from-purple-500 to-cyan-500",
  },
  {
    icon: Droplets,
    title: "Hydration Tips",
    description: "Receive customized water intake suggestions to keep your skin healthy and glowing.",
    gradient: "from-cyan-500 to-purple-500",
  },
  {
    icon: Moon,
    title: "Sleep Insights",
    description: "Understand how your sleep patterns affect your skin health with actionable tips.",
    gradient: "from-purple-600 to-pink-500",
  },
  {
    icon: Heart,
    title: "Lifestyle Guidance",
    description: "Diet recommendations and lifestyle changes tailored for clearer, healthier skin.",
    gradient: "from-pink-500 to-purple-500",
  },
  {
    icon: Stethoscope,
    title: "Expert Backed",
    description: "All recommendations are developed with input from board-certified dermatologists.",
    gradient: "from-cyan-600 to-purple-600",
  },
]

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="glass rounded-3xl p-6 h-full hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
          <feature.icon className="w-7 h-7 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-foreground mb-3">
          {feature.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {feature.description}
        </p>

        {/* Hover glow effect */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
      </div>
    </motion.div>
  )
}

export function Features() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-muted-foreground">Powerful Features</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Everything You Need for</span>
            <br />
            <span className="text-gradient">Healthier Skin</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed text-balance">
            GlowUp Scanner combines cutting-edge artificial intelligence with dermatologist expertise 
            to give you the most comprehensive skin analysis tool available.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 glass rounded-3xl p-8 md:p-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-purple-400" />
            <span className="text-lg font-semibold">Trusted & Secure</span>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your privacy is our priority. All images are encrypted, processed securely, and never stored 
            without your consent. GlowUp Scanner is HIPAA compliant and backed by healthcare professionals.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
