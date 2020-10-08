<script>
  // # # # # # # # # # # # # #
  //
  //  SLIDESHOW
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { fade } from "svelte/transition"
  import { links, navigate } from "svelte-routing"
  import get from "lodash/get"
  import { loadData, renderBlockText } from "../sanity"

  // *** COMPONENTS
  import EmbedBlock from "./Blocks/EmbedBlock.svelte"

  // *** GRAPHICS
  import X from "./Graphics/X.svelte"
  import ArrowLeft from "./Graphics/ArrowLeft.svelte"
  import ArrowRight from "./Graphics/ArrowRight.svelte"

  // *** GLOBAL
  import { QUERY } from "../global.js"

  // *** STORES
  import { filteredEvents } from "../stores.js"

  // *** PROPS
  export let slug = ""

  // *** VARIABLES
  let nextSlug = ""
  let prevSlug = ""
  let currentIndex = 1
  let event = false

  $: {
    currentIndex = $filteredEvents.findIndex(
      e => get(e, "slug.current", false) == slug
    )
    nextSlug =
      currentIndex < $filteredEvents.length
        ? get($filteredEvents[currentIndex + 1], "slug.current", "")
        : get($filteredEvents[0], "slug.current", "")
    prevSlug =
      currentIndex === 0
        ? get($filteredEvents[currentIndex - 1], "slug.current", "")
        : get($filteredEvents[$filteredEvents.length - 1], "slug.current", "")
    console.log("–– INDEX", currentIndex)
    console.log("–– TOTAL", $filteredEvents.length)
    console.log("__ nextSlug", nextSlug)
    console.log("__ prevSlug", prevSlug)
    event = loadData(QUERY.SINGLE, { slug: slug }).catch(err => {
      console.dir(err)
    })
  }
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
      top: 15px;
      right: 25px;
      height: 100px;
      width: 100px;
      cursor: pointer;
      user-select: none;
      z-index: 1000;

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

    .header {
      display: none;

      @include screen-size("small") {
        padding-top: 10px;
        top: 25px;
        right: unset;
        left: 20px;
        position: absolute;
        // background: red;
        display: block;
        img {
          height: 34px;
        }
      }
    }

    .nav {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      user-select: none;
      z-index: 100;

      @include screen-size("small") {
        top: 140px;
        transform: unset;
      }

      &:hover {
        transform: translateY(-50%) scale(1.1);
        @include screen-size("small") {
          transform: scale(1.1);
        }
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
      height: 65vh;
      width: 100vw;
      user-select: none;

      @include screen-size("small") {
        height: 50vh;
        margin-top: 25vh;
      }

      .slide {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .text {
      width: 80vw;
      margin-left: 10vw;
      margin-top: 20px;
      font-family: $sans-stack;
      font-size: $font-size-small;

      @include screen-size("small") {
        width: 90vw;
        margin-left: 5vw;
      }

      .title {
        margin-bottom: 1em;
      }
    }
  }
</style>

<div class="slideshow" use:links>
  {#await event then event}
    <div in:fade>
      <div class="header"><img src="/img/archive.svg" alt="Program" /></div>
      <a class="close" href="/archive"><X /></a>
      <a href={'/archive/' + prevSlug} class="nav prev">
        <ArrowLeft />
      </a>
      <a class="nav next" href={'/archive/' + nextSlug}>
        <ArrowRight />
      </a>
      <div class="slideshow-container">
        <div class="slide">
          <EmbedBlock image={event.mainImage} url={event.streamId} />
        </div>
      </div>
      <div class="text">
        <div class="title">{event.title}</div>
        <div class="content">
          {#if get(event, 'content.content', false) && Array.isArray(event.content.content)}
            {@html renderBlockText(event.content.content)}
          {/if}
        </div>
      </div>
    </div>
  {/await}
</div>
