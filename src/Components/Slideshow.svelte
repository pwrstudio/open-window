<script>
  // # # # # # # # # # # # # #
  //
  //  SLIDESHOW
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { fade, scale } from "svelte/transition"
  import { links } from "svelte-routing"

  // *** GRAPHICS
  import X from "./Graphics/X.svelte"
  import ArrowLeft from "./Graphics/ArrowLeft.svelte"
  import ArrowRight from "./Graphics/ArrowRight.svelte"

  let event = {
    time: "09.00–10.15",
    title: "XYZ Knitting or Searching for Mary",
    slug: "test-event",
    participant: "Märta Louise Karlsson",
    location: "Design School",
    slides: ["/img/test.jpg", "/img/test2.jpg", "/img/test3.jpg"],
  }

  const lastIndex = event.slides.length - 1
  let currentIndex = 0
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

      &.prev {
        left: 25px;
      }

      &.next {
        right: 25px;
      }
    }

    .slideshow-container {
      margin-top: 10vh;
      margin-left: 10vw;
      height: 70vh;
      width: 80vw;
      user-select: none;
      position: relative;
      // background: red;

      .slide {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        // background: yellow;
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
      currentIndex = currentIndex === 0 ? lastIndex : currentIndex - 1
    }}>
    <ArrowLeft />
  </div>
  <div
    class="nav next"
    on:click={(e) => {
      currentIndex = currentIndex === lastIndex ? 0 : currentIndex + 1
    }}>
    <ArrowRight />
  </div>
  <div class="slideshow-container">
    {#each event.slides as slide, index}
      {#if currentIndex === index}
        <div class="slide"><img src={slide} /></div>
      {/if}
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
