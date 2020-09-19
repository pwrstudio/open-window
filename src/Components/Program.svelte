<script>
  // # # # # # # # # # # # # #
  //
  //  PROGRAM
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { fly } from "svelte/transition"
  import { quintOut } from "svelte/easing"
  import { Router, Route, links, navigate } from "svelte-routing"

  import { getContext } from "svelte"
  import { ROUTER } from "svelte-routing/src/contexts"
  const { activeRoute } = getContext(ROUTER)

  // $: {
  //   console.log($activeRoute)
  // }

  export let location = "XXX"

  console.dir(location)

  // *** GRAPHICS
  import X from "./Graphics/X.svelte"
  import ArrowDown from "./Graphics/ArrowDown.svelte"
  import LiveIcon from "./Graphics/LiveIcon.svelte"
  import { alert } from "lodash/_freeGlobal"

  let weekdays = [
    { weekday: "Monday", date: "19", slug: "2020-10-19" },
    { weekday: "Tuesday", date: "20", slug: "2020-10-20" },
    { weekday: "Wednesday", date: "21", slug: "2020-10-21" },
    { weekday: "Thursday", date: "22", slug: "2020-10-22" },
    { weekday: "Friday", date: "23", slug: "2020-10-23" },
    { weekday: "Saturday", date: "24", slug: "2020-10-24" },
    { weekday: "Sunday", date: "25", slug: "2020-10-25" },
  ]

  let events = [
    {
      time: "09.00–10.15",
      title: "XYZ Knitting or Searching for Mary",
      participant: "Märta Louise Karlsson",
      location: "Design School",
    },
    {
      time: "09.00–10.15",
      title: "XYZ Knitting or Searching for Mary",
      participant: "Märta Louise Karlsson",
      location: "Design School",
    },
    {
      time: "09.00–10.15",
      title: "XYZ Knitting or Searching for Mary",
      participant: "Märta Louise Karlsson",
      location: "Design School",
    },
    {
      time: "09.00–10.15",
      title: "XYZ Knitting or Searching for Mary",
      participant: "Märta Louise Karlsson",
      location: "Design School",
    },
    {
      time: "09.00–10.15",
      title: "XYZ Knitting or Searching for Mary",
      participant: "Märta Louise Karlsson",
      location: "Design School",
    },
    {
      time: "09.00–10.15",
      title: "XYZ Knitting or Searching for Mary",
      participant: "Märta Louise Karlsson",
      location: "Design School",
    },
  ]
</script>

<style lang="scss">
  @import "../variables.scss";

  .program {
    .panel {
      position: fixed;
      top: 0;
      width: 33.33333vw;
      height: 100vh;

      a {
        color: $black;
        text-decoration: none;
        // display: inline-block;
        // transform: scaleY(1.14);
      }

      .close {
        position: absolute;
        top: 10px;
        right: 15px;
        cursor: pointer;
        // background: red;
      }

      &.week {
        left: 0;
        z-index: 1002;
        background: $white;
        border-right: 1px solid $black;

        .header {
          position: absolute;
          top: 10px;
          left: 15px;
          // background: red;

          img {
            height: 28px;
          }
        }

        .week-container {
          padding: 15px;
          padding-top: 140px;

          .navigation {
            font-family: $sans-stack;
            font-size: $font-size-normal;
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            user-select: none;

            .arrow {
              display: inline-block;
              position: relative;
              top: -2px;
            }
          }

          .item {
            font-family: $serif-stack;
            font-size: $font-size-large;
            line-height: 1.1em;
            display: flex;
            justify-content: space-between;
            .weekday {
              transform: scaleY(1.14);
            }
            .date {
              transform: scaleY(1.14);
            }

            &:hover,
            &.active {
              color: $green;
            }
          }
        }
      }
      &.day {
        left: 33.33333vw;
        z-index: 1001;
        background: $white;
        border-right: 1px solid $black;
        font-family: $sans-stack;
        font-size: 26px;

        .day-container {
          padding: 15px;
          padding-bottom: 120px;
          height: 100vh;
          overflow-y: scroll;

          @include hide-scroll;

          .item {
            margin-bottom: 40px;
            display: block;

            &:hover {
              color: $green;
            }

            .time {
              font-family: $serif-stack;
              font-size: $font-size-medium;
              transform: scaleY(1.14);
            }
            .title {
              font-family: $sans-stack;
              font-size: $font-size-medium;
            }
            .participant {
              font-family: $sans-stack;
              font-size: $font-size-medium;
            }
            .location {
              font-family: $sans-stack;
              font-size: $font-size-normal;
              float: right;
              text-transform: uppercase;
            }
          }
        }

        .scroll-indicator {
          position: absolute;
          bottom: 0px;
          left: px;
          width: 100%;
          height: 80px;
          background: rgba(255, 255, 255, 0.95);
          display: flex;
          justify-content: center;
          align-items: center;
          user-select: none;
        }
      }
      &.event {
        z-index: 1000;
        left: 66.6666vw;
        background: $white;

        .event-container {
          padding: 15px;
          padding-top: 140px;
          padding-bottom: 80px;
          height: 100vh;
          overflow-y: scroll;

          @include hide-scroll;

          .image {
            margin-bottom: 20px;
            img {
              max-width: 100%;
              max-height: 500px;
            }
          }

          .header {
            width: 100%;
            // background: yellow;
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;

            .text {
              font-family: $serif-stack;
              font-size: $font-size-medium;
              width: calc(100% - 60px);
              padding-right: 10px;
              // background: red;
              transform: scaleY(1.14);

              .title {
              }
              .participant {
              }
              .time {
              }
            }
            .live-icon {
              // background: green;
              height: 32px;
            }
          }

          .content {
            font-family: $sans-stack;
            font-size: $font-size-normal;
          }
        }
      }
    }

    @include screen-size("small") {
      //   padding-bottom: 40px;
    }
  }
