<template>
  <section class="section">
    <div class="container">
      <SectionHeading
        title="Hazırda"
        highlight="satışda"
        subtitle="Ölkə və şəhər seçin — həmin şəhərdə satışda olan avtomobillərə baxın"
      />

      <div class="local-section__filters">
        <div class="local-section__tabs">
          <button
            v-for="item in countries"
            :key="item.value"
            type="button"
            :class="{ 'is-active': localCountry === item.value }"
            @click="setLocalCountry(item.value)"
          >
            {{ item.label }}
          </button>
        </div>
        <BaseSelect
          v-model="localCity"
          :options="localCityOptions"
          placeholder="Bütün şəhərlər"
          class="local-section__city"
        />
      </div>

      <div class="local-section__slider">
        <UiSwiper
          v-if="localCars.length"
          :key="localCountry + localCity"
          :items="localCars"
          :options="options"
          variant="cards"
          navigation
          pagination
        >
          <template #default="{ item }">
            <LocalCarCard :car="item" />
          </template>
        </UiSwiper>

        <div v-else class="card empty-state">
          <i class="bi bi-car-front" />
          <p>Bu şəhərdə hazırda satışda avtomobil yoxdur.</p>
        </div>
      </div>

      <div class="local-section__more">
        <NuxtLink :to="localMoreLink" class="btn btn--accent local-section__button">
          Hamısına bax
          <i class="bi bi-arrow-right" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useHomeStore } from '~/stores/home'

export default defineComponent({
  name: 'LocalCarsSection',

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

  computed: {
    ...mapState(useHomeStore, ['countries', 'localCityOptions', 'localCars', 'localMoreLink']),
    ...mapWritableState(useHomeStore, ['localCountry', 'localCity']),
  },

  methods: {
    ...mapActions(useHomeStore, ['setLocalCountry']),
  },
})
</script>

<style lang="scss" scoped>
.local-section {
  &__filters {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    @include up(lg) {
      max-width: $container-narrow;
      margin: 0 auto 24px;
    }
  }

  &__tabs {
    display: flex;
    gap: 6px;
    padding: 4px;
    background-color: $white;
    border: 1px solid $line;
    border-radius: $radius;

    button {
      height: 38px;
      padding: 0 16px;
      font-size: 0.875rem;
      font-weight: 500;
      color: $text-soft;
      border-radius: $radius-sm;

      &.is-active {
        color: $white;
        background-color: $accent;
      }
    }
  }

  &__city {
    width: 100%;

    @include up(sm) {
      width: 240px;
    }
  }

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
