<script lang="ts">
  import Card from './Card.svelte';
  import { onMount } from "svelte";
  import axios from 'axios';

  export let data:any = [];
  export let apiUrl:string = "";
  export let favourite = { name: "", polid: "", credit: "", text: "", show: "" };
  export let format:string = "";

  let totalvotes:number = 0;
  let allpercentages:any = [];
  let rankingData:any = [];

  async function getTotalVotes() {
  try {
    const response = await axios.get(`${apiUrl}/total`);
    console.log("Total votes:", response.data.total);
    return response.data.total; // Die Gesamtsumme zurückgeben
  } catch (err) {
    console.error("Error fetching total votes:", err);
    return 0; // Fallback-Wert
  }
}

async function getPercentages() {
  try {
    const response = await axios.get(`${apiUrl}/percentages`);
    console.log("Percentages from DB:", response.data);
    return response.data; // Die berechneten Prozentwerte zurückgeben
  } catch (err:any) {
    console.error("Error fetching percentages:", err.response?.data || err.message);
    return [];
  }
}

$: rankingData = data
    .map(item => {
      const percentageEntry = allpercentages.find(p => p.id === item.id); // Finde den passenden Prozentwert
      return {
        ...item, // Übernehme alle Eigenschaften aus `data`
        votes: percentageEntry?.votes || 0, // Füge die Votes hinzu (Fallback: 0)
        percentage: percentageEntry?.percentage || 0 // Füge die Prozentwerte hinzu (Fallback: 0)
      };
    })
    .sort((a:any, b:any) => b.percentage - a.percentage);

onMount(async () => {
    totalvotes = await getTotalVotes(); 
    const dbpercentages = await getPercentages();
    allpercentages = dbpercentages.sort((a:any, b:any) => b.percentage - a.percentage);
    console.log("Sorted Percentages:", allpercentages);
  });

</script>
<div class="subline">So wählten unsere Leser:</div>

<div class="rankingwrapper">
 <!-- 
{#each rankingData as item, index}
    {#if index % 2 === 0} 
   
    <Card name={item.name} mode="ranking" pictureID={item.polid} score="{index +1}" scorevalue={item.percentage}  {{#if item.name === favourite.name}  favourite = true {/if}}/>
  {:else}
  <Card name={item.name} mode="ranking" pictureID={item.polid} score="{index +1}" scorevalue={item.percentage} variant=true/>
  {/if}
  {/each} -->
  {#each rankingData as item, index}
  <Card 
    name={item.name} 
    mode="ranking" 
    pictureID={item.polid} 
    format={format}
    score="{index + 1}" 
    scorevalue={item.percentage} 
    isfavourite={item.name === favourite.name} 
    variant={index % 2 !== 0} 
  />
{/each}
</div>
<div style="opacity:0.5">Es haben insgesamt {totalvotes} Leser abgestimmt.</div>

