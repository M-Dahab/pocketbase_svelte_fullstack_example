import { pbUsers } from "~/stores/pb";
import { replace } from "svelte-spa-router";

export function requireLogin(_node) {
  const unsubscribe = pbUsers.subscribe(({ isLoggedIn }) => {
    if (!isLoggedIn) {
      replace("/login");
    }
  });

  return {
    destroy() {
      unsubscribe();
    },
  };
}

export function redirectLoggedIn(_node) {
  const unsubscribe = pbUsers.subscribe(({ isLoggedIn }) => {
    if (isLoggedIn) {
      replace("/");
    }
  });

  return {
    destroy() {
      unsubscribe();
    },
  };
}
