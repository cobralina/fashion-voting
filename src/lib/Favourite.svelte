<script lang="ts">
  import Card from './Card.svelte';
  export let favourite = { name: "", polid: "", credit: "", text: "", show: "" };
 
</script>

<div class="subline">Ihr Favorit ist:</div>
<Card name={favourite.name} pictureID={favourite.polid} credit={favourite.credit} mode="favourite" />


