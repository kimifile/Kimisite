import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SlidersHorizontal, Map, Grid3X3, List } from 'lucide-react';
import { PropertyCard } from '@/components/PropertyCard';
import type { Property } from '@/types';
import { properties } from '@/data/properties';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedListingsProps {
  onPropertyClick: (property: Property) => void;
}

export function FeaturedListings({ onPropertyClick }: FeaturedListingsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMap, setShowMap] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'student', label: 'Student' },
    { id: 'shortlet', label: 'Shortlet' },
    { id: 'instant', label: 'Instant Book' },
  ];

  const filteredProperties = properties.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'instant') return p.isInstantBook;
    return p.propertyCategory === activeFilter;
  });

  const toggleFavorite = (e: React.MouseEvent, propertyId: string) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });
  };

  return (
    <section
      id="listings"
      ref={sectionRef}
      className="py-12 lg:py-16 bg-white"
    >
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-slate-900">
              Featured Stays
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {filteredProperties.length} places available
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-slate-500'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'text-slate-500'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Map Toggle */}
            <button
              onClick={() => setShowMap(!showMap)}
              className="map-toggle"
            >
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Map</span>
            </button>

            {/* Filter Button */}
            <button className="map-toggle">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`filter-chip whitespace-nowrap ${activeFilter === filter.id ? 'active' : ''}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          className={`grid gap-4 lg:gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}
        >
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => onPropertyClick(property)}
              isFavorite={favorites.has(property.id)}
              onFavoriteToggle={(e) => toggleFavorite(e, property.id)}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-8">
          <button className="px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-medium text-slate-700 transition-colors">
            Load more
          </button>
        </div>
      </div>
    </section>
  );
}
