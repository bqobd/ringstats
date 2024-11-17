import React from 'react';
import { Trophy, Scale, Hash } from 'lucide-react';
import type { Match } from '../types';

interface Props {
  matches: Match[];
  clubName: string;
}

export default function MatchList({ matches, clubName }: Props) {
  const getMatchResult = (match: Match) => {
    const isRed = match.vereinRot === clubName;
    const isWinner = (isRed && match.pr > match.pb) || (!isRed && match.pb > match.pr);
    return isWinner ? 'win' : 'loss';
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Trophy className="w-6 h-6 text-[--sbk-green]" />
          <h2 className="text-xl font-bold text-gray-900">Matcher för {clubName}</h2>
        </div>

        <div className="space-y-4">
          {matches.map((match) => {
            const result = getMatchResult(match);
            const isHomeClubRed = match.vereinRot === clubName;
            
            return (
              <div 
                key={match.lKampfNr} 
                className={`bg-white rounded-lg p-4 border-l-4 ${
                  result === 'win' 
                    ? 'border-l-green-500 hover:border-l-green-600' 
                    : 'border-l-red-500 hover:border-l-red-600'
                } border border-gray-100 hover:shadow-md transition-all`}
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-2">
                  <span className="flex items-center">
                    <Hash className="w-3 h-3 mr-1" />
                    Match {match.lKampfNr}
                  </span>
                  <span className="flex items-center">
                    <Scale className="w-3 h-3 mr-1" />
                    {match.aKlassenName} {match.gewicht}kg
                  </span>
                  <span className={`font-medium ${result === 'win' ? 'text-green-600' : 'text-red-600'}`}>
                    {match.pr} - {match.pb}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center flex-1 min-w-0">
                    <div 
                      className={`w-2 h-2 rounded-full ${isHomeClubRed ? 'bg-red-500' : 'bg-blue-500'} mr-2`} 
                      title={isHomeClubRed ? 'Röd trikå' : 'Blå trikå'} 
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate">
                        {isHomeClubRed ? match.nameRot : match.nameBlau}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {isHomeClubRed ? match.vereinRot : match.vereinBlau}
                      </p>
                    </div>
                  </div>

                  <div className="text-gray-400 font-medium px-2">vs</div>

                  <div className="flex items-center flex-1 min-w-0">
                    <div 
                      className={`w-2 h-2 rounded-full ${!isHomeClubRed ? 'bg-red-500' : 'bg-blue-500'} mr-2`}
                      title={!isHomeClubRed ? 'Röd trikå' : 'Blå trikå'}
                    />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-600 truncate">
                        {!isHomeClubRed ? match.nameRot : match.nameBlau}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {!isHomeClubRed ? match.vereinRot : match.vereinBlau}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                  <span>Tid: {match.kampfZeit}</span>
                  <span>{match.siegart}</span>
                </div>
              </div>
            );
          })}

          {matches.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">Inga matcher hittades</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}