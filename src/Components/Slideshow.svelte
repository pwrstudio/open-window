<script>
  // # # # # # # # # # # # # #
  //
  //  SLIDESHOW
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { links } from "svelte-routing"
  import Flickity from "flickity"

  // *** GRAPHICS
  import X from "./Graphics/X.svelte"
  import ArrowLeft from "./Graphics/ArrowLeft.svelte"
  import ArrowRight from "./Graphics/ArrowRight.svelte"

  // *** DOM REFERENCES
  let slideShowEl = {}

  // *** VARIABLES
  let flkty = {}
  let event = {
    time: "09.00–10.15",
    title: "XYZ Knitting or Searching for Mary",
    slug: "test-event",
    participant: "Märta Louise Karlsson",
    location: "Design School",
    slides: ["/img/test.jpg", "/img/test2.jpg", "/img/test3.jpg"],
  }

  onMount(async () => {
    flkty = new Flickity(slideShowEl, {
      contain: true,
      pageDots: false,
      prevNextButtons: false,
      wrapAround: true,
    })
  })
</script>

<style lang="scss">
  @import "../variables.scss";

  .slideshow {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.9);

    .close {
      position: absolute;
      top: 10px;
      right: 15px;
      cursor: pointer;
      user-select: none;
      // background: red;
    }

    .nav {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      user-select: none;
      z-index: 100;

      &:hover {
        transform: translateY(-50%) scale(1.1);
      }

      &.prev {
        left: 25px;
      }

      &.next {
        right: 25px;
      }
    }

    .slideshow-container {
      margin-top: 10vh;
      // margin-left: 10vw;
      height: 70vh;
      width: 100vw;
      user-select: none;

      .slide {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          max-height: 100%;
          max-width: 100%;
        }
      }
    }

    .text {
      width: 80vw;
      margin-left: 10vw;
      margin-top: 20px;
      font-family: $sans-stack;
      font-size: $font-size-small;

      .header {
        margin-bottom: 1em;
      }
    }

    @include screen-size("small") {
      //   padding-bottom: 40px;
    }
  }
</style>

<div class="slideshow" use:links in:fade>
  <!-- <div class="inner" in:fade> -->
  <a class="close" href="/archive"><X /></a>
  <div
    class="nav prev"
    on:click={(e) => {
      flkty.next(true)
    }}>
    <ArrowLeft />
  </div>
  <div
    class="nav next"
    on:click={(e) => {
      flkty.previous(true)
    }}>
    <ArrowRight />
  </div>
  <div class="slideshow-container" bind:this={slideShowEl}>
    {#each event.slides as slide}
      <div class="slide"><img src={slide} /></div>
    {/each}
  </div>
  <div class="text">
    <div class="header">{event.title}</div>
    <div class="content">
      Henry David Thoreau’s affection for the pine tree was stronger than for
      any other tree. He called it “the emblem of my life”, and he said that the
      pine forest next to his house in Walden was “my best room”. He called it
      “the emblem of my life”, and he said that the pine forest next to his
      house in Walden was “my best room”. His affection for the pine tree was
      stronger than for any other tree.
    </div>
  </div>
  <!-- </div> -->
</div>
