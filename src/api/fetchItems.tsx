import { Item } from "../types/types.d";

export async function fetchItems(): Promise<Item[]> {
  const response = await fetch("https://pokeapi.co/api/v2/item?limit=100");

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  const itemResults = data.results;

  const items = await Promise.all(
    itemResults.map(async (item: any) => {
      try {
        const itemDetailRes = await fetch(item.url);
        if (!itemDetailRes.ok) throw new Error();

        const detail = await itemDetailRes.json();

        return {
          name: detail.name,
          id: detail.id,
          imgSrc: detail.sprites?.default || "https://via.placeholder.com/64?text=Item",
          category: detail.category?.name || "Sin categoría",
          effect:
            detail.effect_entries?.find((entry: any) => entry.language.name === "es")?.effect ||
            detail.effect_entries?.find((entry: any) => entry.language.name === "en")?.effect ||
            "Sin descripción",
        };
      } catch (err) {
        console.error("Error con item:", item.name);
        return null;
      }
    })
  );

  return items.filter((i) => i !== null);
}