"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts"
import { TrendingUp, TrendingDown, Droplets, Moon, Activity, Smile, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const skinProgressData = [
  { week: "Week 1", score: 45 },
  { week: "Week 2", score: 52 },
  { week: "Week 3", score: 58 },
  { week: "Week 4", score: 65 },
  { week: "Week 5", score: 71 },
  { week: "Week 6", score: 78 },
]

const weeklyData = [
  { day: "Mon", hydration: 7, sleep: 8, mood: 4 },
  { day: "Tue", hydration: 8, sleep: 7, mood: 3 },
  { day: "Wed", hydration: 6, sleep: 9, mood: 5 },
  { day: "Thu", hydration: 9, sleep: 8, mood: 4 },
  { day: "Fri", hydration: 8, sleep: 6, mood: 3 },
  { day: "Sat", hydration: 7, sleep: 9, mood: 5 },
  { day: "Sun", hydration: 8, sleep: 8, mood: 4 },
]

const statsCards = [
  { 
    icon: Activity, 
    label: "Skin Score", 
    value: "78", 
    change: "+12%", 
    positive: true,
    gradient: "from-purple-500 to-purple-600" 
  },
  { 
    icon: Droplets, 
    label: "Hydration", 
    value: "7.5", 
    unit: "glasses", 
    change: "+8%", 
    positive: true,
    gradient: "from-cyan-500 to-cyan-600" 
  },
  { 
    icon: Moon, 
    label: "Avg Sleep", 
    value: "7.8", 
    unit: "hours", 
    change: "-3%", 
    positive: false,
    gradient: "from-purple-600 to-pink-500" 
  },
  { 
    icon: Smile, 
    label: "Mood Score", 
    value: "4.0", 
    unit: "/5", 
    change: "+5%", 
    positive: true,
    gradient: "from-pink-500 to-purple-500" 
  },
]

export function DashboardPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-3xl" />
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
            <Activity className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-muted-foreground">Smart Dashboard</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Track Your Progress</span>
            <br />
            <span className="text-gradient">Like Never Before</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed text-balance">
            Monitor your skin health journey with beautiful analytics. Track hydration, sleep, 
            mood, and watch your skin improve over time.
          </p>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="glass-strong rounded-3xl p-6 md:p-8 glow-purple">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {statsCards.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${stat.positive ? "text-green-400" : "text-red-400"}`}>
                      {stat.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {stat.change}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                    {stat.unit && <span className="text-sm text-muted-foreground ml-1">{stat.unit}</span>}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Progress Chart */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass rounded-2xl p-5"
              >
                <h3 className="text-lg font-semibold mb-4">Skin Health Progress</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={skinProgressData}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="week" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#a855f7" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorScore)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Weekly Tracker */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="glass rounded-2xl p-5"
              >
                <h3 className="text-lg font-semibold mb-4">Weekly Habits</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px'
                        }}
                      />
                      <Bar dataKey="hydration" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="sleep" fill="#a855f7" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 text-center"
            >
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0 px-8 group">
                Get Full Dashboard Access
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
