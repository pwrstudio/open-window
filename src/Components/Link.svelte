<script>
  // # # # # # # # # # # # # #
  //
  //  LINK
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { onMount, onDestroy } from "svelte"
  import { links } from "svelte-routing"

  // *** PROPS
  export let link = {}

  //   let tagEl = {}
  //   let bgColor = ""
  //   let active = false
  //   let slug = slugify(title)

  //   const calculateBackgroundColor = () => {
  //     const ownHorizontalPosition = tagEl.getBoundingClientRect().left
  //     const windowWidth = window.innerWidth
  //     const positionIndex = Math.round((ownHorizontalPosition / windowWidth) * 10)
  //     console.log("ownHorizontalPosition ", ownHorizontalPosition)
  //     console.log("windowWidth", windowWidth)
  //     console.log("positionIndex", positionIndex)
  //     bgColor = COLORS[positionIndex]
  //   }

  //   onMount(async () => {
  //     setTimeout(calculateBackgroundColor, 500)
  //     window.onresize = debounce(calculateBackgroundColor, 100)
  //   })

  //   onDestroy(async () => {
  //     activeTags.set([])
  //   })
</script>

<style lang="scss">
  @import "../variables.scss";

  .link {
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
  }
</style>

<a href="" class="link"> LINK </a>
