import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center space-x-2 mb-8">
        <Trophy className="w-8 h-8 text-[--sbk-green]" />
        <h1 className="text-3xl font-bold text-gray-900">Brottningstävlingar 2024</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div 
          onClick={() => navigate('/upcoming')}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        >
          <h2 className="text-xl font-semibold text-[--sbk-green] mb-2">Kommande tävlingar</h2>
          <p className="text-gray-600">Se alla planerade brottningstävlingar för säsongen.</p>
        </div>

        <div 
          onClick={() => navigate('/results')}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        >
          <h2 className="text-xl font-semibold text-[--sbk-green] mb-2">Tävlingsresultat</h2>
          <p className="text-gray-600">Utforska resultat från tidigare tävlingar.</p>
        </div>
      </div>
    </div>
  );
}