<script lang="ts">
  import Login from "~/routes/login.svelte";
  import Dashboard from "~/routes/dashboard.svelte";
  import Router from "svelte-spa-router";

  const routes = {
    "/login": Login,
    "/": Dashboard,
  };
</script>

<main>
  <Router {routes} />
</main>

<style global>
  @tailwind base;
  @tailwind utilities;
  @tailwind components;
</style>
