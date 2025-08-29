import { useEffect, useState } from "react";
import { fetchItems } from "../api/fetchItems";
import { Item } from "../types/types.d";
import styles from "./items.module.css"; // Opcional si querés estilo
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen"; // Importamos LoadingScreen

const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  const waitFor = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchAllItems = async () => {
      setIsLoading(true);
      await waitFor(200); 
      const data = await fetchItems();
      setItems(data);
      setIsLoading(false);
    };
    fetchAllItems();
  }, []);

  if (isLoading || !items) {
    return <LoadingScreen />; // Usamos LoadingScreen mientras se cargan los datos
  }

  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <main>
        <div className={styles.container}>
          <h1 className={styles.h1}>Lista de Items</h1>
          <ul className={styles.list}>
            {items
              .filter((item) => {
                const queryLower = query.toLowerCase();
                const nameMatch = item.name.toLowerCase().includes(queryLower);
                const idMatch = item.id.toString().includes(queryLower); // opcional, si querés que también se filtre por ID
                return nameMatch || idMatch;
              })
              .map((item, index) => (
                <li key={index} className={styles.itemCard}>
                  <img
                    src={item.imgSrc}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                  <h3 className={styles.h3}>{item.name}</h3>
                  <p>
                    <strong className={styles.strong}>Categoría:</strong> {item.category}
                  </p>
                  <p>
                    <strong className={styles.strong}>Efecto:</strong> {item.effect}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Items;
