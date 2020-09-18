<script>
  // # # # # # # # # # # # # #
  //
  //  SLIDESHOW
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { fade } from "svelte/transition"
  import { links } from "svelte-routing"
</script>

<style lang="scss">
  @import "../variables.scss";

  .slideshow {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 0, 0, 0.9);
    padding: 40px;
    @include screen-size("small") {
      //   padding-bottom: 40px;
    }
  }
</style>

<div class="slideshow" use:links in:fade><a href="/archive">close</a></div>
