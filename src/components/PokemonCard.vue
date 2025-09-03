<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
const props = defineProps({ pokemon: { type: Object, required: true } })
const router = useRouter()
const open = () => router.push(`/pokemon/${encodeURIComponent(props.pokemon.name)}`)
</script>

<template>
  <div class="col">
    <div class="card h-100 shadow-sm" role="button" @click="open">
      <img
        v-if="pokemon.image"
        :src="pokemon.image"
        class="card-img-top p-3 object-fit-contain"
        style="height: 180px"
        :alt="pokemon.name"
      />
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h5 class="card-title text-capitalize mb-0">
            {{ pokemon.nickname || pokemon.name }}
          </h5>
          <span v-if="pokemon.favorite" class="badge text-bg-warning"
            ><i class="bi bi-star-fill"></i> Fav</span
          >
        </div>
        <p class="card-text text-muted small mb-2">
          <strong>Types:</strong> {{ pokemon.types.join(', ') }}
        </p>
        <ul class="list-inline small m-0 text-muted">
          <li class="list-inline-item"><strong>Height:</strong> {{ pokemon.height }}</li>
          <li class="list-inline-item"><strong>Weight:</strong> {{ pokemon.weight }}</li>
          <li class="list-inline-item"><strong>XP:</strong> {{ pokemon.base_experience }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
