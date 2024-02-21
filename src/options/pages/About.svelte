<script lang="ts">
  import { Col, Container, Row } from "@sveltestrap/sveltestrap";
</script>

<Container>
  <Row>
    <Col>
      <h1>About</h1>
      <!-- svelte-ignore missing-declaration -->
      <p><strong>CopyGuard v{__VERSION__}</strong></p>
      <p>
        <a href="https://github.com/roedesh/copyguard" target="_blank">
          Github
        </a>
        <span class="separator">|</span>
        <a
          href="https://ruud.je/blog/always-double-check-what-you-copy-from-websites/"
          target="_blank"
        >
          Read the blog post for more in-depth info
        </a>
      </p>
      <hr />
      <p>
        This extension warns you whenever your copy action was hijacked. When
        you select text and copy it, this extension will check if the data in
        your clipboard was altered in any way, or if there are hidden elements
        in your text selection. If so, it will warn you about it.
      </p>
    </Col>
  </Row>
</Container>
