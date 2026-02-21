import { useState, useRef, useEffect } from 'react';
import { Heart, Bed, Bath, Users, MapPin, Check, ChevronLeft, ChevronRight, Play, Pause, RotateCw, Phone, MessageCircle, BadgeCheck, Star, Send, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { Property } from '@/types';

interface PropertyDetailModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

const propertyTypeLabels: Record<string, string> = {
  hostel: 'Student Hostel',
  selfcon: 'Self-Contain',
  shortlet: 'Shortlet',
  lounge: 'Lounge Room',
  apartment: 'Apartment',
  shared: 'Shared Room',
  room: 'Room',
};

const categoryColors: Record<string, string> = {
  student: 'bg-amber-100 text-amber-700',
  shortlet: 'bg-pink-100 text-pink-700',
  residential: 'bg-green-100 text-green-700',
};

export function PropertyDetailModal({ property, isOpen, onClose }: PropertyDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [isTourPlaying, setIsTourPlaying] = useState(false);
  const [tourRotation, setTourRotation] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');
  const tourRef = useRef<HTMLDivElement>(null);
  const tourIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setShowVirtualTour(false);
      setIsTourPlaying(false);
      setTourRotation(0);
      setShowMessage(false);
      setMessageText('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (isTourPlaying) {
      tourIntervalRef.current = setInterval(() => {
        setTourRotation((prev) => (prev + 0.5) % 360);
      }, 50);
    } else {
      if (tourIntervalRef.current) clearInterval(tourIntervalRef.current);
    }
    return () => {
      if (tourIntervalRef.current) clearInterval(tourIntervalRef.current);
    };
  }, [isTourPlaying]);

  if (!property) return null;

  const formatPrice = (price: number, type: string) => {
    if (type === 'night') return `₦${price.toLocaleString()}`;
    if (price >= 1000000) return `₦${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `₦${(price / 1000).toFixed(0)}K`;
    return `₦${price}`;
  };

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);

  const handleSendMessage = () => {
    if (property.agent) {
      const url = `https://wa.me/${property.agent.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(messageText)}`;
      window.open(url, '_blank');
    }
    setShowMessage(false);
    setMessageText('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[92vh] overflow-y-auto p-0 bg-white rounded-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{property.title}</DialogTitle>
        </DialogHeader>

        {/* Images */}
        <div className="relative">
          {!showVirtualTour ? (
            <>
              <div className="relative h-[250px] sm:h-[350px] overflow-hidden">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
                </button>
                {property.isVerified && (
                  <span className="absolute top-4 left-4 bg-white/90 px-2 py-1 rounded-full text-xs font-medium text-green-700 flex items-center gap-1">
                    <BadgeCheck className="w-3.5 h-3.5" /> Verified
                  </span>
                )}
                {property.virtualTour && (
                  <button
                    onClick={() => setShowVirtualTour(true)}
                    className="absolute bottom-4 left-4 bg-[#0077ff] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" /> 360° Tour
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 p-3 bg-slate-50">
                <button onClick={prevImage} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-2 overflow-x-auto">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-14 h-14 rounded-lg overflow-hidden ${idx === currentImageIndex ? 'ring-2 ring-[#0077ff]' : ''}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <button onClick={nextImage} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="relative h-[300px] sm:h-[400px] bg-slate-900">
              <div
                ref={tourRef}
                onMouseMove={(e) => !isTourPlaying && setTourRotation(((e.clientX - (tourRef.current?.getBoundingClientRect().left || 0)) / (tourRef.current?.offsetWidth || 1)) * 360)}
                className="relative w-full h-full overflow-hidden cursor-move"
              >
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transform: `perspective(1000px) rotateY(${tourRotation}deg)`, transition: isTourPlaying ? 'none' : 'transform 0.1s' }}
                >
                  <div className="relative w-[200%] h-full">
                    <img src={property.images[0]} alt="" className="w-full h-full object-cover" style={{ transform: `translateX(-${tourRotation / 3.6}%)` }} />
                  </div>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 rounded-full px-4 py-2">
                  <button onClick={() => setIsTourPlaying(!isTourPlaying)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    {isTourPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setTourRotation(0)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <RotateCw className="w-4 h-4" />
                  </button>
                  <button onClick={() => setShowVirtualTour(false)} className="px-4 py-2 bg-white rounded-full text-sm font-medium">
                    Exit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[property.propertyCategory]}`}>
                  {property.propertyCategory.charAt(0).toUpperCase() + property.propertyCategory.slice(1)}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                  {propertyTypeLabels[property.type]}
                </span>
                {property.isInstantBook && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Instant
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-slate-900">{property.title}</h2>
              <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                <MapPin className="w-4 h-4" />
                {property.location}, {property.state}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 mb-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-medium">{property.rating}</span>
              </div>
              <p className="text-xs text-slate-400">{property.reviewCount} reviews</p>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4 p-4 bg-slate-50 rounded-xl">
            <span className="text-2xl font-bold text-[#ff6b35]">
              {formatPrice(property.price, property.priceType)}
            </span>
            <span className="text-slate-400">/{property.priceType}</span>
            {property.minStay && (
              <span className="text-sm text-slate-400 ml-auto">
                Min {property.minStay} {property.minStay === 1 ? 'night' : 'nights'}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex gap-4 mb-4 text-sm">
            <span className="flex items-center gap-1 text-slate-600">
              <Users className="w-4 h-4" /> {property.guests} guests
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <Bed className="w-4 h-4" /> {property.beds} beds
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <Bath className="w-4 h-4" /> {property.baths} baths
            </span>
          </div>

          {/* Description */}
          <p className="text-slate-600 text-sm mb-4">{property.description}</p>

          {/* Amenities */}
          <div className="mb-4">
            <h3 className="font-semibold text-slate-900 mb-2">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((a) => (
                <span key={a} className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 rounded-full text-sm text-slate-600">
                  <Check className="w-3.5 h-3.5 text-green-500" /> {a}
                </span>
              ))}
            </div>
          </div>

          {/* Agent */}
          {property.agent && (
            <div className="p-4 bg-slate-50 rounded-xl mb-4">
              <div className="flex items-center gap-3 mb-3">
                <img src={property.agent.avatar} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <p className="font-semibold text-slate-900">{property.agent.name}</p>
                  <p className="text-sm text-slate-500">{property.agent.company}</p>
                </div>
              </div>

              {!showMessage ? (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-lg border-[#0077ff] text-[#0077ff]"
                    onClick={() => window.open(`tel:${property.agent?.phone}`, '_self')}
                  >
                    <Phone className="w-4 h-4 mr-1" /> Call
                  </Button>
                  <Button
                    className="flex-1 rounded-lg bg-[#25D366] hover:bg-[#128C7E] text-white"
                    onClick={() => setShowMessage(true)}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" /> Message
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Input
                    placeholder="Hi, I'm interested in this property..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="rounded-lg"
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 rounded-lg" onClick={() => setShowMessage(false)}>
                      Cancel
                    </Button>
                    <Button className="flex-1 rounded-lg bg-[#25D366]" onClick={handleSendMessage}>
                      <Send className="w-4 h-4 mr-1" /> Send
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Book Button */}
          <Button className="w-full bg-[#ff6b35] hover:bg-[#e55a2b] text-white rounded-xl py-6 font-semibold">
            {property.isInstantBook ? 'Instant Book' : 'Request to Book'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
