"use client"

import { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Upload, 
  Camera, 
  Scan, 
  CheckCircle2, 
  AlertCircle,
  Droplets,
  Moon,
  Apple,
  Activity,
  Sparkles,
  X,
  Image as ImageIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface AnalysisResult {
  severity: "mild" | "moderate" | "severe"
  confidence: number
  acneTypes: string[]
  overallScore: number
  recommendations: {
    skincare: string[]
    diet: string[]
    hydration: string
    sleep: string
  }
}

const severityConfig = {
  mild: { color: "from-green-500 to-emerald-500", label: "Mild", bgColor: "bg-green-500/10" },
  moderate: { color: "from-yellow-500 to-orange-500", label: "Moderate", bgColor: "bg-yellow-500/10" },
  severe: { color: "from-red-500 to-pink-500", label: "Severe", bgColor: "bg-red-500/10" },
}

const mockAnalysis: AnalysisResult = {
  severity: "mild",
  confidence: 94,
  acneTypes: ["Comedonal", "Papular"],
  overallScore: 78,
  recommendations: {
    skincare: [
      "Use a gentle, non-comedogenic cleanser twice daily",
      "Apply a 2% salicylic acid treatment to affected areas",
      "Use an oil-free moisturizer with niacinamide",
      "Apply SPF 30+ sunscreen every morning"
    ],
    diet: [
      "Reduce dairy intake",
      "Eat more omega-3 rich foods",
      "Include zinc-rich foods like pumpkin seeds",
      "Stay away from high-glycemic foods"
    ],
    hydration: "Drink at least 8 glasses (2 liters) of water daily",
    sleep: "Aim for 8-10 hours of quality sleep per night"
  }
}

export function SkinAnalyzer() {
  const [image, setImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        setResult(null)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        setResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async () => {
    setIsAnalyzing(true)
    setProgress(0)

    // Simulate AI analysis with progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 3000))
    
    clearInterval(interval)
    setProgress(100)
    
    setTimeout(() => {
      setIsAnalyzing(false)
      setResult(mockAnalysis)
    }, 500)
  }

  const resetAnalysis = () => {
    setImage(null)
    setResult(null)
    setProgress(0)
  }

  return (
    <section id="analyzer" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Scan className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-muted-foreground">AI Skin Analyzer</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Analyze Your Skin</span>
            <br />
            <span className="text-gradient">In Seconds</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed text-balance">
            Upload a clear photo of your face and let our AI analyze your skin condition. 
            Get instant results with personalized recommendations.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`relative glass rounded-3xl p-8 min-h-[400px] flex flex-col items-center justify-center transition-all duration-300 ${
                  isDragging ? "border-purple-500 bg-purple-500/5" : ""
                } ${image ? "border-purple-500/50" : ""}`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <AnimatePresence mode="wait">
                  {!image ? (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center"
                      >
                        <Upload className="w-10 h-10 text-purple-400" />
                      </motion.div>
                      
                      <h3 className="text-xl font-semibold mb-2">Upload Your Photo</h3>
                      <p className="text-muted-foreground mb-6">
                        Drag and drop or click to upload
                      </p>
                      
                      <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0"
                        >
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Choose File
                        </Button>
                        <Button variant="outline" className="border-border">
                          <Camera className="w-4 h-4 mr-2" />
                          Take Photo
                        </Button>
                      </div>

                      <p className="text-xs text-muted-foreground mt-6">
                        Supports JPG, PNG, WEBP up to 10MB
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="w-full"
                    >
                      <div className="relative rounded-2xl overflow-hidden">
                        <img
                          src={image}
                          alt="Uploaded preview"
                          className="w-full h-[300px] object-cover"
                        />
                        
                        {/* Analysis overlay */}
                        {isAnalyzing && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="w-16 h-16 rounded-full border-4 border-purple-500/30 border-t-purple-500 mb-4"
                            />
                            <p className="text-foreground font-medium mb-2">Analyzing your skin...</p>
                            <div className="w-48">
                              <Progress value={progress} className="h-2" />
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}%</p>
                          </motion.div>
                        )}

                        {/* Remove button */}
                        {!isAnalyzing && (
                          <button
                            onClick={resetAnalysis}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {!isAnalyzing && !result && (
                        <Button
                          onClick={analyzeImage}
                          className="w-full mt-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0 py-6 text-lg rounded-2xl"
                        >
                          <Sparkles className="w-5 h-5 mr-2" />
                          Analyze with AI
                        </Button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass rounded-3xl p-8 min-h-[400px] flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 flex items-center justify-center mb-6">
                      <Activity className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Results Will Appear Here</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Upload a photo and run the AI analysis to see your personalized skin report
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="glass rounded-3xl p-6 md:p-8 space-y-6"
                  >
                    {/* Severity Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${severityConfig[result.severity].color}`}>
                          <span className="text-white font-semibold">{severityConfig[result.severity].label}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{result.confidence}% confidence</span>
                        </div>
                      </div>
                    </div>

                    {/* Overall Score */}
                    <div className="glass rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">Skin Health Score</span>
                        <span className="text-2xl font-bold text-gradient">{result.overallScore}/100</span>
                      </div>
                      <Progress value={result.overallScore} className="h-3" />
                    </div>

                    {/* Acne Types */}
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-2">Detected Acne Types</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.acneTypes.map((type) => (
                          <span key={type} className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quick Tips */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="glass rounded-xl p-4">
                        <Droplets className="w-5 h-5 text-cyan-400 mb-2" />
                        <p className="text-xs text-muted-foreground mb-1">Hydration</p>
                        <p className="text-sm font-medium">8+ glasses/day</p>
                      </div>
                      <div className="glass rounded-xl p-4">
                        <Moon className="w-5 h-5 text-purple-400 mb-2" />
                        <p className="text-xs text-muted-foreground mb-1">Sleep</p>
                        <p className="text-sm font-medium">8-10 hours</p>
                      </div>
                    </div>

                    {/* View Full Report Button */}
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0 rounded-xl">
                      View Full Report
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
