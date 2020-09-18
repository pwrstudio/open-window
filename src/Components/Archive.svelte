<script>
  // # # # # # # # # # # # # #
  //
  //  ARCHIVE
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { fade } from "svelte/transition"
  import { links } from "svelte-routing"
</script>

<style lang="scss">
  @import "../variables.scss";

  .archive {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    background: cyan;

    @include screen-size("small") {
      //   padding-bottom: 40px;
    }
  }
</style>

<div class="archive" use:links><a href="/">close</a></div>
