import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-[--sbk-green] shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/sbk-logo.svg" 
              alt="Söderhamns BK Logo" 
              className="h-12 w-12 brightness-0 invert"
            />
            <div>
              <h1 className="text-xl font-bold text-white">Ringstats</h1>
              <p className="text-xs text-white/80">En del av Söderhamns BK</p>
            </div>
          </div>

          <button
            onClick={toggleMenu}
            className="lg:hidden text-white hover:text-white/80 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          <nav className="hidden lg:flex items-center space-x-6">
            <a href="#" className="text-white/90 hover:text-white">Turneringar</a>
            <a href="#" className="text-white/90 hover:text-white">Klubbar</a>
            <a href="#" className="text-white/90 hover:text-white">Om oss</a>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-[--sbk-green] shadow-lg z-50 mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="p-4">
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-white hover:text-white/80"
          >
            <X className="w-6 h-6" />
          </button>

          <nav className="mt-12 flex flex-col space-y-4">
            <a href="#" className="text-white/90 hover:text-white py-2">Turneringar</a>
            <a href="#" className="text-white/90 hover:text-white py-2">Klubbar</a>
            <a href="#" className="text-white/90 hover:text-white py-2">Om oss</a>
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