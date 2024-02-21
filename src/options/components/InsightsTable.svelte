<script lang="ts">
  import { Table } from "@sveltestrap/sveltestrap";
  import { link } from "svelte-spa-router";
  import { storage } from "../../stores/storage";

  $: hasWarnings = Object.keys($storage.warnings).length > 0;
</script>

<Table striped bordered hover>
  <thead>
    <tr>
      <th>Host</th>
      <th>Warnings</th>
    </tr>
  </thead>
  <tbody>
    {#if hasWarnings}
      {#each Object.entries($storage.warnings) as [host, warnings]}
        <tr>
          <td>
            <a href={`/insights/${host}/`} use:link>
              {host}
            </a>
          </td>
          <td>{warnings.length}</td>
        </tr>
      {/each}
    {:else}
      <tr>
        <td colspan="2">No warnings yet</td>
      </tr>
    {/if}
  </tbody>
</Table>
