import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DollarSign, Bed, Bath, Home, MapPin, Sparkles, Building2, Store, Warehouse } from 'lucide-react';
import { amenitiesList, nigerianStates, propertyTypes } from '@/data/properties';

gsap.registerPlugin(ScrollTrigger);

const filterChips = [
  { id: 'price', label: 'Price Range', icon: DollarSign },
  { id: 'type', label: 'Property Type', icon: Home },
  { id: 'location', label: 'Location', icon: MapPin },
  { id: 'beds', label: 'Bedrooms', icon: Bed },
  { id: 'baths', label: 'Bathrooms', icon: Bath },
  { id: 'amenities', label: 'Amenities', icon: Sparkles },
];

const categories = [
  { id: 'all', label: 'All Properties', icon: Building2 },
  { id: 'residential', label: 'Residential', icon: Home },
  { id: 'commercial', label: 'Commercial', icon: Store },
  { id: 'industrial', label: 'Industrial', icon: Warehouse },
];

export function SmartFilters() {
  const sectionRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(new Set());
  const [selectedType, setSelectedType] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { opacity: 0, x: '-6vw' },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: barRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: true,
          },
        }
      );

      const chips = barRef.current?.querySelectorAll('.filter-chip-item');
      if (chips) {
        gsap.fromTo(
          chips,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            scrollTrigger: {
              trigger: barRef.current,
              start: 'top 80%',
              end: 'top 55%',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) => {
      const newFilters = new Set(prev);
      if (newFilters.has(filterId)) {
        newFilters.delete(filterId);
      } else {
        newFilters.add(filterId);
      }
      return newFilters;
    });
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) => {
      const newAmenities = new Set(prev);
      if (newAmenities.has(amenity)) {
        newAmenities.delete(amenity);
      } else {
        newAmenities.add(amenity);
      }
      return newAmenities;
    });
  };

  return (
    <section
      id="filters"
      ref={sectionRef}
      className="py-6 lg:py-10 px-4 sm:px-6 lg:px-12 bg-[#FFF8F0]"
    >
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 lg:gap-3 mb-4 lg:mb-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#008751] text-white'
                  : 'bg-white border border-[rgba(0,135,81,0.15)] text-[#1a1a2e] hover:border-[#008751] hover:text-[#008751]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
            </button>
          );
        })}
      </div>

      <div ref={barRef} className="flex flex-col gap-4">
        {/* Filter Label & Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-[#1a1a2e] uppercase tracking-wider mr-2">
            Filters:
          </span>
          {filterChips.map((chip) => {
            const Icon = chip.icon;
            const isActive = activeFilters.has(chip.id);
            return (
              <button
                key={chip.id}
                onClick={() => toggleFilter(chip.id)}
                className={`filter-chip-item filter-chip flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full border text-xs lg:text-sm font-medium transition-all ${
                  isActive
                    ? 'active border-[#008751]'
                    : 'bg-white border-[rgba(0,135,81,0.15)] text-[#1a1a2e] hover:border-[#008751] hover:text-[#008751]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {chip.label}
              </button>
            );
          })}
        </div>

        {/* Expanded Filters */}
        <div className="space-y-3">
          {/* Property Type */}
          {activeFilters.has('type') && (
            <div className="p-4 bg-white rounded-2xl border border-[rgba(0,135,81,0.1)]">
              <p className="text-sm font-medium text-[#1a1a2e] mb-3">Select property type</p>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedType === type.value
                        ? 'bg-[#008751] text-white'
                        : 'bg-[#f0e6d8] text-[#6B7280] hover:bg-[#008751] hover:text-white'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Location / State */}
          {activeFilters.has('location') && (
            <div className="p-4 bg-white rounded-2xl border border-[rgba(0,135,81,0.1)]">
              <p className="text-sm font-medium text-[#1a1a2e] mb-3">Select state/city</p>
              <div className="flex flex-wrap gap-2">
                {nigerianStates.map((state) => (
                  <button
                    key={state}
                    onClick={() => setSelectedState(state)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedState === state
                        ? 'bg-[#008751] text-white'
                        : 'bg-[#f0e6d8] text-[#6B7280] hover:bg-[#008751] hover:text-white'
                    }`}
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price Range */}
          {activeFilters.has('price') && (
            <div className="p-4 bg-white rounded-2xl border border-[rgba(0,135,81,0.1)]">
              <p className="text-sm font-medium text-[#1a1a2e] mb-3">Price range (₦/year)</p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-xs text-[#6B7280]">Min</label>
                  <input
                    type="number"
                    placeholder="₦0"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-[rgba(0,135,81,0.15)] rounded-lg text-sm focus:outline-none focus:border-[#008751]"
                  />
                </div>
                <span className="text-[#6B7280] mt-5">—</span>
                <div className="flex-1">
                  <label className="text-xs text-[#6B7280]">Max</label>
                  <input
                    type="number"
                    placeholder="₦50M+"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-[rgba(0,135,81,0.15)] rounded-lg text-sm focus:outline-none focus:border-[#008751]"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {['₦500K', '₦1M', '₦2M', '₦5M', '₦10M+'].map((price) => (
                  <button
                    key={price}
                    className="px-3 py-1.5 bg-[#f0e6d8] text-[#6B7280] rounded-full text-xs hover:bg-[#008751] hover:text-white transition-colors"
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Beds/Baths */}
          {(activeFilters.has('beds') || activeFilters.has('baths')) && (
            <div className="p-4 bg-white rounded-2xl border border-[rgba(0,135,81,0.1)]">
              {activeFilters.has('beds') && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-[#1a1a2e] mb-2">Bedrooms</p>
                  <div className="flex flex-wrap gap-2">
                    {['Any', 'Self-Contain', '1', '2', '3', '4', '5+'].map((option) => (
                      <button
                        key={option}
                        className="px-4 py-2 rounded-full border border-[rgba(0,135,81,0.15)] text-sm font-medium hover:border-[#008751] hover:text-[#008751] transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {activeFilters.has('baths') && (
                <div>
                  <p className="text-sm font-medium text-[#1a1a2e] mb-2">Bathrooms</p>
                  <div className="flex flex-wrap gap-2">
                    {['Any', '1', '2', '3', '4+'].map((option) => (
                      <button
                        key={option}
                        className="px-4 py-2 rounded-full border border-[rgba(0,135,81,0.15)] text-sm font-medium hover:border-[#008751] hover:text-[#008751] transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Amenities */}
          {activeFilters.has('amenities') && (
            <div className="p-4 bg-white rounded-2xl border border-[rgba(0,135,81,0.1)]">
              <p className="text-sm font-medium text-[#1a1a2e] mb-3">Select amenities</p>
              <div className="flex flex-wrap gap-2">
                {amenitiesList.map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedAmenities.has(amenity)
                        ? 'bg-[#008751] text-white'
                        : 'bg-[#f0e6d8] text-[#6B7280] hover:bg-[#008751] hover:text-white'
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
