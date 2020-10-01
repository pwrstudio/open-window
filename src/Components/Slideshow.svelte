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
  import get from "lodash/get"
  import { loadData, renderBlockText, urlFor } from "../sanity"

  // *** COMPONENTS
  import EmbedBlock from "./Blocks/EmbedBlock.svelte"

  // *** GRAPHICS
  import X from "./Graphics/X.svelte"
  import ArrowLeft from "./Graphics/ArrowLeft.svelte"
  import ArrowRight from "./Graphics/ArrowRight.svelte"

  // *** GLOBAL
  import { QUERY } from "../global.js"

  export let slug = ""

  // *** DOM REFERENCES
  let slideShowEl = {}

  console.log(slug)

  // *** VARIABLES
  let flkty = {}
  let event = loadData(QUERY.SINGLE, { slug: slug })

  onMount(async () => {
    event
      .then((event) => {
        console.dir(event)
        flkty = new Flickity(slideShowEl, {
          contain: true,
          pageDots: false,
          prevNextButtons: false,
          wrapAround: true,
        })
      })
      .catch((err) => {
        console.dir(err)
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
      // margin-left: 10vw;
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

        img {
          max-height: 100%;
          max-width: 100%;

          @include screen-size("small") {
            max-height: 90%;
            max-width: 90%;
          }
        }
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
        {#if event.slideshow && Array.isArray(event.slideshow)}
          {#each event.slideshow as slide (slide._key)}
            <div class="slide">
              {#if slide._type === 'image'}
                <img
                  src={urlFor(slide.asset)
                    .width(900)
                    .quality(90)
                    .auto('format')
                    .url()} />
              {/if}
              {#if slide._type === 'embedBlock'}
                <EmbedBlock block={slide} />
              {/if}
            </div>
          {/each}
        {/if}
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
