<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => router.push('/')
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-transparent">
      <div class="container">
        <a class="navbar-brand fw-bold mx-auto" href="#" @click.prevent="goHome"
          ><strong>Pokedex</strong></a
        >
        <!-- <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="nav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://pokeapi.co" target="_blank" rel="noreferrer"
                >PokeAPI</a
              >
            </li>
          </ul>
        </div> -->
      </div>
    </nav>
    <main class="py-4">
      <RouterView />
    </main>
    <footer class="py-4 text-center text-muted">
      <small
        ><a class="nav-link" href="https://pokeapi.co" target="_blank" rel="noreferrer"
          >Powered by <strong>PokeAPI</strong></a
        ></small
      >
    </footer>
  </div>
</template>

<style>
:root {
  --brand: #e3350d;
}
body {
  background: #f8fafc;
}
.navbar-brand {
  color: var(--brand);
}
.card:hover {
  transform: translateY(-2px);
  transition: transform 0.15s ease-in-out;
}
</style>

<!-- <style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
