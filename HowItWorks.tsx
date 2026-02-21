import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Phone, Key } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Search for your perfect property',
    description: 'Browse thousands of verified listings across Nigeria. Filter by location, price, property type, and amenities to find exactly what you need.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Contact agents directly',
    description: 'Connect with verified agents via phone or WhatsApp. No middlemen, no hidden fees. Discuss directly and schedule viewings.',
    icon: Phone,
  },
  {
    number: '03',
    title: 'Secure your new home',
    description: 'Once you find the perfect place, complete the agreement and move in. Our agents guide you through the entire process.',
    icon: Key,
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.step-card');
      const badges = cardsRef.current?.querySelectorAll('.step-badge');

      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, rotate: -1 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.7,
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              end: 'top 40%',
              scrub: true,
            },
          }
        );
      }

      if (badges) {
        gsap.fromTo(
          badges,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: 'back.out(1.4)',
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
      id="how-it-works"
      ref={sectionRef}
      className="py-16 lg:py-24 px-4 sm:px-6 lg:px-12 bg-[#f0e6d8]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a2e] mb-4">
            How RentHorizon Works
          </h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto text-sm lg:text-base">
            Finding your perfect property in Nigeria is simple. Follow these three easy steps.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="step-card bg-white rounded-2xl p-5 lg:p-8 shadow-[0_4px_20px_rgba(0,135,81,0.08)] border border-[rgba(0,135,81,0.08)]"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="step-badge w-12 h-12 lg:w-14 lg:h-14 bg-[#008751] rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <span className="text-4xl lg:text-5xl font-black text-[#f0e6d8]">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-[#1a1a2e] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#6B7280] text-sm lg:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
