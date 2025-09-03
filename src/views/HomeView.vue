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
    <!-- <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
      <PokemonCard v-for="p in store.filtered" :key="p.name" :pokemon="p" />
    </div> -->
    <div v-else>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-5 g-4">
        <PokemonCard v-for="p in store.paginated" :key="p.name" :pokemon="p" />
      </div>

      <!-- Pagination -->
      <nav class="d-flex justify-content-center mt-4" v-if="store.totalPages > 1">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: store.currentPage === 1 }">
            <button
              class="page-link"
              @click="store.currentPage--"
              :disabled="store.currentPage === 1"
            >
              Prev
            </button>
          </li>

          <li
            v-for="page in store.totalPages"
            :key="page"
            class="page-item"
            :class="{ active: store.currentPage === page }"
          >
            <button class="page-link" @click="store.currentPage = page">
              {{ page }}
            </button>
          </li>

          <li class="page-item" :class="{ disabled: store.currentPage === store.totalPages }">
            <button
              class="page-link"
              @click="store.currentPage++"
              :disabled="store.currentPage === store.totalPages"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <div v-if="!store.loading && !store.filtered.length" class="text-center text-muted py-5">
      No Pokemon found. Try another search term.
    </div>
  </div>
</template>
