import { defineStore } from 'pinia'
import {
  bottomNav,
  footerLinks,
  infoLinks,
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
    infoLinks,
    socialLinks,
    languages,
    bottomNav,
    notifications,
  }),

  getters: {
    contact: (state) => state.info.contact,
    phoneHref: (state) => `tel:${state.info.contact.phone}`,
    emailHref: (state) => `mailto:${state.info.contact.email}`,
    whatsappHref: (state) => (text: string) => `${state.info.contact.whatsapp}?text=${encodeURIComponent(text)}`,
    newsById: (state) => (id: number) => state.notifications.find((item) => item.id === id),
    copyright: (state) => `© ${new Date().getFullYear()} ${state.info.name}. Bütün hüquqlar qorunur.`,
  },
})
