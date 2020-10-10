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

  $: {
    if (page) {
      // __ Scroll to top
      const pageContainer = document.querySelector(".page-container")
      pageContainer ? pageContainer.scrollTo(0, 0) : null
    }
  }
</script>

<style lang="scss">
  @import "../variables.scss";

  .page {
    .content {
      font-family: $sans-stack;
      font-size: $font-size-normal;
      padding-bottom: 80px;
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
