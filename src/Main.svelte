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
  import VideoPlayer from "./Components/VideoPlayer.svelte"

  // *** VARIABLES

  // *** DOM REFERENCES

  // Load data
  let pages = []
  let events = []
  let archived = []
  let posts = loadData(QUERY.ALL)

  onMount(async () => {
    posts.then((posts) => {
      // console.dir(posts)
      pages = posts.filter((p) => p._type === "page")
      events = posts.filter((p) => p._type === "event")
      archived = events
      console.dir(pages)
      console.dir(events)
    })
  })
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
    height: 80px;
    width: 100vw;
    background: white;
  }

  .bar {
    width: 100%;
    height: 40px;
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
      <div class="bar">
        <MenuBar />
      </div>

      {#if infoBarActive}
        <div
          class="bar"
          transition:slide
          on:click={(e) => {
            infoBarActive = !infoBarActive
          }}>
          <InfoBar />
        </div>
      {:else}
        <div
          class="bar"
          transition:slide
          on:click={(e) => {
            infoBarActive = !infoBarActive
          }}>
          <Marquee />
        </div>
      {/if}
    </div>
  </Route>

  <!-- PROGRAM -->
  <Route path="program/*">
    <Program {events} />
  </Route>

  <!-- ARCHIVE -->
  <Route path="archive/*">
    <Archive {archived} />
  </Route>

  <!-- ABOUT -->
  <Route path="about/*">
    <About {pages} />
  </Route>
</Router>
