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
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    padding-left: 25px;
    padding-right: 25px;
    position: relative;

    .menu-item {
      font-weight: bold;
      cursor: pointer;
      color: $black;
      text-decoration: none;
      display: block;
      position: absolute;

      img {
        margin-top: 10px;
        height: 30px;
      }

      &.program {
        left: 20px;
      }

      &.about {
        right: 20px;
      }

      &.archive {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
</style>

<div class="menubar" use:links>
  <a href="/program/" class="menu-item program">
    <img src="/img/program.svg" alt="Program" />
  </a>
  <a href="/archive/" class="menu-item archive">
    <img src="/img/archive.svg" alt="Archive" />
  </a>
  <a href="/about/" class="menu-item about">
    <img src="/img/about.svg" alt="About" />
  </a>
</div>
