import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from '@/components/Navigation';
import { AIAssistant } from '@/components/AIAssistant';
import { PropertyDetailModal } from '@/components/PropertyDetailModal';
import { Hero } from '@/sections/Hero';
import { FeaturedListings } from '@/sections/FeaturedListings';
import { StudentHousing } from '@/sections/StudentHousing';
import { ShortletSection } from '@/sections/ShortletSection';
import { Agents } from '@/sections/Agents';
import { ListProperty } from '@/sections/ListProperty';
import { Footer } from '@/sections/Footer';
import type { Property } from '@/types';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    ScrollTrigger.refresh();
    
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProperty(null), 300);
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <Hero />
        <FeaturedListings onPropertyClick={handlePropertyClick} />
        <StudentHousing onPropertyClick={handlePropertyClick} />
        <ShortletSection onPropertyClick={handlePropertyClick} />
        <Agents />
        <ListProperty />
        <Footer />
      </main>

      {/* AI Assistant */}
      <AIAssistant />

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
