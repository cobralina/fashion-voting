<script lang="ts">
  import Header from './lib/Header.svelte';
  import Duell from './lib/Duell.svelte';
  import Favourite from './lib/Favourite.svelte';
  import Ranking from './lib/Ranking.svelte';

  import { dataStore,configs, view, favouriteItem } from './store';

  let data:any = [];
  let metas:any = [];
  //let dbUrl:string = "http://localhost:4000/favourites";
  //let dbUrlParts:string = "http://localhost:4000/participants";
  let state:string = "init";
  let favourite = { name: "", polid: "", credit: "", text: "", show: "" };
  let apiUrl:string = "http://localhost:4000/api/data";

  console.log("api-url:", apiUrl);

  $: dataStore.subscribe((value:any) => {
    data = value;
  });

  $: view.subscribe((value:any) => {
    state = value;
  });

  $: favouriteItem.subscribe((value:any) => {
    favourite = value;
  });

  $: configs.subscribe((value:any) => {
    metas = value;
  });

</script>

<main>
 <Header headline ={ metas[0].headline }/>
  {#if state === "init"}<Duell apiUrl={apiUrl}></Duell> {/if}
 {#if state === "finish"}
<Favourite favourite={favourite}></Favourite> 
<div class="game-wrapper">
<div class="seperator quattro"></div>
</div>
 
<Ranking data={data} apiUrl={apiUrl}></Ranking>{/if}
 

  <div class="game-wrapper">
   
    <div class="seperator quattro"></div>
  
    <div class="cms-Socialmarker"></div>
  </div>
</main>