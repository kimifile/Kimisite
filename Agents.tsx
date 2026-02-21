import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, MapPin, Phone, MessageCircle, BadgeCheck, TrendingUp, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { agents } from '@/data/properties';

gsap.registerPlugin(ScrollTrigger);

export function Agents() {
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

  return (
    <section
      id="agents"
      ref={sectionRef}
      className="py-12 lg:py-16 bg-slate-50"
    >
      <div ref={contentRef} className="section-container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
              <BadgeCheck className="w-4 h-4" />
              Verified Agents
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-slate-900">
              Connect with Top Agents
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Agents help you find the perfect tenant or property faster
            </p>
          </div>
          <Button variant="ghost" className="text-[#0077ff]">
            <UserPlus className="w-4 h-4 mr-2" />
            Become an Agent
          </Button>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-white rounded-xl">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#0077ff]">500+</p>
            <p className="text-xs text-slate-500">Active Agents</p>
          </div>
          <div className="text-center border-x border-slate-100">
            <p className="text-2xl font-bold text-[#0077ff]">10K+</p>
            <p className="text-xs text-slate-500">Successful Matches</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#0077ff]">4.8</p>
            <p className="text-xs text-slate-500">Avg Rating</p>
          </div>
        </div>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  {agent.isVerified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0077ff] rounded-full flex items-center justify-center">
                      <BadgeCheck className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{agent.name}</h3>
                  <p className="text-sm text-slate-500">{agent.company}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{agent.rating}</span>
                    <span className="text-xs text-slate-400">({agent.reviewCount})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 py-3 border-y border-slate-100">
                <div className="text-center">
                  <p className="text-lg font-bold text-[#0077ff]">{agent.listings}</p>
                  <p className="text-xs text-slate-500">Listings</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-[#0077ff]">{agent.reviewCount}</p>
                  <p className="text-xs text-slate-500">Reviews</p>
                </div>
                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end gap-1 text-sm text-slate-500">
                    <MapPin className="w-3.5 h-3.5" />
                    {agent.location}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-lg border-[#0077ff] text-[#0077ff]"
                  onClick={() => window.open(`tel:${agent.phone}`, '_self')}
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
                <Button
                  size="sm"
                  className="flex-1 rounded-lg bg-[#25D366] hover:bg-[#128C7E] text-white"
                  onClick={() => window.open(`https://wa.me/${agent.whatsapp.replace(/\D/g, '')}`, '_blank')}
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  WhatsApp
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Agent CTA */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold mb-1">Are you a real estate agent?</h3>
              <p className="text-sm text-white/80">
                Join our network and connect with thousands of potential tenants
              </p>
            </div>
            <Button className="bg-white text-blue-600 hover:bg-white/90 rounded-full px-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              Join as Agent
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
