<template>
  <section class="section">
    <div class="container home-tools">
      <div class="card home-tools__box">
        <h2 class="home-tools__title">
          <i class="bi bi-box-seam" />
          Ehtiyat hissələri
        </h2>
        <p class="home-tools__text">Marka, model və hissə növünə görə axtarın, tapılmayanı ABŞ-dan gətirək.</p>

        <div class="home-tools__types">
          <NuxtLink v-for="type in types" :key="type.value" :to="`/parts?type=${type.value}`" class="home-tools__type">
            <i :class="['bi', type.icon]" />
            {{ type.label }}
          </NuxtLink>
        </div>

        <NuxtLink to="/parts" class="link-arrow">
          Bütün hissələr
          <i class="bi bi-arrow-right" />
        </NuxtLink>
      </div>

      <div class="card home-tools__box">
        <h2 class="home-tools__title">
          <i class="bi bi-journal-text" />
          Avtomobil kataloqu
        </h2>
        <p class="home-tools__text">
          Avtomobili seçin — Azərbaycana və Gürcüstana gətirilmə xərcini yerli bazar qiyməti ilə müqayisə edin.
        </p>

        <div class="home-tools__form">
          <BaseSelect :model-value="make" :options="makeOptions" placeholder="Marka" @update:model-value="setMake" />
          <BaseSelect
            :model-value="model"
            :options="modelOptions"
            :disabled="!make"
            placeholder="Model"
            @update:model-value="setModel"
          />
          <BaseSelect v-model="year" :options="yearOptions" :disabled="!model" placeholder="İl" />
          <NuxtLink :to="catalogLink" class="btn btn--accent">
            <i class="bi bi-calculator" />
            Hesabla
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useCatalogStore } from '~/stores/catalog'
import { usePartsStore } from '~/stores/parts'

export default defineComponent({
  name: 'HomeTools',

  computed: {
    ...mapState(usePartsStore, ['types']),
    ...mapState(useCatalogStore, ['makeOptions', 'modelOptions', 'yearOptions']),
    ...mapWritableState(useCatalogStore, ['make', 'model', 'year']),

    catalogLink(): { path: string; query: Record<string, string> } {
      const query: Record<string, string> = {}
      if (this.make) query.make = this.make
      if (this.model) query.model = this.model
      if (this.year) query.year = this.year
      return { path: '/catalog', query }
    },
  },

  methods: {
    ...mapActions(useCatalogStore, ['setMake', 'setModel']),
  },
})
</script>

<style lang="scss" scoped>
.home-tools {
  display: grid;
  gap: 20px;

  @include up(lg) {
    grid-template-columns: 1fr 1fr;
  }

  &__box {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 24px;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.375rem;

    i {
      color: $accent;
    }
  }

  &__text {
    color: $text-soft;
  }

  &__types {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;

    @include up(sm) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__type {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 14px 8px;
    font-size: 0.8125rem;
    font-weight: 500;
    color: $ink;
    text-align: center;
    background-color: $page-bg;
    border-radius: $radius;
    transition: background-color $transition;

    i {
      font-size: 22px;
      color: $accent;
    }

    &:hover {
      background-color: $accent-soft;
    }
  }

  &__form {
    display: grid;
    gap: 10px;

    @include up(sm) {
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
