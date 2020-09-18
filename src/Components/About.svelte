<script>
  // # # # # # # # # # # # # #
  //
  //  ABOUT
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { fade } from "svelte/transition"
  import { links } from "svelte-routing"
</script>

<style lang="scss">
  @import "../variables.scss";

  .about {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;

    .panel {
      width: 33.33333vw;
      height: 100vh;
      &.week {
        background: red;
      }
      &.day {
        background: yellow;
      }
      &.event {
        background: pink;
      }
    }

    @include screen-size("small") {
      //   padding-bottom: 40px;
    }
  }
</style>

<div class="about" use:links>
  <div class="panel week"><a href="/">week</a></div>
  <div class="panel day">day</div>
  <div class="panel event">event</div>
</div>
