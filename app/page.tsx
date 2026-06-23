"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, Variants } from "framer-motion";
import {
  Shield, Building2,
  Database, Fingerprint, BarChart3,
  Workflow, ArrowUpRight, Check, Sparkles, Globe, Command
} from "lucide-react";
import { useRouter } from "next/navigation";

const VISUALS = {
  heroVideo: "/vid1.mp4",
  heroGrid: "/landingImg1.png",
  analyticsPanel: "/landingImg4.png",
  tenantIsolation: "/landingImage2.png",
  portalMockup: "/landingImg3.png"
};

const GITHUB_DOCS_URL = "https://github.com/quirbyte/Cortex-v2/blob/master/README.md";

const fFadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const fStagger: Variants = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function SaaSPlatformLanding() {
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFeatureTab, setActiveFeatureTab] = useState(0);

  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  const heroScale = useTransform(scrollY, [0, 600], [1, 0.96]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const matrixY = useTransform(scrollY, [0, 1000], [0, -80]);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const openDocs = () => {
    window.open(GITHUB_DOCS_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#fcfcfd] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-manrope selection:bg-amber-400 selection:text-black overflow-x-hidden antialiased transition-colors duration-300">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-black"
          >
            <div className="space-y-6 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-1 justify-center"
              >
                <div className="h-11 w-11 bg-white dark:bg-black rounded-xl flex items-center justify-center shadow-2xl shadow-amber-400/20">
                  <img src="/favicon.svg" alt="" className=" h-full w-full rounded-full" />
                </div>
                <span className="text-2xl font-black tracking-tighter font-manrope text-zinc-950 dark:text-white">Cortex</span>
              </motion.div>

              <div className="space-y-2">
                <div className="w-56 h-px bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden relative mx-auto">
                  <motion.div
                    initial={{ left: "-100%" }}
                    animate={{ left: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="absolute top-0 bottom-0 w-1/2 bg-linear-to-r from-transparent via-zinc-900 dark:via-white to-transparent"
                  />
                </div>
                <motion.p className="text-[9px] uppercase tracking-widest font-mono text-zinc-400 dark:text-zinc-500">
                  Allocating multi-tenant platform shards...
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed top-4 left-0 right-0 z-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={!isLoading ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full border border-zinc-200/80 dark:border-zinc-900/80 bg-[#fcfcfd]/85 dark:bg-zinc-800/60 backdrop-blur-xl rounded-2xl shadow-md transition-all"
        >
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-1 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="h-8 w-8 bg-zinc-950 dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-black text-xs transition-transform">
                  <img src="/favicon.svg" alt="" className="h-full w-full" />
                </div>
                <span className="text-sm font-black tracking-tighter font-manrope text-zinc-950 dark:text-white">Cortex</span>
              </div>

              <div className="hidden lg:flex items-center gap-1">
                {["Docs", "Features", "Pricing", "About Us"].map((item, i) => (
                  <a
                    key={i}
                    href={item === "Docs" ? undefined : `#section-${i}`}
                    onClick={item === "Docs" ? openDocs : undefined}
                    className="px-3.5 py-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white rounded-lg transition-all hover:bg-zinc-100 dark:hover:bg-zinc-900/40 cursor-pointer"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <button onClick={() => router.push("/signin")} className="text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors px-3 py-2">
                Sign In
              </button>
              <button onClick={() => router.push("/signup")} className="flex items-center gap-2 px-3.5 py-2 bg-amber-400 hover:bg-amber-500 text-black font-black text-xs rounded-xl shadow-lg shadow-amber-400/5 transition-all active:scale-[0.98]">
                Sign up
              </button>
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <button onClick={() => router.push("/signin")} className="text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors px-2.5 py-1.5">
                Sign In
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
                <Command size={15} />
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      <section className="relative min-h-screen flex flex-col justify-center items-center pt-32 lg:pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-[1.01] filter brightness-95 contrast-[1.05] dark:brightness-[0.45] dark:contrast-[1.2]"
            src={VISUALS.heroVideo}
          />
          <div className="absolute inset-0 bg-[#fcfcfd]/50 dark:bg-[#09090b]/65 mix-blend-normal" />
          <div className="absolute inset-0 bg-linear-to-b from-[#fcfcfd]/10 via-transparent to-[#fcfcfd] dark:from-transparent dark:via-transparent dark:to-[#09090b]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--g-c)_1px,transparent_1px),linear-gradient(to_bottom,var(--g-c)_1px,transparent_1px)] bg-size-[5rem_5rem] opacity-20 [--g-c:#e4e4e7] dark:[--g-c:#1c1c24]" />
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-10 max-w-5xl mx-auto">
            <motion.div
              style={{ scale: heroScale, opacity: heroOpacity }}
              className="space-y-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800/80 backdrop-blur-md rounded-full text-[10px] font-bold text-amber-700 dark:text-amber-400 tracking-widest uppercase font-mono mx-auto">
                <Sparkles size={11} className="animate-pulse" />
                <span>Multi-Tenant Infrastructure v2.4</span>
              </div>

              <div className="relative inline-block w-full max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl border border-zinc-200 dark:border-white/10 bg-linear-to-b from-white/70 via-zinc-50/40 to-white/10 dark:from-zinc-900/60 dark:via-zinc-900/20 dark:to-transparent backdrop-blur-lg shadow-2xl">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] bg-linear-to-tr from-amber-400/10 via-transparent to-transparent blur-3xl pointer-events-none" />
                <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-zinc-300 dark:via-white/20 to-transparent" />
                <div className="absolute bottom-0 left-12 right-12 h-px bg-linear-to-r from-transparent via-zinc-200 dark:via-white/10 to-transparent" />

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-zinc-950 dark:text-white leading-[1.08] relative z-10">
                  Orchestrate complex <br className="hidden sm:inline" />
                  event clusters at{" "}
                  <span className="font-serif italic font-normal text-amber-600 dark:text-amber-400 relative inline-block px-1">
                    global scale
                    <span className="absolute left-0 bottom-1 w-full h-px bg-amber-500/40 dark:bg-amber-400/40" />
                  </span>
                </h1>
              </div>

              <p className="text-zinc-950 dark:text-zinc-50 font-semibold dark:font-light text-sm sm:text-base max-w-2xl mx-auto leading-relaxed drop-shadow-sm bg-white/40 dark:bg-black/10 rounded-xl p-3 backdrop-blur-xs sm:bg-transparent">
                The production-grade multi-tenant platform for complex event operations. Spin up fully isolated organizational workspaces, configure custom domains, deploy white-label analytics dashboards, and manage millions of concurrent user sessions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={!isLoading ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-sm mx-auto sm:max-w-none relative z-20"
            >
              <button
                onClick={() => router.push("/signin")}
                className="w-full sm:w-auto px-7 py-4 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-black font-black text-xs rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-xl shadow-zinc-950/20 dark:shadow-white/10 group cursor-pointer"
              >
                Sign in to Cortex
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
              </button>
              <button
                onClick={openDocs}
                className="w-full sm:w-auto px-7 py-4 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-950 dark:text-zinc-50 font-bold text-xs rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/80 backdrop-blur-md transition-all shadow-sm cursor-pointer"
              >
                Read Docs of Cortex
              </button>
            </motion.div>
          </div>

          <motion.div
            style={{ y: matrixY }}
            className="mt-24 relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0d0d11] p-2.5 shadow-2xl max-w-6xl mx-auto aspect-video overflow-hidden group z-10"
          >
            <div className="w-full h-full rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 relative">
              <img
                src={VISUALS.heroGrid}
                alt="Cortex Global Matrix Analytics Dashboard"
                className="w-full h-full object-contain opacity-95 dark:opacity-75 object-top transition-transform duration-1000 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#fcfcfd] dark:from-[#09090b] via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl hidden md:flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-4">
                  <span className="flex h-2 w-2 rounded-full bg-green-500 animate-ping" />
                  <div className="text-left font-mono">
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase font-bold tracking-wider">Active Workspace Cluster State</p>
                    <p className="text-xs font-black text-zinc-950 dark:text-white">1,482 Orgs Active across 12 Node Regions</p>
                  </div>
                </div>
                <div className="h-6 w-32 bg-zinc-50 dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800/60" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="section-1" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 border-t border-zinc-200 dark:border-zinc-900 bg-[#fcfcfd] dark:bg-[#09090b]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex h-7 px-2.5 items-center bg-amber-500/10 dark:bg-amber-400/10 rounded text-[10px] uppercase tracking-widest font-mono text-amber-700 dark:text-amber-400 font-bold">
              Tenancy Control Engine
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight leading-none text-zinc-950 dark:text-white">
              Complete isolation. <br />
              <span className="font-serif italic text-amber-600 dark:text-amber-400">Zero architectural noise.</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm font-light leading-relaxed">
              Managing hundreds of high-scale enterprise event entities demands deep security isolation layouts. Cortex allocates fully separated database routers for every distinct organization node.
            </p>

            <div className="space-y-2 pt-4">
              {[
                {
                  title: "Dynamic Subdomain Routing",
                  desc: "Instantly catch, resolve, and route incoming multi-tenant requests using fully isolated Next.js middleware subdomain parameters.",
                  icon: Globe
                },
                {
                  title: "Multi-Step Workspace Onboarding",
                  desc: "Empower new organizations to seamlessly provision their custom tenant profiles, brand layouts, and localized variables.",
                  icon: Workflow
                },
                {
                  title: "Role-Based Access Control (RBAC)",
                  desc: "Enforce strict security boundaries separating platform administrators, workspace coordinators, and standard event team members.",
                  icon: Fingerprint
                }
              ].map((tab, idx) => {
                const Icon = tab.icon;
                const active = activeFeatureTab === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveFeatureTab(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex gap-4 items-start ${active ? "bg-zinc-100 dark:bg-zinc-900/60 border-zinc-300 dark:border-zinc-800 text-zinc-950 dark:text-white" : "bg-transparent border-transparent text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"}`}
                  >
                    <div className={`p-2 rounded-lg border mt-0.5 ${active ? "bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 text-amber-600 dark:text-amber-400" : "bg-zinc-50 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-900"}`}>
                      <Icon size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-bold font-mono tracking-tight">{tab.title}</p>
                      {active && <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 font-light leading-snug">{tab.desc}</p>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7 bg-zinc-100 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-900 rounded-2xl p-4 aspect-16/8.75 relative overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeatureTab}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full relative rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-950"
              >
                <img
                  src={[VISUALS.tenantIsolation, VISUALS.analyticsPanel, VISUALS.portalMockup][activeFeatureTab]}
                  alt="Dynamic Cortex Configuration Frame"
                  className="w-full h-full object-contain filter brightness-95 contrast-105"
                />
                <div className="absolute inset-0 bg-linear-to-r from-white/20 dark:from-zinc-950/40 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-zinc-50/50 dark:bg-[#0c0c0f] border-y border-zinc-200 dark:border-zinc-900/80">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Telemetry Specs</span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-zinc-950 dark:text-white">Engineered for high-throughput workflows</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm font-light max-w-xl mx-auto">Skip the engineering overhead. Your structural event pipeline comes pre-built to absolute modern scaling standards.</p>
        </div>

        <motion.div
          variants={fStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Dynamic Subdomain Isolation",
              desc: "Automatically provision and route fully isolated workspaces using clean, dynamic subdomains for every tenant platform slice.",
              icon: Globe
            },
            {
              title: "Multi-Tenant Architecture",
              desc: "Complete layout segregation supporting multi-brand ecosystems, distinct organizational trees, and isolated parameters.",
              icon: Building2
            },
            {
              title: "Custom Workspace Onboarding",
              desc: "Streamlined multi-step creation flows enabling tenants to instantly configure profiles, access levels, and workspace shards.",
              icon: Workflow
            },
            {
              title: "Role-Based Access Control",
              desc: "Secure granular matrices to separate event coordinators, global platform operators, and tenant-level managers seamlessly.",
              icon: Fingerprint
            },
            {
              title: "Centralized Console Analytics",
              desc: "Track platform health, user engagement vectors, registration trends, and resource usage across all tenant shards.",
              icon: BarChart3
            },
            {
              title: "Unified Database Sharding",
              desc: "Perform dynamic routing structures safely across high-throughput data pipelines to protect cross-tenant security bounds.",
              icon: Database
            }
          ].map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={i}
                variants={fFadeInUp}
                whileHover={{ y: -5 }}
                className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900/80 hover:border-amber-500/40 dark:hover:border-amber-400/30 rounded-2xl space-y-4 transition-all duration-300 group relative overflow-hidden shadow-xs"
              >
                <div className="h-9 w-9 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg flex items-center justify-center text-amber-600 dark:text-amber-400 transition-colors group-hover:bg-zinc-900 dark:group-hover:bg-amber-400 group-hover:text-white dark:group-hover:text-black">
                  <Icon size={15} />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-zinc-950 dark:text-white font-mono">{feat.title}</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">{feat.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <section id="section-2" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 bg-[#fcfcfd] dark:bg-[#09090b]">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400">Flexible Layouts</span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-zinc-950 dark:text-white">Predictable scaling models</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm font-light max-w-xl mx-auto">From single organization clusters up to worldwide isolated franchise pipelines.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
          {[
            {
              name: "Starter Shard",
              price: "FREE",
              desc: "Perfect for personal projects, testing, and initial multi-tenant staging configurations.",
              features: [
                "Up to 3 isolated organizations",
                "Up to 5 events in an organization",
                "Maximum 10 members in organization",
                "Basic role-based access management",
                "Community support channel"
              ]
            },
            {
              name: "Production Cluster",
              price: "₹499",
              desc: "Production-grade infrastructure built for high-scale multi-tenant operations and organizations.",
              features: [
                "Unlimited organizations",
                "No limit to event creation or members per organization",
                "Granular Multi-Role Access Control (RBAC)",
                "Centralized console metrics & analytics",
                "Priority infrastructure support"
              ],
              popular: true
            }
          ].map((plan, i) => (
            <div key={i} className={`p-8 bg-white dark:bg-zinc-950 border rounded-3xl flex flex-col justify-between relative shadow-xs transition-all ${plan.popular ? "border-amber-400 ring-1 ring-amber-400/30" : "border-zinc-200 dark:border-zinc-900"}`}>
              {plan.popular && <span className="absolute top-0 right-6 -translate-y-1/2 px-2.5 py-0.5 bg-amber-400 text-black font-mono font-bold text-[9px] uppercase tracking-wider rounded-full">Most Selected</span>}
              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wide text-zinc-950 dark:text-white">{plan.name}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light mt-1">{plan.desc}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-light tracking-tight text-zinc-950 dark:text-white">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-xs font-mono text-zinc-400">/month</span>}
                </div>
                <div className="h-px bg-zinc-100 dark:bg-zinc-900" />
                <ul className="space-y-3">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-xs text-zinc-700 dark:text-zinc-300">
                      <Check size={12} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span className="font-light leading-none">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className={`w-full py-3 text-xs font-black rounded-xl mt-8 transition-all ${plan.popular ? "bg-amber-400 hover:bg-amber-500 text-black shadow-lg shadow-amber-400/10" : "bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200"}`}>
                {plan.price === "Custom" ? "Contact Core Architects" : "Provision Plan Shard"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer id="section-3" className="border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-[#060608] relative z-10 pt-20 pb-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-6 pb-16 border-b border-zinc-200 dark:border-white/10">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-1">
                <div className="h-8 w-8 bg-zinc-950 dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-black text-xs">
                  <img src="/favicon.svg" alt="" className="h-full w-full" />
                </div>
                <span className="text-lg font-black tracking-tighter font-manrope text-zinc-950 dark:text-white">Cortex</span>
              </div>
              <p className="text-zinc-400 dark:text-zinc-500 text-xs font-light max-w-xs leading-relaxed">
                High-performance production software scaling multi-tenant organization pipelines and dynamic middleware subdomain architectures globally.
              </p>
            </div>

            {["Platform Core", "Tenant Layer", "Ecosystem"].map((title, groupIdx) => {
              const links = [
                ["Dynamic Subdomains", "Console Analytics", "Workspace Shards"],
                ["Member Directories", "RBAC Policies"],
                ["Open Source Code", "Developer Docs"]
              ][groupIdx];
              return (
                <div key={title} className="space-y-3.5">
                  <h5 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-mono">{title}</h5>
                  <ul className="space-y-2 text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                    {links.map((link) => (
                      <li key={link}>
                        {link === "Developer Docs" || link === "Open Source Code" ? (
                          <a
                            href="https://github.com/quirbyte/Cortex-v2"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
                          >
                            {link}
                          </a>
                        ) : (
                          <a href="#" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                            {link}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-400 dark:text-zinc-600">
            <div className="flex items-center gap-4">
              <span>Security Hub Certified</span>
              <span>• MIT License Standards</span>
              <span>• Isolated Workspace Clusters</span>
            </div>
            <div>
              © 2026 Cortex Systems Inc. Localized Cluster Shards Active.
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed top-24 left-4 right-4 z-40 max-w-7xl mx-auto lg:hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full p-4 border border-zinc-200/80 dark:border-zinc-500 bg-[#fcfcfd]/95 dark:bg-zinc-800/60 backdrop-blur-2xl rounded-2xl shadow-xl flex flex-col gap-1.5"
            >
              {["Docs", "Features", "Pricing", "About Us"].map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    item === "Docs" ? openDocs() : router.push(`#section-${i}`);
                  }}
                  className="w-full text-left px-4 py-3 bg-zinc-50 dark:bg-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-300 transition-all"
                >
                  {item}
                </button>
              ))}
              <div className="h-px bg-zinc-200 dark:bg-zinc-900 my-1" />
              <button
                onClick={() => { setMobileMenuOpen(false); router.push("/signup"); }}
                className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-black font-black text-xs rounded-xl shadow-md transition-colors"
              >
                Sign up
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}