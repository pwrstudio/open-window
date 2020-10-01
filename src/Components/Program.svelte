<script>
  // # # # # # # # # # # # # #
  //
  //  PROGRAM
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { fly, scale, fade } from "svelte/transition"
  import { quartOut } from "svelte/easing"
  import { Router, Route, links, navigate } from "svelte-routing"
  import get from "lodash/get"
  import groupBy from "lodash/groupBy"
  import {
    getDate,
    getDay,
    getMonth,
    format,
    eachDayOfInterval,
  } from "date-fns"

  import { getContext } from "svelte"
  import { ROUTER } from "svelte-routing/src/contexts"
  const { activeRoute } = getContext(ROUTER)

  // *** GLOBAL
  import { QUERY } from "../global.js"

  // *** SANITY
  import { loadData } from "../sanity.js"

  // $: {
  //   console.log($activeRoute)
  // }

  // *** COMPONENTS
  import Event from "./Event.svelte"

  // *** GRAPHICS
  import X from "./Graphics/X.svelte"
  import ArrowDown from "./Graphics/ArrowDown.svelte"

  let events = loadData(QUERY.EVENTS)
  let settings = loadData(QUERY.SETTINGS)

  let eventsMap = {}
  let eventsList = []
  let weekdays = []

  const constructDay = (d) => {
    const D = Date.parse(d)
    return {
      weekday: getDay(D),
      weekdayName: format(D, "EEEE"),
      date: getDate(D),
      month: getMonth(D),
      slug: format(D, "yyyy-MM-dd"),
    }
  }

  events.then((events) => {
    eventsList = events
    console.log("_____ EVENTS LIST")
    console.dir(eventsList)
    settings.then((settings) => {
      // console.dir(settings)
      let activeEventPeriod = settings.eventPeriods.find((eP) => eP.active)
      // console.dir(events)
      console.log(activeEventPeriod.startDate)
      console.log(activeEventPeriod.endDate)

      if (activeEventPeriod.startDate && activeEventPeriod.endDate) {
        // _____ 1
        // _____ 1 Construct weekday object for event period
        // _____ 1
        const parsedStart = Date.parse(activeEventPeriod.startDate)
        const parsedEnd = Date.parse(activeEventPeriod.endDate)
        // Get all days in period
        const period = eachDayOfInterval({ start: parsedStart, end: parsedEnd })
        // console.dir(period)
        // console.log(constructDay(activeEventPeriod.startDate))
        period.forEach((day) => {
          weekdays.push(constructDay(day))
        })
        weekdays = weekdays
        console.log("_____ WEEKDAYS")
        console.dir(weekdays)

        // _____ 2
        // _____ 2 Filter events to those in event period
        // _____ 2

        // _____ 3
        // _____ 3 Group events by date
        // _____ 3
        eventsMap = groupBy(events, (e) => e.date)
        console.log("_____ EVENTMAP")
        console.dir(eventsMap)
      }
    })
  })
</script>

