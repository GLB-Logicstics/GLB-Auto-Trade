<template>
  <div class="filter-group">
    <button type="button" class="filter-group__toggle" :class="{ 'is-open': open }" @click="open = !open">
      {{ title }}
      <span v-if="count" class="filter-group__count">{{ count }}</span>
      <i class="bi bi-chevron-down filter-group__chevron" />
    </button>
    <div v-show="open" class="filter-group__body">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FilterGroup',

  props: {
    title: { type: String, required: true },
    count: { type: Number, default: 0 },
    opened: { type: Boolean, default: false },
  },

  data() {
    return { open: this.opened || this.count > 0 }
  },
})
</script>

<style lang="scss" scoped>
.filter-group {
  border-bottom: 1px solid $line-soft;

  &:last-child {
    border-bottom: 0;
  }

  &__toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 14px 0;
    font-weight: 600;
    color: $text-soft;
    text-align: left;
    transition: color $transition;

    &:hover,
    &.is-open {
      color: $ink;
    }
  }

  &__count {
    min-width: 20px;
    padding: 0 6px;
    font-size: 0.75rem;
    line-height: 20px;
    color: $white;
    text-align: center;
    background-color: $accent;
    border-radius: 10px;
  }

  &__chevron {
    margin-left: auto;
    font-size: 14px;
    transition: transform $transition;
  }

  &__toggle.is-open &__chevron {
    transform: rotate(180deg);
  }

  &__body {
    padding-bottom: 16px;
  }
}
</style>
