<script>
  // # # # # # # # # # # # # #
  //
  //  MARQUEE
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { fade } from "svelte/transition"
  import { links } from "svelte-routing"
</script>

<style lang="scss">
  @import "../variables.scss";

  .marquee {
    // position: absolute;
    // top: 80px;
    // height: calc(100vh - 120px);
    // padding: 0;
    // width: 100%;
    // font-size: 12px;
    // overflow: scroll;
    @include screen-size("small") {
      //   padding-bottom: 40px;
    }
  }
</style>

<div class="marquee" use:links />
