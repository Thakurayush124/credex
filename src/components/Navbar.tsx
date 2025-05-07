import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <img 
              src="/logo1.png" 
              alt="SoftSell Logo" 
              className="h-10 w-auto"
            />

          <span className="text-xl font-bold text-gray-900">SoftSell</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#how-it-works" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">
            How It Works
          </a>
          <a href="#why-choose-us" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">
            Why Choose Us
          </a>
          <a href="#testimonials" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">
            Testimonials
          </a>
          <a href="#contact" className="btn btn-primary py-2">
            Get a Quote
          </a>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          type="button"
          className="md:hidden p-2 text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="container py-4 space-y-4">
            <a 
              href="#how-it-works" 
              className="block py-2 text-base font-semibold text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#why-choose-us" 
              className="block py-2 text-base font-semibold text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Why Choose Us
            </a>
            <a 
              href="#testimonials" 
              className="block py-2 text-base font-semibold text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#contact" 
              className="btn btn-primary w-full justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Get a Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;