<script lang="ts">
  import axios from 'axios';
  import Card from "./Card.svelte";
  import Stripes from "./Stripes.svelte";
  import Counter from "./Counter.svelte";
  import { dataStore, favouriteItem, view } from "../store";

  let data:any = [];
  let dataInStock:any = [];
  let objectLeft = { name: "", polid: "", credit: "", text: "", show: "" };
  let objectRight = { name: "", polid: "", credit: "", text: "", show: "" };
  let stripes = 0;
  export let apiUrl:string = "http://localhost:4000/api/data";

  $: dataStore.subscribe((value:any) => {
    data = value;
    if (data.length > 0) {
      dataInStock = data.filter((item:any) => item.show === "stock") || dataInStock;
      objectLeft = data.find((item:any) => item.show === "left") || objectLeft;
      objectRight = data.find((item:any) => item.show === "right") || objectRight;
      stripes = dataInStock.length || 0;

      console.log("data in stock:", dataInStock);
    }
  });

  async function safeVotes(_id:Number) {
  try {
    const response = await axios.post(apiUrl, { id: _id, votes: 1 });
    console.log('Server response:', response.data);
  } catch (err) {
    console.error("Error adding/updating votes:", err);
  }
}

 function handleCardClick(_name: string, _pos: string) {
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
  }
</script>

<div class="duellwrapper">
  <div class="card-wrapper" onclick={() => handleCardClick(objectRight.name, "right")}>
    <Card
      name={objectLeft.name}
      divID="left-card"
      pictureID={objectLeft.polid}
      credit={objectLeft.credit}
      text={objectLeft.text}
      mode="duell"
    />
  </div>
  <div class="card-wrapper" onclick={() => handleCardClick(objectLeft.name, "left")}>
    <Card
      name={objectRight.name}
      divID="right-card"
      pictureID={objectRight.polid}
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
