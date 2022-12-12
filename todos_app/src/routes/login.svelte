<script lang="ts">
  import { pbUsers } from "~/stores/pb";
  import { redirectLoggedIn } from "~/actions";
  import Logo from "~/assets/logo.svelte";

  let email = null;
  let password = null;
</script>

<div
  use:redirectLoggedIn
  class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8"
>
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <div class="flex">
      <Logo />
    </div>
    <h2
      class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
    >
      Sign in to Todos!
    </h2>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form
        class="space-y-6"
        on:submit|preventDefault={() => pbUsers.login(email, password)}
      >
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email address</label
          >
          <div class="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              bind:value={email}
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <div class="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              bind:value={password}
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {#if $pbUsers.authError}
          <div>
            <span class="text-red-400">{$pbUsers.authError}</span>
          </div>
        {/if}

        <div class="flex">
          <button
            type="submit"
            disabled={$pbUsers.authLoading}
            class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-gray-400"
            >Sign in
            {#if $pbUsers.authLoading}
              <span>...</span>
            {/if}</button
          >
        </div>
      </form>
    </div>
  </div>
</div>
