<template>
  <nav class="bottom-nav">
    <template v-for="item in bottomNav" :key="item.label">
      <button v-if="item.action === 'search'" type="button" class="bottom-nav__search" :aria-label="item.label" @click="openSearch">
        <i :class="['bi', item.icon]" />
      </button>

      <NuxtLink v-else :to="item.to!" class="bottom-nav__link">
        <i :class="['bi', item.icon]" />
        {{ item.label }}
      </NuxtLink>
    </template>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useSiteStore } from '~/stores/site'
import { useUiStore } from '~/stores/ui'

export default defineComponent({
  name: 'MobileBottomNav',

  computed: {
    ...mapState(useSiteStore, ['bottomNav']),
  },

  methods: {
    ...mapActions(useUiStore, ['openSearch']),
  },
})
</script>

<style lang="scss" scoped>
.bottom-nav {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 130;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: end;
  height: $bottom-nav;
  background-color: $white;
  border-top: 1px solid $line;
  box-shadow: 0 -6px 24px rgba(15, 23, 42, 0.06);

  @include up(md) {
    display: none;
  }

  &__link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 10px 0;
    font-size: 11px;
    color: $text-soft;

    i {
      font-size: 20px;
    }

    &.router-link-exact-active {
      color: $accent-text;
    }
  }

  &__search {
    @include flex-center;
    justify-self: center;
    width: 56px;
    height: 56px;
    margin-bottom: 14px;
    font-size: 22px;
    color: $white;
    background-color: $accent;
    border: 4px solid $white;
    border-radius: 50%;
    box-shadow: 0 8px 20px rgba($accent, 0.35);
  }
}
</style>
