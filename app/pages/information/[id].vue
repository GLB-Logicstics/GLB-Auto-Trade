<template>
  <div v-if="news" class="container">
    <PageHeader
      :title="news.title"
      :subtitle="news.date"
      :crumbs="[{ label: 'Xəbərlər', to: '/information' }, { label: news.title }]"
    />

    <article class="card news-page">
      <p v-for="(text, index) in news.text" :key="index">{{ text }}</p>
      <NuxtLink to="/information" class="link-arrow">
        <i class="bi bi-arrow-left" />
        Bütün xəbərlər
      </NuxtLink>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useSiteStore } from '~/stores/site'
import type { Notification } from '~/types'

export default defineComponent({
  name: 'NewsDetailPage',

  setup() {
    const route = useRoute()
    const news = useSiteStore().newsById(Number(route.params.id))

    if (!news) {
      throw createError({ statusCode: 404, statusMessage: 'Xəbər tapılmadı', fatal: true })
    }

    useSeoMeta({ title: `${news.title} — GLB Logistics`, description: news.text[0] })
  },

  computed: {
    ...mapState(useSiteStore, ['newsById']),

    news(): Notification | undefined {
      return this.newsById(Number(this.$route.params.id))
    },
  },
})
</script>

<style lang="scss" scoped>
.news-page {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 820px;
  padding: 24px;
  line-height: 1.7;

  @include up(md) {
    padding: 32px;
  }
}
</style>
