import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Zap, Crown, Building2, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'List your property in under 5 minutes',
  'Connect with verified tenants',
  'No commission on direct deals',
  'Dedicated agent support',
];

const plans = [
  {
    name: 'Basic',
    price: 'Free',
    period: '',
    description: 'For individual landlords',
    features: ['1 listing', 'Basic photos', 'Direct tenant contact', '30-day visibility'],
    icon: Building2,
    highlighted: false,
  },
  {
    name: 'Agent Plus',
    price: '₦5,000',
    period: '/month',
    description: 'For professional agents',
    features: ['Unlimited listings', 'Featured placement', 'Virtual tour support', 'Priority support', 'Analytics dashboard'],
    icon: Zap,
    highlighted: true,
  },
  {
    name: 'Premium',
    price: '₦15,000',
    period: '/month',
    description: 'For agencies',
    features: ['Everything in Plus', 'Verified badge', 'Homepage feature', 'Dedicated account manager', 'API access'],
    icon: Crown,
    highlighted: false,
  },
];

export function Landlords() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: true,
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.pricing-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, rotate: 1 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              end: 'top 45%',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="landlords"
      ref={sectionRef}
      className="py-16 lg:py-24 px-4 sm:px-6 lg:px-12 bg-[#f0e6d8]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Content */}
          <div ref={contentRef}>
            <div className="inline-flex items-center gap-2 bg-[#008751]/10 text-[#008751] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              For Landlords & Agents
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a2e] mb-5">
              List Your Property & Find Tenants Fast
            </h2>
            <p className="text-[#6B7280] mb-6 text-sm lg:text-base">
              Join thousands of landlords and agents across Nigeria. Our platform connects you directly with serious tenants looking for properties like yours.
            </p>
            <ul className="space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#008751] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[#1a1a2e] text-sm lg:text-base">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="bg-[#008751] hover:bg-[#006b41] text-white rounded-full px-8 py-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              List Your Property Free
            </Button>
          </div>

          {/* Pricing Cards */}
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`pricing-card rounded-2xl p-5 ${
                    plan.highlighted
                      ? 'bg-[#008751] text-white shadow-[0_18px_40px_rgba(0,135,81,0.25)]'
                      : 'bg-white text-[#1a1a2e] shadow-[0_18px_40px_rgba(0,135,81,0.08)]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        plan.highlighted ? 'bg-white/20' : 'bg-[#f0e6d8]'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          plan.highlighted ? 'text-white' : 'text-[#008751]'
                        }`}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        plan.highlighted ? 'text-white/80' : 'text-[#6B7280]'
                      }`}
                    >
                      {plan.name}
                    </span>
                  </div>

                  <div className="mb-3">
                    <span className="text-2xl lg:text-3xl font-bold">{plan.price}</span>
                    <span
                      className={`text-sm ${
                        plan.highlighted ? 'text-white/70' : 'text-[#6B7280]'
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>

                  <p
                    className={`text-sm mb-4 ${
                      plan.highlighted ? 'text-white/80' : 'text-[#6B7280]'
                    }`}
                  >
                    {plan.description}
                  </p>

                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check
                          className={`w-4 h-4 ${
                            plan.highlighted ? 'text-white' : 'text-[#008751]'
                          }`}
                        />
                        <span
                          className={`text-xs ${
                            plan.highlighted ? 'text-white/90' : 'text-[#6B7280]'
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full mt-5 py-3 rounded-full text-sm font-medium transition-colors ${
                      plan.highlighted
                        ? 'bg-white text-[#008751] hover:bg-white/90'
                        : 'bg-[#008751] text-white hover:bg-[#006b41]'
                    }`}
                  >
                    Get started
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
