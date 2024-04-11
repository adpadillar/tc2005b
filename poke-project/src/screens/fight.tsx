import React, { useMemo } from "react";

import styles from "./fight.module.css";
import { _Full_Pokemon } from "../hooks/usePokemons";
import { usePokemonById } from "../hooks/usePokemonById";

interface FightProps {
  children?: React.ReactNode;
  user_pokemon: _Full_Pokemon;
}

function randomInt(min: number, max: number, disallowed: number): number {
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random === disallowed ? randomInt(min, max, disallowed) : random;
}

const Fight: React.FC<FightProps> = ({ user_pokemon }) => {
  const oponnentId = useMemo(
    () => randomInt(0, 100, user_pokemon.id),
    [user_pokemon.id]
  );

  console.log("user_pokemon", user_pokemon);

  const { data: oponent_pokemon, isLoading } = usePokemonById(oponnentId);

  if (isLoading || !oponent_pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.display_wrapper}>
      <div>
        <img
          className={styles.user_pokemon}
          src={user_pokemon.sprites.back_default}
          alt=""
        />
        <img
          className={styles.oponent_pokemon}
          src={oponent_pokemon.sprites.front_default}
          alt=""
        />
      </div>
    </div>
  );
};

export default Fight;
