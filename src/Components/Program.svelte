<script>
  // # # # # # # # # # # # # #
  //
  //  PROGRAM
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { fly } from "svelte/transition"
  import { Router, Route, links } from "svelte-routing"

  // *** GRAPHICS
  import X from "./Graphics/X.svelte"

  let weekdays = [
    { weekday: "Monday", date: "19" },
    { weekday: "Monday", date: "19" },
    { weekday: "Monday", date: "19" },
    { weekday: "Monday", date: "19" },
    { weekday: "Monday", date: "19" },
    { weekday: "Monday", date: "19" },
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
      padding: 10px;

      a {
        color: $black;
        text-decoration: none;
        // display: inline-block;
        // transform: scaleY(1.14);
      }

      &.week {
        left: 0;
        z-index: 1002;
        background: $white;
        border-right: 1px solid $black;
        // position: relative;

        .close {
          position: absolute;
          top: 10px;
          right: 10px;
          // background: red;
        }

        .header {
          position: absolute;
          top: 10px;
          left: 10px;
          // background: red;

          img {
            height: 28px;
          }
        }

        .week-container {
          padding-top: 140px;

          .navigation {
            font-family: $sans-stack;
            font-size: $font-size-normal;
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }
          .item {
            font-family: $serif-stack;
            font-size: $font-size-large;
            display: flex;
            justify-content: space-between;
            .weekday {
            }
            .date {
            }

            &:hover {
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
      }
      &.event {
        z-index: 1000;
        left: 66.6666vw;
        background: $white;
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
      transition:fly={{ x: -window.innerWidth / 3, opacity: 0.8 }}>
      <a href="/" class="close"><X /></a>
      <div class="header"><img src="/img/program.svg" alt="Program" /></div>

      <div class="week-container">
        <div class="navigation">
          <div>&lt; PREV</div>
          <div>OCTOBER 2020</div>
          <div>NEXT &gt;</div>
        </div>
        {#each weekdays as day}
          <a class="item" href="/program/event">
            <div class="weekday">{day.weekday}</div>
            <div class="date">{day.date}</div>
          </a>
        {/each}
      </div>
    </div>

    <Route path="event/*slug" let:params>
      <!-- PANEL 2 => DAY -->
      <div
        class="panel day"
        transition:fly={{ x: -window.innerWidth / 3, opacity: 0.8 }}>
        <a href="/program">close</a><br />
        <a href="/program/event/xxkknx">event</a>
      </div>
      {#if params.slug}
        <!-- PANEL 3 => EVENT -->
        <div
          class="panel event"
          transition:fly={{ x: -window.innerWidth / 3, opacity: 0.8 }}>
          <a href="/program/event">close</a><br /> event: {params.slug}
        </div>
      {/if}
    </Route>
  </div>
</Router>
