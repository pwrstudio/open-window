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
    position: relative;
    width: 100%;
    height: 100%;

    img {
      height: 100%;
      max-width: 100%;
      object-fit: cover;

      @include screen-size("small") {
        max-height: 90%;
        max-width: 90%;
      }
    }

    iframe {
      position: absolute;
      top: 50%;
      left: 50%;
      max-width: 95%;
      border: 0;
      transform: translateX(-50%) translateY(-50%);
    }

    // .youtube-container,
    // .vimeo-container {
    //   margin-right: auto;
    //   margin-left: auto;
    //   position: relative;
    //   padding-bottom: 56.25%;
    //   height: 0;
    //   overflow: hidden;
    //   max-width: 480px;
    //   width: 100%;
    //   margin-bottom: 0.5em;

    //   iframe {
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     width: 100%;
    //     height: 100%;
    //     border: 0;
    //   }
    // }
  }
</style>

<div class="embed">
  <!-- {#if clicked} -->
  <!-- // YOUTUBE -->
  {#if url.includes('youtube') || url.includes('youtu.be')}
    <!-- <div class="youtube-container"> -->
    <iframe
      width="600"
      height="338"
      src={'https://www.youtube.com/embed/' + getVideoId(url).id}
      frameborder="no"
      allow="autoplay; fullscreen"
      allowfullscreen />
  {/if}

  <!-- // VIMEO -->
  {#if url.includes('vimeo')}
    <div class="vimeo-container">
      <iframe
        width="600"
        height="338"
        src={'https://player.vimeo.com/video/' + getVideoId(url).id}
        frameborder="no"
        scrolling="no"
        byline="false"
        color="#ffffff"
        allow="autoplay; fullscreen"
        allowfullscreen />
    </div>
  {/if}
  <!-- {:else if image.asset} -->
  <!-- <img
      src={urlFor(image.asset).width(900).quality(90).auto('format').url()} />
    {#if url}
      <div
        class="play-icon"
        on:click={e => {
          clicked = true
        }}>
        Play
      </div>
    {/if} -->
  <!-- {/if} -->
</div>
