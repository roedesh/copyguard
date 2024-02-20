<script lang="ts">
  import { Col, Container, Row } from "@sveltestrap/sveltestrap";
  import WarningsTable from "../components/WarningsTable.svelte";
  import { link } from "svelte-spa-router";

  type InsightsDetailParams = {
    host: string;
  };

  export let params: InsightsDetailParams = { host: "" };
</script>

<Container>
  <Row>
    <Col>
      <h1>Insights</h1>
      <p>Viewing data for <strong>{params.host}</strong>.</p>
      <p>
        <a href="/insights/" use:link>Return to overview</a>
      </p>
      <WarningsTable host={params.host} />
    </Col>
  </Row>
</Container>
