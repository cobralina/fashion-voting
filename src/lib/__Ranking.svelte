<script lang="ts">
  import Card from "./Card.svelte";
  import { onMount } from "svelte";
  import axios from "axios";

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

  let totalvotes: number = 0;
  let allpercentages: any = [];
  let rankingData: any = [];

  function updateCollapsingBoxHeight() {
    const cards = document.querySelectorAll(".ranking");

    if (cards.length > 0) {
      const firstCardHeight = cards[0].clientHeight + 5;
      document.documentElement.style.setProperty(
        "--card-height",
        `${firstCardHeight}px`
      );
    }
  }

  function sendPostMessage() {
    setTimeout(() => {
      const appvergleichsquiz = document.getElementById("vergleichsquiz");
      if (appvergleichsquiz) {
        const iframeHeight = appvergleichsquiz.scrollHeight;
        const urlParams = new URLSearchParams(window.location.search);
        const wwID = urlParams.get("id");
        if (iframeHeight) {
          parent.postMessage({ ["iframeHeight" + wwID]: iframeHeight }, "*");
        }
      }
    }, 100);
  }

  onMount(() => {
    setTimeout(updateCollapsingBoxHeight, 100);
    console.log("Quiz-ID:" + quizID);

    const resizeObserver = new ResizeObserver((entries) => {
      updateCollapsingBoxHeight();
    });

    const firstCard = document.querySelector(".ranking");
    if (firstCard) {
      resizeObserver.observe(firstCard);
    }

    sendPostMessage();

    return () => {
      if (firstCard) {
        resizeObserver.unobserve(firstCard);
      }
      resizeObserver.disconnect();
    };
  });

  async function getTotalVotes() {
    try {
      const response = await axios.get(`${apiUrl}/quiz/${quizID}/total`);
      return response.data.total;
    } catch (err) {
      console.error("Error fetching total votes:", err);
      return 0;
    }
  }

  async function getPercentages() {
    try {
      const response = await axios.get(`${apiUrl}/quiz/${quizID}/percentages`);
      return response.data;
    } catch (err: any) {
      console.error(
        "Error fetching percentages:",
        err.response?.data || err.message
      );
      return [];
    }
  }

  $: rankingData = data
    .map((item: any) => {
      const percentageEntry = allpercentages.find((p: any) => p.id === item.id);
      return {
        ...item,
        votes: percentageEntry?.votes || 0,
        percentage: percentageEntry?.percentage || 0,
      };
    })
    .sort((a: any, b: any) => b.percentage - a.percentage);

  onMount(async () => {
    totalvotes = await getTotalVotes();
    const dbpercentages = await getPercentages();
    allpercentages = dbpercentages.sort(
      (a: any, b: any) => b.percentage - a.percentage
    );
  });
</script>

<div class="subline">So wählten unsere Leser:</div>

<div class="rankingwrapper">
  <div class="collapsingBox">
    <input type="checkbox" id="ranklist" on:change={() => sendPostMessage()} />
    <label for="ranklist">
      <span class="down">Alle anzeigen</span>
      <span class="up">Weniger anzeigen</span>
    </label>
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
