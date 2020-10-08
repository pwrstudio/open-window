<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE PAGE
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import get from "lodash/get"
  import { renderBlockText } from "../sanity"

  // *** PROPS
  export let page = []
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
