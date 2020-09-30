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

  // *** COMPONENTS
  import Page from "./Page.svelte"

  // *** GRAPHICS
  import X from "./Graphics/X.svelte"
  import ArrowDown from "./Graphics/ArrowDown.svelte"

  export let pages = []

  // let pages = [
  //   {
  //     title: "FAQ",
  //     slug: "faq",
  //   },
  //   {
  //     title: "Participation",
  //     slug: "participation",
  //   },
  //   {
  //     title: "When and how",
  //     slug: "when-and-how",
  //   },
  // ]

  console.dir(pages)
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
        }

        .menu-container {
          padding: 15px;
          padding-top: 140px;

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
          bottom: 80px;
          left: 15px;
          display: flex;
          justify-content: space-between;
          width: calc(100% - 30px);
          .text {
            font-family: $serif-stack;
            font-size: $font-size-normal;
            transform: scaleY(1.14);
            margin-right: 10px;
          }
          .logos {
            display: flex;
            align-items: flex-end;
            padding-bottom: 10px;
            img {
              display: block;
              margin-right: 15px;
              height: 80px;

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

        .page-container {
          padding: 15px;
          padding-bottom: 80px;
          height: 100vh;
          overflow-y: scroll;

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
      <div class="header"><img src="/img/open-window.svg" alt="Program" /></div>
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
          OW 2017 | 2018 | 2019 <br /><br /> Externa länkar<br /> Kontaktuppgiter<br />
          Facebook | Instagram | Twitter
        </div>
        <div class="logos">
          <img src="/img/gu.svg" alt="Göteborgs Universitet" />
          <img src="/img/hdk.svg" alt="HDK" />
        </div>
      </div>
    </div>

    <Route path=":slug" let:params>
      <!-- PANEL 2 => PAGE -->
      <div
        class="panel page"
        in:fly={{ x: window.innerWidth / 3, opacity: 1, easing: quartOut, duration: 500 }}
        out:fade={{ easing: quartOut, duration: 500 }}>
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
