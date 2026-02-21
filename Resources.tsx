import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calculator, FileText, Shield, ArrowRight, BookOpen, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tools = [
  {
    title: 'Rent Calculator',
    description: 'Calculate what you can afford based on your income and expenses.',
    icon: Calculator,
  },
  {
    title: 'Agreement Templates',
    description: 'Download legally vetted tenancy agreement templates.',
    icon: FileText,
  },
  {
    title: 'Safety Guide',
    description: 'Learn how to verify properties and avoid scams.',
    icon: Shield,
  },
];

const articles = [
  {
    title: 'First-time Renter Guide',
    description: 'Everything you need to know before renting in Nigeria.',
    image: '/property-2.jpg',
  },
  {
    title: 'Understanding Your Rights',
    description: 'Know your rights as a tenant under Nigerian law.',
    image: '/property-4.jpg',
  },
  {
    title: 'Property Inspection Checklist',
    description: 'What to check before signing any agreement.',
    image: '/property-5.jpg',
  },
];

export function Resources() {
  const sectionRef = useRef<HTMLElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        toolsRef.current,
        { opacity: 0, x: '-6vw' },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: true,
          },
        }
      );

      const articleCards = articlesRef.current?.querySelectorAll('.article-card');
      if (articleCards) {
        gsap.fromTo(
          articleCards,
          { opacity: 0, x: '6vw' },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'top 40%',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="resources"
      ref={sectionRef}
      className="py-16 lg:py-24 px-4 sm:px-6 lg:px-12 bg-[#FFF8F0]"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a2e] mb-8 lg:mb-12">
          Renter Resources
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Tools Column */}
          <div ref={toolsRef}>
            <h3 className="text-base lg:text-lg font-semibold text-[#1a1a2e] mb-5 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#008751]" />
              Helpful Tools
            </h3>
            <div className="space-y-3">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.title}
                    className="group bg-white rounded-2xl p-4 lg:p-5 shadow-[0_4px_20px_rgba(0,135,81,0.06)] border border-[rgba(0,135,81,0.06)] hover:shadow-[0_8px_30px_rgba(0,135,81,0.1)] transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 lg:w-12 lg:h-12 bg-[#f0e6d8] rounded-xl flex items-center justify-center group-hover:bg-[#008751] transition-colors">
                        <Icon className="w-5 h-5 text-[#008751] group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#1a1a2e] group-hover:text-[#008751] transition-colors text-sm lg:text-base">
                          {tool.title}
                        </h4>
                        <p className="text-xs lg:text-sm text-[#6B7280] mt-1">
                          {tool.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-[#6B7280] group-hover:text-[#008751] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Articles Column */}
          <div ref={articlesRef}>
            <h3 className="text-base lg:text-lg font-semibold text-[#1a1a2e] mb-5 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#008751]" />
              Guides & Articles
            </h3>
            <div className="space-y-3">
              {articles.map((article) => (
                <div
                  key={article.title}
                  className="article-card group flex gap-4 bg-white rounded-2xl p-3 lg:p-4 shadow-[0_4px_20px_rgba(0,135,81,0.06)] border border-[rgba(0,135,81,0.06)] hover:shadow-[0_8px_30px_rgba(0,135,81,0.1)] transition-all cursor-pointer"
                >
                  <div className="w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0 rounded-xl overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-semibold text-[#1a1a2e] group-hover:text-[#008751] transition-colors text-sm lg:text-base">
                      {article.title}
                    </h4>
                    <p className="text-xs lg:text-sm text-[#6B7280] mt-1">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-sm text-[#008751]">
                      <span className="text-xs lg:text-sm">Read more</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
