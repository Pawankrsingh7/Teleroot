"use client";

import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  CreditCard,
  HelpCircle,
  Landmark,
  LockKeyhole,
  Mail,
  QrCode,
  ReceiptText,
  ShieldCheck,
  UserRound,
  Globe,
  Wallet,
  Smartphone,
  Banknote,
  Send
} from "lucide-react";


import { LandingNavbar } from "@/components/LandingNavbar";


const paymentMethods = [
  { id: "visa", label: "Visa", icon: "/visa-icon.png" },
  { id: "mastercard", label: "Mastercard", icon: "/master-card-icon.png" },
  { id: "paypal", label: "PayPal", icon: "/paypal-icon.png" },
  { id: "stripe", label: "Stripe", icon: "/stripe-payment-icon.png" },
  { id: "phonepe", label: "PhonePe", icon: "/phonepe-icon.png" },
  { id: "google", label: "Google Pay", icon: "/google-pay-icon.png" },
  { id: "apple", label: "Apple Pay", icon: "/apple-logo.png" },
  { id: "bank", label: "Bank Wire", icon: "/wire-transfer-icon.png" }
];

type CheckoutPlan = {
  name: string;
  description: string;
  monthly: string;
  yearly: string;
  yearlyTotal: string;
  agents: string;
  devices: string;
  retention: string;
  support: string;
  sla: string;
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
      {children}
    </label>
  );
}

const inputClass = "h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-[#41bf63] focus:bg-[#41bf63]/5";

