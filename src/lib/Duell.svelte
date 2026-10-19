<script lang="ts">
  import axios from "axios";
  import Card from "./Card.svelte";
  import Stripes from "./Stripes.svelte";
  import Counter from "./Counter.svelte";
  import { dataStore, favouriteItem, view } from "../store";
  import { onMount } from "svelte";

  let data: any = [];
  let dataInStock: any = [];
  let objectLeft = {
    name: "",
    image_url: "",
    image_mobile_url: "",
    credit: "",
    text: "",
    show: "",
  };
  let objectRight = {
    name: "",
    image_url: "",
    image_mobile_url: "",
    credit: "",
    text: "",
    show: "",
  };
  let nextLeft = {
    name: "",
    image_url: "",
    image_mobile_url: "",
    credit: "",
    text: "",
    show: "",
  };
  let nextRight = {
    name: "",
    image_url: "",
    image_mobile_url: "",
    credit: "",
    text: "",
    show: "",
  };
  let stripes = 0;
  export let quizID: string = "";
  export let apiUrl: string = "";

  $: dataStore.subscribe((value: any) => {
    data = value;
    if (data.length > 0) {
      dataInStock =
        data.filter((item: any) => item.show === "stock") || dataInStock;
      objectLeft = data.find((item: any) => item.show === "left") || objectLeft;
      objectRight =
        data.find((item: any) => item.show === "right") || objectRight;
      nextLeft = dataInStock[0] || nextLeft;
      nextRight = dataInStock[1] || nextRight;
      stripes = dataInStock.length || 0;
    }
  });

  onMount(() => {
    if (data && data.length > 0) {
      data.forEach((item: any) => {
        if (item && item.image_url) {
          const img = new Image();
          img.src = `${item.image_url}`;
        }
      });
    }
  });

  async function safeVotes(_id: number) {
    console.log("Posting to:", `${apiUrl}/quiz/${quizID}/vote`);
    try {
      const response = await axios.post(`${apiUrl}/quiz/${quizID}/vote`, {
        id: _id,
        votes: 1,
      });
      console.log("Server response:", response.data);
    } catch (err) {
      console.error("Error adding/updating votes:", err);
    }
  }

  function handleCardClick(_name: string, _pos: string): void {
    if (dataInStock.length < 1) {
      const favCard: HTMLElement | null = document.getElementById(
        `${_pos}-card`,
      );
      if (!favCard) {
        console.error("Favourite card not found");
        return;
      }

      // Anderen card-wrapper ausblenden
      const otherPosTemp: string = _pos === "left" ? "right" : "left";
      const otherCard = document.getElementById(`${otherPosTemp}-card`);
      const otherWrapper = otherCard?.closest(".card-wrapper") as HTMLElement;
      if (otherWrapper) {
        otherWrapper.style.transition = "opacity 0.3s ease";
        otherWrapper.style.opacity = "0";
      }

      // favCard-Wrapper zentrieren – Breite bleibt 35%, passt bereits
      const favWrapper = favCard.closest(".card-wrapper") as HTMLElement;
      if (favWrapper) {
        favWrapper.style.transition = "margin 0.3s ease, box-shadow 0.3s ease";
        favWrapper.style.margin = "0 auto";
      }

      favCard.style.zIndex = "50";
    }

    const otherPos: string = _pos === "left" ? "right" : "left";
    const flyingCard: any = document.getElementById(`${otherPos}-card`);

    if (!flyingCard) {
      console.error("Flying card not found");
      return;
    }

    const flyingCardWrapper: any = flyingCard.closest(".card-wrapper");

    if (!flyingCardWrapper) {
      console.error("Flying card wrapper not found");
      return;
    }

    const flyingClone: Node = flyingCard.cloneNode(true);
    const typedFlyingClone = flyingClone as HTMLElement;
    typedFlyingClone.id = `${otherPos}-card-clone`;
    typedFlyingClone.className = "card flying-card";

    updateStore(_name, _pos);

    flyingCardWrapper.appendChild(flyingClone);
    typedFlyingClone.classList.add("fly-out");

    setTimeout(() => {
      typedFlyingClone.remove();
    }, 500);
  }

  function updateStore(_name: string, _pos: string): void {
    const otherPos: string = _pos === "left" ? "right" : "left";

    dataStore.update((data: any[]) => {
      const flyingItem = data.find((item) => item.show === otherPos);
      const stockIndex: number = data.findIndex(
        (item) => item.show === "stock",
      );

      if (stockIndex === -1) {
        const clickedItem = data.find((item) => item.show === _pos);
        if (clickedItem) {
          favouriteItem.set(clickedItem);
          const itemId: number =
            typeof clickedItem.id === "string"
              ? parseInt(clickedItem.id, 10)
              : clickedItem.id;
          safeVotes(itemId);
        }

        // Duellwrapper ausblenden, dann View wechseln
        setTimeout(() => {
          const wrapper = document.querySelector(
            ".duellwrapper",
          ) as HTMLElement;
          if (wrapper) {
            wrapper.style.transition = "opacity 0.25s ease";
            wrapper.style.opacity = "0";
          }
        }, 300);

        setTimeout(() => view.set("finish"), 600);

        return data.map((item) => {
          if (item === flyingItem) {
            return { ...item, show: "out" };
          }
          return item;
        });
      }

      return data.map((item) => {
        if (item === flyingItem) {
          return { ...item, show: "out" };
        }
        if (stockIndex !== -1 && item === data[stockIndex]) {
          return { ...item, show: otherPos };
        }
        return item;
      });
    });
  }
</script>

<div class="duellwrapper">
  <div
    class="card-wrapper"
    on:click={() => handleCardClick(objectLeft.name, "left")}
  >
    <Card
      name={objectLeft.name}
      divID="left-card"
      pictureURL={objectLeft.image_url}
      pictureMobileURL={objectLeft.image_mobile_url}
      credit={objectLeft.credit}
      text={objectLeft.text}
      mode="duell"
    />
  </div>
  <div
    class="card-wrapper"
    on:click={() => handleCardClick(objectRight.name, "right")}
  >
    <Card
      name={objectRight.name}
      divID="right-card"
      pictureURL={objectRight.image_url}
      pictureMobileURL={objectRight.image_mobile_url}
      credit={objectRight.credit}
      text={objectRight.text}
      mode="duell"
    />
  </div>
  <Stripes amount={stripes} />
  <Stripes amount={stripes} />
</div>

<div>
  <Counter current={dataInStock.length + 1} total={data.length - 1} />
</div>
