<script lang="ts">
  import Router from "svelte-spa-router";
  import Header from "./components/Header.svelte";
  import SettingsPage from "./pages/Settings.svelte";
  import InsightsPage from "./pages/Insights.svelte";
  import InsightsDetailPage from "./pages/InsightsDetail.svelte";
  import AboutPage from "./pages/About.svelte";

  const routes = {
    "/": SettingsPage,
    "/insights/": InsightsPage,
    "/insights/:host/": InsightsDetailPage,
    "/about": AboutPage,
  };
</script>

<Header />
<Router {routes} />
