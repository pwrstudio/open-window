<script>
  // # # # # # # # # # # # # #
  //
  //  ABOUT
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { fly } from "svelte/transition"
  import { quintOut } from "svelte/easing"
  import { Router, Route, links, navigate } from "svelte-routing"

  import { getContext } from "svelte"
  import { ROUTER } from "svelte-routing/src/contexts"
  const { activeRoute } = getContext(ROUTER)

  $: {
    console.log($activeRoute)
  }

  // *** GRAPHICS
  import X from "./Graphics/X.svelte"
  import ArrowDown from "./Graphics/ArrowDown.svelte"

  let pages = [
    {
      title: "FAQ",
      slug: "faq",
    },
    {
      title: "Participation",
      slug: "participation",
    },
    {
      title: "When and how",
      slug: "when-and-how",
    },
  ]
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

      a {
        color: $black;
        text-decoration: none;
      }

      .close {
        position: absolute;
        top: 10px;
        left: 15px;
        cursor: pointer;
        // background: red;
      }

      &.menu {
        right: 0;
        background: $white;
        font-family: $serif-stack;
        font-size: 42px;
        border-left: 1px solid $black;
        z-index: 1002;

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
            line-height: 1.1em;
            display: block;
            &:hover {
              color: $green;
            }
          }
        }

        .colophon {
          position: absolute;
          bottom: 10px;
          left: 15px;
          display: flex;
          justify-content: space-between;
          width: calc(100% - 30px);
          .text {
            font-family: $serif-stack;
            font-size: $font-size-normal;
          }
          .logos {
            display: flex;
            align-items: flex-end;
            padding-bottom: 10px;
            img {
              display: block;
              margin-right: 10px;
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
      transition:fly={{ x: window.innerWidth / 3, opacity: 1, easing: quintOut, duration: 500 }}>
      <div class="header"><img src="/img/open-window.svg" alt="Program" /></div>
      <div
        class="close"
        on:click={(e) => {
          console.dir($activeRoute.params['*'])
          if ($activeRoute.params['*'].length > 0) {
            navigate('/about/')
            setTimeout(() => {
              navigate('/')
            }, 500)
          } else {
            navigate('/')
          }
        }}>
        <X />
      </div>
      <div class="menu-container">
        {#each pages as page}
          <a class="item" href={'/about/' + page.slug}>{page.title}</a>
        {/each}
      </div>
      <div class="colophon">
        <div class="text">
          OW 2017 | 2018 | 2019 <br /><br /> Externa länkar<br /> Kontaktuppgiter<br />
          Facebook | Instagram | Twitter
        </div>
        <div class="logos">
          <img src="/img/gu.svg" />
          <img src="/img/hdk.svg" />
        </div>
      </div>
    </div>

    <Route path=":slug" let:params>
      <!-- PANEL 2 => PAGE -->
      <div
        class="panel page"
        transition:fly={{ x: window.innerWidth / 3, opacity: 1, easing: quintOut, duration: 500 }}>
        <div class="page-container">
          <p>{params.slug}</p>
          <p>
            The Covid-19 pandemic has presented the University with a new set of
            demanding challenges and requirements which has had a profound
            effect on our possibilities to work with public programmes and
            expand our educational environments into the public realm. During
            the spring we’ve had to cancel or postpone all degree exhibitions
            and during the fall the situation will continue to effect the way we
            can display your projects and assist a broader engagement between
            them and a public interface.
          </p>
          <p>
            What Open window envisions is an external venue that will suffice as
            a broadcasting studio and a mediated environment and support a
            multitude of different channels, launched on the 19th of October.
            The channels with MA and BA activations will be the inaugural focus
            of this platform and the additional content will be accommodated
            around those two channels.
          </p>
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