</style>

<Router>
  <div class="program" use:links>
    <!-- PANEL 1 => WEEK -->
    <div
      class="panel week"
      transition:fly={{ x: -window.innerWidth / 3, opacity: 1, easing: quintOut, duration: 500 }}>
      <div
        class="close"
        on:click={(e) => {
          console.dir($activeRoute.params['*'])
          if ($activeRoute.params['*'].includes('/')) {
            navigate('/program/' + $activeRoute.params['*'].split('/')[0])
            setTimeout(() => {
              navigate('/program/')
              setTimeout(() => {
                navigate('/')
              }, 500)
            }, 500)
          } else if ($activeRoute.params['*'].length > 0) {
            navigate('/program/')
            setTimeout(() => {
              navigate('/')
            }, 500)
          } else {
            navigate('/')
          }
        }}>
        <X />
      </div>
      <div class="header"><img src="/img/program.svg" alt="Program" /></div>
      <div class="week-container">
        <div class="navigation">
          <div><span class="arrow">&lt;</span> PREV</div>
          <div>OCTOBER 2020</div>
          <div>NEXT <span class="arrow">&gt;</span></div>
        </div>
        {#each weekdays as day}
          <a
            class="item"
            href={'/program/' + day.slug}
            class:active={$activeRoute.params['*'] === day.slug}>
            <div class="weekday">{day.weekday}</div>
            <div class="date">{day.date}</div>
          </a>
        {/each}
      </div>
    </div>

    <Route path=":date/*slug" let:params>
      <!-- PANEL 2 => DAY -->
      <div
        class="panel day"
        transition:fly={{ x: -window.innerWidth / 3, opacity: 1, easing: quintOut, duration: 500 }}
        on:mount={(e) => {
          console.dir(e)
          console.log('mount')
        }}>
        <div class="day-container">
          {#each events as event}
            <a class="item" href={'/program/' + params.date + '/event'}>
              <div class="time">{event.time}</div>
              <div class="title">{event.title}</div>
              <div class="participant">{event.participant}</div>
              <div class="location">{event.location}</div>
            </a>
          {/each}
        </div>
        <div class="scroll-indicator">
          <ArrowDown />
        </div>
      </div>
      {#if params.slug}
        <!-- PANEL 3 => EVENT -->
        <div
          class="panel event"
          transition:fly={{ x: -window.innerWidth / 3, opacity: 1, easing: quintOut, duration: 500 }}>
          <a href={'/program/' + params.date} class="close"><X /></a>
          <div class="event-container">
            <div class="image"><img src="/img/test.jpg" /></div>
            <div class="header">
              <div class="text">
                <div class="title">{events[0].title}</div>
                <div class="participant">{events[0].participant}</div>
                <div class="time">{events[0].time}</div>
              </div>
              <div class="live-icon">
                <LiveIcon />
              </div>
            </div>
            <div class="content">
              Henry David Thoreau’s affection for the pine tree was stronger
              than for any other tree. He called it “the emblem of my life”, and
              he said that the pine forest next to his house in Walden was “my
              best room”. He called it “the emblem of my life”, and he said that
              the pine forest next to his house in Walden was “my best room”.
              His affection for the pine tree was stronger than for any other
              tree.
            </div>
          </div>
        </div>
      {/if}
    </Route>
  </div>
</Router>
