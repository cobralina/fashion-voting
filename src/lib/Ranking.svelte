<script lang="ts">
  import Card from "./Card.svelte";
  import { onMount, tick } from "svelte";
  import axios from "axios";
  import { APP_ROOT_ID } from "../config";

  // Props
  export let data: any = [];
  export let apiUrl: string = "";
  export let quizID: string = "";
  export let favourite = {
    name: "",
    image_url: "",
    credit: "",
    text: "",
    show: "",
  };

  // Local state
  let totalvotes: number = 0;
  let rankingData: any = [];
  let isLoading: boolean = true;
  let resizeObserver: ResizeObserver;

  // --- Hilfsfunktionen ------------------------------------------------------

  function updateCollapsingBoxHeight() {
    const cards = document.querySelectorAll(".ranking");
    //console.log("Cards:", cards.length);

    if (cards.length > 0) {
      const firstCardHeight = cards[0].clientHeight + 8;
      document.documentElement.style.setProperty(
        "--card-height",
        `${firstCardHeight}px`,
      );
    }
  }

  function sendPostMessage() {
    setTimeout(() => {
      const appvergleichsquiz = document.getElementById(APP_ROOT_ID);
      if (appvergleichsquiz) {
        const iframeHeight = appvergleichsquiz.scrollHeight;
        const urlParams = new URLSearchParams(window.location.search);
        const wwID = urlParams.get("id") || APP_ROOT_ID;
        if (iframeHeight) {
          parent.postMessage({ ["iframeHeight" + wwID]: iframeHeight }, "*");
        }
      }
    }, 100);
  }

  // --- API-Funktionen -------------------------------------------------------

  async function getTotalVotes() {
    try {
      const res = await axios.get(`${apiUrl}/quiz/${quizID}/total`, {
        params: { _t: Date.now() },
      });
      return res.data.total;
    } catch (err) {
      console.error("Error fetching total votes:", err);
      return 0;
    }
  }

  async function getRanking() {
    try {
      const res = await axios.get(`${apiUrl}/quiz/${quizID}/ranking`, {
        params: { _t: Date.now() },
      });
      return res.data;
    } catch (err: any) {
      console.error(
        "Error fetching ranking:",
        err.response?.data || err.message,
      );
      return [];
    }
  }

  async function fetchData() {
    isLoading = true;
    try {
      totalvotes = await getTotalVotes();
      console.log("Total Votes:", totalvotes);

      const dbRanking = await getRanking();
      console.log("Ranking from DB:", dbRanking);

      rankingData = data
        .map((item: any) => {
          const match = dbRanking.find((r: any) => r.id == item.id);
          return {
            ...item,
            votes: match?.amount ?? 0,
            percentage: match?.percentage ?? 0,
          };
        })
        .sort((a: any, b: any) => b.percentage - a.percentage);

      isLoading = false;
      await tick();
      updateCollapsingBoxHeight();

      const firstCard = document.querySelector(".ranking");
      if (firstCard) resizeObserver.observe(firstCard);
    } catch (err) {
      console.error("Error in fetchData:", err);
      isLoading = false;
    }
  }

  onMount(() => {
    resizeObserver = new ResizeObserver(() => {
      updateCollapsingBoxHeight();
    });

    sendPostMessage();
    fetchData();

    return () => {
      resizeObserver.disconnect();
    };
  });
</script>

<!-- --- Template ---------------------------------------------------------- -->

<div class="subline">So wählten unsere Leser:</div>

{#if isLoading}
  <div class="preloader">
    <span class="spinner"></span>
    <p>Ergebnisse werden geladen …</p>
  </div>
{:else}
  <div class="rankingwrapper">
    <div class="collapsingBox">
      <input
        type="checkbox"
        id="ranklist"
        on:change={() => sendPostMessage()}
      />
      {#if rankingData.length > 2}
        <label for="ranklist">
          <span class="down">Alle anzeigen</span>
          <span class="up">Weniger anzeigen</span>
        </label>
      {/if}
      <div class="content">
        {#each rankingData as item, index}
          <Card
            name={item.name}
            mode="ranking"
            pictureURL={item.image_url}
            pictureMobileURL={item.image_mobile_url}
            score={index + 1}
            scorevalue={item.percentage}
            isfavourite={item.name === favourite.name}
            variant={index % 2 !== 0}
          />
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
</style>
