import { defineStore } from 'pinia'

export const useFavouritesStore = defineStore('favourites', {
  state: () => ({
    ids: [] as string[],
  }),

  actions: {
    toggle(id: string) {
      if (this.ids.includes(id)) {
        this.ids = this.ids.filter((item) => item !== id)
      } else {
        this.ids = [...this.ids, id]
      }
    },
  },
})
