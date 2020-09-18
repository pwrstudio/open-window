<script>
  // # # # # # # # # # # # # #
  //
  //  ABOUT
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { fly } from "svelte/transition"
  import { Router, Route, links } from "svelte-routing"
</script>

<style lang="scss">
  @import "../variables.scss";

  .about {
    .panel {
      position: fixed;
      top: 0;
      z-index: 1000;
      width: 33.33333vw;
      height: 100vh;
      padding: 20px;

      a {
        text-transform: uppercase;
        color: $black;
        text-decoration: none;
        // display: inline-block;
        // transform: scaleY(1.14);
      }

      &.menu {
        right: 0;
        background: $white;
        font-family: $serif-stack;
        font-size: 42px;
        border-left: 1px solid $black;
        z-index: 1002;
      }
      &.page {
        right: 33.33333vw;
        background: $white;
        font-family: $sans-stack;
        font-size: 26px;
        border-left: 1px solid $black;
        z-index: 1001;
      }
      &.side {
        right: 66.6666vw;
        background: $white;
        font-family: $sans-stack;
        font-size: 26px;
        z-index: 1000;
      }
    }

    @include screen-size("small") {
      //   padding-bottom: 40px;
    }
  }
</style>

<Router>
  <div class="about" use:links>
    <!-- PANEL 1 => MENU -->
    <div
      class="panel menu"
      transition:fly={{ x: window.innerWidth / 3, opacity: 0.8 }}>
      <a href="/">close</a><br />
      <a href="/about/page/faq">read page</a>
    </div>

    <Route path="page/*slug" let:params>
      <!-- PANEL 2 => PAGE -->
      <div
        class="panel page"
        transition:fly={{ x: window.innerWidth / 3, opacity: 0.8 }}>
        <a href="/about">close</a><br /> page: {params.slug}
        <a href="/about/page/faq/more">more</a>
      </div>
      {#if params.slug.split('/').length > 1}
        <!-- PANEL 3 => SIDE -->
        <div
          class="panel side"
          transition:fly={{ x: window.innerWidth / 3, opacity: 0.8 }}>
          <a href="/about/page/faq/">close</a><br />
        </div>
      {/if}
    </Route>
  </div>
</Router>
