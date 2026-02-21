import { Home, Mail, Phone, MapPin, Twitter, Instagram, Facebook } from 'lucide-react';

const footerLinks = {
  find: {
    title: 'Find a Stay',
    links: ['Student Hostels', 'Shortlets', 'Apartments', 'Lounge Rooms', 'Shared Spaces'],
  },
  list: {
    title: 'List Property',
    links: ['List Your Space', 'Agent Registration', 'Pricing', 'Success Stories'],
  },
  support: {
    title: 'Support',
    links: ['Help Center', 'Safety', 'Cancellation', 'Contact Us'],
  },
  company: {
    title: 'Company',
    links: ['About Us', 'Careers', 'Blog', 'Press'],
  },
};

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 lg:py-16">
      <div className="section-container">
        {/* Top Section */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-[#0077ff] rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">StayHub</span>
            </div>
            <p className="text-slate-400 text-sm mb-4 max-w-xs">
              Nigeria's smartest platform for finding student hostels, shortlets, and accommodation.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="w-4 h-4" />
                hello@stayhub.ng
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Phone className="w-4 h-4" />
                +234 800 123 4567
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4" />
                Lagos, Nigeria
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-semibold text-sm mb-4">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} StayHub Nigeria. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-[#0077ff] hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-[#0077ff] hover:text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-[#0077ff] hover:text-white transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
