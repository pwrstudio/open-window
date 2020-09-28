<script>
  // # # # # # # # # # # # # #
  //
  //  CLOUD
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { fade } from "svelte/transition"
  import { links } from "svelte-routing"
</script>

<style lang="scss">
  @import "../variables.scss";

  .cloud {
    width: 100%;
    height: 100%;
    // padding-bottom: 80px;
    background: rgb(112, 147, 243);
    display: flex;
    justify-content: center;
    align-items: center;

    .vimeo-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      max-width: 1080px;
      width: 100%;
      margin-bottom: 0.5em;
      pointer-events: none;

      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
      }
    }

    img,
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @include screen-size("small") {
      //   padding-bottom: 40px;
    }
  }
</style>

<div class="cloud" use:links>
  <!-- <div class="vimeo-container">
    <iframe
      width="1080"
      height="720"
      src="https://player.vimeo.com/video/235224162?autoplay=1&loop=1&autopause=0"
      frameborder="no"
      scrolling="no"
      byline="false"
      color="#ffffff"
      allow="autoplay; fullscreen"
      allowfullscreen />
  </div> -->
  <!-- <video src="/img/sky-loop-1-720p.mp4" autoplay loop muted /> -->
  <img src="/sky.jpg" />
</div>
