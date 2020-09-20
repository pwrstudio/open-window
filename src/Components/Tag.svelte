<script>
  // # # # # # # # # # # # # #
  //
  //  TAG
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { onMount, onDestroy } from "svelte"
  import { links } from "svelte-routing"

  // *** GLOBAL
  import { COLORS, slugify, debounce } from "../global.js"

  // *** STORES
  import { activeTags } from "../stores.js"

  // *** PROPS
  export let title = "Testx"

  let tagEl = {}
  let bgColor = ""
  let active = false
  let slug = slugify(title)

  const calculateBackgroundColor = () => {
    const ownHorizontalPosition = tagEl.getBoundingClientRect().left
    const windowWidth = window.innerWidth
    const positionIndex = Math.round((ownHorizontalPosition / windowWidth) * 10)
    console.log("ownHorizontalPosition ", ownHorizontalPosition)
    console.log("windowWidth", windowWidth)
    console.log("positionIndex", positionIndex)
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
    height: 30px;
    margin-right: 10px;
    margin-bottom: 10px;
    background: $white;
    box-shadow: 0px 0px 10px grey;
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
      line-height: 35px;
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

    &:hover,
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
    active = !active
    activeTags.set($activeTags.includes(slug) ? $activeTags.filter((tag) => tag !== slug) : [...$activeTags, slug])
  }}>
  {title}
  <div class="background-overlay" style={'background: ' + bgColor} />
  <div class="text">{title}</div>
</div>
