<script>
  // # # # # # # # # # # # # #
  //
  //  OPEN WINDOW: MAIN
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { Router, Route, links } from "svelte-routing"
  import { slide, fade } from "svelte/transition"
  import { quartOut } from "svelte/easing"
  import MediaQuery from "svelte-media-query"
  import { format } from "date-fns"
  import get from "lodash/get"

  // *** SANITY
  import { loadData, client } from "./sanity.js"

  // *** VARIABLES
  let infoBarActive = true

  // *** GLOBALS
  import { QUERY } from "./global.js"

  // *** COMPONENTS
  import About from "./Components/About.svelte"
  import Cloud from "./Components/Cloud.svelte"
  import InfoBar from "./Components/InfoBar.svelte"
  import MenuBar from "./Components/MenuBar.svelte"
  import Program from "./Components/Program.svelte"
  import Archive from "./Components/Archive.svelte"
  import Marquee from "./Components/Marquee.svelte"
  // import MobileTitle from "./Components/Mobile/MobileTitle.svelte"
  import MobileMenu from "./Components/Mobile/MobileMenu.svelte"
  import VideoPlayer from "./Components/VideoPlayer.svelte"
  import AlertBox from "./Components/AlertBox.svelte"


  let currentStream = false
  let nextEvent = false

  // | order(date asc) | order(startTime asc)
  // && date >= $currentDate && startTime > $currentTime
  const getNextEvent = () => {
    const now = Date.now()
    const currentDate = format(now, "yyyy-MM-dd")
    const currentTime = format(now, "HH:mm")

    loadData(
      "*[_type == 'event' && date >= $currentDate] | order(date asc, startTime asc)",
      {
        currentDate: currentDate,
        currentTime: currentTime,
      }
    )
      .then(nEs => {
        // console.dir(nEs)

        if (nEs && nEs.length > 0) {
          //   nEs.forEach(e => {
          //   console.log(
          //     e.date + " " + e.startTime,
          //     Date.parse(e.date + " " + e.startTime)
          //   )
          // })

          if (nEs[0].date > currentDate) {
            nextEvent = nEs[0]
          } else {
            nextEvent = nEs.find(e => e.startTime > currentTime)
          }

          console.log("nextEvent", nextEvent)
        }
      })
      .catch(err => {
        console.dir(err)
      })
  }

  getNextEvent()

  setInterval(getNextEvent, 10000)

  const alternateBar = () => {
    if (!currentStream) {
      infoBarActive = !infoBarActive
    }
  }

  setInterval(alternateBar, 10000)

  // __ Listen for changes to the active streams post
  let live = loadData(QUERY.ACTIVE_STREAM).catch(err => {
    console.log(err)
  })

  client.listen(QUERY.ACTIVE_STREAM).subscribe(update => {
    // console.log("___ UPDATE")
    currentStream = false
    setTimeout(() => {
      loadData(QUERY.ACTIVE_STREAM)
        .then(l => {
          // console.log("===> In Update", l)
          if (l.activeStream) {
            currentStream = l.activeStream
          } else {
            currentStream = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    }, 1000)
  })

  live.then(live => {
    // console.log("___ INITIAL LOAD")
    // console.dir(live)
    if (live.activeStream) {
      currentStream = live.activeStream
    } else {
      currentStream = false
    }
    // console.dir(currentStream)
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
    z-index: 1001;
    height: 90px;
    width: 100vw;
    background: white;

    @include screen-size("small") {
      height: 90px;
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
    <AlertBox/>
    {#if currentStream}
      <VideoPlayer liveEvent={currentStream} />
    {:else}
      <Cloud />
    {/if}
  </main>

  <!-- MENU -->
  <Route path="">
    <div class="bottom-bars">
      <div class="bar">
        <MediaQuery query="(min-width: 800px)" let:matches>
          {#if matches}
            <!-- DESKTOP: MENU -->
            <MenuBar />
          {:else}
            <!-- MOBILE: MENU -->
            <MobileMenu />
          {/if}
        </MediaQuery>
      </div>
      <!-- DESKTOP: INFO / MARQUEE -->
      {#if currentStream}
        <div class="bar small" transition:slide|local>
          <InfoBar {currentStream} />
        </div>
      {/if}

      {#if !currentStream && infoBarActive}
        <div class="bar small" transition:slide|local>
          <InfoBar {nextEvent} />
        </div>
      {/if}
      {#if !currentStream && !infoBarActive}
        <div class="bar small" transition:slide|local>
          <Marquee />
        </div>
      {/if}
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
