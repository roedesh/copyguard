<script lang="ts">
  import {
    Navbar,
    NavbarBrand,
    NavItem,
    Nav,
  } from "@sveltestrap/sveltestrap";

  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
</script>

<Navbar class="header" color="light" light container="md">
  <NavbarBrand href="/">
    <img src="/assets/icon128.png" width="48" alt="" />
  </NavbarBrand>
  <Nav>
    <NavItem>
      <a href="/" class="nav-link" use:link use:active>Settings</a>
    </NavItem>
    <NavItem>
      <a href="/insights/" class="nav-link" use:link use:active>Insights</a>
    </NavItem>
    <NavItem>
        <a href="/about/" class="nav-link" use:link use:active>About</a>
      </NavItem>
  </Nav>
</Navbar>
