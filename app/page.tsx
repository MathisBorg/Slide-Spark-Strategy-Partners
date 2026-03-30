"use client"

import { useRef, useState, useEffect, type ReactNode } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import {
  Lightbulb,
  Users,
  Coins,
  Trophy,
  Rocket,
  TrendingUp,
  ArrowDown,
  ChevronRight,
  Zap,
  Globe,
  Handshake,
  DollarSign,
  Calendar,
  ArrowRight,
  CircleDollarSign,
  Flame,
  Send,
  Layers,
  Megaphone,
} from "lucide-react"

// ─── Animation wrapper ────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directionOffset[direction],
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...directionOffset[direction] }
      }
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Slide navigation dots ──────────────────────────────────────────
function SlideNav({
  current,
  total,
  onNavigate,
}: {
  current: number
  total: number
  onNavigate: (index: number) => void
}) {
  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onNavigate(i)}
          className="group relative flex items-center justify-end"
        >
          <span className="absolute right-6 text-xs text-white/0 group-hover:text-white/60 transition-colors whitespace-nowrap font-mono">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span
            className={`block rounded-full transition-all duration-300 ${
              current === i
                ? "w-3 h-3 bg-white"
                : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
            }`}
          />
        </button>
      ))}
    </nav>
  )
}

// ─── Main page ──────────────────────────────────────────────────────
export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const totalSlides = 9

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const vh = window.innerHeight
      const index = Math.round(scrollTop / vh)
      setCurrentSlide(Math.min(index, totalSlides - 1))
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  const navigateTo = (index: number) => {
    slideRefs.current[index]?.scrollIntoView({ behavior: "smooth" })
  }

  const setSlideRef = (index: number) => (el: HTMLDivElement | null) => {
    slideRefs.current[index] = el
  }

  return (
    <>
      <SlideNav
        current={currentSlide}
        total={totalSlides}
        onNavigate={navigateTo}
      />

      <div ref={containerRef} className="snap-container">
        {/* ═══════ SLIDE 1 — Cover ═══════ */}
        <section
          ref={setSlideRef(0)}
          className="snap-slide flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="orb w-[500px] h-[500px] bg-orange-500/8 -top-40 -left-40 absolute" />
          <div className="orb w-[600px] h-[600px] bg-orange-500/4 -bottom-60 -right-40 absolute" />

          <div className="relative z-10 text-center px-6">
            <FadeIn delay={0.2}>
              <div className="flex items-center justify-center gap-4 mb-8">
                <Image
                  src="/spark-logo.png"
                  alt="Spark"
                  width={72}
                  height={72}
                  className="rounded-2xl"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight gradient-text">
                Spark Launch Strategy
              </h1>
            </FadeIn>
            <FadeIn delay={0.6}>
              <p className="mt-6 text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-light">
                1 launch per week. Partners welcome.
              </p>
            </FadeIn>
            <FadeIn delay={0.8}>
              <p className="mt-4 text-sm text-white/30 font-mono max-w-md mx-auto">
                Q2 2026 — Scaling the Idea LaunchPad on Solana
              </p>
            </FadeIn>
            <FadeIn delay={1.1}>
              <div className="mt-16 flex justify-center">
                <button
                  onClick={() => navigateTo(1)}
                  className="group flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
                >
                  <span className="text-xs font-mono">scroll</span>
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══════ SLIDE 2 — The Vision ═══════ */}
        <section
          ref={setSlideRef(1)}
          className="snap-slide flex flex-col items-center justify-center relative overflow-hidden px-6"
        >
          <div className="orb w-[400px] h-[400px] bg-orange-500/6 top-20 right-0 absolute" />

          <div className="relative z-10 max-w-4xl w-full">
            <FadeIn>
              <p className="text-sm font-mono text-white/30 mb-6 tracking-wider uppercase">
                The Vision
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-10">
                Ship fast.{" "}
                <span className="gradient-text">Ship every week.</span>
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FadeIn delay={0.3}>
                <div className="rounded-xl border border-orange-500/10 bg-orange-500/[0.03] p-6 text-center">
                  <Rocket className="w-6 h-6 text-orange-400/70 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white/90 mb-2">1 / week</p>
                  <p className="text-xs text-white/40">Minimum launch cadence</p>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="rounded-xl border border-orange-500/10 bg-orange-500/[0.03] p-6 text-center">
                  <Handshake className="w-6 h-6 text-orange-400/70 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white/90 mb-2">Partners</p>
                  <p className="text-xs text-white/40">Dedicated weeks per ecosystem</p>
                </div>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03] p-6 text-center">
                  <TrendingUp className="w-6 h-6 text-emerald-400/70 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white/90 mb-2">Scale</p>
                  <p className="text-xs text-white/40">Volume, TVL, community growth</p>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.7}>
              <p className="mt-8 text-sm text-white/40 text-center max-w-2xl mx-auto leading-relaxed">
                Spark is entering its growth phase. The platform is live, the model is proven.
                Now we scale — and we want partners to scale with us.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ═══════ SLIDE 3 — What is Spark (Recap) + Fees ═══════ */}
        <section
          ref={setSlideRef(2)}
          className="snap-slide flex flex-col items-center justify-center relative overflow-hidden px-6"
        >
          <div className="orb w-[300px] h-[600px] bg-orange-500/5 top-0 left-1/2 -translate-x-1/2 absolute" />

          <div className="relative z-10 max-w-4xl w-full">
            <FadeIn>
              <p className="text-sm font-mono text-white/30 mb-2 tracking-wider uppercase">
                Quick Recap
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h2 className="text-2xl md:text-4xl font-bold mb-3">
                Spark = The Idea LaunchPad
                <span className="block text-base md:text-lg font-normal text-white/40 mt-2">
                  on Solana
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-base text-white/50 mb-6 leading-relaxed max-w-2xl">
                Anyone can propose an idea. The community funds it through{" "}
                <span className="text-white/80 font-medium">IdeaCoins</span> — treasury-backed tokens.
                Builders are selected via futarchy to execute. No grants, no exit liquidity.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 mb-4">
                <h3 className="text-sm font-semibold text-orange-400/80 uppercase tracking-wider mb-4">
                  IdeaCoin Model
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-white/[0.02]">
                    <p className="text-2xl font-bold text-white/80 mb-1">1:1</p>
                    <p className="text-xs text-white/40">Treasury-backed</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-white/[0.02]">
                    <p className="text-2xl font-bold text-white/80 mb-1">0%</p>
                    <p className="text-xs text-white/40">Team allocation</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-white/[0.02]">
                    <p className="text-2xl font-bold text-white/80 mb-1">100%</p>
                    <p className="text-xs text-white/40">Fair launch</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-white/[0.02]">
                    <p className="text-2xl font-bold text-white/80 mb-1">2.5%</p>
                    <p className="text-xs text-white/40">Trading fees</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 mb-4">
                <h3 className="text-sm font-semibold text-orange-400/80 uppercase tracking-wider mb-4">
                  2.5% Trading Fees — Split
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { pct: "40%", label: "IdeaCoin Treasury", color: "text-orange-400/80", bg: "bg-orange-500/10" },
                    { pct: "40%", label: "Spark", color: "text-orange-300/80", bg: "bg-orange-500/5" },
                    { pct: "10%", label: "Ideator", color: "text-emerald-400/80", bg: "bg-emerald-500/10" },
                    { pct: "10%", label: "IdeaCoin Buyback", color: "text-amber-400/80", bg: "bg-amber-500/10" },
                  ].map((item) => (
                    <div key={item.label} className={`p-3 rounded-lg ${item.bg} text-center`}>
                      <p className={`text-xl font-bold ${item.color}`}>{item.pct}</p>
                      <p className="text-xs text-white/40 mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-white/30 text-center">
                  Trading fees accumulate &rarr; backing per token increases over time
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.55}>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 mb-4">
                <h3 className="text-xs font-semibold text-orange-400/80 uppercase tracking-wider mb-3">
                  Capital Flow per IdeaCoin
                </h3>
                <div className="flex items-center justify-center gap-2 flex-wrap text-xs font-mono">
                  <span className="px-2 py-1.5 rounded-lg bg-white/5 text-white/70">Investors</span>
                  <ArrowRight className="w-3 h-3 text-white/30" />
                  <span className="px-2 py-1.5 rounded-lg bg-orange-500/10 text-orange-400/80">IdeaCoin</span>
                  <ArrowRight className="w-3 h-3 text-white/30" />
                  <span className="px-2 py-1.5 rounded-lg bg-orange-500/10 text-orange-400/80">Treasury 80%</span>
                  <span className="px-2 py-1.5 rounded-lg bg-orange-500/5 text-orange-300/80">LP 20%</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="rounded-xl border border-orange-500/10 bg-orange-500/[0.02] p-3 text-center">
                <p className="text-xs text-white/50">
                  <span className="text-orange-400/80 font-medium">Partner bonus:</span>{" "}
                  Spark shares up to 50% of its 40% with partners who commit treasury funds
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══════ SLIDE 4 — Proof: OmniBear Case Study ═══════ */}
        <section
          ref={setSlideRef(3)}
          className="snap-slide flex flex-col items-center justify-center relative overflow-hidden px-6"
        >
          <div className="orb w-[400px] h-[400px] bg-orange-500/4 top-0 left-0 absolute" />
          <div className="orb w-[400px] h-[400px] bg-orange-500/3 bottom-0 right-0 absolute" />

          <div className="relative z-10 max-w-4xl w-full">
            <FadeIn>
              <p className="text-sm font-mono text-white/30 mb-2 tracking-wider uppercase">
                Proof of Concept
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h2 className="text-2xl md:text-4xl font-bold mb-3">
                Spark <span className="gradient-text">&times;</span> Omnipair
                <span className="block text-lg font-normal text-white/40 mt-1">
                  First partnership — real results
                </span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p className="text-white/40 mb-8 text-sm">
                Governance proposal OMFG-004: 20k USDC from Omnipair treasury.
                3 ideas selected with Rakka & Ivan. First IdeaCoin launched: PREDICT.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FadeIn delay={0.3}>
                <div className="rounded-xl border border-orange-500/10 bg-orange-500/[0.02] p-6">
                  <h3 className="text-sm font-semibold text-orange-400/80 uppercase tracking-wider mb-4">
                    PREDICT Launch Numbers
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-2xl font-bold text-white/90">$17,514</p>
                      <p className="text-xs text-white/40">Total raised</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white/80">$0.001751</p>
                      <p className="text-xs text-white/40">Launch price per token</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-emerald-400/80">$0.00181</p>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400/80 text-xs font-mono">
                        +3% NAV
                      </span>
                    </div>
                    <p className="text-xs text-white/40">Token backing increased from trading fees alone</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="rounded-xl border border-orange-500/10 bg-orange-500/[0.02] p-6">
                  <h3 className="text-sm font-semibold text-orange-400/80 uppercase tracking-wider mb-4">
                    Key Takeaways
                  </h3>
                  <div className="space-y-4">
                    {[
                      { icon: TrendingUp, text: "NAV growth — token backing up +3% from fees" },
                      { icon: Handshake, text: "Omnipair + community invested directly" },
                      { icon: DollarSign, text: "Idea creator earned $150 in fees passively" },
                      { icon: Rocket, text: "3 products ready to be built for their ecosystem" },
                      { icon: Users, text: "Community engaged — real ownership, no exit liquidity" },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <item.icon className="w-4 h-4 text-orange-400/50 mt-0.5 shrink-0" />
                        <p className="text-sm text-white/60">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.6}>
              <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] p-4 text-center">
                <p className="text-sm text-emerald-400/80 font-medium">
                  The model works. Now we scale it.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══════ SLIDE 5 — The Strategy: 1 Launch / Week ═══════ */}
        <section
          ref={setSlideRef(4)}
          className="snap-slide flex flex-col items-center justify-center relative overflow-hidden px-6"
        >
          <div className="orb w-[500px] h-[500px] bg-orange-500/6 top-10 left-10 absolute" />

          <div className="relative z-10 max-w-4xl w-full">
            <FadeIn>
              <p className="text-sm font-mono text-white/30 mb-2 tracking-wider uppercase">
                The Strategy
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h2 className="text-2xl md:text-4xl font-bold mb-3">
                1 launch per week.{" "}
                <span className="gradient-text">Minimum.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p className="text-white/40 mb-8 text-sm max-w-2xl">
                Consistency creates momentum. Each week, a new IdeaCoin goes live —
                from the community, from a partner ecosystem, or with a KOL.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FadeIn delay={0.3}>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-4 h-4 text-orange-400/70" />
                    <h3 className="text-xs font-semibold text-orange-400/80 uppercase tracking-wider">
                      Open Launches
                    </h3>
                  </div>
                  <p className="text-xs text-white/50 mb-3">
                    Ideas proposed by anyone in the Spark community.
                  </p>
                  <div className="space-y-2">
                    {[
                      "Community-driven ideas",
                      "Open fundraising to all",
                      "Builds Spark brand & volume",
                    ].map((item, i) => (
                      <div key={i} className="flex gap-2 items-start text-xs text-white/40">
                        <ChevronRight className="w-3 h-3 text-orange-400/40 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="rounded-xl border border-orange-500/10 bg-orange-500/[0.02] p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Handshake className="w-4 h-4 text-orange-400/70" />
                    <h3 className="text-xs font-semibold text-orange-400/80 uppercase tracking-wider">
                      Partner Launches
                    </h3>
                  </div>
                  <p className="text-xs text-white/50 mb-3">
                    Dedicated week for a protocol&apos;s ecosystem. Co-branded.
                  </p>
                  <div className="space-y-2">
                    {[
                      "Ideas tailored to partner\u2019s ecosystem",
                      "Partner community onboarded",
                      "Co-marketing & co-announcement",
                      "Optional treasury contribution",
                    ].map((item, i) => (
                      <div key={i} className="flex gap-2 items-start text-xs text-white/40">
                        <ChevronRight className="w-3 h-3 text-orange-400/40 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="rounded-xl border border-amber-500/10 bg-amber-500/[0.02] p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Megaphone className="w-4 h-4 text-amber-400/70" />
                    <h3 className="text-xs font-semibold text-amber-400/80 uppercase tracking-wider">
                      KOL Launches
                    </h3>
                  </div>
                  <p className="text-xs text-white/50 mb-3">
                    Launches amplified by key opinion leaders & influencers.
                  </p>
                  <div className="space-y-2">
                    {[
                      "KOL co-creates or endorses the idea",
                      "Massive reach on launch day",
                      "Brings new users to Spark",
                      "Revenue share with the KOL",
                    ].map((item, i) => (
                      <div key={i} className="flex gap-2 items-start text-xs text-white/40">
                        <ChevronRight className="w-3 h-3 text-amber-400/40 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ═══════ SLIDE 6 — Partner Week + What Partners Get ═══════ */}
        <section
          ref={setSlideRef(5)}
          className="snap-slide flex flex-col items-center justify-center relative overflow-hidden px-6"
        >
          <div className="orb w-[500px] h-[500px] bg-orange-500/4 bottom-0 right-0 absolute" />

          <div className="relative z-10 max-w-5xl w-full">
            <FadeIn>
              <p className="text-sm font-mono text-white/30 mb-2 tracking-wider uppercase">
                Partner Integration
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h2 className="text-2xl md:text-4xl font-bold mb-8">
                How a <span className="gradient-text">Partner Week</span> works.
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Pipeline */}
              <div>
                <div className="space-y-1">
                  {[
                    {
                      icon: Calendar,
                      label: "Week is scheduled. Spark & Partner agree on timing",
                    },
                    {
                      icon: Lightbulb,
                      label: "Idea selection. Co-curated with the partner\u2019s community",
                    },
                    {
                      icon: Coins,
                      label: "IdeaCoin launches. Partner ecosystem fundraises",
                    },
                    {
                      icon: Zap,
                      label: "Co-marketing push. Both communities amplify the launch",
                    },
                    {
                      icon: Trophy,
                      label: "Hackathon / builder selection. Product gets built for partner ecosystem",
                    },
                  ].map((step, i, arr) => (
                    <FadeIn key={i} delay={i * 0.08} direction="up">
                      <div className="flex items-center gap-3">
                        <div className="relative flex flex-col items-center">
                          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                            <step.icon className="w-4 h-4 text-white/70" />
                          </div>
                          {i < arr.length - 1 && (
                            <div className="w-px h-6 pipeline-line opacity-30 mt-1" />
                          )}
                        </div>
                        <p className="text-xs text-white/70 leading-tight max-w-xs">{step.label}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>

              {/* Right: What partners get */}
              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    icon: Layers,
                    title: "Products Built for You",
                    desc: "Community-funded products tailored to your ecosystem",
                    color: "text-orange-400/70",
                    border: "border-orange-500/10",
                    bg: "bg-orange-500/[0.02]",
                  },
                  {
                    icon: Users,
                    title: "Community Ownership",
                    desc: "Your community owns 100% via IdeaCoins. No VCs, no exit liquidity",
                    color: "text-orange-300/70",
                    border: "border-orange-400/10",
                    bg: "bg-orange-400/[0.02]",
                  },
                  {
                    icon: CircleDollarSign,
                    title: "Revenue Share",
                    desc: "Spark shares up to 50% of its fees. Treasury grows from trading",
                    color: "text-emerald-400/70",
                    border: "border-emerald-500/10",
                    bg: "bg-emerald-500/[0.02]",
                  },
                  {
                    icon: Flame,
                    title: "Visibility & Hype",
                    desc: "Co-branded launch week. Cross-promotion across all channels",
                    color: "text-amber-400/70",
                    border: "border-amber-500/10",
                    bg: "bg-amber-500/[0.02]",
                  },
                ].map((item, i) => (
                  <FadeIn key={item.title} delay={0.3 + i * 0.08}>
                    <div className={`rounded-xl border ${item.border} ${item.bg} p-4 hover:border-white/10 transition-colors flex items-start gap-3`}>
                      <item.icon className={`w-5 h-5 ${item.color} shrink-0 mt-0.5`} />
                      <div>
                        <h3 className="text-sm font-semibold text-white/90 mb-0.5">
                          {item.title}
                        </h3>
                        <p className="text-xs text-white/40 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            <FadeIn delay={0.7}>
              <div className="mt-6 rounded-xl border border-orange-500/15 bg-orange-500/[0.04] p-5">
                <p className="text-base text-white/70 leading-relaxed text-center">
                  <span className="text-orange-400 font-semibold text-lg">Result:</span>{" "}
                  The partner gets products built for their ecosystem, owned by their community,
                  with revenue flowing back. All without hiring or giving grants.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══════ SLIDE 7 — CTA for Partners ═══════ */}
        <section
          ref={setSlideRef(6)}
          className="snap-slide flex flex-col items-center justify-center relative overflow-hidden px-6"
        >
          <div className="orb w-[600px] h-[600px] bg-orange-500/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute" />

          <div className="relative z-10 max-w-2xl w-full">
            <FadeIn>
              <p className="text-sm font-mono text-white/30 mb-2 tracking-wider uppercase">
                Interested?
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h2 className="text-2xl md:text-4xl font-bold mb-10">
                How to get started.
              </h2>
            </FadeIn>

            <div className="space-y-5">
              {[
                {
                  num: "01",
                  text: "Reply to this deck \u2014 signal your interest",
                },
                {
                  num: "02",
                  text: "We schedule a 30-min call to align on ideas & timing",
                },
                {
                  num: "03",
                  text: "Co-select 1-3 ideas with your community",
                },
                {
                  num: "04",
                  text: "We book your Partner Week \u2014 launch in 2-4 weeks",
                },
              ].map((step, i) => (
                <FadeIn key={step.num} delay={0.2 + i * 0.1}>
                  <div className="flex gap-5 items-baseline group">
                    <span className="font-mono text-xs text-white/20 group-hover:text-white/40 transition-colors tabular-nums">
                      {step.num}
                    </span>
                    <p className="text-sm font-medium text-white/80">
                      {step.text}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.7}>
              <div className="mt-12 text-center">
                <p className="text-xl md:text-2xl font-bold gradient-text">
                  &ldquo;Pick your week. We&apos;ll handle the rest.&rdquo;
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══════ SLIDE 8 — They Already Trust Spark ═══════ */}
        <section
          ref={setSlideRef(7)}
          className="snap-slide flex flex-col items-center justify-center relative overflow-hidden px-6"
        >
          <div className="orb w-[500px] h-[500px] bg-orange-500/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute" />

          <div className="relative z-10 max-w-3xl w-full text-center">
            <FadeIn>
              <p className="text-sm font-mono text-white/30 mb-2 tracking-wider uppercase">
                Ecosystem
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h2 className="text-2xl md:text-4xl font-bold mb-12">
                They already trust Spark.
              </h2>
            </FadeIn>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { name: "Combinator.trade", logo: "/combinator.svg" },
                { name: "SwissBorg", logo: "/swissborg.jpg" },
                { name: "Omnipair", logo: "/omnipair.png" },
                { name: "Global Dollar Network", logo: "/paxos.jpg" },
              ].map((partner, i) => (
                <FadeIn key={partner.name} delay={0.3 + i * 0.1}>
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5 flex flex-col items-center justify-center hover:border-orange-500/20 transition-colors h-32 gap-3">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={100}
                      height={40}
                      className="object-contain max-h-10 rounded-md"
                    />
                    <span className="text-xs text-white/40 font-medium">{partner.name}</span>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.7}>
              <p className="text-sm text-white/30 italic">
                Your protocol could be next.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ═══════ SLIDE 9 — Contact ═══════ */}
        <section
          ref={setSlideRef(8)}
          className="snap-slide flex flex-col items-center justify-center relative overflow-hidden px-6"
        >
          <div className="orb w-[600px] h-[600px] bg-orange-500/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute" />
          <div className="orb w-[400px] h-[400px] bg-orange-500/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute" />

          <div className="relative z-10 max-w-2xl w-full text-center">
            <FadeIn delay={0.2}>
              <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-8">
                Let&apos;s launch together.
              </h2>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8 mb-8">
                <p className="text-xl font-semibold text-white/80 mb-2">Mathis</p>
                <p className="text-sm text-white/50 font-mono mb-6">@Mathis_BTC</p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {[
                    { label: "Spark Platform", icon: Rocket, href: "https://justspark.fun/ideas" },
                    { label: "Twitter", icon: Send, href: "https://x.com/JustSparkIdeas" },
                    { label: "Telegram", icon: Globe, href: "https://t.me/sparkdotfun" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white/50 hover:text-white/70 hover:border-white/20 transition-colors"
                    >
                      <link.icon className="w-3.5 h-3.5" />
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <p className="text-sm text-white/30 font-mono">
                justspark.fun
              </p>
            </FadeIn>
          </div>
        </section>
      </div>
    </>
  )
}
