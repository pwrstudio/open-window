<script>
  // # # # # # # # # # # # # #
  //
  //  INFOBAR
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { links } from "svelte-routing"

  //   *** PROPS
  export let leftText = "LIVE: From wood to waste"
  export let rightText =
    "NEXT: Vulnerability in design | screening in 01:12:48:06"
</script>

<style lang="scss">
  @import "../variables.scss";

  .infobar {
    font-family: $sans-stack;
    font-size: $font-size-small;
    background: $green;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;

    .menu-item {
      font-weight: bold;
      cursor: pointer;
    }
    @include screen-size("small") {
      //   padding-bottom: 40px;
    }
  }
</style>

<div class="infobar" use:links>
  <div>{leftText}</div>
  <div>{rightText}</div>
</div>
