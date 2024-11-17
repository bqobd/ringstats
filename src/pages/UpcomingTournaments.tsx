import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { fetchUpcomingTournaments, fetchTournamentDetails } from '../api';
import type { Tournament, TournamentDetail } from '../types';
import TournamentCard from '../components/TournamentCard';
import ErrorMessage from '../components/ErrorMessage';
import TournamentDetails from '../components/TournamentDetails';

export default function UpcomingTournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<TournamentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTournaments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUpcomingTournaments();
      setTournaments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kunde inte ladda turneringar');
    } finally {
      setLoading(false);
    }
  };

  const handleTournamentSelect = async (tournament: Tournament) => {
    try {
      setLoading(true);
      const details = await fetchTournamentDetails(tournament.id.value);
      setSelectedTournament(details);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kunde inte ladda turneringsdetaljer');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTournaments();
  }, []);

  if (error) {
    return <ErrorMessage message={error} onRetry={loadTournaments} />;
  }

  if (selectedTournament) {
    return (
      <TournamentDetails 
        tournament={selectedTournament} 
        onBack={() => setSelectedTournament(null)} 
      />
    );
  }

  return (
    <div>
      <div className="flex items-center space-x-2 mb-8">
        <Calendar className="w-8 h-8 text-[--sbk-green]" />
        <h1 className="text-3xl font-bold text-gray-900">Kommande tävlingar</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tournaments.map((tournament) => (
          <TournamentCard
            key={tournament.id.value}
            tournament={tournament}
            onClick={() => handleTournamentSelect(tournament)}
          />
        ))}
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[--sbk-green] border-t-transparent mx-auto"></div>
            <p className="mt-4 text-gray-600">Laddar...</p>
          </div>
        </div>
      )}

      {!loading && tournaments.length === 0 && !error && (
        <div className="text-center py-12">
          <p className="text-gray-600">Inga kommande tävlingar hittades</p>
        </div>
      )}
    </div>
  );
}