export function PaymentCheckout({ plan, billing }: { plan: CheckoutPlan; billing: "monthly" | "yearly" }) {
  const [method, setMethod] = useState("card");
  const [country, setCountry] = useState("India");

  const currencies: Record<string, { code: string; symbol: string }> = {
    "India": { code: "INR", symbol: "₹" },
    "United States": { code: "USD", symbol: "$" },
    "United Kingdom": { code: "GBP", symbol: "£" }
  };

  const currentCurrency = currencies[country] || currencies["India"];

  const formatPrice = (priceStr: string) => {
    // Replace Rs or other currency prefixes with the selected symbol
    return priceStr.replace(/Rs\s?/, currentCurrency.symbol + " ");
  };

  const amount = billing === "monthly" ? plan.monthly : plan.yearly;
  const total = billing === "monthly" ? amount : plan.yearlyTotal;
  const isCustom = total === "Custom";
  const actionLabel = isCustom ? "Request quote" : "Review & Pay";
  const planItems = [
    `${plan.agents} active agents`,
    `${plan.devices} devices monitored`,
    `${plan.retention} data retention`,
    `${plan.support} support`,
    `${plan.sla} SLA`,
    "AI agents and automation tools",
    "Fraud and fiber monitoring",
    "Custom reports"
  ];

  return (
    <main className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#41bf63]/30">
      <LandingNavbar />
      <div className="mx-auto max-w-7xl px-4 pb-6 pt-32 sm:px-6 lg:px-8">
        <header className="mb-7 overflow-hidden rounded-2xl border border-white/5 bg-[#13161F] shadow-2xl">
          <div className="relative px-5 py-8">
            <div className="absolute inset-0 bg-gradient-to-b from-[#41bf63]/5 to-transparent" />
            <div className="relative flex flex-col items-center text-center">
              <div className="flex items-center gap-2 rounded-full border border-[#41bf63]/20 bg-[#41bf63]/10 px-3 py-1">
                <span className="flex h-4 w-4 items-center justify-center text-[#41bf63]">
                  <LockKeyhole className="h-3 w-3" />
                </span>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#41bf63]">Secure Checkout</p>
              </div>
              <h1 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-4xl">Complete your purchase</h1>
              <p className="mt-2 max-w-2xl text-sm font-semibold text-slate-400">You are almost there. Fill in your details and start your journey with TeleRoot.</p>
            </div>
          </div>
        </header>

        <div className="mb-7 grid grid-cols-[auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto] items-center gap-3 text-[11px] font-bold text-slate-500 lg:max-w-3xl">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#41bf63] bg-[#41bf63]/10 text-[#41bf63]"><Check className="h-3.5 w-3.5" /></span>
          <span className="h-px bg-[#41bf63]/35" />
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#41bf63] text-[#0B0C10]">2</span>
          <span className="h-px bg-white/15" />
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-slate-400">3</span>
          <span className="col-start-1 whitespace-nowrap text-[#41bf63]">1. Choose Plan</span>
          <span className="col-start-3 whitespace-nowrap text-white">2. Billing Details</span>
          <span className="col-start-5 whitespace-nowrap">3. Review & Pay</span>
        </div>

        <form id="checkout-form" className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]" onSubmit={(e) => { e.preventDefault(); alert("Payment Successful! Your subscription is now active."); }}>
          <div className="space-y-6">
          <section className="rounded-xl border border-white/10 bg-[#13161F] p-5 shadow-2xl">
            <h2 className="text-base font-black text-white">Billing Information</h2>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Field label="Full name">
                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input className={`${inputClass} pl-9`} placeholder="Alex Smith" required />
                </div>
              </Field>
              <Field label="Email address">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input className={`${inputClass} pl-9`} placeholder="alex.smith@company.com" required type="email" />
                </div>
              </Field>
              <Field label="Company name">
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input className={`${inputClass} pl-9`} placeholder="Acme Corporation" required />
                </div>
              </Field>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Field label="Country">
                <select 
                  className={`${inputClass} [&>option]:bg-[#13161F] [&>option]:text-white`} 
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
              </Field>
              <div className="md:col-span-2">
                <Field label="Address"><input className={inputClass} placeholder="123 Innovation Drive" required /></Field>
              </div>
              <Field label="City"><input className={inputClass} placeholder="Bengaluru" required /></Field>
              <Field label="State / Province"><input className={inputClass} placeholder="Karnataka" required /></Field>
              <Field label="ZIP / Postal code"><input className={inputClass} placeholder="560001" required /></Field>
            </div>

            <label className="mt-4 flex w-max items-center gap-2 text-xs font-semibold text-slate-500">
              <input className="h-4 w-4 rounded border-white/10 bg-white/5 accent-[#41bf63]" type="checkbox" />
              Use a different address for invoicing
            </label>

            <div className="mt-7">
              <h2 className="text-base font-black text-white">Select Payment Method</h2>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-8">
                {paymentMethods.map((item) => {
                  const active = method === item.id;

                  return (
                    <button
                      className={`group relative flex flex-col items-center justify-center gap-2 rounded-xl border p-2 transition-all duration-300 ${active ? "border-[#41bf63] bg-[#41bf63]/10 shadow-[0_0_15px_rgba(65,191,99,0.1)]" : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]"}`}
                      key={item.id}
                      onClick={() => setMethod(item.id)}
                      type="button"
                    >
                      <div className="flex h-11 w-14 items-center justify-center overflow-hidden rounded-lg bg-white p-1.5 transition-transform group-hover:scale-110 shadow-lg">
                        <img className="h-full w-full object-contain" src={item.icon} alt={item.label} />
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-tighter ${active ? "text-[#41bf63]" : "text-slate-500"}`}>{item.label}</span>
                      {active && (
                        <div className="absolute -right-1 -top-1">
                          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#41bf63] text-[#0B0C10] shadow-lg">
                            <Check className="h-2.5 w-2.5" />
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/5 bg-[#0B0C10]/50 p-6 backdrop-blur-xl">
              {(method === "visa" || method === "mastercard" || method === "stripe") && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <Field label="Card number">
                      <div className="relative">
                        <input className={`${inputClass} pr-14`} placeholder="4242 4242 4242 4242" required />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-white px-1.5 py-0.5 text-[9px] font-black text-[#0B0C10]">
                          {method.toUpperCase()}
                        </span>
                      </div>
                    </Field>
                  </div>
                  <Field label="Name on card"><input className={inputClass} placeholder="Alex Smith" required /></Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Expiry date"><input className={inputClass} placeholder="12 / 28" required /></Field>
                    <Field label="CVV"><input className={inputClass} placeholder="123" required /></Field>
                  </div>
                </div>
              )}
              {method === "phonepe" && (
                <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_140px]">
                  <Field label="UPI ID"><input className={inputClass} placeholder="yourname@ybl" required /></Field>
                  <div className="flex min-h-24 items-center justify-center rounded-lg border border-white/10 bg-white/5"><QrCode className="h-12 w-12 text-[#41bf63]" /></div>
                </div>
              )}
              {method === "paypal" && (
                <div className="flex flex-col items-center justify-center py-4 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#0070ba]/10 p-2">
                    <img className="h-full w-full object-contain" src="/paypal-icon.png" alt="PayPal" />
                  </div>
                  <p className="text-sm font-bold text-white">PayPal Checkout</p>
                  <p className="mt-1 text-xs text-slate-500">You will be redirected to PayPal to complete your purchase securely.</p>
                  <button className="mt-4 flex items-center gap-2 rounded-lg bg-[#ffc439] px-6 py-2 text-xs font-black text-black hover:bg-[#f2ba36] transition" type="button">
                    <Wallet className="h-4 w-4" /> Pay with PayPal
                  </button>
                </div>
              )}
              {(method === "google" || method === "apple") && (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 p-3">
                    <img className="h-full w-full object-contain" src={method === "google" ? "/google-pay-icon.png" : "/apple-logo.png"} alt="Wallet" />
                  </div>
                  <p className="text-sm font-bold text-white">Express Checkout</p>
                  <p className="mt-1 text-xs text-slate-500">Fast and secure payment using your {method === "google" ? "Google" : "Apple"} Wallet.</p>
                  <button className="mt-5 rounded-lg bg-white px-8 py-2.5 text-xs font-black text-black transition hover:bg-slate-200" type="button">
                    Pay Now
                  </button>
                </div>
              )}
              {method === "bank" && (
                <div className="grid gap-2 rounded-lg border border-[#41bf63]/20 bg-[#41bf63]/10 p-4 text-sm font-semibold text-[#41bf63]">
                  <p>Account: TeleRoot AI Billing</p>
                  <p>IFSC: TELR0001024</p>
                  <p>Reference: {plan.name.replace(/\s+/g, "-").toUpperCase()}</p>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <LockKeyhole className="h-4 w-4 text-[#41bf63]" /> Your payment information is encrypted and secure.
            </div>
          </section>
          </div>
          <aside className="space-y-4">
            <section className="rounded-xl border border-white/10 bg-[#13161F] p-5 shadow-2xl">
              <h2 className="text-base font-black text-white">Order Summary</h2>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#41bf63]/20 bg-[#41bf63]/10 text-[#41bf63]"><ReceiptText className="h-5 w-5" /></div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black text-white">{plan.name} Plan</p>
                  <p className="text-xs font-semibold text-slate-500">{plan.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-white">{formatPrice(amount)}</p>
                  <p className="text-[10px] font-bold text-slate-500">/ month</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-3 text-xs font-bold">
                <span className="text-slate-500">Billed</span>
                <span className="text-white">{billing === "monthly" ? "Monthly" : "Yearly"}</span>
              </div>

              <div className="mt-5 space-y-3 border-b border-white/5 pb-5 text-xs font-semibold">
                <div className="flex justify-between gap-4"><span className="text-slate-500">Plan Price</span><span className="text-white">{formatPrice(amount)}</span></div>
                <div className="flex justify-between gap-4"><span className="text-slate-500">AI agents and automation</span><span className="text-white">Included</span></div>
                <div className="flex justify-between gap-4"><span className="text-slate-500">Fraud and fiber monitoring</span><span className="text-white">Included</span></div>
                {billing === "yearly" && <div className="flex justify-between gap-4 text-[#41bf63]"><span>Discount</span><span>20% off</span></div>}
              </div>

              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-white">Total Due Today</p>
                  <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-slate-500"><ShieldCheck className="h-4 w-4" /> Cancel anytime. No hidden fees.</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-white">{formatPrice(total)}</p>
                  <p className="text-[10px] font-bold uppercase text-slate-500">{currentCurrency.code}</p>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-white/10 bg-[#13161F] p-5 shadow-2xl">
              <h2 className="text-base font-black text-white">What's Included</h2>
              <div className="mt-4 space-y-3">
                {planItems.map((item) => (
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400" key={item}>
                    <CheckCircle2 className="h-4 w-4 text-[#41bf63]" /> {item}
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </form>

        <footer className="mt-6 grid gap-3 rounded-xl border border-white/5 bg-[#13161F] p-4 shadow-2xl md:grid-cols-[1fr_1fr_1fr_auto] md:items-center">
          {[
            [BadgeCheck, "30-day money back guarantee", "Not satisfied? Get a full refund."],
            [CreditCard, "Secure payments", "Industry-standard encryption."],
            [HelpCircle, "Need help?", "Contact our support team."]
          ].map(([Icon, title, detail]) => {
            const FooterIcon = Icon as typeof BadgeCheck;
            return (
              <div className="flex items-center gap-3" key={title as string}>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#41bf63]"><FooterIcon className="h-4 w-4" /></span>
                <div>
                  <p className="text-xs font-bold text-white">{title as string}</p>
                  <p className="text-[11px] font-semibold text-slate-500">{detail as string}</p>
                </div>
              </div>
            );
          })}
          <button className="h-11 rounded-lg bg-[#41bf63] px-8 text-sm font-black text-[#0B0C10] transition hover:bg-[#6ee7a0]" type="submit" form="checkout-form">
            {actionLabel} <ArrowRight className="ml-2 inline h-4 w-4" />
          </button>
        </footer>
      </div>
    </main>
  );
}
