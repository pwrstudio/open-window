<script>
  // # # # # # # # # # # # # #
  //
  //  OPEN WINDOW: MAIN
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { Router, Route, links } from "svelte-routing"
  import { slide } from "svelte/transition"
  import { quintOut } from "svelte/easing"
  import MediaQuery from "svelte-media-query"
  import { format } from "date-fns"
  import get from "lodash/get"

  // *** SANITY
  import { loadData } from "./sanity.js"

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
  import Metadata from "./Metadata.svelte"

  let isLive = false
  let liveEvent = {}

  const checkIfLive = () => {
    let now = Date.now()
    let live = loadData(
      "*[_type == 'event' && date == $currentDate && startTime < $currentTime && endTime > $currentTime][0]",
      {
        currentDate: format(now, "yyyy-MM-dd"),
        currentTime: format(now, "HH:mm"),
      }
    )
    live
      .then(live => {
        console.log("–––", format(now, "yyyy-MM-dd"), format(now, "HH:mm"))
        console.log("––– CHECKING IF LIVE")
        console.log(live)
        if (live) {
          console.log("IS LIVE")
          isLive = true
          liveEvent = live
        }
      })
      .catch(err => {
        console.dir(err)
      })
  }

  setInterval(checkIfLive, 10000)

  checkIfLive()
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
      height: 110px;
    }
  }

  .bar {
    width: 100%;
    height: 50px;

    &.small {
      height: 40px;
    }
    &.smaller {
      height: 30px;
    }
  }
</style>

<Router>
  <!-- MAIN -->
  <main class="main" use:links>
    {#if isLive}
    <VideoPlayer {liveEvent}/>
    {:else}
        <Cloud />
    {/if}
  </main>

  <!-- MENU -->
  <Route path="">
    <!-- METADATA -->
    <Metadata/>

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
          {#if isLive}
            <div
              class="bar small"
              transition:slide>
              <InfoBar leftText={'LIVE: ' + liveEvent.title} leftLink={'/program/' +  liveEvent.date + '/' + get(liveEvent, 'slug.current')}/>
            </div>
          {:else}
            <div
              class="bar small"
              transition:slide>
              <Marquee />
            </div>
          {/if}
        {:else}
          <div class="bar small">
            <!-- MOBILE: MENU -->
            <MobileMenu />      
          </div>
          <div class="bar small">
            <!-- MOBILE: TITLE -->
            <MobileTitle />      
          </div>
          <div class="bar smaller">
            <!-- MOBILE: INFO -->
            <InfoBar />
          </div>
        {/if}
      </MediaQuery>
    </div>
  </Route>

  <!-- PROGRAM -->
  <Route path="program/*">
    <!-- METADATA -->
    <Metadata/>
    <Program/>
  </Route>

  <!-- ARCHIVE -->
  <Route path="archive/*">
    <!-- METADATA -->
    <Metadata/>
    <Archive/>
  </Route>

  <!-- ABOUT -->
  <Route path="about/*">
    <!-- METADATA -->
    <Metadata/>
    <About/>
  </Route>
</Router>
