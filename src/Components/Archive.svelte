<script>
  // # # # # # # # # # # # # #
  //
  //  ARCHIVE
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { onMount } from "svelte"

  import { slide } from "svelte/transition"
  import { Router, Route, links } from "svelte-routing"
  import flatMap from "lodash/flatMap"
  import uniq from "lodash/uniq"
  import { urlFor, loadData } from "../sanity"

  // *** COMPONENTS
  import Slideshow from "./Slideshow.svelte"
  import Tag from "./Tag.svelte"

  // *** GRAPHICS
  import X from "./Graphics/X.svelte"

  // *** STORES
  import { activeTags } from "../stores.js"
  import { slugify, QUERY } from "../global"

  let allTags = false
  let filteredEvents = []
  let archivedList = []

  let archived = loadData(QUERY.EVENTS)

  $: {
    console.log(archivedList)
    filteredEvents =
      $activeTags.length > 0
        ? archivedList.filter((e) => {
            return e.tags
              ? e.tags.some((t) => $activeTags.includes(slugify(t)))
              : false
          })
        : archivedList

    console.log("–– filteredEvents")
    console.dir(filteredEvents)
  }

  $: {
    console.log("–– $activeTags")
    $activeTags.forEach((a) => {
      console.log("==>", a)
    })
  }

  onMount(async () => {
    // Set filter based on hash
    if (window.location.hash) {
      let hash = window.location.hash.substring(1)
      console.log("hash", hash)
      activeTags.set([...$activeTags, hash])
    }

    archived.then((archived) => {
      filteredEvents = archived
      archivedList = archived
      let extractedUniqueTags = uniq(
        flatMap(archived.map((a) => a.tags))
      ).filter((t) => t != undefined)
      console.log("extractedUniqueTags", extractedUniqueTags)
      allTags = extractedUniqueTags.map((t) => {
        if (t) {
          return { title: t, slug: slugify(t) }
        }
      })
      console.log("–– allTags")
      console.dir(allTags)
    })

    return archived
  })
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

    display: flex;
    flex-direction: column;
    // padding-top: 100px;

    .close {
      position: absolute;
      top: 15px;
      right: 25px;
      height: 100px;
      width: 100px;
      cursor: pointer;
      user-select: none;

      &:hover {
        transform: scale(1.05);
      }
    }

    .header {
      // position: absolute;
      // top: 10px;
      // left: 0;
      // width: 100vw;
      padding-top: 10px;
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
      margin-top: 80px;
      margin-bottom: 10px;
      padding-left: 15px;
      padding-right: 15px;
    }

    .grid {
      padding-left: 15px;
      padding-right: 15px;
      display: flex;
      flex-wrap: wrap;
      overflow-y: auto;
      // height: calc(100vh - 200px);

      .item {
        width: calc(25% - 10px);
        margin-right: 10px;
        margin-bottom: 10px;
        height: 220px;
        position: relative;
        background: $green-transparent;

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
  {#await archived then archived}
    <div class="archive" use:links transition:slide>
      <a class="close" href="/"><X /></a>
      <div class="header"><img src="/img/archive.svg" alt="Program" /></div>
      <div class="tag-container">
        {#if allTags && Array.isArray(allTags)}
          {#each allTags as tag}
            <Tag title={tag.title} slug={tag.slug} />
          {/each}
        {/if}
      </div>
      <div class="grid">
        {#each filteredEvents as event (event._id)}
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
  {/await}
</Router>
