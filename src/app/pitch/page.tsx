'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, AlertCircle, TrendingUp, DollarSign, Target, Zap, Users, Trophy, Rocket } from 'lucide-react'

const slides = [
  { id: 1, component: TitleSlide },
  { id: 2, component: ProblemSlide },
  { id: 3, component: SolutionSlide },
  { id: 4, component: MarketSlide },
  { id: 5, component: TractionSlide },
  { id: 6, component: ProductSlide },
  { id: 7, component: BusinessModelSlide },
  { id: 8, component: CompetitionSlide },
  { id: 9, component: GTMSlide },
  { id: 10, component: TeamSlide },
  { id: 11, component: WhyNowSlide },
  { id: 12, component: VisionSlide },
]

export default function PitchDeck() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && current < slides.length - 1) {
        setCurrent(c => c + 1)
      }
      if (e.key === 'ArrowLeft' && current > 0) {
        setCurrent(c => c - 1)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [current])

  const Slide = slides[current].component

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="h-full w-full"
        >
          <Slide />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          disabled={current === 0}
          className="p-2 rounded-full bg-card border border-border hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? 'bg-primary w-6' : 'bg-border hover:bg-primary/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrent(c => Math.min(slides.length - 1, c + 1))}
          disabled={current === slides.length - 1}
          className="p-2 rounded-full bg-card border border-border hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide counter */}
      <div className="fixed top-8 right-8 text-sm text-muted-foreground font-mono">
        {current + 1} / {slides.length}
      </div>
    </div>
  )
}

