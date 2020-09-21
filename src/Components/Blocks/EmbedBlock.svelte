<script>
  // # # # # # # # # # # # # #
  //
  //  EMBED BLOCK
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import getVideoId from "get-video-id"

  // PROPS
  export let block = {}
</script>

<style lang="scss">
  @import "../../variables.scss";

  .embed {
    .youtube-container,
    .vimeo-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      max-width: 720px;
      width: 100%;
      margin-bottom: 0.5em;

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

<figure class="embed">
  <!-- // YOUTUBE -->
  {#if block.url.includes('youtube')}
    <div class="youtube-container">
      <iframe
        width="720"
        height="480"
        src={'https://www.youtube.com/embed/' + getVideoId(block.url).id}
        frameborder="no"
        allow="autoplay; fullscreen"
        allowfullscreen />
    </div>
  {/if}

  <!-- // VIMEO -->
  {#if block.url.includes('vimeo')}
    <div class="vimeo-container">
      <iframe
        width="720"
        height="480"
        src={'https://player.vimeo.com/video/' + getVideoId(block.url).id}
        frameborder="no"
        scrolling="no"
        byline="false"
        color="#ffffff"
        allow="autoplay; fullscreen"
        allowfullscreen />
    </div>
  {/if}
</figure>
