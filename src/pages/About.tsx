import React from 'react';
import { Info } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center space-x-2 mb-8">
        <Info className="w-8 h-8 text-[--sbk-green]" />
        <h1 className="text-3xl font-bold text-gray-900">Om Ringstats</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-6">
          <img 
            src="/sbk-logo.svg" 
            alt="Söderhamns BK Logo" 
            className="w-24 h-24"
          />
          <div>
            <h2 className="text-xl font-semibold text-[--sbk-green] mb-2">Söderhamns Brottarklubb</h2>
            <p className="text-gray-600">En stolt tradition av brottning sedan 1906</p>
          </div>
        </div>

        <div className="prose prose-green max-w-none">
          <p className="mb-4">
            Ringstats är ett verktyg utvecklat för att göra det enklare att följa 
            brottningstävlingar och resultat. Som en del av Söderhamns BK strävar 
            vi efter att göra sporten mer tillgänglig för alla intresserade.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Funktioner</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Se kommande tävlingar</li>
            <li>Följ tävlingsresultat</li>
            <li>Statistik och historik</li>
            <li>Klubbinformation</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Kontakt</h3>
          <p className="text-gray-600">
            För frågor eller support, vänligen kontakta oss via:
            <br />
            Email: info@soderhamnsbk.se
          </p>
        </div>
      </div>
    </div>
  );
}