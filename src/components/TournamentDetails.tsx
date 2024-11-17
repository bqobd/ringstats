import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Calendar, Info, Users } from 'lucide-react';
import type { TournamentDetail, Club, Match } from '../types';
import { fetchClubs, fetchClubMatches } from '../api';
import ErrorMessage from './ErrorMessage';
import MatchList from './MatchList';

interface Props {
  tournament: TournamentDetail;
  onBack: () => void;
}

export default function TournamentDetails({ tournament, onBack }: Props) {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('sv-SE');
  };

  const dateRange = tournament.datumBis && tournament.datumBis !== tournament.datumAb
    ? `${formatDate(tournament.datumAb)} - ${formatDate(tournament.datumBis)}`
    : formatDate(tournament.datumAb);

  useEffect(() => {
    const loadClubs = async () => {
      try {
        setLoading(true);
        setError(null);
        const clubsData = await fetchClubs(tournament.id.value);
        setClubs(clubsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Kunde inte ladda klubbar');
      } finally {
        setLoading(false);
      }
    };
    loadClubs();
  }, [tournament.id.value]);

  const handleClubSelect = async (club: Club) => {
    try {
      setLoading(true);
      setError(null);
      const matchData = await fetchClubMatches(tournament.id.value, club.id.value);
      setMatches(matchData);
      setSelectedClub(club);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kunde inte ladda matcher');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div>
      <button
        onClick={selectedClub ? () => setSelectedClub(null) : onBack}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        {selectedClub ? 'Tillbaka till klubblista' : 'Tillbaka till tävlingar'}
      </button>

      {selectedClub ? (
        <MatchList matches={matches} clubName={selectedClub.bezeichnung} />
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              {tournament.turnierbezeichnung}
            </h1>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mr-3 text-[--sbk-green] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Datum</h3>
                    <p className="text-gray-600">{dateRange}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-[--sbk-green] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Plats</h3>
                    <p className="text-gray-600">{tournament.wettkampfstaette}</p>
                    <p className="text-gray-600">{tournament.ort}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Info className="w-5 h-5 mr-3 text-[--sbk-green] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Information</h3>
                    <p className="text-gray-600">Arrangör: {tournament.ausrichtenderVerein}</p>
                    {tournament.veranstalter && (
                      <p className="text-gray-600">Ansvarig: {tournament.veranstalter}</p>
                    )}
                    {tournament.meldeschluss && (
                      <p className="text-gray-600">
                        Anmälan senast: {formatDate(tournament.meldeschluss)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Users className="w-6 h-6 text-[--sbk-green]" />
              <h2 className="text-xl font-bold text-gray-900">Registrerade klubbar</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {clubs.map((club) => (
                <button
                  key={club.id.value}
                  onClick={() => handleClubSelect(club)}
                  className="p-4 text-left bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100 w-full"
                >
                  <h3 className="font-medium text-gray-900">{club.bezeichnung}</h3>
                </button>
              ))}
            </div>

            {clubs.length === 0 && !loading && (
              <p className="text-center text-gray-600 py-4">
                Inga klubbar har registrerats än
              </p>
            )}
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[--sbk-green] border-t-transparent mx-auto"></div>
            <p className="mt-4 text-gray-600">Laddar...</p>
          </div>
        </div>
      )}
    </div>
  );
}