<script>
  // # # # # # # # # # # # # #
  //
  //  MENUBAR
  //
  // # # # # # # # # # # # # #

  // IMPORTS
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

      img {
        margin-top: 6px;
        height: 28px;
      }
    }

    @include screen-size("small") {
      //   padding-bottom: 40px;
    }
  }
</style>

<div class="menubar" use:links>
  <a href="/program/" class="menu-item">
    <img src="/img/program.svg" alt="Program" />
  </a>
  <a href="/archive/" class="menu-item">
    <img src="/img/archive.svg" alt="Archive" />
  </a>
  <a href="/about/" class="menu-item">
    <img src="/img/about.svg" alt="About" />
  </a>
</div>
