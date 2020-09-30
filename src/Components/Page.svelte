<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE PAGE
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { Router, Route, links, navigate } from "svelte-routing"
  import get from "lodash/get"
  import { renderBlockText, urlFor } from "../sanity"

  // *** PROPS
  export let page = []

  console.dir(page)
</script>

<style lang="scss">
  @import "../variables.scss";

  .page {
    .content {
      font-family: $sans-stack;
      font-size: $font-size-normal;
    }
  }
</style>

<div class="page">
  <!-- TEXT -->
  <div class="content">
    {#if get(page, 'content.content', false) && Array.isArray(page.content.content)}
      {@html renderBlockText(page.content.content)}
    {/if}
  </div>
</div>
