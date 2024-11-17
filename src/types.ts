export interface Tournament {
  id: {
    value: number;
  };
  turnierbezeichnung: string;
  datumAb: string;
  ort: string;
  wettkampfstaette: string;
  ausrichtenderVerein: string;
}

export interface TournamentDetail extends Tournament {
  veranstalter: string;
  datumBis: string;
}

export interface Club {
  id: {
    value: number;
  };
  bezeichnung: string;
}

export interface Match {
  lKampfNr: number;
  nameRot: string;
  nameBlau: string;
  vereinRot: string;
  vereinBlau: string;
  gewicht: number;
  kampfZeit: string;
  siegart: string;
  pr: number;
  pb: number;
  aKlassenName: string;
}