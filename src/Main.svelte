<script>
  // # # # # # # # # # # # # #
  //
  //  OPEN WINDOW: MAIN
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { onMount } from "svelte"
  import { links, navigate } from "svelte-routing"

  // *** SANITY
  import { urlFor, loadData } from "./sanity.js"

  // *** STORES
  // import { globalSeed, generation, epoch } from "./stores.js"

  // *** GLOBAL
  import { STATE, QUERY } from "./global.js"

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

  // WRITABLE
  const UI = { state: false, slug: false, errorMessage: false }
  const setUIState = (newState, newSlug = false, errorMessage = false) => {
    switch (newState) {
      case STATE.READY:
        UI.state = STATE.READY
        UI.slug = false
        history.pushState({}, "", "/")
        break
      case STATE.PROGRAM_WEEK:
        UI.state = STATE.PROGRAM_WEEK
        UI.slug = false
        history.pushState({}, "", "/program/")
        break
      case STATE.PROGRAM_DAY:
        UI.state = STATE.PROGRAM_DAY
        UI.slug = newSlug
        history.pushState({}, "", "/program/" + UI.slug)
        break
      case STATE.PROGRAM_EVENT:
        UI.state = STATE.PROGRAM_EVENT
        UI.slug = newSlug
        history.pushState({}, "", "/program/" + UI.slug)
        break
      case STATE.ARCHIVE:
        UI.state = STATE.ARCHIVE
        UI.slug = false
        history.pushState({}, "", "/archive/")
        break
      case STATE.ARCHIVE_EVENT:
        UI.state = STATE.ARCHIVE_EVENT
        UI.slug = newSlug
        history.pushState({}, "", "/archive/" + UI.slug)
        break
      case STATE.ABOUT:
        UI.state = STATE.ABOUT
        UI.slug = false
        history.pushState({}, "", "/about/")
        break
      case STATE.ABOUT_PAGE:
        UI.state = STATE.ABOUT_PAGE
        UI.slug = newSlug
        history.pushState({}, "", "/about/" + UI.slug)
        break
      default:
        UI.state = STATE.ERROR
        UI.slug = false
        UI.errorMessage = errorMessage
        history.pushState({}, "", "/error/")
    }
  }

  $: {
    console.log("STATE: ", UI.state)
  }

  $: {
    if (section || slug) {
      urlParamsToState()
    }
  }

  // Load data
  // let projectPost = false
  // let authorPost = false
  // let projects = []
  // let authors = []
  // let metaPost = false
  let posts = loadData(QUERY.ALL)

  const urlParamsToState = () => {
    console.log("URL TO PARAMS !!!")
    switch (section) {
      case "program":
        slug
          ? setUIState(STATE.PROGRAM_EVENT, slug)
          : setUIState(STATE.PROGRAM_WEEK)
        break
      case "about":
        slug ? setUIState(STATE.ABOUT_PAGE, slug) : setUIState(STATE.ABOUT)
        break
      case "archive":
        slug ? setUIState(STATE.ARCHIVE_EVENT, slug) : setUIState(STATE.ARCHIVE)
        break
      default:
        setUIState(STATE.READY)
    }
  }

  onMount(async () => {
    posts.then((posts) => {
      console.dir(posts)
      // metaPost = posts.find((p) => p._type === "introduction")
      // authors = posts.filter((p) => p._type === "author")
      // projects = posts.filter((p) => p._type === "project")
      // // console.dir(metaPost)
      // // console.dir(projects)
      // // console.dir(authors)
      urlParamsToState()
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

  .bar {
    position: fixed;
    width: 100vw;
    height: 40px;
    left: 0;

    &.first {
      bottom: 40px;
    }

    &.second {
      bottom: 0;
    }
  }
</style>

<!-- PROGRAM -->
{#if UI.state === STATE.PROGRAM_WEEK || UI.state === STATE.PROGRAM_EVENT}
  <Program />
{/if}

<!-- ARCHIVE -->
{#if UI.state === STATE.ARCHIVE || UI.state === STATE.ARCHIVE_EVENT}
  <Archive />
{/if}

<!-- ABOUT -->
{#if UI.state === STATE.ABOUT || UI.state === STATE.ABOUT_PAGE}
  <About />
{/if}

<!-- MAIN -->
<main class="main" use:links>
  <Cloud />
</main>

<!-- MENU -->
{#if UI.state === STATE.READY}
  <div class="bar first">
    <MenuBar />
  </div>
  <div class="bar second">
    <InfoBar />
  </div>
{/if}
