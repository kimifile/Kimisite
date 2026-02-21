import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Zap, Star, ArrowRight, Sparkles, Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { properties } from '@/data/properties';
import type { Property } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface ShortletSectionProps {
  onPropertyClick: (property: Property) => void;
}

export function ShortletSection({ onPropertyClick }: ShortletSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const shortletProperties = properties.filter((p) => p.propertyCategory === 'shortlet');

  const benefits = [
    { icon: Zap, label: 'Instant Booking' },
    { icon: Shield, label: 'Verified Hosts' },
    { icon: Sparkles, label: 'Fully Furnished' },
    { icon: Check, label: 'Flexible Stays' },
  ];

  return (
    <section
      id="shortlet"
      ref={sectionRef}
      className="py-12 lg:py-16 bg-white"
    >
      <div ref={contentRef} className="section-container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
              <Clock className="w-4 h-4" />
              Short-term Stays
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-slate-900">
              Shortlets & Lounge Rooms
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Perfect for business trips, vacations, or temporary stays
            </p>
          </div>
          <Button variant="ghost" className="text-[#0077ff] hover:text-[#0066dd]">
            Explore all shortlets
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap gap-3 mb-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.label}
                className="flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-full text-sm text-slate-600"
              >
                <Icon className="w-4 h-4 text-pink-500" />
                {benefit.label}
              </div>
            );
          })}
        </div>

        {/* Featured Shortlets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shortletProperties.slice(0, 3).map((property) => (
            <div
              key={property.id}
              onClick={() => onPropertyClick(property)}
              className="bg-white rounded-xl overflow-hidden cursor-pointer border border-slate-100 hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <span className="badge-shortlet absolute top-3 left-3">
                  Shortlet
                </span>
                {property.isInstantBook && (
                  <span className="badge-instant absolute top-3 right-3">
                    <Zap className="w-3 h-3" />
                    Instant
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium">{property.rating}</span>
                  <span className="text-sm text-slate-400">({property.reviewCount})</span>
                </div>
                <h4 className="font-semibold text-slate-900 line-clamp-1">{property.title}</h4>
                <p className="text-sm text-slate-500 mt-1">{property.location}</p>
                <div className="flex items-baseline gap-1 mt-3">
                  <span className="text-xl font-bold text-[#ff6b35]">
                    ₦{property.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-400">/night</span>
                </div>
                {property.minStay && (
                  <p className="text-xs text-slate-400 mt-1">
                    Min {property.minStay} night{property.minStay > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 p-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl text-white text-center">
          <h3 className="text-lg font-bold mb-2">Have a property to shortlet?</h3>
          <p className="text-sm text-white/80 mb-4">
            List your apartment and start earning from day one
          </p>
          <Button className="bg-white text-pink-600 hover:bg-white/90 rounded-full px-6">
            List Your Shortlet
          </Button>
        </div>
      </div>
    </section>
  );
}
