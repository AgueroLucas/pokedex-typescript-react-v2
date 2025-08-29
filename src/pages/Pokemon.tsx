import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PokeballImg from "../assets/pokeball.png";
import Footer from '../components/Footer';
import styles from "./pokemon.module.css";
import { PokemonDetails } from '../types/types';
import { fetchPokemon } from '../api/fetchPokemon';
import LoadingScreen from '../components/LoadingScreen';

const Pokemon = () => {
  const [pokemon, setPokemon] = useState<PokemonDetails>();
  const [isLoading, setIsLoading] = useState(true); // ← faltaba esto
  const { name } = useParams();
  const navigate = useNavigate();

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    async function getPokemon() {
      setIsLoading(true);
      await delay(500);
      const fetchedPokemon = await fetchPokemon(name as string);
      setPokemon(fetchedPokemon);
      setIsLoading(false);
    }
    getPokemon();
  }, [name]);

  if (isLoading || !pokemon) return <LoadingScreen />;

  return (
    <>
      <button className={styles.pokeballButton} onClick={() => navigate(-1)}>
        <img className={styles.pokeballImg} src={PokeballImg} alt="Pokeball" /> Go Back
      </button>

      <div className={styles.pokemon}>
        <main className={styles.pokemonCard}>
  <span className={styles.pokemonNumber}>#{pokemon.id.toString().padStart(3, '0')}</span>

  <div className={styles.pokemonCircle}>
    <img
      className={styles.pokemonSprite}
      src={pokemon.imgSrc}
      alt={pokemon.name}
    />
  </div>

  <h2 className={styles.pokemonName}>{pokemon.name}</h2>

  <div className={styles.statGroup}>
    <p>
  <strong>{pokemon.weight / 10} kg</strong>
  <br />
  Weight
</p>
<p>
  <strong>{pokemon.height / 10} m</strong>
  <br />
  Height
</p>
  </div>
    <div>HP: {pokemon.hp}</div>
    <div>Attack: {pokemon.attack}</div>
    <div>Defense: {pokemon.defense}</div>

  <div className={styles.typeGroup}>
    {pokemon.types.map((type, index) => (
      <span
        key={index}
        className={`${styles.type} ${styles[`type${type.charAt(0).toUpperCase() + type.slice(1)}`]}`}
      >
        {type}
      </span>
    ))}
  </div>

  {pokemon.bestNature && (
    <div className={styles.bestNature}>
      Best Nature: <strong>{pokemon.bestNature}</strong>
    </div>
  )}
</main>
      </div>

      <Footer />
    </>
  );
};

export default Pokemon;
