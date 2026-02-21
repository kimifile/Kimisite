import { Heart, Star, MapPin, Zap, Users } from 'lucide-react';
import type { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
  isFavorite?: boolean;
  onFavoriteToggle?: (e: React.MouseEvent) => void;
}

const propertyTypeLabels: Record<string, string> = {
  hostel: 'Student Hostel',
  selfcon: 'Self-Contain',
  shortlet: 'Shortlet',
  lounge: 'Lounge',
  apartment: 'Apartment',
  shared: 'Shared Room',
  room: 'Room',
};

const categoryBadges: Record<string, { class: string; label: string }> = {
  student: { class: 'badge-student', label: 'Student' },
  shortlet: { class: 'badge-shortlet', label: 'Shortlet' },
  residential: { class: 'badge-verified', label: 'Residential' },
};

export function PropertyCard({
  property,
  onClick,
  isFavorite = false,
  onFavoriteToggle,
}: PropertyCardProps) {
  const formatPrice = (price: number, type: string) => {
    if (type === 'night') {
      return `₦${price.toLocaleString()}`;
    } else if (price >= 1000000) {
      return `₦${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `₦${(price / 1000).toFixed(0)}K`;
    }
    return `₦${price}`;
  };

  const getPriceLabel = (type: string) => {
    switch (type) {
      case 'night':
        return '/night';
      case 'week':
        return '/week';
      case 'month':
        return '/month';
      case 'year':
        return '/year';
      default:
        return '';
    }
  };

  const badge = categoryBadges[property.propertyCategory];

  return (
    <div
      onClick={onClick}
      className="property-card bg-white rounded-2xl overflow-hidden cursor-pointer border border-slate-100"
    >
      {/* Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle?.(e);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600'
            }`}
          />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className={badge.class}>
            {badge.label}
          </span>
          {property.isInstantBook && (
            <span className="badge-instant">
              <Zap className="w-3 h-3" />
              Instant
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium text-slate-900">{property.rating}</span>
          <span className="text-sm text-slate-400">({property.reviewCount})</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-slate-900 line-clamp-1 mb-1">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-slate-500 mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>{property.location}, {property.state}</span>
        </div>

        {/* Details */}
        <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {property.guests} guest{property.guests > 1 ? 's' : ''}
          </span>
          <span>•</span>
          <span>{propertyTypeLabels[property.type]}</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="price-tag">
            {formatPrice(property.price, property.priceType)}
          </span>
          <span className="text-sm text-slate-400">
            {getPriceLabel(property.priceType)}
          </span>
        </div>

        {/* Min Stay */}
        {property.minStay && (
          <p className="text-xs text-slate-400 mt-1">
            Min stay: {property.minStay} {property.minStay === 1 ? 'night' : 'nights'}
          </p>
        )}
      </div>
    </div>
  );
}
