<script>
  // # # # # # # # # # # # # #
  //
  //  PROGRAM
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { fly } from "svelte/transition"
  import { Router, Route, links } from "svelte-routing"
  import { window } from "lodash/_freeGlobal"
</script>

<style lang="scss">
  @import "../variables.scss";

  .program {
    .panel {
      position: fixed;
      top: 0;
      width: 33.33333vw;
      height: 100vh;
      padding: 20px;

      a {
        text-transform: uppercase;
        color: $black;
        text-decoration: none;
        // display: inline-block;
        // transform: scaleY(1.14);
      }

      &.week {
        left: 0;
        z-index: 1002;
        background: $white;
        font-family: $serif-stack;
        border-right: 1px solid $black;
        font-size: 42px;
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
      <a href="/">close</a><br />
      <a href="/program/event">Monday</a><br />
      <a href="/program/event">Tuesday</a><br />
      <a href="/program/event">Wednesday</a><br />
      <a href="/program/event">Thursday</a><br />
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
