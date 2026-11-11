<template>
  <button
    type="button"
    class="fav-btn"
    :class="{ 'is-active': active }"
    :aria-label="active ? 'Seçilmişlərdən çıxar' : 'Seçilmişlərə əlavə et'"
    @click.prevent="toggle(id)"
  >
    <i :class="['bi', active ? 'bi-heart-fill' : 'bi-heart']" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useFavouritesStore } from '~/stores/favourites'

export default defineComponent({
  name: 'FavouriteButton',

  props: {
    id: { type: String, required: true },
  },

  computed: {
    ...mapState(useFavouritesStore, ['ids']),

    active(): boolean {
      return this.ids.includes(this.id)
    },
  },

  methods: {
    ...mapActions(useFavouritesStore, ['toggle']),
  },
})
</script>
