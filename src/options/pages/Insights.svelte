<script lang="ts">
  import { Button, Col, Container, Input, Row } from "@sveltestrap/sveltestrap";
  import InsightsTable from "../components/InsightsTable.svelte";
    import SaveForm from "../components/SaveForm.svelte";
</script>

<Container>
  <Row>
    <Col>
      <h1>Insights</h1>
      <p>See which websites have altered your clipboard data.</p>
      <SaveForm />
      <InsightsTable />
    </Col>
  </Row>
</Container>
