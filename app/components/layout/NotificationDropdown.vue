<template>
  <div v-click-outside="close" class="notifications">
    <button
      type="button"
      class="notifications__toggle"
      :class="{ 'is-open': open }"
      aria-label="Bildirişlər"
      @click="open = !open"
    >
      <i :class="['bi', open ? 'bi-bell-fill' : 'bi-bell']" />
      <span v-if="notifications.length" class="notifications__dot" />
    </button>

    <Transition name="dropdown">
      <div v-if="open" class="notifications__panel">
        <p class="notifications__title">Bildirişlər</p>

        <ul class="notifications__list">
          <li v-for="item in notifications" :key="item.id">
            <NuxtLink :to="`/information-view/${item.id}`" class="notifications__item" @click="close">
              <span class="notifications__icon">
                <i class="bi bi-newspaper" />
              </span>
              <span class="notifications__text">
                <span class="notifications__item-title">{{ item.title }}</span>
                <span class="notifications__date">{{ item.date }}</span>
              </span>
            </NuxtLink>
          </li>
        </ul>

        <NuxtLink to="/information" class="notifications__all" @click="close">
          Bütün xəbərlər
          <i class="bi bi-arrow-right" />
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useSiteStore } from '~/stores/site'

export default defineComponent({
  name: 'NotificationDropdown',

  data() {
    return { open: false }
  },

  computed: {
    ...mapState(useSiteStore, ['notifications']),
  },

  methods: {
    close() {
      this.open = false
    },
  },
})
</script>

<style lang="scss" scoped>
.notifications {
  position: relative;

  &__toggle {
    position: relative;
    @include flex-center;
    width: 40px;
    height: 40px;
    font-size: 18px;
    color: $ink;
    border-radius: 50%;
    transition: background-color $transition, color $transition;

    &:hover {
      background-color: $surface;
    }

    &.is-open {
      color: $white;
      background-color: $primary;
    }
  }

  &__dot {
    position: absolute;
    top: 9px;
    right: 10px;
    width: 8px;
    height: 8px;
    background-color: $accent;
    border: 2px solid $white;
    border-radius: 50%;
  }

  &__panel {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 110;
    width: 340px;
    margin-top: 12px;
    overflow: hidden;
    background-color: $white;
    border: 1px solid $line;
    border-radius: $radius-md;
    box-shadow: $shadow-lg;
  }

  &__title {
    padding: 14px 16px;
    font-weight: 600;
    color: $ink;
    border-bottom: 1px solid $line-soft;
  }

  &__list {
    max-height: 320px;
    overflow-y: auto;
  }

  &__item {
    display: flex;
    gap: 12px;
    padding: 12px 16px;
    transition: background-color $transition;

    &:hover {
      background-color: $page-bg;
    }
  }

  &__icon {
    @include flex-center;
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    color: $accent-text;
    background-color: $surface;
    border-radius: 50%;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  &__item-title {
    display: -webkit-box;
    overflow: hidden;
    font-size: 0.875rem;
    color: $ink;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  &__date {
    font-size: 0.75rem;
    color: $muted;
  }

  &__all {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 12px;
    font-size: 0.875rem;
    font-weight: 500;
    color: $accent-text;
    border-top: 1px solid $line-soft;

    &:hover {
      background-color: $page-bg;
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
