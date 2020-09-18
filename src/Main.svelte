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

  // *** SANITY
  import { urlFor, loadData } from "./sanity.js"

  // *** STORES
  // import { globalSeed, generation, epoch } from "./stores.js"

  // *** GLOBAL
  import { QUERY } from "./global.js"

  // *** PROPS
  export let section = false
  export let slug = false

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
  // let projectPost = false
  // let authorPost = false
  // let projects = []
  // let authors = []
  // let metaPost = false
  let pages = []
  let events = []
  let posts = loadData(QUERY.ALL)

  onMount(async () => {
    posts.then((posts) => {
      // console.dir(posts)
      // pages = posts.find((p) => p._type === "introduction")
      pages = posts.filter((p) => p._type === "page")
      events = posts.filter((p) => p._type === "event")
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
    <div class="bottom-bars" transition:slide>
      <div class="bar">
        <MenuBar />
      </div>
      <div class="bar">
        <InfoBar />
      </div>
    </div>
  </Route>

  <!-- PROGRAM -->
  <Route path="program/*">
    <Program />
  </Route>

  <!-- ARCHIVE -->
  <Route path="archive/*">
    <Archive />
  </Route>

  <!-- ABOUT -->
  <Route path="about/*">
    <About />
  </Route>
</Router>
