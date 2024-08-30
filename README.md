# Pokedex

Este proyecto es una aplicación Pokedex construida con Next.js, React, TypeScript y Tailwind CSS. Utiliza el endpoint GraphQL de PokeAPI para obtener datos de Pokémon.

## Características

- Búsqueda de Pokémon
- Muestra detalles de Pokémon incluyendo nombre, ID, sprite y tipos
- Diseño responsivo

## Tecnologías Utilizadas

- Next.js 14.2.7
- React 18
- TypeScript
- Tailwind CSS
- Componentes de Shadcn UI
- Primitivos de Radix UI

## Comenzando

1. Clona el repositorio
2. Instala las dependencias:
   ```
   npm install
   ```
3. Ejecuta el servidor de desarrollo:
   ```
   npm run dev
   ```
4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## Estructura del Proyecto

- `src/app`: Páginas del enrutador de aplicaciones de Next.js
- `src/components`: Componentes de React
- `src/hooks`: Hooks personalizados de React
- `src/lib`: Funciones de utilidad y llamadas a la API

## Componentes Principales

- `Pokedex`: Componente principal para la funcionalidad de Pokedex
- `PokemonCard`: Componente para mostrar detalles individuales de Pokémon

## API

Este proyecto utiliza el endpoint GraphQL de PokeAPI para obtener datos de Pokémon. La función `searchPokemon` en `src/lib/pokemon-api.ts` maneja las llamadas a la API.

## Estilos

El proyecto utiliza Tailwind CSS para los estilos, con una configuración de tema personalizada en `tailwind.config.ts`. Los estilos globales se definen en `src/app/globals.css`.

## Contribuciones

¡Las contribuciones son bienvenidas! No dudes en enviar un Pull Request.

## Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).
