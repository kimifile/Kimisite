import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, MapPin, Star, ArrowRight, Wifi, BookOpen, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { properties } from '@/data/properties';
import type { Property } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface StudentHousingProps {
  onPropertyClick: (property: Property) => void;
}

export function StudentHousing({ onPropertyClick }: StudentHousingProps) {
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

  const studentProperties = properties.filter((p) => p.propertyCategory === 'student');

  const features = [
    { icon: Wifi, label: 'Free WiFi' },
    { icon: BookOpen, label: 'Study Areas' },
    { icon: Shield, label: '24/7 Security' },
    { icon: Zap, label: 'Generator' },
  ];

  const schools = [
    { name: 'UNILAG', location: 'Akoka, Lagos', count: 45 },
    { name: 'YabaTech', location: 'Yaba, Lagos', count: 32 },
    { name: 'UniAbuja', location: 'Gwagwalada, Abuja', count: 28 },
    { name: 'UNN', location: 'Nsukka, Enugu', count: 21 },
  ];

  return (
    <section
      id="student"
      ref={sectionRef}
      className="py-12 lg:py-16 bg-gradient-to-br from-amber-50 to-orange-50"
    >
      <div ref={contentRef} className="section-container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
              <GraduationCap className="w-4 h-4" />
              For Students
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-slate-900">
              Student Accommodation
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Hostels and self-contain near major universities
            </p>
          </div>
          <Button variant="ghost" className="text-[#0077ff] hover:text-[#0066dd]">
            View all student stays
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-3 mb-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.label}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm text-slate-600"
              >
                <Icon className="w-4 h-4 text-amber-500" />
                {feature.label}
              </div>
            );
          })}
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8">
          {schools.map((school) => (
            <button
              key={school.name}
              className="p-4 bg-white rounded-xl text-left hover:shadow-md transition-shadow"
            >
              <p className="font-semibold text-slate-900">{school.name}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" />
                {school.location}
              </p>
              <p className="text-sm text-[#0077ff] mt-2">{school.count} listings</p>
            </button>
          ))}
        </div>

        {/* Featured Student Properties */}
        <h3 className="font-semibold text-slate-900 mb-4">Popular Near Campuses</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {studentProperties.slice(0, 3).map((property) => (
            <div
              key={property.id}
              onClick={() => onPropertyClick(property)}
              className="bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <span className="badge-student absolute top-3 left-3">
                  Student
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium">{property.rating}</span>
                </div>
                <h4 className="font-semibold text-slate-900 line-clamp-1">{property.title}</h4>
                <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {property.location}
                </p>
                <p className="text-lg font-bold text-[#ff6b35] mt-2">
                  ₦{(property.price / 1000).toFixed(0)}K
                  <span className="text-sm text-slate-400 font-normal">/year</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
