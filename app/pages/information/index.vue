<template>
  <div class="container">
    <PageHeader
      title="Xəbərlər"
      subtitle="Avtomobil bazarı, idxal qaydaları və GLB yenilikləri."
      :crumbs="[{ label: 'Xəbərlər' }]"
    />

    <div class="card-grid">
      <NuxtLink v-for="item in notifications" :key="item.id" :to="`/information/${item.id}`" class="card news-card">
        <span class="news-card__date"><i class="bi bi-calendar3" /> {{ item.date }}</span>
        <h2 class="news-card__title">{{ item.title }}</h2>
        <p class="news-card__text">{{ item.text[0] }}</p>
        <span class="link-arrow">
          Oxu
          <i class="bi bi-arrow-right" />
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useSiteStore } from '~/stores/site'

export default defineComponent({
  name: 'NewsPage',

  setup() {
    useSeoMeta({ title: 'Xəbərlər — GLB Logistics', description: 'Avtomobil idxalı və bazar xəbərləri.' })
  },

  computed: {
    ...mapState(useSiteStore, ['notifications']),
  },
})
</script>

<style lang="scss" scoped>
.news-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  transition: border-color $transition;

  &:hover {
    border-color: $accent;
  }

  &__date {
    font-size: 0.8125rem;
    color: $muted;
  }

  &__title {
    font-size: 1.0625rem;
  }

  &__text {
    flex: 1;
    font-size: 0.875rem;
    color: $text-soft;
  }
}
</style>
