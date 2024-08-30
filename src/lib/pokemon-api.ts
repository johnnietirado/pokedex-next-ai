const API_URL = "https://beta.pokeapi.co/graphql/v1beta";

const SEARCH_POKEMON_QUERY = `
  query SearchPokemon($name: String!) {
    pokemon_v2_pokemon(where: {name: {_regex: $name}}, limit: 10, order_by: {name: asc}) {
      name
      id
      order
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

interface PokemonType {
  name: string;
}

interface PokemonData {
  name: string;
  id: number;
  order: number;
  spriteUrl: string | null;
  types: PokemonType[];
}

export async function searchPokemon(name: string): Promise<PokemonData[]> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: SEARCH_POKEMON_QUERY,
      variables: { name: `${name}.*` },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon");
  }

  const { data } = await response.json();
  const pokemons = data.pokemon_v2_pokemon;

  if (!pokemons || pokemons.length === 0) {
    throw new Error("No Pokemon found");
  }

  return pokemons.map((pokemon: any) => ({
    name: pokemon.name,
    id: pokemon.id,
    order: pokemon.order,
    spriteUrl: pokemon.pokemon_v2_pokemonsprites[0]?.sprites
      ? pokemon.pokemon_v2_pokemonsprites[0].sprites.front_default
      : null,
    types: pokemon.pokemon_v2_pokemontypes.map((type: any) => ({
      name: type.pokemon_v2_type.name,
    })),
  }));
}
