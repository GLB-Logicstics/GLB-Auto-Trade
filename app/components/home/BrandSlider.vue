<template>
  <section class="brands">
    <div class="container">
      <UiSwiper :items="brands" :options="options" variant="brands" navigation>
        <template #default="{ item }">
          <NuxtLink :to="`/auction-lots?makes=${item.name}`" class="brands__item">
            <span class="brands__logo">
              <img :src="item.logo" :alt="item.name" width="80" height="80" loading="lazy">
            </span>
            <span class="brands__name">{{ item.name }}</span>
          </NuxtLink>
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
  name: 'BrandSlider',

  data() {
    return {
      options: {
        slidesPerView: 3,
        spaceBetween: 12,
        rewind: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        breakpoints: {
          576: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          992: { slidesPerView: 6 },
          1200: { slidesPerView: 7 },
        },
      },
    }
  },

  computed: {
    ...mapState(useHomeStore, ['brands']),
  },
})
</script>

<style lang="scss" scoped>
.brands {
  padding-top: 28px;

  @include up(md) {
    padding-top: 36px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 8px 4px;
  }

  &__logo {
    @include flex-center;
    width: 64px;
    height: 64px;
    padding: 12px;
    background-color: $white;
    border: 1px solid $line;
    border-radius: 50%;
    transition: transform $transition, border-color $transition;

    @include up(sm) {
      width: 76px;
      height: 76px;
      padding: 14px;
    }

    @include up(md) {
      width: 92px;
      height: 92px;
      padding: 16px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__item:hover &__logo {
    border-color: $accent;
    transform: translateY(-3px);
  }

  &__name {
    @include truncate;
    max-width: 100%;
    font-size: 0.75rem;
    font-weight: 600;
    color: $ink;

    @include up(md) {
      font-size: 0.8125rem;
    }
  }

  &__item:hover &__name {
    color: $accent-text;
  }
}
</style>
