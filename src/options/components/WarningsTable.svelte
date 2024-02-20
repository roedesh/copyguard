<script lang="ts">
  import { Table } from "@sveltestrap/sveltestrap";
  import { storage } from "../../stores/storage";

  export let host: string;

  $: warnings = $storage.warnings[host] ?? [];
</script>

<Table striped bordered hover>
  <thead>
    <tr>
      <th>Type</th>
      <th>Selection</th>
      <th>Clipboard</th>
    </tr>
  </thead>
  <tbody>
    {#if warnings.length > 0}
      {#each warnings as warning}
        <tr>
          <td>{warning.type}</td>
          <td>{warning.selection}</td>
          <td>{warning.clipboard}</td>
        </tr>
      {/each}
    {:else}
      <tr>
        <td colspan="3">No warnings found for this host</td>
      </tr>
    {/if}
  </tbody>
</Table>
