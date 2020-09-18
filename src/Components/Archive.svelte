<script>
  // # # # # # # # # # # # # #
  //
  //  ARCHIVE
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { fade, slide } from "svelte/transition"
  import { Router, Route, links } from "svelte-routing"

  // *** COMPONENTS
  import Slideshow from "./Slideshow.svelte"
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
    background: $white;
    padding: 20px;

    @include screen-size("small") {
      //   padding-bottom: 40px;
    }
  }
</style>

<Router>
  <div class="archive" use:links transition:slide>
    <a href="/">close</a>
    <br />
    <a href="/archive/a-slug">slideshow</a>
    <Route path=":slug" component={Slideshow} />
  </div>
</Router>
