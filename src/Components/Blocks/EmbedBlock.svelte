<script>
  // # # # # # # # # # # # # #
  //
  //  EMBED BLOCK
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import getVideoId from "get-video-id"
  import { urlFor } from "../../sanity"

  // *** GRAPHICS

  // import Play from "../Graphics/Play.svelte"

  // PROPS
  export let block = {}

  let clicked = false
  console.dir(block)
</script>

<style lang="scss">
  @import "../../variables.scss";

  .embed {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;

    .play-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      z-index: 100;
      background: $green-transparent;
      height: 100px;
      width: 100px;
      border-radius: 50px;
      cursor: pointer;
      line-height: 100px;
      text-align: center;
    }
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

<div class="embed">
  <!-- // YOUTUBE -->
  {#if clicked}
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
  {:else}
    
  <div on:click={e => {
    clicked = true}}>
  <img
    src={urlFor(block.image.asset)
      .width(900)
      .quality(90)
      .auto('format')
      .url()} />
      <div class='play-icon'>
        Play
      </div>
    </div>
        {/if}
</div>
