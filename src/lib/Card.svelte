<script lang="ts">
  import { onMount } from "svelte";
  export let name: string = "Vorname Nachname";
  export let pictureURL: string = "";
  export let pictureMobileURL: string = "";
  export let credit: string = "AFP";
  export let text: string = "";
  export let mode: string = "duell";
  export let score: string = "1";
  export let variant: boolean = false;
  export let isfavourite: boolean = false;
  export let scorevalue: Number = 1;
  export let divID: string = "";
  let isMobile = false;

  const checkIsMobile = () => {
    isMobile = window.matchMedia("(max-width: 600px)").matches;
  };

  onMount(() => {
    checkIsMobile();
    // Listener für dynamisches Resize
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  });
</script>

{#if variant}
  <div class="card {mode} variant" id={divID}>
    <div class="description">
      {#if mode === "ranking"}
        <div class="score">{score}</div>
      {/if}
      <div>
        {#if isfavourite}<span style="font-weight:bold;">Ihr Favorit:</span>
          <br />{/if}{name}{#if mode !== "ranking"}
          <div class="card-text">{text}</div>
        {/if}
        {#if mode === "ranking"}
          <br />
          <div class="score-value">
            {scorevalue.toLocaleString("de-DE", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
            <div class="score-percent">%</div>
            {#if isfavourite}<br />
              <div class="fav-icon"></div>
            {/if}
          </div>
        {/if}
      </div>
      <div class="credit">{credit}</div>
    </div>

    <picture>
      {#if pictureMobileURL && isMobile}
        <img
          loading="lazy"
          src={pictureMobileURL}
          alt={text}
          data-copyright={credit}
        />
      {:else}
        <img
          loading="lazy"
          src={pictureURL}
          alt={text}
          data-copyright={credit}
        />
      {/if}
    </picture>
  </div>
{:else}
  <div class="card {mode}" id={divID}>
    <picture>
      {#if pictureMobileURL && isMobile}
        <img
          loading="lazy"
          src={pictureMobileURL}
          alt={text}
          data-copyright={credit}
        />
      {:else}
        <img
          loading="lazy"
          src={pictureURL}
          alt={text}
          data-copyright={credit}
        />
      {/if}
    </picture>
    <div class="description">
      {#if mode === "ranking"}
        <div class="score">{score}</div>
      {/if}
      <div>
        {#if isfavourite}<span style="font-weight:bold;">Ihr Favourit:</span>
          <br />{/if}{name}{#if mode !== "ranking"}
          <div class="card-text">{text}</div>
        {/if}
        {#if mode === "ranking"}
          <div class="score-value">
            {scorevalue.toLocaleString("de-DE", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
            <div class="score-percent">%</div>
            {#if isfavourite}<br />
              <div class="fav-icon"></div>
            {/if}
          </div>
        {/if}
      </div>
      <div class="credit">{credit}</div>
    </div>
  </div>
{/if}
