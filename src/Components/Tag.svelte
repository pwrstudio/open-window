<script>
  import { window } from "lodash/_freeGlobal"

  // # # # # # # # # # # # # #
  //
  //  TAG
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { onMount, onDestroy } from "svelte"

  // *** GLOBAL
  import { COLORS, slugify, debounce } from "../global.js"

  // *** STORES
  import { activeTags } from "../stores.js"

  // *** PROPS
  export let title = false
  export let slug = false
  export let link = false

  // *** DOM REFERENCES
  let tagEl = {}

  // *** VARIABLES
  let bgColor = ""

  if (!slug) {
    slug = slugify(title)
  }

  const calculateBackgroundColor = () => {
    const ownHorizontalPosition = tagEl.getBoundingClientRect().left
    const windowWidth = window.innerWidth
    const positionIndex = Math.round((ownHorizontalPosition / windowWidth) * 10)
    // console.log("ownHorizontalPosition ", ownHorizontalPosition)
    // console.log("windowWidth", windowWidth)
    // console.log("positionIndex", positionIndex)
    bgColor = COLORS[positionIndex]
  }

  onMount(async () => {
    setTimeout(calculateBackgroundColor, 500)
    window.onresize = debounce(calculateBackgroundColor, 100)
  })

  onDestroy(async () => {
    activeTags.set([])
  })
</script>

<style lang="scss">
  @import "../variables.scss";

  .tag {
    padding: 0px 15px;
    height: 26px;
    margin-right: 10px;
    margin-bottom: 10px;
    background: $white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    user-select: none;
    cursor: pointer;
    position: relative;
    color: transparent;
    font-family: $sans-stack;
    font-size: $font-size-small;

    .text {
      color: $black;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      z-index: 2;
      line-height: 30px;
    }

    .background-overlay {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      z-index: 1;
      transition: opacity 0.2s ease-out;
    }

    &:hover {
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }

    &.active {
      .background-overlay {
        opacity: 1;
      }
    }
  }
</style>

<div
  class="tag"
  bind:this={tagEl}
  class:active={$activeTags.includes(slug)}
  on:click={(e) => {
    if (link) {
      window.location = '/archive/#' + slug
    } else {
      if ($activeTags.includes(slug)) {
        console.log('-- Remove tag', slug)
        activeTags.set($activeTags.filter((tag) => tag !== slug))
      } else {
        console.log('++ Add tag', slug)
        activeTags.set([...$activeTags, slug])
      }
    }
    // activeTags.set($activeTags.includes(slug) ? $activeTags.filter((tag) => tag !== slug) : [...$activeTags, slug])
  }}>
  {title}
  <div class="background-overlay" style={'background: ' + bgColor} />
  <div class="text">{title}</div>
</div>
