<script>
  // # # # # # # # # # # # # #
  //
  //  VIDEO PLAYER
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import getVideoId from "get-video-id"

  // PROPS
  export let liveEvent = {}
</script>

<style lang="scss">
  @import "../variables.scss";

  .outer {
    position: fixed;
    top: 0;
    left: 0;
    background: black;
    width: 100vw;
    height: calc(100vh - 90px);
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .embed {
      width: 80%;

      @include screen-size("small") {
        width: 95%;
      }

      .youtube-container,
      .vimeo-container {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;

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
  }
</style>

<div class="outer">
  <div class="embed">
    <!-- // YOUTUBE -->
    {#if liveEvent.streamId.includes('youtube') || liveEvent.streamId.includes('youtu.be')}
    <div class="youtube-container">
      <iframe
        width="1920"
        height="1280"
        src={'https://www.youtube.com/embed/' + getVideoId(liveEvent.streamId).id + '?rel=0'} 
        frameborder="no"
        allow="autoplay; fullscreen"
        allowfullscreen />
    </div>
  {/if}

    <!-- // VIMEO -->
    {#if liveEvent.streamId.includes('vimeo')}
    <div class="vimeo-container">
      <iframe
        width="720"
        height="405"
        src={'https://player.vimeo.com/video/' + getVideoId(liveEvent.streamId).id + '?autoplay=1'}
        frameborder="no"
        scrolling="no"
        byline="false"
        color="#ffffff"
        allow="autoplay; fullscreen"
        allowfullscreen />
    </div>
  {/if}
  </div>
</div>
