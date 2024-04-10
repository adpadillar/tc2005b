import GameWrapper from "./components/game-wrapper";
import styles from "./App.module.css";
import { useSelected } from "./hooks/useSelected";
import { usePokemons } from "./hooks/usePokemons";
import PokemonList from "./screens/pokemon-list";
import Fight from "./screens/fight";

function App() {
  const pokemons = usePokemons();
  const selection = useSelected(3, pokemons.data.length);

  return (
    <div className={styles.main}>
      <h1>Games retro</h1>
      <GameWrapper
        controlDriver={{
          up: selection.up,
          down: selection.down,
          left: selection.prev,
          right: selection.next,
        }}
      >
        <Fight id={selection.selected} />
        <PokemonList pokemons={pokemons} selectedState={selection} />
      </GameWrapper>
    </div>
  );
}

export default App;
