import { defineStore } from 'pinia'
import axios from 'axios'

const API = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    items: [],
    loading: true,
    error: null,
    search: '',
    edits: {},
    currentPage: 1,
    pageSize: 20,
  }),
  persist: true,
  getters: {
    filtered(state) {
      const q = state.search.trim().toLowerCase()
      if (!q) return state.itemsWithEdits
      return state.itemsWithEdits.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || (p.nickname && p.nickname.toLowerCase().includes(q)),
      )
    },
    itemsWithEdits(state) {
      return state.items.map((p) => ({
        ...p,
        ...(state.edits[p.name] || {}),
      }))
    },
    getByName: (state) => (name) => {
      const base = state.items.find((p) => p.name === name)
      if (!base) return null
      return { ...base, ...(state.edits[name] || {}) }
    },
    paginated(state) {
      const start = (state.currentPage - 1) * state.pageSize
      return this.filtered.slice(start, start + state.pageSize)
    },
    totalPages(state) {
      return Math.ceil(this.filtered.length / state.pageSize)
    },
  },
  actions: {
    async load() {
      this.loading = true
      this.error = null
      try {
        const { data } = await axios.get(API)
        const details = await Promise.all(
          data.results.map(async (r) => {
            const d = await axios.get(r.url).then((res) => res.data)
            return {
              id: d.id,
              name: d.name,
              height: d.height,
              weight: d.weight,
              base_experience: d.base_experience,
              types: d.types.map((t) => t.type.name),
              abilities: d.abilities.map((a) => a.ability.name),
              image:
                d.sprites.other?.['official-artwork']?.front_default || d.sprites.front_default,
              sprite: d.sprites.front_default,
              stats: d.stats.map((s) => ({ name: s.stat.name, base: s.base_stat })),
            }
          }),
        )
        this.items = details.sort((a, b) => a.name.localeCompare(b.name))
        this.currentPage = 1
      } catch (e) {
        this.error = e?.message || 'Failed to load Pokemon.'
      } finally {
        this.loading = false
      }
    },
    setSearch(q) {
      this.search = q
    },
    saveEdit(name, payload) {
      this.edits[name] = { ...(this.edits[name] || {}), ...payload }
    },
    toggleFavorite(name) {
      const cur = this.edits[name]?.favorite || false
      this.saveEdit(name, { favorite: !cur })
    },
  },
})
