<script>
  // # # # # # # # # # # # # #
  //
  //  MOBILE MENU
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { links } from "svelte-routing"
  import { fly, scale, fade, slide } from "svelte/transition"
  import { quartOut } from "svelte/easing"

  // *** GRAPHICS
  import X from "../Graphics/X.svelte"
  import Burger from "../Graphics/Burger.svelte"

  let expanded = false
</script>

<style lang="scss">
  @import "../../variables.scss";

  .menubar {
    font-family: $sans-stack;
    font-size: $font-size-normal;
    background: $white;
    width: 100%;
    height: 100%;
    padding-left: 20px;
    padding-right: 20px;
    position: relative;
  }

  .menu {
    background: $white;
    position: fixed;
    bottom: 80px;
    left: 0;
    width: 100%;

    .close {
      position: absolute;
      top: 10px;
      right: 15px;
      cursor: pointer;
      // background: red;
      transition: transform 0.3s ease-out;
      width: 20px;

      svg {
        width: 20px !important;
      }

      &:hover {
        transform: scale(1.1);
      }
    }

    .menu-item {
      font-weight: bold;
      cursor: pointer;
      color: $black;
      text-decoration: none;
      display: block;
      text-align: center;
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid $black;
      //   font-size: $font_size_large_mobile;

      img {
        margin-top: 6px;
        height: 42px;
      }

      //   &.program {
      //     left: 20px;
      //   }

      //   &.about {
      //     right: 20px;
      //   }

      //   &.archive {
      //     left: 50%;
      //     transform: translateX(-50%);
      //   }
    }
  }
</style>

{#if !expanded}
  <div class="menubar">
    <div
      class="burger"
      on:click={(e) => {
        expanded = true
      }}>
      <Burger />
    </div>
  </div>
{/if}

{#if expanded}
  <div class="menu" transition:slide use:links>
    <div
      class="close"
      on:click={(e) => {
        expanded = false
      }}>
      <X />
    </div>
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
{/if}
