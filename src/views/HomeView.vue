<script setup>
import { onMounted } from 'vue'
import { usePokemonStore } from '../stores/pokemonStore'
import SearchBar from '../components/SearchBar.vue'
import Loader from '../components/Loader.vue'
import PokemonCard from '../components/PokemonCard.vue'

const store = usePokemonStore()
onMounted(() => {
  store.load()
})
const reload = () => {
  store.items = []
  store.load()
}
</script>

<template>
  <div class="container-fluid">
    <SearchBar v-model="store.search" />

    <div v-if="store.error" class="alert alert-danger" role="alert">
      {{ store.error }}
    </div>

    <Loader v-if="store.loading" />
    <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
      <PokemonCard v-for="p in store.filtered" :key="p.name" :pokemon="p" />
    </div>

    <div v-if="!store.loading && !store.filtered.length" class="text-center text-muted py-5">
      No Pokemon found. Try another search term.
    </div>
  </div>
</template>
