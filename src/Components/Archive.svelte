<script>
  // # # # # # # # # # # # # #
  //
  //  ARCHIVE
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { slide } from "svelte/transition"
  import { Router, Route, links } from "svelte-routing"
  import flatMap from "lodash/flatMap"
  import uniq from "lodash/uniq"
  import intersection from "lodash/intersection"
  import { urlFor } from "../sanity"

  // *** COMPONENTS
  import Slideshow from "./Slideshow.svelte"
  import Tag from "./Tag.svelte"

  // *** GRAPHICS
  import X from "./Graphics/X.svelte"

  // *** STORES
  import { activeTags } from "../stores.js"

  // *** PROPS
  export let archived = []

  let allTags = false
  let filteredEvents = []

  $: {
    archived.filter((e) => {
      console.dir(intersection(e.tags, $activeTags))
    })

    filteredEvents =
      $activeTags.length > 0
        ? archived.filter((e) => intersection(e.tags, $activeTags).length > 0)
        : archived
  }

  $: {
    allTags = uniq(flatMap(archived.map((a) => a.tags)))
    // console.dir(allTags)
  }
</script>

<style lang="scss">
  @import "../variables.scss";

  .archive {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    background: $white;
    padding: 15px;
    padding-top: 80px;

    .close {
      position: absolute;
      top: 10px;
      right: 15px;
      cursor: pointer;
      // background: red;
      transition: transform 0.3s ease-out;

      &:hover {
        transform: scale(1.1);
      }
    }

    .header {
      position: absolute;
      top: 10px;
      left: 0;
      width: 100vw;
      display: flex;
      justify-content: center;
      // background: red;

      img {
        display: block;
        height: 28px;
      }
    }

    .tag-container {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }

    .grid {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: calc(25% - 10px);
        margin-right: 10px;
        margin-bottom: 10px;
        height: 200px;
        position: relative;

        @include screen-size("small") {
          width: calc(50% - 10px);
          height: 120px;
        }

        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        .overlay {
          font-family: $sans-stack;
          font-size: $font-size-medium;
          text-align: center;
          padding: 10px;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: $green-transparent;
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          color: $black;
          text-decoration: none;
          user-select: none;
          &:hover {
            opacity: 1;
          }

          @include screen-size("small") {
            font-size: $font-size-small;
          }
        }
      }
    }

    @include screen-size("small") {
      //   padding-bottom: 40px;
    }
  }
</style>

<Router>
  <div class="archive" use:links transition:slide>
    <a class="close" href="/"><X /></a>
    <div class="header"><img src="/img/archive.svg" alt="Program" /></div>
    <div class="tag-container">
      {#if allTags && Array.isArray(allTags)}
        {#each allTags as tag}
          <Tag title={tag} />
        {/each}
      {/if}
    </div>
    <div class="grid">
      {#each filteredEvents as event}
        <div class="item">
          {#if event.mainImage}
            <img
              src={urlFor(event.mainImage)
                .width(400)
                .quality(90)
                .auto('format')
                .url()} />
          {/if}
          <a href={'/archive/' + event.slug.current} class="overlay">
            <div>
              {event.title}<br />
              {#if event.participants && Array.isArray(event.participants)}
                {#each event.participants as participant, index (participant._id)}
                  <div class="participant">{participant.name}</div>
                {/each}
              {/if}
            </div>
          </a>
        </div>
      {/each}
    </div>
    <Route path=":slug" component={Slideshow} />
  </div>
</Router>
