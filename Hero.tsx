import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, MapPin, Calendar, Users, Minus, Plus, Home, Building2, Bed, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categories = [
    { id: 'all', label: 'All', icon: Home },
    { id: 'student', label: 'Student', icon: Building2 },
    { id: 'shortlet', label: 'Shortlet', icon: Bed },
    { id: 'lounge', label: 'Lounge', icon: Clock },
  ];

  const scrollToListings = () => {
    const element = document.getElementById('listings');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-20 pb-12"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-100/30 to-transparent" />
      
      <div ref={contentRef} className="section-container relative z-10">
        {/* Hero Content */}
        <div className="text-center pt-12 lg:pt-20 pb-8">
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Nigeria's Smartest Accommodation Platform
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Find Your Perfect <span className="text-[#0077ff]">Stay</span> in Nigeria
          </h1>
          <p className="text-slate-600 text-base lg:text-lg max-w-2xl mx-auto">
            Student hostels, shortlets, apartments & lounge rooms — 
            <span className="text-[#ff6b35] font-medium"> Instant booking</span> or 
            <span className="text-[#0077ff] font-medium"> AI-assisted search</span>
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
              >
                <Icon className="w-4 h-4 inline mr-1.5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar - Trip.com Style */}
        <div className="max-w-4xl mx-auto">
          <div className="search-bar p-2">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
              {/* Location */}
              <div className="md:col-span-4 relative">
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl h-full">
                  <MapPin className="w-5 h-5 text-[#0077ff] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <label className="block text-xs text-slate-500 font-medium">Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Where to?"
                      className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Check-in */}
              <div className="md:col-span-2 relative">
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl h-full">
                  <Calendar className="w-5 h-5 text-[#0077ff] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <label className="block text-xs text-slate-500 font-medium">Check-in</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-transparent text-sm text-slate-900 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Check-out */}
              <div className="md:col-span-2 relative">
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl h-full">
                  <Calendar className="w-5 h-5 text-[#0077ff] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <label className="block text-xs text-slate-500 font-medium">Check-out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-transparent text-sm text-slate-900 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Guests */}
              <div className="md:col-span-2 relative">
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl h-full">
                  <Users className="w-5 h-5 text-[#0077ff] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <label className="block text-xs text-slate-500 font-medium">Guests</label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-5 h-5 rounded-full bg-white flex items-center justify-center hover:bg-slate-200"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium">{guests}</span>
                      <button
                        onClick={() => setGuests(guests + 1)}
                        className="w-5 h-5 rounded-full bg-white flex items-center justify-center hover:bg-slate-200"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="md:col-span-2">
                <Button
                  onClick={scrollToListings}
                  className="w-full h-full bg-[#ff6b35] hover:bg-[#e55a2b] text-white rounded-xl font-semibold"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['Near UNILAG', 'Lekki Shortlets', 'Under ₦200K', 'Instant Book'].map((filter) => (
              <button
                key={filter}
                onClick={scrollToListings}
                className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:border-[#0077ff] hover:text-[#0077ff] transition-colors"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 lg:gap-16 mt-12">
          <div className="text-center">
            <p className="text-2xl lg:text-3xl font-bold text-slate-900">10K+</p>
            <p className="text-sm text-slate-500">Listings</p>
          </div>
          <div className="text-center">
            <p className="text-2xl lg:text-3xl font-bold text-slate-900">50K+</p>
            <p className="text-sm text-slate-500">Happy Guests</p>
          </div>
          <div className="text-center">
            <p className="text-2xl lg:text-3xl font-bold text-slate-900">4.8</p>
            <p className="text-sm text-slate-500">App Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
