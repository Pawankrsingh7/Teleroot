import { LandingNavbar } from "@/components/LandingNavbar";
import { LandingHero } from "@/components/LandingHero";
import { LandingLogos } from "@/components/LandingLogos";
import { LandingProblem } from "@/components/LandingProblem";
import { LandingSolutions } from "@/components/LandingSolutions";
import { LandingHowItWorks } from "@/components/LandingHowItWorks";
import { LandingFeatures } from "@/components/LandingFeatures";
import { LandingBenefits } from "@/components/LandingBenefits";
import { LandingPricing } from "@/components/LandingPricing";
import { LandingAiAdvantage } from "@/components/LandingAiAdvantage";
import { LandingTestimonials } from "@/components/LandingTestimonials";
import { LandingFAQ } from "@/components/LandingFAQ";
import { LandingFooter } from "@/components/LandingFooter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <LandingNavbar />
      
      <main className="flex-grow">
        <LandingHero />
        <LandingLogos />
        <LandingProblem />
        <LandingSolutions />
        <LandingHowItWorks />
        <LandingFeatures />
        <LandingBenefits />
        <LandingPricing />
        <LandingAiAdvantage />
        <LandingTestimonials />
        <LandingFAQ />
        
        {/* Final CTA Section */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-6">
            <div className="relative overflow-hidden rounded-[32px] bg-[#1F2C30] p-10 lg:p-12 shadow-2xl">
              {/* Decorative Glow */}
              <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-[#41bf63]/30 blur-[100px]" />
              </div>

              <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
                <div className="max-w-xl text-left">
                  <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl uppercase leading-tight">
                    Scale your network <br className="hidden sm:block" /> with intelligence.
                  </h2>
                  <p className="text-base text-slate-400">
                    Experience a unified platform designed for next-gen 
                    telecom orchestration and automated troubleshooting.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/dashboard" className="group flex h-14 items-center rounded-full bg-[#41bf63] pl-6 pr-1.5 text-sm font-bold text-black transition-all hover:bg-[#bce628]">
                    <span className="mr-4">Get Started Free</span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1F2C30] text-[#41bf63] transition-transform group-hover:scale-105">
                      <ArrowUpRight className="h-4.5 w-4.5" />
                    </div>
                  </Link>
                  <button className="h-14 rounded-full border border-white/10 bg-transparent px-8 text-sm font-bold text-white transition-all hover:bg-white/5">
                    Book a Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Massive Brand Ghost Text */}
        <div className="w-full bg-white overflow-hidden flex justify-center items-end pt-12 pb-0 select-none pointer-events-none">
          <h1 className="text-[13vw] font-black leading-[0.75] tracking-tighter uppercase bg-gradient-to-b from-slate-400 via-slate-200 to-white bg-clip-text text-transparent">
            TELEROOT AI
          </h1>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
