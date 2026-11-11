<template>
  <div v-click-outside="close" class="select" :class="{ 'is-open': open, 'is-disabled': disabled }">
    <button type="button" class="select__toggle" :disabled="disabled" @click="toggle">
      <span v-if="selected" class="select__value">{{ selected.label }}</span>
      <span v-else class="select__placeholder">{{ placeholder }}</span>
      <i class="bi bi-chevron-down select__chevron" />
    </button>

    <button
      v-if="clearable && selected && !disabled"
      type="button"
      class="select__clear"
      aria-label="Təmizlə"
      @click="choose('')"
    >
      <i class="bi bi-x" />
    </button>

    <div v-if="open" class="select__dropdown">
      <div v-if="searchable" class="select__search">
        <i class="bi bi-search" />
        <input ref="search" v-model="search" type="text" placeholder="Axtar">
      </div>

      <ul class="select__list">
        <li v-for="option in filteredOptions" :key="option.value">
          <button
            type="button"
            class="select__option"
            :class="{ 'is-active': option.value === modelValue }"
            @click="choose(option.value)"
          >
            {{ option.label }}
            <i v-if="option.value === modelValue" class="bi bi-check2" />
          </button>
        </li>
        <li v-if="!filteredOptions.length" class="select__empty">Nəticə tapılmadı</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Option } from '~/types'

export default defineComponent({
  name: 'BaseSelect',

  props: {
    modelValue: { type: String, default: '' },
    options: { type: Array as PropType<Option[]>, default: () => [] },
    placeholder: { type: String, default: 'Seçin' },
    searchable: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      open: false,
      search: '',
    }
  },

  computed: {
    selected(): Option | undefined {
      return this.options.find((option) => option.value === this.modelValue)
    },

    filteredOptions(): Option[] {
      const text = this.search.trim().toLowerCase()
      if (!text) return this.options
      return this.options.filter((option) => option.label.toLowerCase().includes(text))
    },
  },

  methods: {
    toggle() {
      this.open = !this.open
      this.search = ''
      if (this.open && this.searchable) {
        this.$nextTick(() => (this.$refs.search as HTMLInputElement).focus())
      }
    },

    choose(value: string) {
      this.$emit('update:modelValue', value)
      this.close()
    },

    close() {
      this.open = false
    },
  },
})
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  width: 100%;

  &__toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
    height: 48px;
    padding: 0 16px;
    font-size: 1rem;
    text-align: left;
    background-color: $white;
    border: 1px solid $line;
    border-radius: $radius;
    transition: border-color $transition;

    &:disabled {
      cursor: not-allowed;
      background-color: $page-bg;
    }
  }

  &.is-open &__toggle {
    border-color: $primary;
  }

  &__value {
    @include truncate;
    color: $ink;
  }

  &__placeholder {
    @include truncate;
    color: $muted;
  }

  &.is-disabled &__placeholder {
    color: #b7c0cd;
  }

  &__chevron {
    flex-shrink: 0;
    font-size: 14px;
    color: $ink;
    transition: transform $transition;
  }

  &.is-open &__chevron {
    transform: rotate(180deg);
  }

  &.is-disabled &__chevron {
    color: #b7c0cd;
  }

  &__clear {
    position: absolute;
    top: 50%;
    right: 38px;
    @include flex-center;
    width: 24px;
    height: 24px;
    font-size: 18px;
    color: $muted;
    border-radius: 50%;
    transform: translateY(-50%);

    &:hover {
      color: $ink;
      background-color: $surface;
    }
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    left: 0;
    z-index: 50;
    padding: 6px;
    background-color: $white;
    border: 1px solid $line;
    border-radius: $radius;
    box-shadow: $shadow-lg;
  }

  &__search {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 38px;
    padding: 0 10px;
    margin-bottom: 6px;
    color: $muted;
    border: 1px solid $line;
    border-radius: $radius-sm;

    input {
      flex: 1;
      min-width: 0;
      font-size: 0.875rem;
      color: $ink;
      border: 0;
      outline: none;
    }
  }

  &__list {
    max-height: 240px;
    overflow-y: auto;
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 12px;
    font-size: 0.9375rem;
    color: $text;
    text-align: left;
    border-radius: $radius-sm;

    &:hover {
      background-color: $surface;
    }

    &.is-active {
      font-weight: 600;
      color: $accent-text;
      background-color: $accent-soft;
    }
  }

  &__empty {
    padding: 10px 12px;
    font-size: 0.875rem;
    color: $muted;
  }
}
</style>
