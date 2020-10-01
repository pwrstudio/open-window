<script>
  // # # # # # # # # # # # # #
  //
  //  MOBILE MENU
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { links } from "svelte-routing"
  import { slide } from "svelte/transition"
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

    .burger {
      height: 15px;
      padding-top: 10px;
    }
  }

  .menu {
    background: $white;
    position: fixed;
    bottom: 70px;
    left: 0;
    width: 100%;

    .close {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
      transition: transform 0.3s ease-out;
      height: 60px;
      width: 60px;

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
      display: flex;
      align-items: center;

      img {
        margin-top: 6px;
        height: 36px;
      }

      .inner {
        user-select: none;
        border-bottom: 1px solid $black;
        display: flex;
        justify-content: center;
        width: calc(100% - 20px);
        margin-left: 20px;
        margin-right: 20px;
        padding-top: 25px;
        padding-bottom: 25px;
      }

      &.about {
        .inner {
          border-bottom: 1px solid transparent;
        }
      }
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
      <div class="inner"><img src="/img/program.svg" alt="Program" /></div>
    </a>
    <a href="/archive/" class="menu-item archive">
      <div class="inner"><img src="/img/archive.svg" alt="Archive" /></div>
    </a>
    <a href="/about/" class="menu-item about">
      <div class="inner"><img src="/img/about.svg" alt="About" /></div>
    </a>
  </div>
{/if}
