import { Link } from "react-router-dom";
import styles from "./footer.module.css";
//Assets
import PokemonPic from "../assets/Ditto.png";
import LocationPic from "../assets/pointer.png";
import ItemsPic from "../assets/pokeball.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link className={styles.footerLink} to="/pokemons">
        <img className={styles.footerIcon} src={PokemonPic} alt="Pokeball" />
        Pokemons
      </Link>

      <Link className={styles.footerLink} to="/items">
        <img className={styles.footerIcon} src={ItemsPic} alt="Pokeball" />
        Items
      </Link>

      <Link className={styles.footerLink} to="/map">
        <img className={styles.footerIcon} src={LocationPic} alt="Pokeball" />
        Map
      </Link>

      <span className={styles.brand}>AgüeroLucas@.app</span>
    
    </footer>
  );
};

export default Footer;
