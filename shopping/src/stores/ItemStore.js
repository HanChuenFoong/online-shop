import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config.js";
import { defineStore } from "pinia";
import { getShoes, addProfile, loadProfile } from "../admin.js";

export const useShoeStore = defineStore("shoe", {
  state: () => ({
    inventory: [],
    profile: {},
    cart: [],
    size: [
      {
        text: 'Extra Small',
        value: 'xs',
      },
      {
        text: 'Small',
        value: 's',
      },
      {
        text: 'Medium',
        value: 'm',
      },
      {
        text: 'Large',
        value: 'l',
      },
      {
        text: 'Extra Large',
        value: 'xl',
      },
    ],
    quantity: [1,2,3,4,5,6,7,8,9,10],
    isLoggedIn: false,
    authIsReady: false,
    userName: '',
  }),
  actions: {
    async getInventory() {
      let res = await getShoes();
      this.inventory = res;
    },
    async createAccount(payload) {
      let res = await addProfile(payload);
      this.profile = res
    },
    async getProfile(payload) {
      let res = await loadProfile(payload);
      this.profile = res
    },
    async getAuthIsReady() {
      const unsub = onAuthStateChanged(auth, (user) => {
        this.userName = user
        this.authIsReady = true
        unsub()
      })
    }
  },
  getters: {
    userLoggedIn() {
      return this.isLoggedIn
    },
    IsAuthReady() {
      return this.authIsReady
    }
  }
});
