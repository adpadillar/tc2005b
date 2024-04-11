import { useEffect, useState } from "react";

export const POKE_URL = "https://pokeapi.co/api/v2";

export type _Simple_Pokemon = {
  name: string;
  url: string;
};

export type _Full_Pokemon = {
  id: number;
  name: string;
  sprites: {
    back_default: string;
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
};

export type _Slash_Pokemon_Endpoint_Response = {
  count: number;
  next: string | null;
  previous: string | null;
  results: _Simple_Pokemon[];
};

export const usePokemons = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<_Full_Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const fetchNext = () => {
    if (nextUrl) {
      fetch(nextUrl)
        .then((response) => response.json())
        .then((_data) => {
          const data = _data as _Slash_Pokemon_Endpoint_Response;
          setNextUrl(data.next);
          return Promise.all(
            data.results.map((pokemon) =>
              fetch(pokemon.url).then((response) => response.json())
            )
          );
        })
        .then((data) => {
          setData((prevData) => [...prevData, ...(data as _Full_Pokemon[])]);
        });
    }
  };

  useEffect(() => {
    fetch(`${POKE_URL}/pokemon/`)
      .then((response) => response.json())
      .then((_data) => {
        const data = _data as _Slash_Pokemon_Endpoint_Response;
        setNextUrl(data.next);
        return Promise.all(
          data.results.map((pokemon) => {
            console.log(pokemon.url);
            return fetch(pokemon.url).then((response) => response.json());
          })
        );
      })
      .then((data) => {
        setData(data as _Full_Pokemon[]);
        setIsLoading(false);
      });
  }, []);

  return { isLoading, data, fetchNext };
};
