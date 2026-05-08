'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { 
  Sparkles, 
  LogOut, 
  Camera, 
  TrendingUp, 
  Calendar,
  Droplets,
  Moon,
  Activity,
  ChevronRight,
  Settings
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'

interface DashboardContentProps {
  user: User
}

export function DashboardContent({ user }: DashboardContentProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  // Mock data for demonstration
  const skinScore = 78
  const recentScans = [
    { date: '2024-01-15', score: 78, severity: 'mild' },
    { date: '2024-01-10', score: 72, severity: 'moderate' },
    { date: '2024-01-05', score: 68, severity: 'moderate' },
  ]

  const dailyTips = [
    { icon: Droplets, tip: 'Drink 8 glasses of water today', color: 'text-cyan-400' },
    { icon: Moon, tip: 'Aim for 8 hours of sleep tonight', color: 'text-purple-400' },
    { icon: Activity, tip: 'Apply sunscreen before going out', color: 'text-yellow-400' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold text-gradient">GlowUp Scanner</span>
            </Link>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Settings className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {isLoggingOut ? 'Signing out...' : 'Sign Out'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome back{user.email ? `, ${user.email.split('@')[0]}` : ''}!
          </h1>
          <p className="text-muted-foreground">
            Track your skin health and get personalized recommendations.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-card border-white/10">
              <CardHeader className="pb-2">
                <CardDescription>Skin Health Score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <span className="text-4xl font-bold text-gradient">{skinScore}</span>
                  <span className="text-sm text-green-400 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +6%
                  </span>
                </div>
                <Progress value={skinScore} className="mt-3 h-2" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-card border-white/10">
              <CardHeader className="pb-2">
                <CardDescription>Total Scans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <span className="text-4xl font-bold">{recentScans.length}</span>
                  <Camera className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card border-white/10">
              <CardHeader className="pb-2">
                <CardDescription>Current Streak</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <span className="text-4xl font-bold">7 <span className="text-lg font-normal text-muted-foreground">days</span></span>
                  <Calendar className="w-8 h-8 text-cyan-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-card border-white/10 bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
              <CardContent className="pt-6">
                <Link href="/#analyzer">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0">
                    <Camera className="w-4 h-4 mr-2" />
                    New Scan
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Scans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle>Recent Scans</CardTitle>
                <CardDescription>Your skin analysis history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentScans.map((scan, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        scan.severity === 'mild' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                      }`}>
                        <Camera className={`w-6 h-6 ${
                          scan.severity === 'mild' ? 'text-green-400' : 'text-yellow-400'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium">{new Date(scan.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}</p>
                        <p className="text-sm text-muted-foreground capitalize">{scan.severity} acne</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold">{scan.score}</span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Daily Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle>Daily Tips</CardTitle>
                <CardDescription>Personalized recommendations for today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dailyTips.map((tip, index) => {
                  const Icon = tip.icon
                  return (
                    <div 
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                        <Icon className={`w-6 h-6 ${tip.color}`} />
                      </div>
                      <p className="flex-1">{tip.tip}</p>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
