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

  .embed {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    background: black;
    width: 100vw;
    height: calc(100vh - 90px);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    // pointer-events: none;

    .text {
      // display: flex;
      .caption {
      }

      .attribution {
      }
    }

    .youtube-container,
    .vimeo-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      max-width: 90%;
      width: 1280px;
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

    .soundcloud-container {
      // height: 300px;
      width: 100%;
      overflow: hidden;
      max-width: 100%;
      margin-bottom: 0.5em;

      iframe {
        width: 100%;
        height: 100%;
        border: 0;
      }
    }
  }
</style>

<div class="embed">
  <!-- // YOUTUBE -->
  {#if liveEvent.streamId.includes('youtube') || liveEvent.streamId.includes('youtu.be')}
    <div class="youtube-container">
      <iframe
        width="720"
        height="480"
        src={'https://www.youtube.com/embed/' + getVideoId(liveEvent.streamId).id}
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
        height="480"
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
