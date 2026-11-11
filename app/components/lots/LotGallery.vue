<template>
  <div class="gallery">
    <div class="gallery__main">
      <img
        :src="images[active]"
        :alt="`${title} — şəkil ${active + 1}`"
        class="gallery__image"
        width="800"
        height="600"
        @error="onImageError"
      >

      <span class="gallery__status" :style="{ backgroundColor: status.color }">
        <i :class="['bi', status.icon]" />
        {{ status.label }}
      </span>

      <span class="gallery__counter">{{ active + 1 }} / {{ images.length }}</span>

      <template v-if="images.length > 1">
        <button type="button" class="gallery__arrow gallery__arrow--prev" aria-label="Əvvəlki" @click="prev">
          <i class="bi bi-chevron-left" />
        </button>
        <button type="button" class="gallery__arrow gallery__arrow--next" aria-label="Növbəti" @click="next">
          <i class="bi bi-chevron-right" />
        </button>
      </template>
    </div>

    <div class="gallery__thumbs">
      <button
        v-for="(image, index) in images"
        :key="image"
        type="button"
        class="gallery__thumb"
        :class="{ 'is-active': index === active }"
        @click="active = index"
      >
        <img :src="image" :alt="`${title} — kiçik şəkil ${index + 1}`" width="120" height="90" loading="lazy">
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { onImageError } from '~/utils/format'
import type { SaleStatus } from '~/types'

export default defineComponent({
  name: 'LotGallery',

  props: {
    images: { type: Array as PropType<string[]>, required: true },
    title: { type: String, required: true },
    status: { type: Object as PropType<SaleStatus>, required: true },
  },

  data() {
    return { active: 0 }
  },

  methods: {
    prev() {
      this.active = this.active === 0 ? this.images.length - 1 : this.active - 1
    },

    next() {
      this.active = this.active === this.images.length - 1 ? 0 : this.active + 1
    },

    onImageError,
  },
})
</script>

<style lang="scss" scoped>
.gallery {
  min-width: 0;

  &__main {
    position: relative;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    background-color: $surface;
    border-radius: $radius-md;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__status {
    position: absolute;
    top: 14px;
    left: 14px;
    display: inline-flex;
    gap: 6px;
    padding: 6px 10px;
    font-size: 0.75rem;
    font-weight: 600;
    color: $white;
    border-radius: $radius-sm;
  }

  &__counter {
    position: absolute;
    right: 14px;
    bottom: 14px;
    padding: 4px 10px;
    font-size: 0.75rem;
    color: $white;
    background-color: rgba($ink, 0.6);
    border-radius: 12px;
  }

  &__arrow {
    position: absolute;
    top: 50%;
    @include flex-center;
    width: 42px;
    height: 42px;
    font-size: 18px;
    color: $ink;
    background-color: rgba($white, 0.9);
    border-radius: 50%;
    box-shadow: $shadow-sm;
    transform: translateY(-50%);

    &:hover {
      color: $white;
      background-color: $primary;
    }

    &--prev {
      left: 14px;
    }

    &--next {
      right: 14px;
    }
  }

  &__thumbs {
    display: flex;
    gap: 8px;
    margin-top: 10px;
    overflow-x: auto;
  }

  &__thumb {
    flex-shrink: 0;
    width: 88px;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    border: 2px solid transparent;
    border-radius: $radius-sm;
    opacity: 0.7;
    transition: opacity $transition, border-color $transition;

    @include up(md) {
      width: 104px;
    }

    &:hover {
      opacity: 1;
    }

    &.is-active {
      border-color: $accent;
      opacity: 1;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
