<script>
  // # # # # # # # # # # # # #
  //
  //  MENUBAR
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { fade } from "svelte/transition"
  import { links } from "svelte-routing"
</script>

<style lang="scss">
  @import "../variables.scss";

  .menubar {
    font-family: $sans-stack;
    font-size: $font-size-normal;
    background: $white;
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
      color: $black;
      text-decoration: none;
    }
    @include screen-size("small") {
      //   padding-bottom: 40px;
    }
  }
</style>

<div class="menubar" use:links>
  <a href="/program/" class="menu-item">PROGRAM</a>
  <a href="/archive/" class="menu-item">ARCHIVE</a>
  <a href="/about/" class="menu-item">ABOUT</a>
</div>
