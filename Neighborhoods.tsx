import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin } from 'lucide-react';
import { neighborhoods } from '@/data/properties';

gsap.registerPlugin(ScrollTrigger);

export function Neighborhoods() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.neighborhood-card');
      const labels = cardsRef.current?.querySelectorAll('.neighborhood-label');

      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              end: 'top 40%',
              scrub: true,
            },
          }
        );
      }

      if (labels) {
        gsap.fromTo(
          labels,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
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

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `₦${(price / 1000000).toFixed(1)}M`;
    }
    return `₦${(price / 1000).toFixed(0)}K`;
  };

  return (
    <section
      id="neighborhoods"
      ref={sectionRef}
      className="py-16 lg:py-24 px-4 sm:px-6 lg:px-12 bg-[#FFF8F0]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 lg:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a2e]">
              Explore Areas in Nigeria
            </h2>
            <p className="text-sm text-[#6B7280] mt-2">
              Discover properties in top Nigerian cities
            </p>
          </div>
          <button className="flex items-center gap-2 text-[#008751] hover:text-[#006b41] font-medium transition-colors">
            View all areas
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {neighborhoods.slice(0, 3).map((neighborhood) => (
            <div
              key={neighborhood.id}
              className="neighborhood-card group relative h-[220px] sm:h-[260px] lg:h-[300px] rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={neighborhood.image}
                alt={neighborhood.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="neighborhood-label absolute bottom-5 left-5 right-5">
                <div className="flex items-center gap-2 text-white/80 text-xs mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  {neighborhood.state}
                </div>
                <span className="bg-white/90 backdrop-blur-sm text-[#1a1a2e] px-4 py-2 rounded-full text-sm font-semibold">
                  {neighborhood.name}
                </span>
                <div className="flex items-center gap-4 mt-3">
                  <p className="text-white text-sm">
                    {neighborhood.listingCount} listings
                  </p>
                  <p className="text-white/80 text-sm">
                    Avg: {formatPrice(neighborhood.avgPrice)}/yr
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-4 lg:mt-6">
          {neighborhoods.slice(3).map((neighborhood) => (
            <div
              key={neighborhood.id}
              className="neighborhood-card group relative h-[200px] sm:h-[240px] rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={neighborhood.image}
                alt={neighborhood.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="neighborhood-label absolute bottom-5 left-5 right-5">
                <div className="flex items-center gap-2 text-white/80 text-xs mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  {neighborhood.state}
                </div>
                <span className="bg-white/90 backdrop-blur-sm text-[#1a1a2e] px-4 py-2 rounded-full text-sm font-semibold">
                  {neighborhood.name}
                </span>
                <div className="flex items-center gap-4 mt-3">
                  <p className="text-white text-sm">
                    {neighborhood.listingCount} listings
                  </p>
                  <p className="text-white/80 text-sm">
                    Avg: {formatPrice(neighborhood.avgPrice)}/yr
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
