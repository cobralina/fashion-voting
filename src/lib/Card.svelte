<script lang="ts">

  export let name:string = "Vorname Nachname";
  export let pictureID:string = "1.10331449";
  export let credit:string = "AFP";
  export let text:string = "";
  export let mode:string = "duell";
  export let score:string = "1";
  export let variant:boolean = false;
  export let scorevalue:Number = 1;
  export let divID:string = "";

</script>

{#if variant}
<div class="card {mode} variant" id={divID}>
<div class="description">
  {#if mode ==="ranking"}
<div class="score">{score}</div>
{/if} 
  <div>{name}{#if mode !=="ranking"} <div class="card-text">{text}</div> {/if}
  {#if mode ==="ranking"}
    <br />wählten <br />
    <div class="score-value">{scorevalue.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} <div class="score-percent">%</div></div>
    {/if} </div>
  <div class="credit"> {credit}</div>
</div>

<picture>
  <source media="(min-width: 768px)" srcset="https://media0.faz.net/ppmedia/{pictureID}/format1080_1792 540w,https://media0.faz.net/ppmedia/{pictureID}/format540_896 540w,https://media0.faz.net/ppmedia/{pictureID}/format1080_1792 1080w,https://media0.faz.net/ppmedia/{pictureID}/format1080_1792 1080w," sizes="100vw" data-modalset="https://media0.faz.net/ppmedia/{pictureID}/media_in_article_medium_original 330w,https://media0.faz.net/ppmedia/{pictureID}/media_in_article_small_original 330w,https://media0.faz.net/ppmedia/{pictureID}/untilw960 610w,https://media0.faz.net/ppmedia/{pictureID}/width610x580 610w,https://media0.faz.net/ppmedia/{pictureID}/default-retina 940w,https://media0.faz.net/ppmedia/{pictureID}/default 940w,">
  <source media="(max-width: 767px)" srcset="https://media0.faz.net/ppmedia/{pictureID}/format1080_1792 540w,https://media0.faz.net/ppmedia/{pictureID}/format540_896 540w," sizes="100vw" data-modalset="https://media0.faz.net/ppmedia/{pictureID}/media_in_article_medium_original 330w,https://media0.faz.net/ppmedia/{pictureID}/media_in_article_small_original 330w,https://media0.faz.net/ppmedia/{pictureID}/untilw960 610w,https://media0.faz.net/ppmedia/{pictureID}/width610x580 610w,https://media0.faz.net/ppmedia/{pictureID}/default-retina 940w,https://media0.faz.net/ppmedia/{pictureID}/default 940w,">
  <img loading="lazy" src="https://media0.faz.net/ppmedia/{pictureID}/default" alt="{name}" data-copyright="{credit}">
</picture>

  </div>


{:else}
<div class="card {mode}" id={divID}>
  <picture>
    <source media="(min-width: 768px)" srcset="https://media0.faz.net/ppmedia/{pictureID}/format1080_1792 540w,https://media0.faz.net/ppmedia/{pictureID}/format540_896 540w,https://media0.faz.net/ppmedia/{pictureID}/format1080_1792 1080w,https://media0.faz.net/ppmedia/{pictureID}/format1080_1792 1080w," sizes="100vw" data-modalset="https://media0.faz.net/ppmedia/{pictureID}/media_in_article_medium_original 330w,https://media0.faz.net/ppmedia/{pictureID}/media_in_article_small_original 330w,https://media0.faz.net/ppmedia/{pictureID}/untilw960 610w,https://media0.faz.net/ppmedia/{pictureID}/width610x580 610w,https://media0.faz.net/ppmedia/{pictureID}/default-retina 940w,https://media0.faz.net/ppmedia/{pictureID}/default 940w,">
    <source media="(max-width: 767px)" srcset="https://media0.faz.net/ppmedia/{pictureID}/format1080_1792 540w,https://media0.faz.net/ppmedia/{pictureID}/format540_896 540w," sizes="100vw" data-modalset="https://media0.faz.net/ppmedia/{pictureID}/media_in_article_medium_original 330w,https://media0.faz.net/ppmedia/{pictureID}/media_in_article_small_original 330w,https://media0.faz.net/ppmedia/{pictureID}/untilw960 610w,https://media0.faz.net/ppmedia/{pictureID}/width610x580 610w,https://media0.faz.net/ppmedia/{pictureID}/default-retina 940w,https://media0.faz.net/ppmedia/{pictureID}/default 940w,">
    <img loading="lazy" src="https://media0.faz.net/ppmedia/{pictureID}/default" alt="{name}" data-copyright="{credit}">
  </picture>


<div class="description">
  {#if mode ==="ranking"}
<div class="score">{score}</div>
{/if} 
  <div>{name}{#if mode !=="ranking"} <div class="card-text">{text}</div> {/if} {#if mode ==="ranking"}
    wählten <br />
    <div class="score-value">{scorevalue.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} <div class="score-percent">%</div></div>
    {/if} </div>
  <div class="credit"> {credit}</div>
</div>

  </div>

{/if}
 
<div class="card-background"></div>