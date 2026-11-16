<template>
  <nav class="calc-tabs">
    <NuxtLink v-for="tab in tabs" :key="tab.to" :to="tab.to" class="calc-tabs__link">
      <i :class="['bi', tab.icon]" />
      {{ tab.label }}
    </NuxtLink>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CalculatorTabs',

  data() {
    return {
      tabs: [
        { label: 'Hərrac kalkulyatoru', to: '/auction-calculator', icon: 'bi-calculator' },
        { label: 'Gömrük kalkulyatoru', to: '/customs-calculator', icon: 'bi-bank' },
        { label: 'Daşınma kalkulyatoru', to: '/shipping-calculator', icon: 'bi-truck' },
      ],
    }
  },
})
</script>

<style lang="scss" scoped>
.calc-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  overflow-x: auto;

  &__link {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    gap: 8px;
    height: 42px;
    padding: 0 16px;
    font-size: 0.875rem;
    font-weight: 500;
    color: $ink;
    background-color: $white;
    border: 1px solid $line;
    border-radius: $radius;
    transition: border-color $transition;

    &:hover {
      border-color: $accent;
    }

    &.router-link-exact-active {
      color: $white;
      background-color: $accent;
      border-color: $accent;
    }
  }
}
</style>