<style lang="scss">
  @import "../variables.scss";

  .program {
    .panel {
      position: fixed;
      top: 0;
      width: 33.33333vw;
      height: 100vh;

      @include screen-size("small") {
        width: 100%;
      }

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
        height: 100px;
        width: 100px;
        cursor: pointer;
        transition: transform 0.3s ease-out;

        &:hover {
          transform: scale(1.05);
        }
      }

      &.week {
        left: 0;
        z-index: 1002;
        background: $white;
        border-right: 1px solid $black;

        @include screen-size("small") {
          z-index: 1001;
        }

        .header {
          position: absolute;
          top: 15px;
          left: 20px;

          img {
            height: 28px;
          }
        }

        .week-container {
          padding: 15px;
          padding-top: 160px;

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
            width: 100%;
            display: block;
            display: flex;
            justify-content: space-between;
            transform: scaleY(1.14);
            user-select: none;

            .weekday {
              // display: inline;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .date {
              text-align: right;
              // float: right;
            }

            &:hover,
            &.active {
              -webkit-box-decoration-break: clone;
              // color: $green;
              background-color: $green;
              background-image: linear-gradient(
                to right,
                rgb(0, 0, 255) 0%,
                rgb(0, 255, 255) 75%,
                rgb(0, 255, 173) 100%
              );
              background-size: 100%;
              background-repeat: repeat;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              -moz-background-clip: text;
              -moz-text-fill-color: transparent;
            }

            &.empty {
              opacity: 0.25;
              pointer-events: none;
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
        user-select: none;

        @include screen-size("small") {
          left: 0;
          z-index: 1002;
        }

        .day-container {
          padding: 15px;
          padding-bottom: 120px;
          height: 100vh;
          overflow-y: scroll;

          @include hide-scroll;

          .item {
            margin-bottom: 40px;
            display: block;

            &:hover,
            &.active {
              // color: $green;
              background-color: $green;
              background-image: linear-gradient(
                to right,
                rgb(0, 255, 173) 0%,
                rgb(0, 255, 0) 75%,
                rgb(163, 255, 0) 100%
              );
              background-size: 100%;
              background-repeat: repeat;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              -moz-background-clip: text;
              -moz-text-fill-color: transparent;

              .time {
                background-color: $green;
                background-image: linear-gradient(
                  to right,
                  rgb(0, 255, 173) 0%,
                  rgb(0, 255, 0) 75%,
                  rgb(163, 255, 0) 100%
                );
                background-size: 100%;
                background-repeat: repeat;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                -moz-background-clip: text;
                -moz-text-fill-color: transparent;
              }
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
              // float: right;
              text-align: right;
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

        @include screen-size("small") {
          left: 0;
          z-index: 1003;
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
      in:fly={{ x: -window.innerWidth / 3, opacity: 1, easing: quartOut, duration: 400 }}
      out:fade={{ easing: quartOut, duration: 250 }}>
      <div
        class="close"
        out:scale
        on:click={(e) => {
          navigate('/')
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
            class:empty={!eventsMap[day.slug]}
            class:active={get($activeRoute, 'params["*"]', '').includes(day.slug)}>
            <span class="weekday">{day.weekdayName}</span>
            <span class="date">{day.date}</span>
          </a>
        {/each}
      </div>
    </div>

    <Route path=":date/*slug" let:params>
      <!-- PANEL 2 => DAY -->
      <div
        class="panel day"
        in:fly={{ x: -window.innerWidth / 3, opacity: 1, easing: quartOut, duration: 400 }}
        out:fade={{ easing: quartOut, duration: 250 }}>
        <div class="day-container">
          {#if eventsMap[params.date] && Array.isArray(eventsMap[params.date])}
            {#each eventsMap[params.date] as event}
              <a
                class="item"
                class:active={get($activeRoute, 'params["*"]', '').includes(event.slug.current)}
                href={'/program/' + params.date + '/' + get(event, 'slug.current', 'undefined-slug')}>
                <div class="time">{event.startTime}–{event.endTime}</div>
                <div class="title">{event.title}</div>
                {#if event.participants && Array.isArray(event.participants)}
                  {#each event.participants as participant, index (participant._id)}
                    <span class="participant">{participant.name}{#if index < event.participants.length - 1}
                        ,
                      {/if}</span>
                  {/each}
                {/if}
                <div class="location">{event.location}</div>
              </a>
            {/each}
          {/if}
        </div>
        <div class="scroll-indicator">
          <ArrowDown />
        </div>
      </div>
      {#if params.slug}
        <!-- PANEL 3 => EVENT -->
        <div
          class="panel event"
          in:fly={{ x: -window.innerWidth / 3, opacity: 1, easing: quartOut, duration: 400 }}
          out:fade={{ easing: quartOut, duration: 250 }}>
          <a href={'/program/' + params.date} class="close" out:scale><X /></a>
          <Event slug={params.slug}/>
        </div>
      {/if}
    </Route>
  </div>
</Router>
