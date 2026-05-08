import { LandingNavbar } from "@/components/LandingNavbar";
import { DetailedPricing } from "@/components/DetailedPricing";
import { LandingFooter } from "@/components/LandingFooter";
import { PricingFAQ } from "@/components/PricingFAQ";

export const metadata = {
  title: "Pricing | TeleRoot",
  description: "Simple, transparent pricing to power your growth with TeleRoot.",
};

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B0C10] relative">
      {/* Dark background block at the top so the white navbar text is visible before scrolling */}
      <div className="absolute top-0 left-0 right-0 h-[100px] bg-[#0B0C10] z-0"></div>
      
      <LandingNavbar />
      
      <main className="flex-grow pt-24 pb-12 relative z-10">
        <DetailedPricing />
        <PricingFAQ />
      </main>

      <LandingFooter />
    </div>
  );
}
