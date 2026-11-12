export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@pinia/nuxt'],

  components: [{ path: '~/components', pathPrefix: false }],

  css: ['swiper/css', 'swiper/css/pagination', '~/assets/scss/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/abstracts/_index.scss" as *;\n',
        },
      },
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'az' },
      title: 'GLB Logistics — Amerikadan avtomobil sifarişi və daşınması',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Copart və IAAI hərraclarından avtomobil sifarişi, ABŞ-dan Azərbaycana daşınma və gömrük xərclərinin hesablanması — GLB Logistics.',
        },
        { name: 'theme-color', content: '#00b8fb' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: 'favicon.png' },
        { rel: 'apple-touch-icon', href: 'apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Poppins:wght@400;500;600;700&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',
        },
      ],
    },
  },
})
