const USERS_COLLECTION = "users";

import PocketBase from "pocketbase";
import { writable } from "svelte/store";
export const pb = new PocketBase(import.meta.env.VITE_PB_URL || "/");

function createPbUsers() {
  const { subscribe, update } = writable({
    isLoggedIn: pb.authStore.isValid,
    authLoading: false,
    authData: null,
    authError: null,
  });

  return {
    subscribe,
    login: async (email: string, password: string) => {
      update((n) => ({ ...n, authLoading: true, authError: null }));

      try {
        const authData = await pb
          .collection(USERS_COLLECTION)
          .authWithPassword(email, password);

        update((n) => ({
          ...n,
          isLoggedIn: true,
          authLoading: false,
          authError: null,
          authData,
        }));
      } catch (error) {
        update((n) => ({ ...n, authError: error.message, authLoading: false }));
      }
    },
    logout: () => {
      pb.authStore.clear();
      update((n) => ({ ...n, isLoggedIn: false, authData: null }));
    },
  };
}

export const pbUsers = createPbUsers();
