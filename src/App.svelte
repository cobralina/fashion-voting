<script lang="ts">
  import Header from "./lib/Header.svelte";
  import Duell from "./lib/Duell.svelte";
  import Favourite from "./lib/Favourite.svelte";
  import Ranking from "./lib/Ranking.svelte";

  import { dataStore, configs, view, favouriteItem, loadError } from "./store";
  import { API_BASE_URL } from "./config";

  $: data = $dataStore;
  $: state = $view;
  $: favourite = $favouriteItem;
  $: metas = $configs;
  $: quizID = metas[0]?.duellid ?? "";
  $: errorMessage = $loadError;

  const apiUrl = API_BASE_URL;
</script>

<main>
  {#if errorMessage}
    <div class="load-error">{errorMessage}</div>
  {:else if metas[0]}
    <Header headline={metas[0].headline} subline={metas[0].subline} />
    {#if state === "init"}
      <Duell {apiUrl} {quizID} />
    {/if}
    {#if state === "finish"}
      <Favourite {favourite} />
      <div class="game-wrapper">
        <div class="seperator quattro"></div>
      </div>

      <Ranking {data} {apiUrl} {quizID} {favourite} />
    {/if}

    <div class="game-wrapper">
      {#if state === "init"}
        <div class="seperator quattro"></div>
      {/if}

      <div class="cms-Socialmarker"></div>
    </div>
  {/if}
</main>

<style>
  .load-error {
    padding: 1.5rem;
    text-align: center;
    color: #b00020;
    font-family: sans-serif;
  }
</style>
