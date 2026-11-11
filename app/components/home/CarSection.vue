<template>
  <section class="section">
    <div class="container">
      <SectionHeading :title="section.title" :highlight="section.highlight" :subtitle="section.subtitle" />

      <div class="car-section__slider">
        <UiSwiper :items="section.items" :options="options" variant="cards" navigation pagination>
          <template #default="{ item }">
            <AuctionCarCard v-if="section.type === 'auction'" :car="item" />
            <LocalCarCard v-else :car="item" />
          </template>
        </UiSwiper>
      </div>

      <div class="car-section__more">
        <NuxtLink :to="section.moreLink" class="btn btn--accent car-section__button">
          Hamısına bax
          <i class="bi bi-arrow-right" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { CarSection } from '~/types'

export default defineComponent({
  name: 'CarSection',

  props: {
    section: { type: Object as PropType<CarSection>, required: true },
  },

  data() {
    return {
      options: {
        slidesPerView: 1.1,
        spaceBetween: 16,
        breakpoints: {
          576: { slidesPerView: 1.5 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          992: { slidesPerView: 3, spaceBetween: 24 },
        },
      },
    }
  },
})
</script>

<style lang="scss" scoped>
.car-section {
  &__slider {
    @include up(lg) {
      max-width: $container-narrow;
      margin: 0 auto;
    }
  }

  &__more {
    display: flex;
    justify-content: center;
    margin-top: 28px;

    @include up(lg) {
      margin-top: 36px;
    }
  }

  &__button {
    width: 100%;
    max-width: 320px;
  }
}
</style>
