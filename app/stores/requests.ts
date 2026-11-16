import { defineStore } from 'pinia'
import type { RequestItem } from '~/types'

export const useRequestsStore = defineStore('requests', {
  state: () => ({
    items: [] as RequestItem[],
  }),

  actions: {
    send(request: Omit<RequestItem, 'id' | 'date'>) {
      this.items = [{ ...request, id: Date.now(), date: new Date().toLocaleDateString('az-AZ') }, ...this.items]
    },
  },
})
