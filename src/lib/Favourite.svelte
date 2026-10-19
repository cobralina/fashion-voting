<script lang="ts">
  import Card from "./Card.svelte";
  export let favourite = {
    name: "",
    image_url: "",
    image_mobile_url: "",
    credit: "",
    text: "",
    show: "",
  };
</script>

<div class="subline">Ihr Favorit ist:</div>
<Card
  name={favourite.name}
  pictureURL={favourite.image_url}
  pictureMobileURL={favourite.image_mobile_url}
  credit={favourite.credit}
  mode="favourite"
/>
