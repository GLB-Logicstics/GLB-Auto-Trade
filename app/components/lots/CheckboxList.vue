<template>
  <div class="checkbox-list">
    <p v-if="!options.length" class="checkbox-list__empty">{{ emptyText }}</p>

    <template v-else>
      <input v-if="searchable" v-model="search" type="text" class="form-input checkbox-list__search" placeholder="Axtar">

      <div class="checkbox-list__items">
        <label v-for="option in filteredOptions" :key="option.value" class="checkbox">
          <input v-model="picked" type="checkbox" :value="option.value">
          {{ option.label }}
        </label>
        <p v-if="!filteredOptions.length" class="checkbox-list__empty">Nəticə tapılmadı</p>
      </div>

      <button type="button" class="checkbox-list__apply" @click="$emit('apply', picked)">Filtirlə</button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Option } from '~/types'

export default defineComponent({
  name: 'CheckboxList',

  props: {
    options: { type: Array as PropType<Option[]>, required: true },
    selected: { type: Array as PropType<string[]>, required: true },
    searchable: { type: Boolean, default: true },
    emptyText: { type: String, default: 'Seçim yoxdur' },
  },

  emits: ['apply'],

  data() {
    return {
      search: '',
      picked: [...this.selected],
    }
  },

  computed: {
    filteredOptions(): Option[] {
      const text = this.search.trim().toLowerCase()
      if (!text) return this.options
      return this.options.filter((option) => option.label.toLowerCase().includes(text))
    },
  },

  watch: {
    selected(value: string[]) {
      this.picked = [...value]
    },
  },
})
</script>

<style lang="scss" scoped>
.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__search {
    height: 38px;
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 220px;
    overflow-y: auto;
  }

  &__empty {
    font-size: 0.875rem;
    color: $muted;
  }

  &__apply {
    height: 36px;
    font-size: 0.875rem;
    font-weight: 600;
    color: $ink;
    background-color: $surface;
    border-radius: $radius;
    transition: background-color $transition, color $transition;

    &:hover {
      color: $white;
      background-color: $primary;
    }
  }
}
</style>
