<template>
  <div class="range-filter">
    <div class="range-filter__inputs">
      <input v-model="localFrom" :type="type" class="form-input" :placeholder="fromLabel" :disabled="disabled">
      <span>-</span>
      <input v-model="localTo" :type="type" class="form-input" :placeholder="toLabel" :disabled="disabled">
    </div>

    <p v-if="hint" class="range-filter__hint">{{ hint }}</p>

    <button
      type="button"
      class="range-filter__apply"
      :disabled="disabled"
      @click="$emit('apply', String(localFrom || ''), String(localTo || ''))"
    >
      Filtirlə
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'RangeFilter',

  props: {
    from: { type: String, default: '' },
    to: { type: String, default: '' },
    type: { type: String as PropType<'number' | 'date'>, default: 'number' },
    fromLabel: { type: String, default: 'Min' },
    toLabel: { type: String, default: 'Maks' },
    hint: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
  },

  emits: ['apply'],

  data() {
    return {
      localFrom: this.from,
      localTo: this.to,
    }
  },

  watch: {
    from(value: string) {
      this.localFrom = value
    },

    to(value: string) {
      this.localTo = value
    },
  },
})
</script>

<style lang="scss" scoped>
.range-filter {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__inputs {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 6px;
    color: $muted;

    input {
      min-width: 0;
      height: 38px;
      padding: 0 10px;
    }
  }

  &__hint {
    font-size: 0.75rem;
    color: $muted;
    text-align: center;
  }

  &__apply {
    height: 36px;
    font-size: 0.875rem;
    font-weight: 600;
    color: $ink;
    background-color: $surface;
    border-radius: $radius;
    transition: background-color $transition, color $transition;

    &:hover:not(:disabled) {
      color: $white;
      background-color: $primary;
    }

    &:disabled {
      color: $muted;
      cursor: not-allowed;
    }
  }
}
</style>
