<script lang="ts">
  export let amount:number = 10;
</script>

<div class="stripes-wrapper">
  {#if amount > 1}
<div class="stripes">
</div>{/if}
{#if amount > 3}
<div class="stripes second">
</div>
{/if}
</div>