import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { SkinAnalyzer } from "@/components/skin-analyzer"
import { DashboardPreview } from "@/components/dashboard-preview"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { AIChatbot } from "@/components/ai-chatbot"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <SkinAnalyzer />
      <DashboardPreview />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
      <AIChatbot />
    </main>
  )
}
