import { Pokedex } from "@/components/pokedex";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pokedex</h1>
      <Pokedex />
    </main>
  );
}
