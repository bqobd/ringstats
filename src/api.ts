const BASE_URL = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://turniere.ringerdb.de/api/v1');

const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 8000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Kunde inte hitta den begärda resursen.');
    }
    if (response.status === 403 || response.status === 401) {
      throw new Error('Åtkomst nekad. Vänligen försök igen senare.');
    }
    if (response.status >= 500) {
      throw new Error('Ett serverfel uppstod. Vänligen försök igen senare.');
    }
    throw new Error('Ett oväntat fel uppstod. Vänligen försök igen.');
  }

  try {
    const data = await response.json();
    if (!data.succeeded && data.messages?.length > 0) {
      throw new Error(data.messages[0]);
    }
    return data.data || data;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Kunde inte tolka svaret från servern.');
    }
    throw error;
  }
};

export const fetchTournaments = async () => {
  try {
    const response = await fetchWithTimeout(
      `${BASE_URL}/turniere/SE/2024?zeitbereich=TurnierErgebnisse`
    );
    const data = await handleResponse(response);
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Anslutningen tog för lång tid. Kontrollera din internetanslutning.');
      }
      throw error;
    }
    throw new Error('Ett oväntat fel uppstod vid hämtning av turneringar.');
  }
};

export const fetchUpcomingTournaments = async () => {
  try {
    const response = await fetchWithTimeout(
      `${BASE_URL}/turniere/all/2024?zeitbereich=Turnierkalender`
    );
    const data = await handleResponse(response);
    // Filter tournaments from Sweden only
    const tournaments = Array.isArray(data) ? data : [data];
    return tournaments.filter(tournament => tournament.land?.code === 'SE');
  } catch (error) {
    console.error('Error fetching upcoming tournaments:', error);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Anslutningen tog för lång tid. Kontrollera din internetanslutning.');
      }
      throw error;
    }
    throw new Error('Ett oväntat fel uppstod vid hämtning av kommande turneringar.');
  }
};

export const fetchTournamentDetails = async (id: number) => {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/turniere/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching tournament details:', error);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Anslutningen tog för lång tid. Kontrollera din internetanslutning.');
      }
      throw error;
    }
    throw new Error('Kunde inte hämta turneringsinformation.');
  }
};

export const fetchClubs = async (id: number) => {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/wettkaempfe/${id}/vereine`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching clubs:', error);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Anslutningen tog för lång tid. Kontrollera din internetanslutning.');
      }
      throw error;
    }
    throw new Error('Kunde inte hämta klubblistan.');
  }
};

export const fetchClubMatches = async (tournamentId: number, clubId: number) => {
  try {
    const response = await fetchWithTimeout(
      `${BASE_URL}/wettkaempfe/${tournamentId}/vereine/${clubId}`
    );
    const data = await handleResponse(response);
    return data.abgeschlosseneKaempfe || [];
  } catch (error) {
    console.error('Error fetching club matches:', error);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Anslutningen tog för lång tid. Kontrollera din internetanslutning.');
      }
      throw error;
    }
    throw new Error('Kunde inte hämta matcherna.');
  }
};