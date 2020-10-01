<script>
  // # # # # # # # # # # # # #
  //
  //  ABOUT
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { fly, fade } from "svelte/transition"
  import { quartOut } from "svelte/easing"
  import { Router, Route, links, navigate } from "svelte-routing"
  import get from "lodash/get"

  import { getContext } from "svelte"
  import { ROUTER } from "svelte-routing/src/contexts"
  const { activeRoute } = getContext(ROUTER)

  // $: {
  //   console.log($activeRoute)
  // }

  // *** SANITY
  import { loadData, renderBlockText } from "../sanity.js"

  // *** GLOBAL
  import { QUERY } from "../global.js"

  // *** COMPONENTS
  import Page from "./Page.svelte"

  // *** GRAPHICS
  import X from "./Graphics/X.svelte"
  import ArrowDown from "./Graphics/ArrowDown.svelte"

  let pages = []
  let settings = loadData(QUERY.SETTINGS)
  settings.then((settings) => {
    pages = settings.menuAbout
  })
</script>

<style lang="scss">
  @import "../variables.scss";

  .about {
    .panel {
      position: fixed;
      top: 0;
      z-index: 1000;
      width: 33.33333vw;
      height: 100vh;

      @include screen-size("small") {
        width: 100vw;
      }

      a {
        color: $black;
        text-decoration: none;
      }

      .close {
        position: absolute;
        top: 15px;
        left: 25px;
        height: 100px;
        width: 100px;
        cursor: pointer;
        user-select: none;

        &:hover {
          transform: scale(1.05);
        }

        &.phone-only {
          display: none;
        }

        @include screen-size("small") {
          height: 60px;
          width: 60px;
          left: unset;
          right: 15px;
          &.phone-only {
            display: block;
          }
        }
      }

      &.menu {
        right: 0;
        background: $white;
        font-family: $serif-stack;
        font-size: 42px;
        border-left: 1px solid $black;
        z-index: 1002;

        @include screen-size("small") {
          z-index: 1001;
        }

        .header {
          position: absolute;
          top: 10px;
          right: 15px;
          // background: red;

          img {
            height: 28px;
          }

          @include screen-size("small") {
            top: 25px;
            right: unset;
            left: 20px;
            img {
              height: 34px;
            }
          }
        }

        .menu-container {
          padding: 15px;
          padding-top: 140px;

          @include screen-size("small") {
            padding: 0;
            margin: 15px;
            margin-top: 90px;
            border-top: 1px solid black;
            padding-top: 30px;
          }

          .item {
            font-family: $serif-stack;
            font-size: $font-size-large;
            transform: scaleY(1.14);
            line-height: 1.1em;
            display: block;

            @include screen-size("small") {
              font-size: $font_size_large_mobile;
            }

            &:hover {
              color: $green;
            }
          }
        }

        .colophon {
          position: absolute;
          bottom: 40px;
          left: 15px;
          display: flex;
          flex-direction: column;
          width: calc(100% - 30px);

          .text {
            font-family: $serif-stack;
            font-size: $font-size-normal;
            transform: scaleY(1.14);
            margin-right: 10px;
            margin-bottom: 10px;
            line-height: 1.4em;
          }
          .logos {
            display: flex;
            align-items: flex-end;
            padding-bottom: 10px;
            img {
              display: block;
              margin-right: 15px;
              height: 22px;

              &:last-child {
                margin-right: 0;
              }
            }
          }
        }
      }
      &.page {
        right: 33.33333vw;
        background: $white;
        font-family: $sans-stack;
        font-size: 26px;
        border-left: 1px solid $black;
        z-index: 1001;

        @include screen-size("small") {
          right: 0;
          z-index: 1002;
        }

        .header {
          display: none;

          @include screen-size("small") {
            position: absolute;
            display: block;
            top: 25px;
            right: unset;
            left: 20px;
            img {
              height: 34px;
            }
          }
        }

        .page-container {
          padding: 15px;
          padding-bottom: 80px;
          height: 100vh;
          overflow-y: scroll;

          @include screen-size("small") {
            padding: 0;
            margin: 15px;
            margin-top: 90px;
            border-top: 1px solid black;
            padding-top: 30px;
          }

          @include hide-scroll;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 0px;
          left: px;
          width: 100%;
          height: 80px;
          background: rgba(255, 255, 255, 0.95);
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      &.side {
        right: 66.6666vw;
        background: $white;
        font-family: $sans-stack;
        font-size: 26px;
        z-index: 1000;

        .header {
          display: none;

          @include screen-size("small") {
            position: absolute;
            display: block;
            top: 25px;
            right: unset;
            left: 20px;
            img {
              height: 34px;
            }
          }
        }

        @include screen-size("small") {
          right: 0;
          z-index: 1003;
        }
      }
    }

    @include screen-size("small") {
      //   padding-bottom: 40px;
    }
  }
</style>

<Router>
  <div class="about" use:links>
    <!-- PANEL 1 => MENU -->
    <div
      class="panel menu"
      in:fly={{ x: window.innerWidth / 3, opacity: 1, easing: quartOut, duration: 500 }}
      out:fade={{ easing: quartOut, duration: 500 }}>
      <div class="header"><img src="/img/about.svg" alt="About" /></div>
      <div
        class="close"
        on:click={(e) => {
          navigate('/')
        }}>
        <X />
      </div>
      <div class="menu-container">
        {#each pages as page}
          <a class="item" href={'/about/' + page.slug.current}>{page.title}</a>
        {/each}
      </div>
      <div class="colophon">
        <div class="text">
          {#await settings then settings}
            {@html renderBlockText(settings.footerAbout.content)}
          {/await}
        </div>
        <div class="logos">
          <img src="/img/hdk-valand.svg" alt="HDK-Valand" />
          <img src="/img/gu2.svg" alt="Göteborgs Universitet" />
        </div>
      </div>
    </div>

    <Route path=":slug" let:params>
      <!-- PANEL 2 => PAGE -->
      <div
        class="panel page"
        in:fly={{ x: window.innerWidth / 3, opacity: 1, easing: quartOut, duration: 500 }}
        out:fade={{ easing: quartOut, duration: 500 }}>
        <div class="header"><img src="/img/about.svg" alt="About" /></div>
        <div
          class="close phone-only"
          on:click={(e) => {
            navigate('/about')
          }}>
          <X />
        </div>
        <div class="page-container">
          <Page page={pages.find((p) => get(p, 'slug.current', '') === params.slug)} />
        </div>
        <div class="scroll-indicator">
          <ArrowDown />
        </div>
      </div>
      <!-- PANEL 3 => SIDE -->
      <!-- <div
        class="panel side"
        in:fly={{ x: window.innerWidth / 3, opacity: 0.8, easing: quintOut, duration: 500 }}>
        <div class="close" ><X /></div>
      </div> -->
    </Route>
  </div>
</Router>
