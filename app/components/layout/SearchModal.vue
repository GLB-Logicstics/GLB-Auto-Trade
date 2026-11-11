<template>
  <Transition name="fade">
    <div v-if="searchOpen" class="search-modal" @click.self="closeSearch">
      <form class="search-modal__box" @submit.prevent="submit">
        <div class="search-modal__field">
          <i class="bi bi-search search-modal__icon" />
          <input
            ref="input"
            v-model="text"
            type="text"
            class="search-modal__input"
            placeholder="Marka, model, lot və ya VIN üzrə axtar"
            autocomplete="off"
          >

          <ul v-if="suggestions.length" class="search-modal__results">
            <li v-for="item in suggestions" :key="item.to + item.title">
              <NuxtLink :to="item.to" class="search-modal__result" @click="closeSearch">
                <span class="search-modal__result-title">{{ item.title }}</span>
                <span class="search-modal__result-subtitle">{{ item.subtitle }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="search-modal__actions">
          <div class="search-modal__checks">
            <label class="checkbox">
              <input v-model="inAuction" type="checkbox">
              Auksion
            </label>
            <label class="checkbox">
              <input v-model="inOther" type="checkbox">
              Digər
            </label>
          </div>

          <button type="submit" class="btn btn--accent search-modal__submit" :disabled="!text.trim()">
            Axtar
          </button>
          <button type="button" class="search-modal__close" aria-label="Bağla" @click="closeSearch">
            <i class="bi bi-x-lg" />
          </button>
        </div>
      </form>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useSearchStore } from '~/stores/search'
import { useUiStore } from '~/stores/ui'

export default defineComponent({
  name: 'SearchModal',

  computed: {
    ...mapState(useUiStore, ['searchOpen']),
    ...mapState(useSearchStore, ['suggestions']),
    ...mapWritableState(useSearchStore, ['text', 'inAuction', 'inOther']),
  },

  watch: {
    searchOpen(open: boolean) {
      document.body.style.overflow = open ? 'hidden' : ''
      if (open) {
        this.$nextTick(() => (this.$refs.input as HTMLInputElement).focus())
      }
    },
  },

  mounted() {
    document.addEventListener('keydown', this.onKeydown)
  },

  beforeUnmount() {
    document.removeEventListener('keydown', this.onKeydown)
  },

  methods: {
    ...mapActions(useUiStore, ['closeSearch']),
    ...mapActions(useSearchStore, ['clearText']),

    onKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') this.closeSearch()
    },

    submit() {
      this.$router.push({ path: '/auction-lots', query: { q: this.text.trim() } })
      this.clearText()
      this.closeSearch()
    },
  },
})
</script>

<style lang="scss" scoped>
.search-modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 80px 12px 24px;
  background-color: rgba(10, 20, 40, 0.45);
  backdrop-filter: blur(4px);

  @include up(md) {
    padding-top: 96px;
  }

  &__box {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
    max-width: 1100px;
    padding: 16px;
    background-color: $white;
    border-radius: $radius-lg;
    box-shadow: $shadow-lg;

    @include up(md) {
      flex-direction: row;
      align-items: center;
      padding: 10px 12px 10px 24px;
      border-radius: 40px;
    }
  }

  &__field {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  &__icon {
    color: $muted;
  }

  &__input {
    flex: 1;
    min-width: 0;
    height: 44px;
    font-size: 1rem;
    color: $ink;
    background: transparent;
    border: 0;
    outline: none;
  }

  &__results {
    position: absolute;
    top: calc(100% + 12px);
    right: 0;
    left: 0;
    max-height: 300px;
    padding: 6px;
    overflow-y: auto;
    background-color: $white;
    border: 1px solid $line;
    border-radius: $radius-md;
    box-shadow: $shadow-lg;

    @include up(md) {
      right: auto;
      width: 420px;
    }
  }

  &__result {
    display: flex;
    flex-direction: column;
    padding: 8px 12px;
    border-radius: $radius-sm;

    &:hover {
      background-color: $surface;
    }
  }

  &__result-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: $ink;
  }

  &__result-subtitle {
    font-size: 0.75rem;
    color: $muted;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__checks {
    display: flex;
    flex: 1;
    gap: 16px;
  }

  &__submit {
    height: 42px;
    padding: 0 24px;
    border-radius: 21px;
  }

  &__close {
    @include flex-center;
    width: 40px;
    height: 40px;
    font-size: 16px;
    color: $muted;
    border-radius: 50%;

    &:hover {
      color: $ink;
      background-color: $surface;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
