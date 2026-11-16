import { defineStore } from 'pinia'
import { cities, countries } from '~/data/filters'
import { brands, heroSlides, localCars } from '~/data/homepage'
import { koreaCars } from '~/data/korea'
import { lots } from '~/data/lots'
import { isUpcoming } from '~/stores/lots'
import type { CarSection, LocalCar, Option } from '~/types'

export const useHomeStore = defineStore('home', {
  state: () => ({
    heroSlides,
    brands,
    countries,
    localCountry: 'aze',
    localCity: '',
  }),

  getters: {
    topSections(): CarSection[] {
      return [
        {
          id: 'upcoming',
          type: 'auction',
          title: 'Yaxın 10 gündə',
          highlight: 'Hərraclar',
          subtitle: 'Copart, IAAI və Manheim hərraclarında tezliklə satışa çıxacaq avtomobillər',
          moreLink: '/auction-lots?upcoming=1',
          items: lots.filter(isUpcoming),
        },
        {
          id: 'popular',
          type: 'auction',
          title: 'Populyar',
          highlight: 'Avtomobillər',
          subtitle: 'Amerikadan ən çox sifariş edilən avtomobillər',
          moreLink: '/auction-lots',
          items: lots.filter((lot) => lot.popular),
        },
      ]
    },

    bottomSections(): CarSection[] {
      return [
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
          id: 'korea',
          type: 'korea',
          title: 'Koreyadan',
          highlight: 'Avtomobillər',
          subtitle: 'Qiymət, çatdırılma və gömrük daxil yekun məbləğ',
          moreLink: '/korea-cars',
          items: koreaCars,
        },
      ]
    },

    localCityOptions(state): Option[] {
      return cities[state.localCountry] || []
    },

    localCars(state): LocalCar[] {
      return localCars.filter((car) => {
        if (car.country !== state.localCountry) return false
        if (state.localCity && car.city !== state.localCity) return false
        return true
      })
    },

    localMoreLink(state): string {
      const city = state.localCity ? `&city=${state.localCity}` : ''
      return `/search?country=${state.localCountry}${city}`
    },
  },

  actions: {
    setLocalCountry(value: string) {
      this.localCountry = value
      this.localCity = ''
    },
  },
})
