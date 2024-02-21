<script lang="ts">
  import { Col, Container, Row } from "@sveltestrap/sveltestrap";
  import SettingsForm from "../components/SettingsForm.svelte";
</script>

<Container>
  <Row>
    <Col>
      <h1>Settings</h1>
      <SettingsForm />
    </Col>
  </Row>
</Container>
