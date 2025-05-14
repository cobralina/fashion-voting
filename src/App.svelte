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
  let quizID:string = "";
  let apiUrl:string = "http://localhost:4000/api/data/"
  let globalFormat:string = "";



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
    quizID = metas[0].duellid;
    globalFormat = metas[0].polformat;
    apiUrl = "http://localhost:4000/api/data/" + quizID
  
  });


</script>

<main>
 <Header headline ={ metas[0].headline } subline={ metas[0].subline }/>
  {#if state === "init"}<Duell apiUrl={apiUrl} quizID={quizID} format={globalFormat}></Duell> {/if}
 {#if state === "finish"}
<Favourite favourite={favourite} format={globalFormat}></Favourite> 
<div class="game-wrapper">
<div class="seperator quattro"></div>
</div>
 
<Ranking data={data} apiUrl={apiUrl} favourite={favourite} format={globalFormat}></Ranking>{/if}
 

  <div class="game-wrapper">
   
    <div class="seperator quattro"></div>
  
    <div class="cms-Socialmarker"></div>
  </div>
</main>