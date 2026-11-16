import { defineStore } from 'pinia'
import { infoPages, services, trackingSample } from '~/data/content'

export const useContentStore = defineStore('content', {
  state: () => ({
    services,
    infoPages,
    trackingSample,
  }),

  getters: {
    serviceBySlug: (state) => (slug: string) => state.services.find((service) => service.slug === slug),
    pageBySlug: (state) => (slug: string) => state.infoPages.find((page) => page.slug === slug),
  },
})
