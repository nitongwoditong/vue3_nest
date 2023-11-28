import { defineStore } from "pinia";
import store from "..";

interface NavType {
  navbar: navbarType;
}
interface navbarType {
  title: String;
}

export const useNavStore = defineStore({
  id: "nav",
  state: (): NavType => ({
    navbar: {
      title: document.title,
    },
  }),
  getters: {
    navbarInfo: (state) => state.navbar,
  },
  actions: {
    setNavbar(title: string) {
      this.navbar.title = title;
    },
  },
});

export function useNavStoreWithOut() {
  return useNavStore(store);
}
