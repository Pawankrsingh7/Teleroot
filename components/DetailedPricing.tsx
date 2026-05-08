"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, User, Monitor, Database, Bot, Search, Settings, ShieldAlert, Wifi, Users, Key, Headphones, Clock, ShieldCheck, RefreshCw, Lock, Zap } from "lucide-react";

export function DetailedPricing() {
  const [billing, setBilling] = useState("monthly");
  const router = useRouter();

  const openPayment = (plan: string) => {
    const token = typeof window !== "undefined" 
      ? (localStorage.getItem("access_token") || localStorage.getItem("token") || localStorage.getItem("refresh_token"))
      : null;
    const targetUrl = `/pricing/payment?plan=${plan}&billing=${billing}`;
    
    if (!token) {
      // Redirect to login with return URL
      router.push(`/signup?redirect=${encodeURIComponent(targetUrl)}`);
      return;
    }
    
    router.push(targetUrl);
  };

  return (
    <div className="bg-[#0B0C10] min-h-screen py-10 font-sans text-white flex items-center justify-center relative overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#41bf63] rounded-full blur-[150px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-[#41bf63] rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-[#41bf63] rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-[1400px] relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            Intelligent Project Pricing Solutions
          </h1>
          <p className="text-slate-500 mb-5 text-sm">
            Empower your enterprise with scalable, project-based plans tailored for strategic network management.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
              <button
                onClick={() => setBilling("monthly")}
                className={`rounded-full px-5 py-1.5 text-xs font-semibold transition-colors ${
                  billing === "monthly" ? "bg-[#41bf63] text-[#0B0C10]" : "text-slate-500 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`rounded-full px-5 py-1.5 text-xs font-semibold transition-colors ${
                  billing === "yearly" ? "bg-[#41bf63] text-[#0B0C10]" : "text-slate-500 hover:text-white"
                }`}
              >
                Yearly
              </button>
            </div>
            <div className="flex items-center text-[#41bf63] text-xs font-medium">
              <span className="mr-1">⟷</span> Save up to 20% with yearly billing
            </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="flex flex-col lg:flex-row gap-3 mb-6 items-stretch">
          
          {/* Plan Features Column */}
          <div className="hidden lg:flex flex-col w-60 bg-[#13161F]/80 backdrop-blur-lg rounded-2xl border border-white/5 shadow-xl overflow-hidden mt-4">
            <div className="h-[210px] p-5 flex flex-col justify-end pb-8">
              <div className="bg-[#13161F] rounded-xl p-4 shadow-2xl border border-white/5">
                <h3 className="text-white font-black text-[16px] tracking-widest uppercase text-center">
                  PLAN FEATURES
                </h3>
              </div>
            </div>
            
            <div className="flex flex-col flex-grow text-[13px] font-bold text-white">
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-white/5"><User className="w-3.5 h-3.5 text-[#41bf63]" /> Active Agents</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-white/5"><Monitor className="w-3.5 h-3.5 text-[#41bf63]" /> Devices Monitored</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-white/5"><Database className="w-3.5 h-3.5 text-[#41bf63]" /> Data Retention</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-white/5"><Bot className="w-3.5 h-3.5 text-[#41bf63]" /> AI Agents</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-white/5"><Search className="w-3.5 h-3.5 text-[#41bf63]" /> Root Cause Analysis</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-white/5"><Settings className="w-3.5 h-3.5 text-[#41bf63]" /> Automation Engine</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-white/5"><ShieldAlert className="w-3.5 h-3.5 text-[#41bf63]" /> Fraud Detection</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-white/5"><Wifi className="w-3.5 h-3.5 text-[#41bf63]" /> Fiber Prediction</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-white/5"><Users className="w-3.5 h-3.5 text-[#41bf63]" /> Multi-User Access</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-white/5"><Key className="w-3.5 h-3.5 text-[#41bf63]" /> Role-Based Access</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-white/5"><Headphones className="w-3.5 h-3.5 text-[#41bf63]" /> Support</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-white/5"><Clock className="w-3.5 h-3.5 text-[#41bf63]" /> SLA</div>
            </div>
            
            <div className="h-[74px] border-t border-white/5 bg-transparent"></div>
          </div>

          {/* Starter Card */}
          <div className="flex-1 flex flex-col rounded-[20px] border border-white/5 overflow-visible bg-[#13161F] text-center shadow-xl relative mt-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#6ee7a0] group">
            <div className="h-[210px] p-5 pt-16 flex flex-col items-center justify-center relative bg-[#13161F] rounded-t-[20px]">
              {/* Ribbon */}
              <div className="absolute top-6 left-[-8px] bg-[#41bf63] text-[#0B0C10] font-bold px-5 py-1.5 rounded-r-md shadow-xl text-xs tracking-wider z-10">
                STARTER
                <div className="absolute top-full left-0 w-0 h-0 border-t-[8px] border-t-[#2f9d51] border-l-[8px] border-l-transparent"></div>
              </div>
              
              <div className="flex items-baseline justify-center mb-1">
                <span className="text-3xl font-black text-white">
                  {billing === "monthly" ? "₹999" : "₹833"}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-bold mb-3 uppercase tracking-wider">/ Per Month</div>
              
              <div className="flex items-center justify-center gap-1.5 mb-2 text-[10px]">
                <span className="text-slate-400 font-bold">₹9,990 / yr</span>
                <span className="bg-[#41bf63]/10 text-[#41bf63] px-1.5 py-0.5 rounded text-[9px] font-bold">Save 20%</span>
              </div>
              
              <p className="text-[11px] text-slate-500 px-2 leading-relaxed">
                Perfect for getting started.
              </p>
            </div>
            
            <div className="flex flex-col flex-grow text-[13px] text-slate-400 font-medium bg-[#13161F]">
              <div className="flex items-center justify-center h-[38px] border-t border-white/5">Up to 50</div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5">100</div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5">7 days</div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5">Limited (2)</div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><X className="w-4 h-4 text-slate-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><X className="w-4 h-4 text-slate-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><X className="w-4 h-4 text-slate-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><X className="w-4 h-4 text-slate-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><X className="w-4 h-4 text-slate-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><X className="w-4 h-4 text-slate-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5">Community</div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><X className="w-4 h-4 text-slate-500" /></div>
            </div>
            
            <div className="h-[74px] border-t border-white/5 bg-[#13161F] rounded-b-[20px] flex items-center justify-center p-4">
              <button className="w-full bg-[#41bf63] hover:bg-[#6ee7a0] text-[#0B0C10] font-bold py-2.5 rounded-full text-[12px] uppercase tracking-wider transition-colors shadow-xl" onClick={() => openPayment("starter")} type="button">
                Get Started
              </button>
            </div>
          </div>

          {/* Professional Card (Most Popular) */}
          <div className="flex-1 flex flex-col rounded-[20px] border-2 border-[#41bf63] overflow-visible bg-[#13161F] text-center shadow-xl relative z-10 mt-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-[#6ee7a0] group">
            <div className="h-[210px] p-5 pt-16 flex flex-col items-center justify-center relative bg-[#13161F] rounded-t-[20px]">
              {/* Ribbon */}
              <div className="absolute top-6 left-[-8px] bg-[#41bf63] text-[#0B0C10] font-bold px-5 py-1.5 rounded-r-md shadow-xl text-xs tracking-wider z-10">
                PROFESSIONAL
                <div className="absolute top-full left-0 w-0 h-0 border-t-[8px] border-t-[#2f9d51] border-l-[8px] border-l-transparent"></div>
              </div>
              
              <div className="absolute top-0 right-0 bg-[#41bf63]/10 text-[#41bf63] text-[9px] font-bold px-3 py-1.5 rounded-bl-lg rounded-tr-[18px] uppercase tracking-wider">
                Most Popular
              </div>
              
              <div className="flex items-baseline justify-center mb-1">
                <span className="text-3xl font-black text-white">
                  {billing === "monthly" ? "₹2,499" : "₹2,083"}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-bold mb-3 uppercase tracking-wider">/ Per Month</div>
              
              <div className="flex items-center justify-center gap-1.5 mb-2 text-[10px]">
                <span className="text-slate-400 font-bold">₹24,990 / yr</span>
                <span className="bg-[#41bf63]/10 text-[#41bf63] px-1.5 py-0.5 rounded text-[9px] font-bold">Save 20%</span>
              </div>
              
              <p className="text-[11px] text-slate-500 px-2 leading-relaxed">
                For growing teams.
              </p>
            </div>
            
            <div className="flex flex-col flex-grow text-[13px] text-slate-300 font-medium bg-[#13161F]">
              <div className="flex items-center justify-center h-[38px] border-t border-white/5">Up to 200</div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5">500</div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5">30 days</div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5">Full</div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><Check className="w-4 h-4 text-[#41bf63]" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><Check className="w-4 h-4 text-[#41bf63]" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><Check className="w-4 h-4 text-[#41bf63]" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><Check className="w-4 h-4 text-[#41bf63]" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><Check className="w-4 h-4 text-[#41bf63]" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><Check className="w-4 h-4 text-[#41bf63]" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5">Standard</div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><X className="w-4 h-4 text-slate-500" /></div>
            </div>
            
            <div className="h-[74px] border-t border-white/5 bg-[#13161F] rounded-b-[20px] flex items-center justify-center p-4">
              <button className="w-full bg-[#41bf63] hover:bg-[#6ee7a0] text-[#0B0C10] font-bold py-2.5 rounded-full text-[12px] uppercase tracking-wider transition-colors shadow-xl" onClick={() => openPayment("professional")} type="button">
                Get Started
              </button>
            </div>
          </div>

          {/* Enterprise Card */}
          <div className="flex-1 flex flex-col rounded-[20px] border border-white/5 overflow-visible bg-[#13161F] text-center shadow-xl relative mt-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#6ee7a0] group">
            <div className="h-[210px] p-5 pt-16 flex flex-col items-center justify-center relative bg-[#13161F] rounded-t-[20px]">
              {/* Ribbon */}
              <div className="absolute top-6 left-[-8px] bg-[#41bf63] text-[#0B0C10] font-bold px-5 py-1.5 rounded-r-md shadow-xl text-xs tracking-wider z-10">
                ENTERPRISE
                <div className="absolute top-full left-0 w-0 h-0 border-t-[8px] border-t-[#2f9d51] border-l-[8px] border-l-transparent"></div>
              </div>
              
              <div className="flex items-baseline justify-center mb-1">
                <span className="text-3xl font-black text-white">
                  {billing === "monthly" ? "₹5,999" : "₹4,999"}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-bold mb-3 uppercase tracking-wider">/ Per Month</div>
              
              <div className="flex items-center justify-center gap-1.5 mb-2 text-[10px]">
                <span className="text-slate-400 font-bold">₹59,990 / yr</span>
                <span className="bg-[#41bf63]/10 text-[#41bf63] px-1.5 py-0.5 rounded text-[9px] font-bold">Save 20%</span>
              </div>
              
              <p className="text-[11px] text-slate-500 px-2 leading-relaxed">
                For advanced operations.
              </p>
            </div>
            
            <div className="flex flex-col flex-grow text-[13px] text-slate-400 font-medium bg-[#13161F]">
              <div className="flex items-center justify-center h-[38px] border-t border-white/5">Unlimited</div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5">2000+</div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5">90 days</div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5">Full + Adv.</div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><Check className="w-4 h-4 text-[#41bf63]" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><Check className="w-4 h-4 text-[#41bf63]" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><Check className="w-4 h-4 text-[#41bf63]" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><Check className="w-4 h-4 text-[#41bf63]" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><Check className="w-4 h-4 text-[#41bf63]" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><Check className="w-4 h-4 text-[#41bf63]" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5">Priority</div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><Check className="w-4 h-4 text-[#41bf63]" /></div>
            </div>
            
            <div className="h-[74px] border-t border-white/5 bg-[#13161F] rounded-b-[20px] flex items-center justify-center p-4">
              <button className="w-full bg-[#41bf63] hover:bg-[#6ee7a0] text-[#0B0C10] font-bold py-2.5 rounded-full text-[12px] uppercase tracking-wider transition-colors shadow-xl" onClick={() => openPayment("enterprise")} type="button">
                Get Started
              </button>
            </div>
          </div>

          {/* Custom Card */}
          <div className="flex-1 flex flex-col rounded-[20px] border border-white/5 overflow-visible bg-[#13161F] text-center shadow-xl relative mt-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#6ee7a0] group">
            <div className="h-[210px] p-5 pt-16 flex flex-col items-center justify-center relative bg-[#13161F] rounded-t-[20px]">
              {/* Ribbon */}
              <div className="absolute top-6 left-[-8px] bg-[#41bf63] text-[#0B0C10] font-bold px-5 py-1.5 rounded-r-md shadow-xl text-xs tracking-wider z-10">
                CUSTOM
                <div className="absolute top-full left-0 w-0 h-0 border-t-[8px] border-t-[#2f9d51] border-l-[8px] border-l-transparent"></div>
              </div>
              
              <div className="flex items-baseline justify-center mb-1 mt-2">
                <span className="text-xl font-black text-white">Custom Pricing</span>
              </div>
              
              <p className="text-[11px] text-slate-500 px-2 leading-relaxed mt-4">
                Tailored for your business. Contact us for a quote.
              </p>
            </div>
            
            <div className="flex flex-col flex-grow text-[13px] text-slate-400 font-medium bg-[#13161F]">
              <div className="flex items-center justify-center h-[38px] border-t border-white/5">Custom</div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5">Custom</div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5">Custom</div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5">Custom</div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><Check className="w-4 h-4 text-[#41bf63]" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><Check className="w-4 h-4 text-[#41bf63]" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><Check className="w-4 h-4 text-[#41bf63]" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><Check className="w-4 h-4 text-[#41bf63]" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><Check className="w-4 h-4 text-[#41bf63]" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><Check className="w-4 h-4 text-[#41bf63]" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5">Dedicated</div>
              <div className="flex items-center justify-center h-[38px] border-t border-white/5"><Check className="w-4 h-4 text-[#41bf63]" /></div>
            </div>
            
            <div className="h-[74px] border-t border-white/5 bg-[#13161F] rounded-b-[20px] flex items-center justify-center p-4">
              <button className="w-full bg-[#41bf63] hover:bg-[#6ee7a0] text-[#0B0C10] font-bold py-2.5 rounded-full text-[12px] uppercase tracking-wider transition-colors shadow-xl" onClick={() => openPayment("custom")} type="button">
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Footer Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 rounded-xl border border-white/5 bg-[#13161F] p-5 items-start mt-8">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#41bf63]/10 text-[#41bf63] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[13px] font-bold mb-0.5">Token Based</h4>
              <p className="text-[10px] text-slate-500 leading-tight">Pay for what you use. No hidden costs.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#41bf63]/10 text-[#41bf63] flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[13px] font-bold mb-0.5">Flexible</h4>
              <p className="text-[10px] text-slate-500 leading-tight">Upgrade, downgrade anytime.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#41bf63]/10 text-[#41bf63] flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[13px] font-bold mb-0.5">Secure</h4>
              <p className="text-[10px] text-slate-500 leading-tight">Enterprise data protection.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[13px] font-bold mb-0.5">Instant Access</h4>
              <p className="text-[10px] text-slate-500 leading-tight">Get started in minutes.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#41bf63]/10 text-[#41bf63] flex items-center justify-center shrink-0">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[13px] font-bold mb-0.5">24/7 Support</h4>
              <p className="text-[10px] text-slate-500 leading-tight">We're here to support you.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
