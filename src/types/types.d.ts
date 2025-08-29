export type Pokemon = {
  name: string;
  id: string;
  imgSrc: string;
};


export type PokemonDetails = {
  height: number;
  weight: number;
  name: string;
  id: string;
  imgSrc: string;
  hp: number;
  attack: number;
  defense: number;
  // Nuevos campos:
  types: string[];          // e.g., ["grass", "poison"]     // e.g., ["overgrow", "chlorophyll"]
  // Opcional si luego lo derivás de otro endpoint
  bestNature?: string;      // e.g., "Modest" - si lo calculás externamente
};

export interface Item {
  name: string;
  id: number;
  imgSrc: string;
  category: string;
  effect: string;
}


// src/types/types.d.ts
export interface Location {
  name: string;
  url: string;
}

export interface LocationDetails {
  id: number;
  name: string;
  region: string;
  areas: string[];
}
