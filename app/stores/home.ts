import { defineStore } from 'pinia'
import { brands, heroSlides, localCars } from '~/data/homepage'
import { lots } from '~/data/lots'
import type { CarSection } from '~/types'

export const useHomeStore = defineStore('home', {
  state: () => ({
    heroSlides,
    brands,
  }),

  getters: {
    sections(): CarSection[] {
      return [
        {
          id: 'popular',
          type: 'auction',
          title: 'Populyar',
          highlight: 'Avtomobillər',
          subtitle: 'Amerikadan ən çox sifariş edilən avtomobillər',
          moreLink: '/auction-lots',
          items: lots.filter((lot) => lot.popular),
        },
        {
          id: 'hybrid',
          type: 'auction',
          title: 'Hibrid',
          highlight: 'Avtomobillər',
          subtitle: 'Az yanacaq, çox yol — qənaətli və səssiz sürüş.',
          moreLink: '/auction-lots?fuels=Hibrid',
          items: lots.filter((lot) => lot.fuel === 'Hibrid'),
        },
        {
          id: 'local',
          type: 'local',
          title: 'Azərbaycandakı',
          highlight: 'Avtomobillər',
          subtitle: 'Sadəcə seç, sənə uyğun olanı götür və bu gün evinə apar',
          moreLink: '/search?country=az',
          items: localCars,
        },
      ]
    },
  },
})
