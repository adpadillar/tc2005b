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

function getStat(pokemon: _Full_Pokemon, statName: string) {
  return pokemon.stats.find((stat) => stat.stat.name === statName)!;
}

const Fight: React.FC<FightProps> = ({ user_pokemon }) => {
  const oponnentId = useMemo(
    () => randomInt(0, 100, user_pokemon.id),
    [user_pokemon.id]
  );

  const { data: oponent_pokemon, isLoading } = usePokemonById(oponnentId);

  if (isLoading || !oponent_pokemon) {
    return <div>Loading...</div>;
  }

  console.log(user_pokemon, oponent_pokemon);

  const user_pokemon_hp = getStat(user_pokemon, "hp");
  const oponent_pokemon_hp = getStat(oponent_pokemon, "hp");

  const user_pokemon_damage = getStat(user_pokemon, "attack");
  const oponent_pokemon_damage = getStat(oponent_pokemon, "attack");

  return (
    <div className={styles.display_wrapper}>
      <div>
        <div className={styles.user_pokemon_stats}>
          <h2>{user_pokemon.name}</h2>
          <p>
            HP: {user_pokemon_hp.base_stat} - DMG:{" "}
            {user_pokemon_damage.base_stat}
          </p>
        </div>

        <div className={styles.oponent_pokemon_stats}>
          <h2>{oponent_pokemon.name}</h2>
          <p>
            HP: {oponent_pokemon_hp.base_stat} - DMG:{" "}
            {oponent_pokemon_damage.base_stat}
          </p>
        </div>
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
