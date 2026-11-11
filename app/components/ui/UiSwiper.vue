<template>
  <div class="ui-slider" :class="[`ui-slider--${variant}`, { 'is-ready': ready }]">
    <button v-if="navigation" ref="prev" type="button" class="slider-arrow ui-slider__prev" aria-label="Əvvəlki">
      <i class="bi bi-chevron-left" />
    </button>

    <div ref="slider" class="swiper">
      <div class="swiper-wrapper">
        <div v-for="(item, index) in items" :key="index" class="swiper-slide">
          <slot :item="item" :index="index" />
        </div>
      </div>
    </div>

    <button v-if="navigation" ref="next" type="button" class="slider-arrow ui-slider__next" aria-label="Növbəti">
      <i class="bi bi-chevron-right" />
    </button>

    <div v-if="pagination" ref="dots" class="slider-dots ui-slider__dots" />
  </div>
</template>

<script lang="ts">
import { defineComponent, markRaw, type PropType } from 'vue'
import Swiper from 'swiper'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import type { SwiperOptions } from 'swiper/types'

export default defineComponent({
  name: 'UiSwiper',

  props: {
    items: { type: Array, required: true },
    options: { type: Object as PropType<SwiperOptions>, default: () => ({}) },
    navigation: { type: Boolean, default: false },
    pagination: { type: Boolean, default: false },
    variant: { type: String, default: 'cards' },
  },

  data() {
    return {
      ready: false,
      swiper: null as Swiper | null,
    }
  },

  mounted() {
    const settings: SwiperOptions = {
      modules: [Navigation, Pagination, Autoplay],
      watchOverflow: true,
      ...this.options,
    }

    if (this.navigation) {
      settings.navigation = {
        prevEl: this.$refs.prev as HTMLElement,
        nextEl: this.$refs.next as HTMLElement,
      }
    }

    if (this.pagination) {
      settings.pagination = {
        el: this.$refs.dots as HTMLElement,
        clickable: true,
      }
    }

    this.swiper = markRaw(new Swiper(this.$refs.slider as HTMLElement, settings))
    this.ready = true
  },

  beforeUnmount() {
    if (this.swiper) this.swiper.destroy()
  },
})
</script>

<style lang="scss" scoped>
.ui-slider {
  position: relative;

  > .swiper > .swiper-wrapper > .swiper-slide {
    height: auto;
  }

  &:not(.is-ready) > .swiper > .swiper-wrapper > .swiper-slide {
    flex-shrink: 0;
    width: 100%;
  }

  &--cards {
    &:not(.is-ready) > .swiper > .swiper-wrapper > .swiper-slide {
      width: calc((100% - 16px) / 1.1);
      margin-right: 16px;

      @include up(sm) {
        width: calc((100% - 16px) / 1.5);
      }

      @include up(md) {
        width: calc((100% - 24px) / 2);
        margin-right: 24px;
      }

      @include up(lg) {
        width: calc((100% - 48px) / 3);
      }
    }

    > .swiper {
      padding: 8px 4px 32px;
      margin: -8px -4px -32px;
    }

    > .ui-slider__prev,
    > .ui-slider__next {
      position: absolute;
      top: calc(50% - 30px);
      z-index: 5;
      display: none;

      @include up(lg) {
        display: flex;
      }
    }

    > .ui-slider__prev {
      left: -8px;

      @include up(xxl) {
        left: -56px;
      }
    }

    > .ui-slider__next {
      right: -8px;

      @include up(xxl) {
        right: -56px;
      }
    }

    > .ui-slider__dots {
      @include up(lg) {
        display: none;
      }
    }
  }

  &--brands {
    display: flex;
    align-items: center;
    gap: 8px;

    @include up(md) {
      gap: 16px;
    }

    > .swiper {
      flex: 1;
      min-width: 0;
    }

    &:not(.is-ready) > .swiper > .swiper-wrapper > .swiper-slide {
      width: calc((100% - 24px) / 3);
      margin-right: 12px;

      @include up(sm) {
        width: calc((100% - 36px) / 4);
      }

      @include up(md) {
        width: calc((100% - 48px) / 5);
      }

      @include up(lg) {
        width: calc((100% - 60px) / 6);
      }

      @include up(xl) {
        width: calc((100% - 72px) / 7);
      }
    }

    > .slider-arrow {
      flex-shrink: 0;
      width: 36px;
      height: 36px;
      font-size: 16px;
      box-shadow: none;
    }
  }

  &--hero {
    > .swiper {
      @include up(md) {
        width: calc(100% - 120px);
        margin: 0 auto;
      }
    }

    > .ui-slider__prev,
    > .ui-slider__next {
      position: absolute;
      top: 50%;
      z-index: 5;
      display: none;
      color: $accent-text;
      background: transparent;
      border: 0;
      box-shadow: none;
      transform: translateY(-50%);

      @include up(md) {
        display: flex;
      }

      &:hover {
        color: $white;
        background-color: $primary;
      }
    }

    > .ui-slider__prev {
      left: 0;
    }

    > .ui-slider__next {
      right: 0;
    }

    > .ui-slider__dots {
      margin-top: 12px;

      @include up(md) {
        display: none;
      }
    }
  }

  &--gallery {
    > .ui-slider__prev,
    > .ui-slider__next {
      position: absolute;
      top: 50%;
      z-index: 5;
      width: 30px;
      height: 30px;
      font-size: 13px;
      color: $white;
      background-color: rgba($ink, 0.5);
      border: 0;
      box-shadow: none;
      transform: translateY(-50%);
    }

    > .ui-slider__prev {
      left: 8px;
    }

    > .ui-slider__next {
      right: 8px;
    }

    > .ui-slider__dots {
      position: absolute;
      right: 0;
      bottom: 10px;
      left: 0;
      z-index: 4;
      margin: 0;
      --swiper-pagination-bullet-inactive-color: #{$white};
      --swiper-pagination-bullet-inactive-opacity: 0.7;
      --swiper-pagination-bullet-size: 6px;
    }
  }
}
</style>
