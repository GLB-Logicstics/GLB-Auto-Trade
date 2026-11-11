import { defineStore } from 'pinia'
import {
  bottomNav,
  footerLinks,
  languages,
  mainNav,
  notifications,
  siteInfo,
  socialLinks,
} from '~/data/site'

export const useSiteStore = defineStore('site', {
  state: () => ({
    info: siteInfo,
    mainNav,
    footerLinks,
    socialLinks,
    languages,
    bottomNav,
    notifications,
  }),

  getters: {
    contact: (state) => state.info.contact,
    phoneHref: (state) => `tel:${state.info.contact.phone}`,
    emailHref: (state) => `mailto:${state.info.contact.email}`,
    copyright: (state) => `© ${new Date().getFullYear()} ${state.info.name}. Bütün hüquqlar qorunur.`,
  },
})
