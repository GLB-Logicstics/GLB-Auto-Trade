<template>
  <section class="hero">
    <div class="container">
      <UiSwiper :items="heroSlides" :options="options" variant="hero" navigation pagination>
        <template #default="{ item, index }">
          <div class="hero__slide">
            <h1 v-if="index === 0" class="hero__title">{{ item.title }}</h1>
            <h2 v-else class="hero__title">{{ item.title }}</h2>
            <p class="hero__text">{{ item.description }}</p>
          </div>
        </template>
      </UiSwiper>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useHomeStore } from '~/stores/home'

export default defineComponent({
  name: 'HeroSlider',

  data() {
    return {
      options: {
        loop: true,
        speed: 900,
        autoplay: { delay: 6000, disableOnInteraction: false },
      },
    }
  },

  computed: {
    ...mapState(useHomeStore, ['heroSlides']),
  },
})
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  padding: 28px 0 36px;
  background: radial-gradient(60% 120% at 50% 0%, rgba($logo-blue, 0.08), transparent 70%), $white;
  border-bottom: 3px solid $accent;

  @include up(md) {
    padding: 36px 0 44px;
  }

  &__slide {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 700;

    @include up(md) {
      font-size: 2rem;
    }

    @include up(lg) {
      font-size: 2.5rem;
    }
  }

  &__text {
    max-width: 720px;
    margin: 10px auto 0;
    font-size: 0.875rem;
    font-weight: 500;
    color: $text-soft;

    @include up(md) {
      font-size: 1rem;
    }
  }
}
</style>
