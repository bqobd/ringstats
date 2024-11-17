import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import type { Tournament } from '../types';

interface Props {
  tournament: Tournament;
  onClick: () => void;
}

export default function TournamentCard({ tournament, onClick }: Props) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('sv-SE');
  };

  const dateRange = tournament.datumBis && tournament.datumBis !== tournament.datumAb
    ? `${formatDate(tournament.datumAb)} - ${formatDate(tournament.datumBis)}`
    : formatDate(tournament.datumAb);

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{tournament.turnierbezeichnung}</h3>
      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="text-sm">{dateRange}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="text-sm">{tournament.wettkampfstaette}, {tournament.ort}</span>
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <p className="text-sm text-[--sbk-green]">{tournament.ausrichtenderVerein}</p>
        {tournament.meldeschluss && (
          <p className="text-xs text-gray-500">
            Anmälan senast: {formatDate(tournament.meldeschluss)}
          </p>
        )}
      </div>
    </div>
  );
}