<script lang="ts">
  export let total:number = 10;
  export let current:number = 10;
</script>

<div>
  {#if total != 1}
    Noch {current} von {total} Klicks bis zum Ergebnis.
    {:else}
    Noch ein Klick bis zum Ergebnis.
  {/if}
</div>