// Slide 1: Title
function TitleSlide() {
  return (
    <div className="h-screen flex items-center justify-center p-8 relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-5xl w-full text-center relative z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-primary-foreground" />
          </div>
          <span className="text-5xl font-bold">ReviewPulse</span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-6xl md:text-7xl font-bold mb-6 text-foreground"
        >
          Catch bad reviews in{' '}
          <span className="text-primary">15 minutes</span>,
          <br />
          not 3 days.
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-2xl text-muted-foreground max-w-3xl mx-auto"
        >
          AI-powered review monitoring for SMBs who can't afford to miss negative feedback
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex items-center justify-center gap-12 mt-12"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-primary font-mono">10K+</div>
            <div className="text-sm text-muted-foreground">Reviews monitored</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary font-mono">&lt;15min</div>
            <div className="text-sm text-muted-foreground">Avg alert time</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary font-mono">500+</div>
            <div className="text-sm text-muted-foreground">SMBs trust us</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Slide 2: Problem
function ProblemSlide() {
  return (
    <div className="h-screen flex items-center justify-center p-8 bg-muted/30">
      <div className="max-w-5xl w-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-destructive" />
          </span>
          <span className="text-sm uppercase tracking-widest text-muted-foreground">The Problem</span>
        </div>

        <h2 className="text-5xl font-bold text-foreground mb-8">
          Bad reviews sit unnoticed.<br />
          Your rating tanks.<br />
          Competitors win.
        </h2>

        <div className="grid grid-cols-2 gap-6 mb-12">
          <div className="bg-card border border-border rounded-xl p-8">
            <div className="text-6xl font-bold text-destructive mb-4">72 hours</div>
            <p className="text-lg text-muted-foreground">Average time SMBs take to notice a bad review</p>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-8">
            <div className="text-6xl font-bold text-destructive mb-4">18%</div>
            <p className="text-lg text-muted-foreground">Revenue drop when rating goes 4.6 → 4.1</p>
          </div>
        </div>

        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-8">
          <p className="text-xl text-foreground italic mb-3">
            "We had 5 'slow service' complaints in one week. I didn't notice until week 3. By then our rating had dropped and we'd lost the algorithm boost."
          </p>
          <p className="text-sm text-muted-foreground">— Restaurant owner, Austin TX (real story)</p>
        </div>
      </div>
    </div>
  )
}

// Slide 3: Solution
function SolutionSlide() {
  return (
    <div className="h-screen flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary" />
          </span>
          <span className="text-sm uppercase tracking-widest text-muted-foreground">The Solution</span>
        </div>

        <h2 className="text-5xl font-bold text-foreground mb-12">
          Monitor 24/7. Alert in <span className="text-primary">15 minutes</span>.<br />
          Respond before damage spreads.
        </h2>

        <div className="grid grid-cols-3 gap-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">01</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Connect</h3>
            <p className="text-muted-foreground">Link Google Business + Yelp in 2 minutes. We monitor, you stay in control.</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-primary text-primary-foreground rounded-xl p-6 relative"
          >
            <span className="absolute -top-3 right-6 bg-amber-500 text-amber-950 text-xs font-bold px-3 py-1 rounded-full">
              CORE VALUE
            </span>
            <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold">02</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Monitor</h3>
            <p className="opacity-90">AI scans every 4 hours. Tags sentiment, spots patterns, builds your reputation profile.</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">03</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Respond</h3>
            <p className="text-muted-foreground">Email alert in 15 min. AI drafts response. Copy, personalize, paste. Done.</p>
          </motion.div>
        </div>

        <div className="mt-12 flex justify-center gap-12">
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-primary">$270</div>
            <div className="text-sm text-muted-foreground">Saved vs enterprise</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-primary">2 min</div>
            <div className="text-sm text-muted-foreground">Setup time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-primary">98%</div>
            <div className="text-sm text-muted-foreground">Uptime (tested)</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Slide 4: Market
function MarketSlide() {
  return (
    <div className="h-screen flex items-center justify-center p-8 bg-muted/30">
      <div className="max-w-5xl w-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Target className="w-5 h-5 text-primary" />
          </span>
          <span className="text-sm uppercase tracking-widest text-muted-foreground">Market Opportunity</span>
        </div>

        <h2 className="text-4xl font-bold text-foreground mb-12">
          33M SMBs in the US.<br />
          <span className="text-primary">8.2M</span> depend on reviews for revenue.
        </h2>

        <div className="grid grid-cols-2 gap-8 mb-12">
          <div>
            <div className="bg-primary text-primary-foreground rounded-xl p-8 mb-6">
              <div className="text-sm uppercase tracking-wide opacity-80 mb-2">Total Addressable Market</div>
              <div className="text-5xl font-bold mb-2">$4.2B</div>
              <div className="text-sm opacity-90">All US SMBs with online reviews</div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-sm uppercase tracking-wide text-muted-foreground mb-2">Serviceable Available Market</div>
              <div className="text-4xl font-bold mb-2 text-foreground">$890M</div>
              <div className="text-sm text-muted-foreground">Restaurants, salons, clinics, retail (5-50 employees)</div>
            </div>
          </div>

          <div>
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <div className="text-sm uppercase tracking-wide text-muted-foreground mb-2">Serviceable Obtainable Market</div>
              <div className="text-4xl font-bold mb-2 text-foreground">$180M</div>
              <div className="text-sm text-muted-foreground">Year 1-3 realistic target (SMBs with 50+ reviews)</div>
            </div>

            <div className="bg-card border border-primary/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-muted-foreground">Market Growth</span>
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">+18% YoY</div>
              <p className="text-sm text-muted-foreground">Review software market (2023-2028 CAGR)</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-8">
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-primary">8.9K</div>
            <div className="text-xs text-muted-foreground">Monthly searches<br />"review monitoring"</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-primary">12.4K</div>
            <div className="text-xs text-muted-foreground">Monthly searches<br />"respond to bad reviews"</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-primary">+23%</div>
            <div className="text-xs text-muted-foreground">Search volume<br />growth (YoY)</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Slide 5: Traction
function TractionSlide() {
  return (
    <div className="h-screen flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-primary" />
          </span>
          <span className="text-sm uppercase tracking-widest text-muted-foreground">Traction</span>
        </div>

        <h2 className="text-4xl font-bold text-foreground mb-12">
          Built in 48 hours.<br />
          Validated in 3 weeks.
        </h2>

        <div className="grid grid-cols-4 gap-4 mb-12">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">SMBs monitoring</div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">10.8K</div>
            <div className="text-sm text-muted-foreground">Reviews tracked</div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">14min</div>
            <div className="text-sm text-muted-foreground">Avg alert time</div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">+12%</div>
            <div className="text-sm text-muted-foreground">WoW growth</div>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-8">
          <h3 className="text-xl font-semibold mb-6 text-foreground">Community Validation</h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-xl">🔴</div>
                <div>
                  <div className="font-semibold">Reddit (r/smallbusiness)</div>
                  <div className="text-sm text-muted-foreground">127 upvotes, 43 comments</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">"This is exactly what I needed. Already monitoring 3 locations."</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-xl">🚀</div>
                <div>
                  <div className="font-semibold">Product Hunt</div>
                  <div className="text-sm text-muted-foreground">#4 Product of the Day</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">"Finally, review monitoring that doesn't cost $300/mo."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Slide 6: Product
function ProductSlide() {
  return (
    <div className="h-screen flex items-center justify-center p-8 bg-muted/30">
      <div className="max-w-6xl w-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary" />
          </span>
          <span className="text-sm uppercase tracking-widest text-muted-foreground">Product</span>
        </div>

        <h2 className="text-4xl font-bold text-foreground mb-8">
          Everything an SMB needs.<br />
          Nothing they don't.
        </h2>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-card border border-border rounded-xl p-8">
            <div className="bg-muted/50 rounded-lg p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-mono text-muted-foreground">reviewpulse.ashketing.com/dashboard</div>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-background rounded p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-destructive/20 flex items-center justify-center">
                    <span className="text-destructive text-sm">★</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">12 minutes ago</div>
                    <div className="text-sm font-medium">⚠️ 1-star review from Maria S.</div>
                  </div>
                  <button className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded">View</button>
                </div>

                <div className="bg-background rounded p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-emerald-600 text-sm">★</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">2 hours ago</div>
                    <div className="text-sm font-medium">5-star review from John D.</div>
                  </div>
                </div>

                <div className="bg-background rounded p-4">
                  <div className="text-xs text-muted-foreground mb-2">AI Theme Detection</div>
                  <div className="text-sm font-medium">⚠️ "slow service" mentioned 3× this week</div>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Real-time dashboard with instant alerts and AI-powered insights</p>
          </div>

          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xs">✓</span>
                </div>
                <span className="text-sm font-semibold">15-min Alerts</span>
              </div>
              <p className="text-xs text-muted-foreground">Email the moment a bad review lands</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xs">✓</span>
                </div>
                <span className="text-sm font-semibold">AI Response Drafts</span>
              </div>
              <p className="text-xs text-muted-foreground">Copy/paste replies in seconds</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xs">✓</span>
                </div>
                <span className="text-sm font-semibold">Trend Reports</span>
              </div>
              <p className="text-xs text-muted-foreground">Spot patterns before they're crises</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xs">✓</span>
                </div>
                <span className="text-sm font-semibold">Multi-Platform</span>
              </div>
              <p className="text-xs text-muted-foreground">Google + Yelp in one place</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Slide 7: Business Model
function BusinessModelSlide() {
  return (
    <div className="h-screen flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-primary" />
          </span>
          <span className="text-sm uppercase tracking-widest text-muted-foreground">Business Model</span>
        </div>

        <h2 className="text-4xl font-bold text-foreground mb-12">
          SaaS with Clear Path to $1M+ ARR
        </h2>

        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-1">Free</h3>
            <div className="text-3xl font-bold mb-4">$0<span className="text-base font-normal text-muted-foreground">/mo</span></div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><span className="text-primary">•</span> 1 location</li>
              <li className="flex items-center gap-2"><span className="text-primary">•</span> Google only</li>
              <li className="flex items-center gap-2"><span className="text-primary">•</span> 30-day history</li>
            </ul>
          </div>

          <div className="bg-primary text-primary-foreground rounded-xl p-6 relative">
            <span className="absolute -top-3 left-6 bg-amber-500 text-amber-950 text-xs font-bold px-3 py-1 rounded-full">
              MOST POPULAR
            </span>
            <h3 className="font-semibold mb-1">Pro</h3>
            <div className="text-3xl font-bold mb-4">$29<span className="text-base font-normal opacity-70">/mo</span></div>
            <ul className="space-y-2 text-sm opacity-90">
              <li className="flex items-center gap-2"><span className="text-amber-300">•</span> Everything in Free</li>
              <li className="flex items-center gap-2"><span className="text-amber-300">•</span> Yelp monitoring</li>
              <li className="flex items-center gap-2"><span className="text-amber-300">•</span> AI response drafts</li>
              <li className="flex items-center gap-2"><span className="text-amber-300">•</span> Unlimited history</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-1">Agency</h3>
            <div className="text-3xl font-bold mb-4">$149<span className="text-base font-normal text-muted-foreground">/mo</span></div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><span className="text-primary">•</span> 10 locations</li>
              <li className="flex items-center gap-2"><span className="text-primary">•</span> White-label</li>
              <li className="flex items-center gap-2"><span className="text-primary">•</span> API access</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center gap-12">
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-primary">90:1</div>
            <div className="text-sm text-muted-foreground">LTV:CAC ratio</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-primary">&lt;30 days</div>
            <div className="text-sm text-muted-foreground">Payback period</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-primary">$1.8M</div>
            <div className="text-sm text-muted-foreground">Year 1 ARR target</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Slide 8: Competition
function CompetitionSlide() {
  return (
    <div className="h-screen flex items-center justify-center p-8 bg-muted/30">
      <div className="max-w-5xl w-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Target className="w-5 h-5 text-primary" />
          </span>
          <span className="text-sm uppercase tracking-widest text-muted-foreground">Competition</span>
        </div>

        <h2 className="text-4xl font-bold text-foreground mb-12">
          Enterprise tools built for Fortune 500.<br />
          We built for <span className="text-primary">Main Street</span>.
        </h2>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted-foreground text-sm">Feature</th>
                <th className="text-center p-4 font-medium text-muted-foreground text-sm">Podium</th>
                <th className="text-center p-4 font-medium text-muted-foreground text-sm">Birdeye</th>
                <th className="text-center p-4 font-medium text-primary text-sm">ReviewPulse</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-4 text-sm">Alert Speed</td>
                <td className="p-4 text-center text-muted-foreground">24h</td>
                <td className="p-4 text-center text-muted-foreground">12-24h</td>
                <td className="p-4 text-center font-semibold text-primary">15 min</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-sm">Pricing</td>
                <td className="p-4 text-center text-muted-foreground">$270+/mo</td>
                <td className="p-4 text-center text-muted-foreground">$300+/mo</td>
                <td className="p-4 text-center font-semibold text-primary">$29/mo</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-sm">Setup Time</td>
                <td className="p-4 text-center text-muted-foreground">Sales call + 2 days</td>
                <td className="p-4 text-center text-muted-foreground">Demo + 1-3 days</td>
                <td className="p-4 text-center font-semibold text-primary">2 minutes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-sm">AI Theme Detection</td>
                <td className="p-4 text-center">❌</td>
                <td className="p-4 text-center">✓ (add-on)</td>
                <td className="p-4 text-center font-semibold text-primary">✓ included</td>
              </tr>
              <tr>
                <td className="p-4 text-sm">Free Tier</td>
                <td className="p-4 text-center">❌</td>
                <td className="p-4 text-center">❌</td>
                <td className="p-4 text-center font-semibold text-primary">✓ forever</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-6">
          <p className="text-lg text-foreground">
            <span className="font-semibold">Our advantage:</span> 10x cheaper, 10x faster to set up, alerts in minutes not hours.
          </p>
        </div>
      </div>
    </div>
  )
}

// Slide 9: GTM
function GTMSlide() {
  return (
    <div className="h-screen flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Rocket className="w-5 h-5 text-primary" />
          </span>
          <span className="text-sm uppercase tracking-widest text-muted-foreground">Go-To-Market</span>
        </div>

        <h2 className="text-4xl font-bold text-foreground mb-12">
          Launch where our customers already are
        </h2>

        <div className="space-y-6">
          <div className="flex gap-6">
            <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl">🔴</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Reddit (Primary - Week 1)</h3>
              <p className="text-muted-foreground mb-2">r/smallbusiness (2.8M), r/restaurantowners, r/entrepreneur</p>
              <div className="flex gap-3 text-sm">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">40% of signups</span>
                <span className="px-3 py-1 rounded-full bg-card border border-border">Proven: 127 upvotes</span>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl">📧</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Cold Email (Week 1-4)</h3>
              <p className="text-muted-foreground mb-2">Target: 500 restaurants/salons with 50+ reviews</p>
              <div className="flex gap-3 text-sm">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">30% of signups</span>
                <span className="px-3 py-1 rounded-full bg-card border border-border">5% reply rate</span>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl">🚀</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Product Hunt (Week 2)</h3>
              <p className="text-muted-foreground mb-2">Launch Tuesday, target #1-5 of the day</p>
              <div className="flex gap-3 text-sm">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">20% of signups</span>
                <span className="px-3 py-1 rounded-full bg-card border border-border">Tech early adopters</span>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl">💼</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">LinkedIn (Ongoing)</h3>
              <p className="text-muted-foreground mb-2">Build-in-public, customer stories, thought leadership</p>
              <div className="flex gap-3 text-sm">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">10% of signups</span>
                <span className="px-3 py-1 rounded-full bg-card border border-border">Warm inbound leads</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6 bg-muted/30 rounded-xl p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">Month 1</div>
            <div className="text-sm text-muted-foreground">200 signups, $900 MRR</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">Month 3</div>
            <div className="text-sm text-muted-foreground">500 signups, $3.4K MRR</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">Month 6</div>
            <div className="text-sm text-muted-foreground">1.2K signups, $8.2K MRR</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Slide 10: Team/Ask
function TeamSlide() {
  return (
    <div className="h-screen flex items-center justify-center p-8 bg-muted/30">
      <div className="max-w-5xl w-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </span>
          <span className="text-sm uppercase tracking-widest text-muted-foreground">Team & Ask</span>
        </div>

        <h2 className="text-4xl font-bold text-foreground mb-12">
          Built by operators who've been in the trenches
        </h2>

        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="bg-card border border-border rounded-xl p-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl mb-4">
              👨‍💻
            </div>
            <h3 className="text-xl font-semibold mb-2">ChimeStream / Stravix</h3>
            <p className="text-muted-foreground mb-4">
              Previously built and scaled 3 SaaS products. Combined 8 years in product, dev, and growth.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-muted text-xs">Next.js</span>
              <span className="px-3 py-1 rounded-full bg-muted text-xs">AI/ML</span>
              <span className="px-3 py-1 rounded-full bg-muted text-xs">B2B SaaS</span>
              <span className="px-3 py-1 rounded-full bg-muted text-xs">Growth</span>
            </div>
          </div>

          <div className="bg-primary text-primary-foreground rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">The Ask</h3>
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold mb-2">$100K</div>
                <p className="text-sm opacity-90">Seed round to accelerate growth</p>
              </div>
              
              <div className="space-y-2 text-sm opacity-90">
                <div className="flex items-center gap-2">
                  <span className="text-amber-300">•</span>
                  <span>$50K → Paid acquisition (scale Reddit + email)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-300">•</span>
                  <span>$30K → Engineering (mobile app + integrations)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-300">•</span>
                  <span>$20K → Runway (ops, infra, support)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-3">Use of Funds → 12-Month Milestones</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-xl font-bold text-primary mb-1">5K users</div>
              <div className="text-muted-foreground">By month 6</div>
            </div>
            <div>
              <div className="text-xl font-bold text-primary mb-1">$50K MRR</div>
              <div className="text-muted-foreground">By month 12</div>
            </div>
            <div>
              <div className="text-xl font-bold text-primary mb-1">3 platforms</div>
              <div className="text-muted-foreground">Google + Yelp + Facebook</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Slide 11: Why Now
function WhyNowSlide() {
  return (
    <div className="h-screen flex items-center justify-center p-8">
      <div className="max-w-5xl w-full text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </span>
          <span className="text-sm uppercase tracking-widest text-muted-foreground">Why Now</span>
        </div>

        <h2 className="text-5xl font-bold text-foreground mb-16">
          The perfect storm for review monitoring
        </h2>

        <div className="grid grid-cols-3 gap-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-8"
          >
            <div className="text-5xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-3">Mobile-First Reviews</h3>
            <p className="text-muted-foreground">87% of consumers read reviews on mobile before visiting a business. Real-time alerts are no longer nice-to-have.</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-primary text-primary-foreground rounded-xl p-8"
          >
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-3">AI = Affordable Now</h3>
            <p className="opacity-90">GPT-4o-mini costs $0.15 per 1M tokens. Enterprise features at SMB prices are finally possible.</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-card border border-border rounded-xl p-8"
          >
            <div className="text-5xl mb-4">💸</div>
            <h3 className="text-xl font-semibold mb-3">Recession-Proof Need</h3>
            <p className="text-muted-foreground">Economic pressure = SMBs can't afford $300/mo tools. They still need the solution.</p>
          </motion.div>
        </div>

        <div className="mt-16 bg-muted/30 rounded-xl p-8">
          <p className="text-xl text-foreground">
            <span className="font-semibold text-primary">Bottom line:</span> Reviews matter more than ever. Tools are finally affordable. SMBs are ready to pay for simple solutions.
          </p>
        </div>
      </div>
    </div>
  )
}

// Slide 12: Vision
function VisionSlide() {
  return (
    <div className="h-screen flex items-center justify-center p-8 relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl w-full text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Rocket className="w-5 h-5 text-primary" />
          </span>
          <span className="text-sm uppercase tracking-widest text-muted-foreground">Vision</span>
        </div>

        <h2 className="text-6xl font-bold text-foreground mb-8">
          Every SMB knows about<br />
          every review<br />
          <span className="text-primary">within minutes</span>
        </h2>

        <p className="text-2xl text-muted-foreground mb-16 max-w-2xl mx-auto">
          No more missed feedback. No more viral disasters. Just real-time awareness and the power to protect your reputation.
        </p>

        <div className="grid grid-cols-3 gap-6 mb-16">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-primary mb-2">Year 2</div>
            <p className="text-muted-foreground text-sm">All platforms (Facebook, TrustPilot, TripAdvisor). SMS alerts. Mobile app.</p>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-primary mb-2">Year 3</div>
            <p className="text-muted-foreground text-sm">AI predicts review trends. Auto-response (with approval). White-label for agencies.</p>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-primary mb-2">Year 5</div>
            <p className="text-muted-foreground text-sm">Reputation OS for SMBs. Reviews + social mentions + press. One dashboard.</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-xl">
          <span className="text-xl font-semibold">reviewpulse.ashketing.com</span>
          <span className="text-sm opacity-80">— Try it free</span>
        </div>
      </div>
    </div>
  )
}