import React from "react";
import OnIntersect from "../components/intersection-observer";
import { RenderPokemon } from "../components/pokemon";

import styles from "./pokemon-list.module.css";
import { usePokemons } from "../hooks/usePokemons";
import { useSelected } from "../hooks/useSelected";

interface PokemonListProps {
  pokemons: ReturnType<typeof usePokemons>;
  selectedState: ReturnType<typeof useSelected>;
}

export const PokemonList: React.FC<PokemonListProps> = ({
  selectedState,
  pokemons,
}) => {
  const { select, selected } = selectedState;
  const { data, fetchNext } = pokemons;

  return (
    <div className={styles.display_wrapper}>
      <h1 className={styles.title}>Select a pokemon</h1>

      <div className={styles.pokemons_grid}>
        {data.map((pokemon, idx) => {
          const selectCurrent = () => select(idx);

          if (idx === data.length - 5) {
            return (
              <OnIntersect
                key={`${idx}_${pokemon.name}_${pokemon.id}`}
                onIntersect={fetchNext}
              >
                <RenderPokemon
                  onClick={selectCurrent}
                  isSelected={selected === idx}
                  pokemon={pokemon}
                />
              </OnIntersect>
            );
          }

          return (
            <RenderPokemon
              onClick={selectCurrent}
              isSelected={selected === idx}
              key={`${idx}_${pokemon.name}_${pokemon.id}`}
              pokemon={pokemon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PokemonList;
