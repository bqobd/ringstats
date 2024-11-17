import React, { useState, useEffect } from 'react';
import { Trophy, ArrowLeft } from 'lucide-react';
import { fetchTournaments, fetchTournamentDetails, fetchClubs, fetchClubMatches } from './api';
import type { Tournament, TournamentDetail, Club, Match } from './types';
import TournamentCard from './components/TournamentCard';
import ClubList from './components/ClubList';
import MatchList from './components/MatchList';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<TournamentDetail | null>(null);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTournaments();
        setTournaments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Kunde inte ladda turneringar');
      } finally {
        setLoading(false);
      }
    };
    loadTournaments();
  }, []);

  const handleTournamentSelect = async (tournament: Tournament) => {
    try {
      setLoading(true);
      setError(null);
      const [details, clubsData] = await Promise.all([
        fetchTournamentDetails(tournament.id.value),
        fetchClubs(tournament.id.value)
      ]);
      setSelectedTournament(details);
      setClubs(clubsData);
      setSelectedClub(null);
      setMatches([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kunde inte ladda turneringsinformation');
    } finally {
      setLoading(false);
    }
  };

  const handleClubSelect = async (club: Club) => {
    try {
      setLoading(true);
      setError(null);
      if (selectedTournament) {
        const matchData = await fetchClubMatches(selectedTournament.id.value, club.id.value);
        setMatches(matchData);
        setSelectedClub(club);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kunde inte ladda matcher');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setError(null);
    if (selectedClub) {
      setSelectedClub(null);
      setMatches([]);
    } else if (selectedTournament) {
      setSelectedTournament(null);
      setClubs([]);
    }
  };

  const handleRetry = () => {
    setError(null);
    if (selectedClub && selectedTournament) {
      handleClubSelect(selectedClub);
    } else if (selectedTournament) {
      handleTournamentSelect(selectedTournament);
    } else {
      window.location.reload();
    }
  };

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {(selectedTournament || selectedClub) && (
          <button
            onClick={handleBack}
            className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Tillbaka
          </button>
        )}

        {!selectedTournament && (
          <>
            <div className="flex items-center space-x-2 mb-8">
              <Trophy className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Brottningstävlingar 2024</h1>
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
          </>
        )}

        {selectedTournament && !selectedClub && (
          <ClubList 
            clubs={clubs} 
            onSelectClub={handleClubSelect} 
          />
        )}

        {selectedTournament && selectedClub && (
          <MatchList 
            matches={matches} 
            clubName={selectedClub.bezeichnung} 
          />
        )}

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto"></div>
              <p className="mt-4 text-gray-600">Laddar...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;