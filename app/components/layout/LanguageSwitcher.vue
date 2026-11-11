<template>
  <div v-click-outside="close" class="lang">
    <button type="button" class="lang__toggle" aria-label="Dil" @click="open = !open">
      <i class="bi bi-globe2 lang__globe" />
      {{ language.toUpperCase() }}
      <i class="bi bi-chevron-down lang__chevron" />
    </button>

    <Transition name="dropdown">
      <ul v-if="open" class="lang__menu">
        <li v-for="item in languages" :key="item.code">
          <button
            type="button"
            class="lang__option"
            :class="{ 'is-active': item.code === language }"
            @click="select(item.code)"
          >
            {{ item.label }}
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useSiteStore } from '~/stores/site'
import { useUiStore } from '~/stores/ui'

export default defineComponent({
  name: 'LanguageSwitcher',

  data() {
    return { open: false }
  },

  computed: {
    ...mapState(useSiteStore, ['languages']),
    ...mapState(useUiStore, ['language']),
  },

  methods: {
    ...mapActions(useUiStore, ['setLanguage']),

    select(code: string) {
      this.setLanguage(code)
      this.close()
    },

    close() {
      this.open = false
    },
  },
})
</script>

<style lang="scss" scoped>
.lang {
  position: relative;

  &__toggle {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 40px;
    padding: 0 6px;
    font-size: 0.875rem;
    font-weight: 500;
    color: $ink;
  }

  &__globe {
    font-size: 16px;
    color: $accent-text;
  }

  &__chevron {
    font-size: 11px;
  }

  &__menu {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 110;
    min-width: 100px;
    padding: 6px;
    margin-top: 6px;
    background-color: $white;
    border: 1px solid $line;
    border-radius: $radius-md;
    box-shadow: $shadow-lg;
  }

  &__option {
    width: 100%;
    padding: 8px 10px;
    font-size: 0.875rem;
    text-align: left;
    border-radius: $radius-sm;

    &:hover {
      background-color: $surface;
    }

    &.is-active {
      font-weight: 600;
      color: $accent-text;
    }
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
