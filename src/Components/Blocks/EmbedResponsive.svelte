<script>
  // # # # # # # # # # # # # #
  //
  //  EMBED BLOCK
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import getVideoId from "get-video-id"

  // PROPS
  export let image = {}
  export let url = ""

  // console.log("image", image)
  // console.log("url", url)

  // *** VARIABLES
  let clicked = false
</script>

<style lang="scss">
  @import "../../variables.scss";

  .embed {
    .youtube-container,
    .vimeo-container {
      margin-right: auto;
      margin-left: auto;
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      max-width: 480px;
      width: 100%;
      margin-bottom: 20px;

      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
      }
    }
  }
</style>

<div class="embed">
  <!-- // YOUTUBE -->
  {#if url.includes('youtube') || url.includes('youtu.be')}
    <div class="youtube-container">
      <iframe
        width="600"
        height="338"
        src={'https://www.youtube.com/embed/' + getVideoId(url).id}
        frameborder="no"
        allow="autoplay; fullscreen"
        allowfullscreen />
    </div>
  {/if}
</div>
