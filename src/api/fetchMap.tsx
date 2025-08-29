import { Location, LocationDetails } from "../types/types.d";

export async function fetchLocations(): Promise<Location[]> {
  const response = await fetch("https://pokeapi.co/api/v2/location?limit=100");

  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();
  return data.results;
}

export async function fetchLocationDetails(url: string): Promise<LocationDetails> {
  const response = await fetch(url);

  if (!response.ok) throw new Error(response.statusText);

  const detail = await response.json();
  return {
    id: detail.id,
    name: detail.name,
    region: detail.region?.name || "desconocida",
    areas: detail.areas?.map((a: any) => a.name) || [],
  };
}