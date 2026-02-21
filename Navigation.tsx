import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X, Home, Building2, Users, PlusCircle, MessageSquare } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2"
            >
              <div className="w-9 h-9 bg-[#0077ff] rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-900">
                StayHub
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => scrollToSection('listings')}
                className="nav-link px-4 py-2 rounded-lg hover:bg-slate-100"
              >
                Find Stay
              </button>
              <button
                onClick={() => scrollToSection('student')}
                className="nav-link px-4 py-2 rounded-lg hover:bg-slate-100"
              >
                Student
              </button>
              <button
                onClick={() => scrollToSection('shortlet')}
                className="nav-link px-4 py-2 rounded-lg hover:bg-slate-100"
              >
                Shortlet
              </button>
              <button
                onClick={() => scrollToSection('agents')}
                className="nav-link px-4 py-2 rounded-lg hover:bg-slate-100"
              >
                Agents
              </button>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-600">
                <Heart className="w-4 h-4" />
                <span className="text-sm">Saved</span>
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-600">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">Messages</span>
              </button>
              <Button
                onClick={() => scrollToSection('list-property')}
                className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white rounded-xl px-5"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                List Property
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-700" />
              ) : (
                <Menu className="w-5 h-5 text-slate-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white lg:hidden pt-16">
          <div className="flex flex-col p-4 gap-2">
            <button
              onClick={() => scrollToSection('listings')}
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 text-left"
            >
              <Home className="w-5 h-5 text-[#0077ff]" />
              <span className="font-medium">Find Stay</span>
            </button>
            <button
              onClick={() => scrollToSection('student')}
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 text-left"
            >
              <Building2 className="w-5 h-5 text-[#0077ff]" />
              <span className="font-medium">Student Housing</span>
            </button>
            <button
              onClick={() => scrollToSection('shortlet')}
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 text-left"
            >
              <Heart className="w-5 h-5 text-[#0077ff]" />
              <span className="font-medium">Shortlets</span>
            </button>
            <button
              onClick={() => scrollToSection('agents')}
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 text-left"
            >
              <Users className="w-5 h-5 text-[#0077ff]" />
              <span className="font-medium">Find Agents</span>
            </button>
            <hr className="my-2" />
            <Button
              onClick={() => scrollToSection('list-property')}
              className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white rounded-xl py-6"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              List Your Property
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
