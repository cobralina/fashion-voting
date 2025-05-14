<script lang="ts">
  import axios from 'axios';
  import Card from "./Card.svelte";
  import Stripes from "./Stripes.svelte";
  import Counter from "./Counter.svelte";
  import { dataStore, favouriteItem, view } from "../store";
  import { onMount } from "svelte";

  let data:any = [];
  let dataInStock:any = [];
  let objectLeft = { name: "", polid: "", polformat:"", credit: "", text: "", show: "" };
  let objectRight = { name: "", polid: "", polformat: "", credit: "", text: "", show: "" };
  let nextLeft = { name: "", polid: "", polformat:"", credit: "", text: "", show: "" };
  let nextRight = { name: "", polid: "", polformat:"", credit: "", text: "", show: "" };
  let stripes = 0;
  export let quizID:string = "";
  export let apiUrl:string = "";
  export let format:string = "";



  $: dataStore.subscribe((value:any) => {
    data = value;
    if (data.length > 0) {
      dataInStock = data.filter((item:any) => item.show === "stock") || dataInStock;
      objectLeft = data.find((item:any) => item.show === "left") || objectLeft;
      objectRight = data.find((item:any) => item.show === "right") || objectRight;
      nextLeft = dataInStock[0] || nextLeft;
      nextRight = dataInStock[1] || nextRight;
      stripes = dataInStock.length || 0;

      console.log("data in stock:", dataInStock);
    }
  });

  onMount(() => {
  // Preload aller Bilder im Datensatz
  if (data && data.length > 0) {
    data.forEach((item: any) => {
      if (item && item.polid) {
        const img = new Image();
        img.src = `https://media0.faz.net/ppmedia/${item.polid}/${format}`;
      }
    });
  }
});

  async function safeVotes(_id:Number) {
  try {
    const response = await axios.post(apiUrl, { quizid:quizID, id: _id, votes: 1 });
    console.log('Server response:', response.data);
  } catch (err) {
    console.error("Error adding/updating votes:", err);
  }
}

/*  function handleCardClick(_name: string, _pos: string) {
    let clickedDIV = document.getElementById(_pos + "-card");

    if (clickedDIV) {
      clickedDIV.classList.add("fly-out");

      setTimeout(() => {
        clickedDIV.classList.remove("fly-out");
      }, 500);
    }

    setTimeout(() => {
      dataStore.update((data:any) => {
        const index = data.findIndex((item:any) => item.show === "stock");
        if (index !== -1) {
          data[index] = { ...data[index], show: _pos };
        } else {
          clickedDIV?.remove();
          let clickedPos = "left"
          if (_pos === "left") {
            clickedPos = "right";
          }
          let objectFav = data.find(
            (item:any) => item.show !== "stock" && item.show !=="out" && item.show === clickedPos
          );
          if (objectFav) {
            favouriteItem.set(objectFav);
          }
          console.log("favouriteItem: ", $favouriteItem);
          safeVotes(parseInt($favouriteItem.id));
          view.set("finish");
        }

        return data.map((item:any) => {
          if (item.name === _name) {
            return { ...item, show: "out" };
          }
          return item;
        });
      });

      dataStore.subscribe((value) => {
        console.log(value);
      });
    }, 50);
  } */

  function handleCardClick(_name:string, _pos:string):void {
    console.log("dataInStock left:", dataInStock);

    if (dataInStock.length < 1) {
      console.log("Not enough data in stock");
      const flyLeft: any = document.getElementById("left-card");
      const flyRight: any = document.getElementById("right-card");
      const wrapperLeft: any = flyLeft?.closest('.card-wrapper');
      const wrapperRight: any = flyRight?.closest('.card-wrapper');
      if (wrapperLeft) {
        wrapperLeft.classList.add("fly");
      }
      if (wrapperRight) {
        wrapperRight.classList.add("fly");
      }
      if (flyLeft) {
        flyLeft.classList.add("fly-out");
      }
      if (flyRight) {
        flyRight.classList.add("fly-out");
      }
      setTimeout(() => {
        flyLeft?.remove();
        flyRight?.remove();
      }, 500);

      updateStore(_name, _pos);
      return;
    }
  const otherPos: string = _pos === "left" ? "right" : "left";
  
  // fly-out-element:
  const flyingCard: any = document.getElementById(`${otherPos}-card`);
  
  if (!flyingCard) {
    console.error("Flying card not found");
    return;
  }
  
  const flyingCardWrapper: any = flyingCard.closest('.card-wrapper');
  
  if (!flyingCardWrapper) {
    console.error("Flying card wrapper not found");
    return;
  }
  
  //clone for animation
  const flyingClone: Node = flyingCard.cloneNode(true);
 
  const typedFlyingClone = flyingClone as HTMLElement;
  typedFlyingClone.id = `${otherPos}-card-clone`;
  typedFlyingClone.className = 'card flying-card';
  
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
    const flyingItem = data.find(item => item.show === otherPos);
    const stockIndex: number = data.findIndex(item => item.show === "stock");
    
    //if stock run empty, put last shown item item as favourite
    if (stockIndex === -1) {
      const clickedItem = data.find(item => item.show === _pos);
      if (clickedItem) {
        favouriteItem.set(clickedItem);
        const itemId: number = typeof clickedItem.id === 'string' ? parseInt(clickedItem.id, 10) : clickedItem.id;
        safeVotes(itemId);
      }
      //timeout for animation
      setTimeout(() => view.set("finish"), 300);
      
      return data.map(item => {
        if (item === flyingItem) {
          return { ...item, show: "out" };
        }
        return item;
      });
    }
    
    return data.map(item => {
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
  <div class="card-wrapper" on:click={() => handleCardClick(objectLeft.name, "left")}>
    <Card
      name={objectLeft.name}
      divID="left-card"
      pictureID={objectLeft.polid}
      format={format}
      credit={objectLeft.credit}
      text={objectLeft.text}
      mode="duell"
    />
  </div>
  <div class="card-wrapper" on:click={() => handleCardClick(objectRight.name, "right")}>
    <Card
      name={objectRight.name}
      divID="right-card"
      pictureID={objectRight.polid}
      format={format}
      credit={objectRight.credit}
      text={objectRight.text}
      mode="duell"
    />
  </div>
  <Stripes amount={stripes} />
  <Stripes amount={stripes} />
</div>




<div>
  <Counter current={dataInStock.length+1} total={data.length-1}/>
</div>
