import styles from "./pokemon.module.css";
import { _Full_Pokemon } from "../hooks/usePokemons";
import { useEffect, useRef } from "react";

export function RenderPokemon({
  pokemon,
  isSelected,
  onClick,
}: {
  pokemon: _Full_Pokemon;
  isSelected: boolean;
  onClick?: (pokemon: _Full_Pokemon) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSelected && ref.current) {
      ref.current.scrollIntoView({
        block: "center",
      });
    }
  }, [isSelected]);

  return (
    <div
      onClick={() => onClick?.(pokemon)}
      ref={ref}
      className={`${styles.pokemon_card} ${isSelected ? styles.selected : ""}`}
    >
      <img
        className={styles.pokemon_image}
        src={pokemon.sprites.other.dream_world.front_default}
        alt=""
      />
      <h2 className={styles.pokemon_name}>{pokemon?.name}</h2>
    </div>
  );
}
