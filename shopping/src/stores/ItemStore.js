import { defineStore } from 'pinia'

export const useShoeStore = defineStore('shoe', {
  state: () => ({
    name: 'Nike'
  }),
})