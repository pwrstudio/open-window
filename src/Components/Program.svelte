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
    getWeekOfMonth,
    subDays,
    addDays,
  } from "date-fns"

  import { getContext } from "svelte"
  import { ROUTER } from "svelte-routing/src/contexts"
  const { activeRoute } = getContext(ROUTER)

  // *** GLOBAL
  import { QUERY } from "../global.js"

  // *** SANITY
  import { loadData } from "../sanity.js"

  // *** COMPONENTS
  import Event from "./Event.svelte"

  // *** GRAPHICS
  import X from "./Graphics/X.svelte"
  import ArrowDown from "./Graphics/ArrowDown.svelte"

  let events = loadData(QUERY.EVENTS)
  let settings = loadData(QUERY.SETTINGS)

  // *** VARIABLES
  let periods = []
  let eventsMap = {}
  let eventsList = []
  let currentPeriodIndex = false
  let currentWeekIndex = 0

  const constructDay = D => {
    return {
      dateObject: D,
      weekNumber: getWeekOfMonth(D, { weekStartsOn: 1 }),
      weekday: getDay(D),
      weekdayName: format(D, "EEEE"),
      date: getDate(D),
      month: getMonth(D),
      monthName: format(D, "MMMM"),
      year: format(D, "yyyy"),
      slug: format(D, "yyyy-MM-dd"),
    }
  }

  const processPeriod = eP => {
    if (eP.startDate && eP.endDate) {
      // _____ 1 Construct weekday object for event period
      const parsedStart = Date.parse(eP.startDate)
      const parsedEnd = Date.parse(eP.endDate)
      const period = eachDayOfInterval({
        start: parsedStart,
        end: parsedEnd,
      })
      const weekdays = period.map(day => constructDay(Date.parse(day)))
      // _____ 2 Filter events to those in event period
      const filteredEvents = eventsList.filter(
        e => e.date >= eP.startDate && e.date <= eP.endDate
      )
      // _____ 3 Group events by date
      let filteredEventsMap = groupBy(filteredEvents, e => e.date)
      // _____ 4 Merge weekdays and events
      let combinedWeekdays = weekdays.map(wD => {
        wD.events = filteredEventsMap[wD.slug]
        return wD
      })
      // _____ 5 Split into weeks
      const weeks = Object.values(
        groupBy(combinedWeekdays, wD => wD.weekNumber)
      )
      // _____ 6 Pad weeks
      let paddedWeeks = []
      weeks.forEach(w => {
        const startIndex = w[0].weekday == 0 ? 7 : w[0].weekday
        const endIndex =
          w[w.length - 1].weekday == 0 ? 7 : w[w.length - 1].weekday
        // __ padStart
        let pW = [...w]
        for (let i = startIndex - 1, delta = 1; i >= 1; i--, delta++) {
          pW.unshift(constructDay(subDays(w[0].dateObject, delta)))
        }
        // __ padEnd
        for (let i = endIndex + 1, delta = 1; i <= 7; i++, delta++) {
          pW.push(constructDay(addDays(w[w.length - 1].dateObject, delta)))
        }
        paddedWeeks.push(pW)
      })
      // _____ 7 Construct object and return
      let periodObject = {
        title: eP.title,
        isActive: eP.active,
        weeks: paddedWeeks,
      }
      return periodObject
    }
  }

  events
    .then(events => {
      eventsList = events
      console.log("_____ EVENTS LIST")
      // console.dir(eventsList)
      settings
        .then(settings => {
          console.dir(settings)
          // ___
          eventsMap = groupBy(eventsList, e => e.date)
          // Construct periods
          periods = settings.eventPeriods.map(eP => processPeriod(eP))
          // console.log("_?_?_?_=> PERIODS")
          // console.dir(periods)
          currentPeriodIndex = periods.findIndex(p => p.isActive)
          // console.dir(periods[currentPeriodIndex].weeks[currentWeekIndex])
          console.dir(eventsMap)
        })
        .catch(err => {
          console.dir(err)
        })
    })
    .catch(err => {
      console.dir(err)
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

        &.phone-only {
          display: none;
        }

        @include screen-size("small") {
          height: 60px;
          width: 60px;
          &.phone-only {
            display: block;
          }
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

          @include screen-size("small") {
            top: 25px;
            left: 20px;
            img {
              height: 34px;
            }
          }
        }

        .week-container {
          padding: 15px;
          padding-top: 160px;

          @include screen-size("small") {
            padding: 0;
            margin: 15px;
            margin-top: 90px;
            border-top: 1px solid black;
            padding-top: 30px;
          }

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

            .navigation-button {
              opacity: 1;
              pointer-events: all;
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
              &.disabled {
                cursor: default;
                opacity: 0.25;
                pointer-events: none;
                &:hover {
                  text-decoration: none;
                }
              }
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

            @include screen-size("small") {
              font-size: $font-size-large-mobile;
            }

            @include screen-size("short") {
              font-size: $font-size-large-mobile;
            }

            @include screen-size("shorter") {
              font-size: $font-size-large-mobile - 10px;
            }

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

        .header {
          position: absolute;
          display: none;

          @include screen-size("small") {
            display: block;
            top: 25px;
            left: 20px;
            img {
              height: 34px;
            }
          }
        }

        .day-container {
          padding: 15px;
          padding-bottom: 120px;
          height: 100vh;
          overflow-y: scroll;

          @include screen-size("small") {
            margin-top: 90px;
            border-top: 1px solid black;
            padding-top: 30px;
          }

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

          @include screen-size("small") {
            padding-bottom: 20px;
            height: 100px;
          }
        }
      }

      &.event {
        z-index: 1000;
        left: 66.6666vw;
        background: $white;

        .header {
          position: absolute;
          display: none;

          @include screen-size("small") {
            display: block;
            top: 25px;
            left: 20px;
            img {
              height: 34px;
            }
          }
        }

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
        {#if currentPeriodIndex !== false }
          <div class="navigation">
            <div class='navigation-button' 
              class:disabled={currentPeriodIndex == 0 && currentWeekIndex == 0}
              on:click={e=>{
                if(currentWeekIndex !== 0) {
                  currentWeekIndex--
                } else if(currentPeriodIndex !== 0) {
                  currentPeriodIndex--
                  currentWeekIndex = periods[currentPeriodIndex].weeks.length - 1
                }
              }}><span class="arrow" >&lt;</span> PREV</div>
            <div>OCTOBER 2020</div>
            <div 
              class='navigation-button' 
              class:disabled={currentPeriodIndex == periods.length - 1 && currentWeekIndex == periods[currentPeriodIndex].weeks.length - 1} 
              on:click={e=>{
                if(currentWeekIndex !== periods[currentPeriodIndex].length - 1) {
                  currentWeekIndex++
                } else if(currentPeriodIndex !== periods.length - 1) {
                  currentWeekIndex = 0
                  currentPeriodIndex++
                }
              }}>NEXT <span class="arrow">&gt;</span></div>
          </div>
          {#each periods[currentPeriodIndex].weeks[currentWeekIndex] as day}
            <a
              class="item"
              href={'/program/' + day.slug}
              class:empty={!day.events || day.events.length === 0}
              class:active={get($activeRoute, 'params["*"]', '').includes(day.slug)}>
              <span class="weekday">{day.weekdayName}</span>
              <span class="date">{day.date}</span>
            </a>
          {/each}
        {/if}
      </div>
    </div>

    <Route path=":date/*slug" let:params>
      <!-- PANEL 2 => DAY -->
      <div
        class="panel day"
        in:fly={{ x: -window.innerWidth / 3, opacity: 1, easing: quartOut, duration: 400 }}
        out:fade={{ easing: quartOut, duration: 250 }}>
        <div
          class="close phone-only"
          out:scale
          on:click={(e) => {
            navigate('/program')
          }}>
          <X />
        </div>
        <div class="header"><img src="/img/program.svg" alt="Program" /></div>
        <div class="day-container">
          {#if eventsMap[params.date] && Array.isArray(eventsMap[params.date])}
            {#each eventsMap[params.date] as event, index (event._id)}
              <a
                class="item"
                class:active={get($activeRoute, 'params["*"]', '').substring(11) == event.slug.current}
                href={'/program/' + params.date + '/' + get(event, 'slug.current', 'undefined-slug')} in:fade={{duration: 300, delay: 40 * index}}>
                <div class="time">{event.startTime}–{event.endTime}</div>
                <div class="title">{event.title}</div>
                {#if event.participants && Array.isArray(event.participants)}
                  {#each event.participants as participant, index (participant._id)}
                    <span class="participant">{participant.name}{#if index < event.participants.length - 1}
                        ,
                      {/if}</span>
                  {/each}
                {/if}
                <div class="location">{#if event.location}{event.location}{/if}</div>
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
          <a href={'/program/' + params.date} class="close phone-only" out:scale><X /></a>
          <div class="header"><img src="/img/program.svg" alt="Program" /></div>
          <Event slug={params.slug}/>
        </div>
      {/if}
    </Route>
  </div>
</Router>
