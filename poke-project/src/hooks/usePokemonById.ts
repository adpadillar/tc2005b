import { useEffect, useState } from "react";
import { _Full_Pokemon } from "./usePokemons";

export const usePokemonById = (id: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<_Full_Pokemon | undefined>();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((response) => response.json())
      .then((_data) => {
        setData(_data as _Full_Pokemon);
        setIsLoading(false);
      });
  }, [id]);

  return { isLoading, data };
};
