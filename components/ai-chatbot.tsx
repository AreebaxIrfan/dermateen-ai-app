"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  User,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const suggestedQuestions = [
  "What causes acne in teenagers?",
  "Best skincare routine for oily skin?",
  "How does diet affect acne?",
  "When should I see a dermatologist?",
]

const mockResponses: Record<string, string> = {
  "What causes acne in teenagers?": "Teenage acne is primarily caused by hormonal changes during puberty, which increase oil (sebum) production. Other factors include bacteria buildup, clogged pores from dead skin cells, genetics, stress, and certain dietary choices. The good news is that with the right skincare routine and lifestyle changes, most teen acne can be effectively managed!",
  "Best skincare routine for oily skin?": "For oily skin, I recommend: 1) Gentle foaming cleanser twice daily, 2) Alcohol-free toner with salicylic acid, 3) Oil-free moisturizer with niacinamide, 4) SPF 30+ sunscreen (gel-based). Avoid over-washing as it can trigger more oil production. Use clay masks 1-2 times weekly for deep cleansing!",
  "How does diet affect acne?": "Diet can significantly impact acne! High-glycemic foods (sugary snacks, white bread) can spike insulin and trigger breakouts. Dairy products may also worsen acne in some people. Instead, focus on: fruits, vegetables, whole grains, omega-3 rich foods (fish, walnuts), and plenty of water. Everyone is different, so track what foods affect your skin!",
  "When should I see a dermatologist?": "Consider seeing a dermatologist if: 1) Your acne is severe or painful (cystic acne), 2) Over-the-counter treatments have not worked after 2-3 months, 3) Acne is leaving scars, 4) Your acne is affecting your self-esteem, 5) You are experiencing sudden, unusual breakouts. A dermatologist can prescribe stronger treatments and create a personalized plan!",
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi there! I am your AI skincare assistant. Ask me anything about acne, skincare routines, or teen skin health. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const response = mockResponses[text] || 
      "Great question! Based on my training, I would recommend consulting with a dermatologist for personalized advice. In the meantime, maintain a consistent skincare routine with gentle, non-comedogenic products. Would you like me to suggest a basic routine for your skin type?"

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsTyping(false)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center shadow-lg hover:shadow-purple-500/25 transition-shadow ${
          isOpen ? "hidden" : ""
        }`}
        aria-label="Open AI Chat"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full animate-ping bg-purple-500 opacity-20" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] glass-strong rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-cyan-600 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AI Skincare Assistant</h3>
                    <p className="text-xs text-white/70">Always here to help</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[350px] overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex items-start gap-2 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                      message.role === "user" 
                        ? "bg-purple-500/20" 
                        : "bg-gradient-to-br from-purple-500 to-cyan-500"
                    }`}>
                      {message.role === "user" 
                        ? <User className="w-4 h-4 text-purple-400" />
                        : <Sparkles className="w-4 h-4 text-white" />
                      }
                    </div>
                    <div className={`rounded-2xl p-3 ${
                      message.role === "user"
                        ? "bg-purple-500/20 rounded-tr-sm"
                        : "glass rounded-tl-sm"
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="glass rounded-2xl rounded-tl-sm p-3">
                    <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-xs px-3 py-1.5 rounded-full glass hover:bg-white/10 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(input) }}
              className="p-4 border-t border-border"
            >
              <div className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about skincare..."
                  className="flex-1 bg-background/50 border-border rounded-xl"
                />
                <Button 
                  type="submit" 
                  size="icon"
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0 rounded-xl w-10 h-10"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
