<script>
  // # # # # # # # # # # # # #
  //
  //  OPEN WINDOW: MAIN
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { onMount } from "svelte"
  import { Router, Route, links } from "svelte-routing"
  import { slide } from "svelte/transition"
  import { quintOut } from "svelte/easing"
  import MediaQuery from "svelte-media-query"

  // *** SANITY
  import { urlFor, loadData } from "./sanity.js"

  // *** STORES
  // import { globalSeed, generation, epoch } from "./stores.js"

  // *** GLOBAL
  import { QUERY } from "./global.js"

  // *** VARIABLES
  let infoBarActive = false

  // *** COMPONENTS
  import About from "./Components/About.svelte"
  import Cloud from "./Components/Cloud.svelte"
  import InfoBar from "./Components/InfoBar.svelte"
  import MenuBar from "./Components/MenuBar.svelte"
  import Program from "./Components/Program.svelte"
  import Archive from "./Components/Archive.svelte"
  import Marquee from "./Components/Marquee.svelte"
  import MobileTitle from "./Components/Mobile/MobileTitle.svelte"
  import MobileMenu from "./Components/Mobile/MobileMenu.svelte"
  import VideoPlayer from "./Components/VideoPlayer.svelte"
</script>

<style lang="scss">
  @import "./variables.scss";

  .main {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }

  .bottom-bars {
    position: fixed;
    bottom: 0px;
    left: 0;
    height: 90px;
    width: 100vw;
    background: white;

    @include screen-size("small") {
      height: 120px;
    }
  }

  .bar {
    width: 100%;
    height: 50px;

    &.small {
      height: 40px;
    }
  }
</style>

<Router>
  <!-- MAIN -->
  <main class="main" use:links>
    <Cloud />
  </main>

  <!-- MENU -->
  <Route path="">
    <div
      class="bottom-bars"
      in:slide={{ easing: quintOut, delay: 300, duration: 500 }}
      out:slide={{ easing: quintOut, duration: 500 }}>

      <MediaQuery query="(min-width: 800px)" let:matches>
        {#if matches}
          <!-- DESKTOP: MENU -->
          <div class="bar">
            <MenuBar />
          </div>
          <!-- DESKTOP: INFO / MARQUEE -->
          {#if infoBarActive}
            <div
              class="bar small"
              transition:slide
              on:click={(e) => {
                infoBarActive = !infoBarActive
              }}>
              <InfoBar />
            </div>
          {:else}
            <div
              class="bar small"
              transition:slide
              on:click={(e) => {
                infoBarActive = !infoBarActive
              }}>
              <Marquee />
            </div>
          {/if}
        {:else}
          <div class="bar">
            <!-- MOBILE: MENU -->
            <MobileMenu />      
          </div>
          <div class="bar">
            <!-- MOBILE: TITLE -->
            <MobileTitle />      
          </div>
          <div class="bar">
            <!-- MOBILE: INFO -->
            <InfoBar />
          </div>
        {/if}
      </MediaQuery>
    </div>
  </Route>

  <!-- PROGRAM -->
  <Route path="program/*">
      <Program/>
  </Route>

  <!-- ARCHIVE -->
  <Route path="archive/*">
    <Archive/>
  </Route>

  <!-- ABOUT -->
  <Route path="about/*">
    <About/>
  </Route>
</Router>
