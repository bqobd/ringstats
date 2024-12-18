import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { path: '/', label: 'Start' },
    { path: '/upcoming', label: 'Kommande tävlingar' },
    { path: '/results', label: 'Tävlingsresultat' },
    { path: '/about', label: 'Om oss' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-[--sbk-green] shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative h-12 w-12">
              <img 
                src="/ring-logo.svg" 
                alt="Wrestling Ring Logo" 
                className="h-12 w-12 brightness-0 invert group-hover:rotate-45 transition-transform duration-300"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Ringstats</h1>
              <p className="text-xs text-white/80">En del av Söderhamns BK</p>
            </div>
          </Link>

          <button
            onClick={toggleMenu}
            className="lg:hidden text-white hover:text-white/80 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <nav className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-white/90 hover:text-white transition-colors ${
                  isActive(item.path) ? 'font-semibold' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-[--sbk-green] shadow-lg z-50 mobile-menu ${
          isMenuOpen ? 'open' : ''
        }`}
      >
        <div className="p-4">
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-white hover:text-white/80"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>

          <nav className="mt-12 flex flex-col space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-white/90 hover:text-white py-2 transition-colors ${
                  isActive(item.path) ? 'font-semibold' : ''
                }`}
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}
    </>
  );
}