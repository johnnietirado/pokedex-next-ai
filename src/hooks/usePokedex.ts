import { useEffect, useState } from "react";

interface Pokemon {
  id: number;
  name: string;
  spriteUrl: string | null;
  types: { name: string }[];
}

export function usePokedex() {
  const [caughtPokemon, setCaughtPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("caughtPokemon");
    if (stored) {
      setCaughtPokemon(JSON.parse(stored));
    }
  }, []);

  const catchPokemon = (pokemon: Pokemon) => {
    const updatedPokemon = [...caughtPokemon, pokemon];
    setCaughtPokemon(updatedPokemon);
    localStorage.setItem("caughtPokemon", JSON.stringify(updatedPokemon));
  };

  const releasePokemon = (id: number) => {
    const updatedPokemon = caughtPokemon.filter((p) => p.id !== id);
    setCaughtPokemon(updatedPokemon);
    localStorage.setItem("caughtPokemon", JSON.stringify(updatedPokemon));
  };

  const isPokemonCaught = (id: number) =>
    caughtPokemon.some((p) => p.id === id);

  return { caughtPokemon, catchPokemon, releasePokemon, isPokemonCaught };
}
