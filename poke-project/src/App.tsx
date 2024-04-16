import GameWrapper from "./components/game-wrapper";
import styles from "./App.module.css";
import { useSelected } from "./hooks/useSelected";
import { usePokemons } from "./hooks/usePokemons";
import PokemonList from "./screens/pokemon-list";
import Fight from "./screens/fight";
import { useState } from "react";

type Screens = "pokemon-list" | "pokemon-fight";

function App() {
  const pokemons = usePokemons();
  const selection = useSelected(3, pokemons.data.length);
  const [currentScreen, setCurrentScreen] = useState<Screens>("pokemon-list");

  if (pokemons.isLoading || pokemons.data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.main}>
      <h1>Games retro</h1>
      <GameWrapper
        controlDriver={
          currentScreen === "pokemon-list"
            ? {
                up: selection.up,
                down: selection.down,
                left: selection.prev,
                right: selection.next,
                start: () => setCurrentScreen("pokemon-fight"),
              }
            : undefined
        }
      >
        {currentScreen === "pokemon-list" && (
          <PokemonList pokemons={pokemons} selectedState={selection} />
        )}
        {currentScreen === "pokemon-fight" && (
          <Fight user_pokemon={pokemons.data[selection.selected]} />
        )}
      </GameWrapper>
    </div>
  );
}

export default App;
