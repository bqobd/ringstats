import React from 'react';
import { Users } from 'lucide-react';
import type { Club } from '../types';

interface Props {
  clubs: Club[];
  onSelectClub: (club: Club) => void;
}

export default function ClubList({ clubs, onSelectClub }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Välj Klubb</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clubs.map((club) => (
          <button
            key={club.id.value}
            onClick={() => onSelectClub(club)}
            className="p-4 text-left bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100"
          >
            <h3 className="font-medium text-gray-900">{club.bezeichnung}</h3>
          </button>
        ))}
      </div>
    </div>
  );
}