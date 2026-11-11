<template>
  <nav v-if="totalPages > 1" class="pagination">
    <button type="button" class="pagination__button" :disabled="page === 1" aria-label="Əvvəlki" @click="go(page - 1)">
      <i class="bi bi-chevron-left" />
    </button>

    <button
      v-for="number in totalPages"
      :key="number"
      type="button"
      class="pagination__button"
      :class="{ 'is-active': number === page }"
      @click="go(number)"
    >
      {{ number }}
    </button>

    <button
      type="button"
      class="pagination__button"
      :disabled="page === totalPages"
      aria-label="Növbəti"
      @click="go(page + 1)"
    >
      <i class="bi bi-chevron-right" />
    </button>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Pagination',

  props: {
    page: { type: Number, required: true },
    totalPages: { type: Number, required: true },
  },

  emits: ['change'],

  methods: {
    go(number: number) {
      this.$emit('change', number)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
})
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 28px;

  &__button {
    @include flex-center;
    min-width: 40px;
    height: 40px;
    padding: 0 8px;
    font-weight: 500;
    color: $ink;
    background-color: $white;
    border: 1px solid $line;
    border-radius: $radius;
    transition: background-color $transition, color $transition, border-color $transition;

    &:hover:not(:disabled) {
      border-color: $primary;
    }

    &.is-active {
      color: $white;
      background-color: $primary;
      border-color: $primary;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }
  }
}
</style>
