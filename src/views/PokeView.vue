<template>
  <div class="container" v-if="pokemon">
    <div class="row g-4">
      <div class="col-md-4">
        <div class="card shadow-sm border-0">
          <img
            :src="pokemon.image"
            class="card-img-top p-3 object-fit-contain"
            style="height: 260px"
            :alt="pokemon.name"
          />
          <div class="card-body">
            <h2 class="h4 text-capitalize">
              {{ pokemon.nickname || pokemon.name }}
            </h2>
            <p class="text-muted mb-2" v-if="pokemon.nickname">
              Original name: <span class="text-capitalize">{{ pokemon.name }}</span>
            </p>
            <div class="d-flex gap-2 flex-wrap">
              <span
                v-for="t in pokemon.types"
                :key="t"
                class="badge text-bg-primary text-capitalize"
                >{{ t }}</span
              >
            </div>
          </div>
        </div>
        <div class="d-grid mt-3 gap-2">
          <button class="btn btn-warning" @click="toggleFavorite">
            <i :class="pokemon.favorite ? 'bi bi-star-fill' : 'bi bi-star'"></i>
            {{ pokemon.favorite ? ' Unfavorite' : ' Favorite' }}
          </button>
          <button
            class="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#editModal"
          >
            Edit Info
          </button>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h3 class="h5 mb-3">Overview</h3>
            <div class="row">
              <div class="col-6 col-lg-4"><strong>Height:</strong> {{ pokemon.height }}</div>
              <div class="col-6 col-lg-4"><strong>Weight:</strong> {{ pokemon.weight }}</div>
              <div class="col-6 col-lg-4">
                <strong>Base XP:</strong> {{ pokemon.base_experience }}
              </div>
              <div class="col-12 mt-2">
                <strong>Abilities:</strong> {{ pokemon.abilities.join(', ') }}
              </div>
            </div>
            <hr />
            <h4 class="h6">Base Stats</h4>
            <ul class="list-group list-group-flush">
              <li
                v-for="s in pokemon.stats"
                :key="s.name"
                class="list-group-item d-flex justify-content-between align-items-center text-capitalize"
              >
                {{ s.name }}
                <span class="badge rounded-pill text-bg-secondary">{{ s.base }}</span>
              </li>
            </ul>
            <div v-if="pokemon.notes" class="mt-3">
              <h5 class="h6">Notes</h5>
              <p class="text-muted mb-0" style="white-space: pre-wrap">{{ pokemon.notes }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <form class="modal-content" @submit.prevent="save">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Edit Pokemon</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Nickname</label>
              <input
                v-model="form.nickname"
                type="text"
                class="form-control"
                placeholder="Give it a cute nickname…"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Notes</label>
              <textarea
                v-model="form.notes"
                class="form-control"
                rows="4"
                placeholder="Any observations or strategy notes…"
              ></textarea>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="fav" v-model="form.favorite" />
              <label class="form-check-label" for="fav">Mark as favorite</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="container" v-else>
    <Loader />
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePokemonStore } from '../stores/pokemonStore'
import Loader from '../components/Loader.vue'

const route = useRoute()
const router = useRouter()
const store = usePokemonStore()

onMounted(async () => {
  if (!store.items.length && !store.loading) await store.load()
})

const pokemon = computed(() => store.getByName(route.params.name))
watch(pokemon, (val) => {
  if (!val && !store.loading) router.replace('/')
})

const form = reactive({
  nickname: '',
  notes: '',
  favorite: false,
})

watch(
  pokemon,
  (p) => {
    if (!p) return
    form.nickname = p.nickname || ''
    form.notes = p.notes || ''
    form.favorite = !!p.favorite
  },
  { immediate: true },
)

const save = () => {
  store.saveEdit(pokemon.value.name, {
    nickname: form.nickname,
    notes: form.notes,
    favorite: form.favorite,
  })
  // Close modal programmatically
  const modalEl = document.getElementById('editModal')
  if (modalEl && window.bootstrap) {
    const modal = window.bootstrap.Modal.getInstance(modalEl) || new window.bootstrap.Modal(modalEl)
    modal.hide()
  }
}

const toggleFavorite = () => {
  store.toggleFavorite(pokemon.value.name)
}
</script>
