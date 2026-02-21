import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, MapPin } from 'lucide-react';
import { testimonials } from '@/data/properties';

gsap.registerPlugin(ScrollTrigger);

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, x: '-10vw' },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
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
      id="testimonials"
      ref={sectionRef}
      className="py-16 lg:py-24 px-4 sm:px-6 lg:px-12 bg-[#FFF8F0]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Headline */}
          <div ref={headlineRef} className="lg:col-span-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a2e] leading-tight">
              What Nigerians Are Saying
            </h2>
            <p className="text-[#6B7280] mt-4 text-sm lg:text-base">
              Real stories from real people who found their perfect property through RentHorizon.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-bold text-[#008751]">50K+</p>
                <p className="text-xs text-[#6B7280]">Happy Users</p>
              </div>
              <div className="w-px h-10 bg-[#f0e6d8]" />
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-bold text-[#008751]">4.8</p>
                <p className="text-xs text-[#6B7280]">App Rating</p>
              </div>
            </div>
          </div>

          {/* Testimonial Cards */}
          <div ref={cardsRef} className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="testimonial-card bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,135,81,0.08)] border border-[rgba(0,135,81,0.08)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-[#1a1a2e] text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-[#6B7280]">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-[#1a1a2e] text-sm leading-relaxed mb-3">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                  <MapPin className="w-3 h-3" />
                  {testimonial.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
