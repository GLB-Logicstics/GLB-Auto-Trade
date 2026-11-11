<template>
  <div class="section-heading">
    <span class="section-heading__line" />
    <h2 class="section-heading__title">
      {{ title }} <span class="section-heading__highlight">{{ highlight }}</span>
    </h2>
    <p class="section-heading__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SectionHeading',

  props: {
    title: { type: String, required: true },
    highlight: { type: String, default: '' },
    subtitle: { type: String, default: '' },
  },
})
</script>

<style lang="scss" scoped>
.section-heading {
  margin-bottom: 28px;

  @include up(lg) {
    margin-bottom: 36px;
  }

  &__line {
    display: block;
    width: 48px;
    height: 3px;
    margin-bottom: 14px;
    background-color: $accent;
    border-radius: 3px;
  }

  &__title {
    font-size: 1.625rem;
    font-weight: 700;

    @include up(md) {
      font-size: 2rem;
    }
  }

  &__highlight {
    color: $accent;
  }

  &__subtitle {
    margin-top: 6px;
    color: $text-soft;
  }
}
</style>
