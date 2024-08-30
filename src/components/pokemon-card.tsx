import { Button } from "@/components/ui/button";
import { typeColors } from "@/lib/pokemon-types";
import Image from "next/image";

interface PokemonType {
  name: string;
}

interface PokemonCardProps {
  id: number;
  name: string;
  spriteUrl: string | null;
  types: PokemonType[];
  isCaught: boolean;
  onCatch: () => void;
  onRelease: () => void;
}

export function PokemonCard({
  id,
  name,
  spriteUrl,
  types,
  isCaught,
  onCatch,
  onRelease,
}: PokemonCardProps) {
  return (
    <div className="relative border-4 border-yellow-400 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-100 to-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-pokeball opacity-5 z-0"></div>
      <div className="relative z-10">
        <h2 className="text-2xl font-bold capitalize mb-2 text-center text-blue-600 shadow-text">
          {name}
        </h2>
        <div className="flex justify-center gap-2 mb-4">
          {types.map((type) => (
            <span
              key={type.name}
              className={`${
                typeColors[type.name] || "bg-gray-500"
              } text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}
            >
              {type.name}
            </span>
          ))}
        </div>
        {spriteUrl && (
          <div className="relative w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-2 transform hover:scale-110 transition-transform duration-300">
            <Image
              src={spriteUrl}
              alt={name}
              layout="fill"
              objectFit="contain"
              className="pixelated"
            />
          </div>
        )}
        <Button
          onClick={isCaught ? onRelease : onCatch}
          className={`w-full ${
            isCaught
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isCaught ? "Release" : "Catch"}
        </Button>
      </div>
    </div>
  );
}
