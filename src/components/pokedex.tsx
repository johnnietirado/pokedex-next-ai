"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePokedex } from "@/hooks/usePokedex";
import { searchPokemon } from "@/lib/pokemon-api";
import { useState } from "react";
import { PokemonCard } from "./pokemon-card";

interface Pokemon {
  name: string;
  id: number;
  spriteUrl: string | null;
  types: { name: string }[];
}

export function Pokedex() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { caughtPokemon, catchPokemon, releasePokemon, isPokemonCaught } =
    usePokedex();

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchPokemon(searchTerm);
      setPokemons(results);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch Pokemon");
      setPokemons([]);
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Search Pokemon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          Search
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">My Pokedex</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>My Pokedex</SheetTitle>
              <SheetDescription>Your caught Pokemon</SheetDescription>
            </SheetHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 overflow-y-auto max-h-[calc(100vh-200px)]">
              {caughtPokemon.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  {...pokemon}
                  isCaught={true}
                  onCatch={() => {}}
                  onRelease={() => releasePokemon(pokemon.id)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {pokemons.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              {...pokemon}
              isCaught={isPokemonCaught(pokemon.id)}
              onCatch={() => catchPokemon(pokemon)}
              onRelease={() => releasePokemon(pokemon.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
