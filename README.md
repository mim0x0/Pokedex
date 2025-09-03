# Pokedex

A simple responsive Pokédex web app built with Vue 3, Pinia, and Bootstrap 5.3.
This app fetches data from the [PokeAPI](https://pokeapi.co/) and allows you to:

- Browse the first 100 Pokémon in a responsive grid layout

- View Pokemon name, image, and key info (types, height, weight, base XP)

- Search/filter Pokemon by name

- Click a Pokemon to view a detailed page (abilities, stats, etc.)

- Edit Pokemon info (nickname, notes, favorite flag) — edits are stored in Pinia persisted state

- Responsive design that works across devices

- Shows a pokeball loading spinner while fetching data

## Tech Stack

- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Bootstrap 5.3](https://getbootstrap.com/)
- [Vite](https://vite.dev/)

## Live Demo

[Hosted on GitHub Pages](https://mim0x0.github.io/Pokedex/).

## Project Setup

Clone the repo:

```sh
git clone https://github.com/mim0x0/Pokedex.git
cd Pokedex
```

File D:\FYP\Node.js\npm.ps1 cannot be loaded because running scripts is disabled on this system, use this command:

```sh
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Install dependencies:

```sh
npm install
```

Run locally:

```sh
npm run dev
```

### Future improvements

- Improve Design
- Add type-based filter
