import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import type { Tournament } from '../types';

interface Props {
  tournament: Tournament;
  onClick: () => void;
}

export default function TournamentCard({ tournament, onClick }: Props) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{tournament.turnierbezeichnung}</h3>
      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {new Date(tournament.datumAb).toLocaleDateString('sv-SE')}
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{tournament.wettkampfstaette}, {tournament.ort}</span>
        </div>
      </div>
      <p className="mt-3 text-sm text-blue-600">{tournament.ausrichtenderVerein}</p>
    </div>
  );
}