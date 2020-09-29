<script>
  import { onMount } from "svelte"

  export let duration = 15
  export let repeat = 4
  export let paused = false
  export let pauseOnHover = false

  let hovered = false

  onMount(async () => {
    // const container = document.querySelector("#container")
    // container.onmouseover = () => {
    //   hovered = true
    // }
    // container.onmouseleave = () => {
    //   hovered = false
    // }
  })
</script>

<style lang="scss">
  @import "../variables.scss";

  .content {
    width: 100000px;
  }

  .text {
    animation-name: animation;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    float: left;
    user-select: none;

    img {
      height: 15px;
      margin-right: 120px;
      margin-top: 15px;
    }

    .hdk-valand {
      font-family: $serif-stack;
      font-size: $font-size-medium;
      transform: scaleY(1.14);
      margin-right: 120px;
      position: relative;
      top: 0px;
    }
  }

  @keyframes animation {
    100% {
      transform: translateX(-100%);
    }
  }

  .marquee-container {
    background: $green;
    height: 100%;
    width: 100%;
  }
</style>

<div style="overflow: hidden;" class="marquee-container">
  <div class="content">
    {#each Array(repeat) as _, i}
      <div class="text" style="animation-duration: {duration}s">
        <img src="/img/open-window.svg" />
        <span class="hdk-valand">HDK Valand</span>
      </div>
    {/each}
  </div>
</div>
