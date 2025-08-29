import { useEffect, useState } from "react";
import { fetchLocations, fetchLocationDetails } from "../api/fetchMap";
import { Location, LocationDetails } from "../types/types.d";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import styles from "./map.module.css";

const Map = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selected, setSelected] = useState<LocationDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      
      const data = await fetchLocations();
      setLocations(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  const handleClick = async (location: Location) => {
    setIsLoading(true);
    const details = await fetchLocationDetails(location.url);
    setSelected(details);
    setIsLoading(false);
  };

  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <main className={styles.container}>
        <h1 className={styles.h1}>Map Pokémon</h1>
        <div className={styles.grid}>
          <ul className={styles.locationList}>
            {filteredLocations.map((loc) => (
              <li
                key={loc.name}
                className={styles.locationItem}
                onClick={() => handleClick(loc)}
              >
                {loc.name}
              </li>
            ))}
          </ul>
          <div className={styles.detailPanel}>
            {isLoading ? (
              <LoadingScreen />
            ) : selected ? (
              <div>
                <h2 className={styles.h2}>📍 {selected.name}</h2>
                <h3 className={styles.h3}>Región:</h3> {selected.region}
                <h3 className={styles.h3}>Áreas:</h3>
                <ul>
                  {selected.areas.map((area, i) => (
                    <li key={i}>{area}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className={styles.p}>Seleccioná una ubicación para ver más detalles</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Map;