import { PaymentCheckout } from "./PaymentCheckout";

const plans = {
  starter: {
    name: "Starter",
    description: "Perfect for getting started.",
    monthly: "Rs 999",
    yearly: "Rs 833",
    yearlyTotal: "Rs 9,990",
    agents: "Up to 50",
    devices: "100",
    retention: "7 days",
    support: "Community",
    sla: "Not included"
  },
  professional: {
    name: "Professional",
    description: "For growing teams.",
    monthly: "Rs 2,499",
    yearly: "Rs 2,083",
    yearlyTotal: "Rs 24,990",
    agents: "Up to 200",
    devices: "500",
    retention: "30 days",
    support: "Standard",
    sla: "Not included"
  },
  enterprise: {
    name: "Enterprise",
    description: "For advanced operations.",
    monthly: "Rs 5,999",
    yearly: "Rs 4,999",
    yearlyTotal: "Rs 59,990",
    agents: "Unlimited",
    devices: "2000+",
    retention: "90 days",
    support: "Priority",
    sla: "Included"
  },
  custom: {
    name: "Custom",
    description: "Tailored for your business. Contact us for a quote.",
    monthly: "Custom",
    yearly: "Custom",
    yearlyTotal: "Custom",
    agents: "Custom",
    devices: "Custom",
    retention: "Custom",
    support: "Dedicated",
    sla: "Included"
  }
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function PricingPaymentPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const planKey = typeof params.plan === "string" && params.plan in plans ? params.plan as keyof typeof plans : "starter";
  const billing = params.billing === "yearly" ? "yearly" : "monthly";

  return <PaymentCheckout billing={billing} plan={plans[planKey]} />;
}
