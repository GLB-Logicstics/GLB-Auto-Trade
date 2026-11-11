<template>
  <div class="layout">
    <AppHeader />
    <main class="layout__main">
      <slot />
    </main>
    <AppFooter />
    <MobileBottomNav />
    <SearchModal />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DefaultLayout',
})
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: $bottom-nav;

  @include up(md) {
    padding-bottom: 0;
  }

  &__main {
    flex: 1;
    overflow-x: clip;
  }
}
</style>
