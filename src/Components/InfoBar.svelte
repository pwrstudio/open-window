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
  export let leftLink = ""
  export let rightText = ""
  export let rightLink = ""
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
    padding-left: 10px;
    padding-right: 10px;
    user-select: none;

    a {
      display: block;
    }

    @include screen-size("small") {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
</style>

<div class="infobar" use:links>
  <a href={leftLink}>{leftText}</a>
  <a href={rightLink}>{rightText}</a>
</div>
