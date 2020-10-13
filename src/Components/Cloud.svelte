<script>
  // # # # # # # # # # # # # #
  //
  //  CLOUD
  //
  // # # # # # # # # # # # # #
  // *** IMPORTS
  import { onMount } from "svelte"
  import Hls from "hls.js"

  // *** VARIABLES
  let loaded = false

  onMount(async () => {
    // Replace with your asset's playback ID
    const playbackId = "39VsZyY01AIb02tHSaAhalxAlbtc00nGow17wQIz01jsXX8"
    const url = "https://stream.mux.com/" + playbackId + ".m3u8"
    const video = document.getElementById("myVideo")
    // Let native HLS support handle it if possible
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url
      loaded = true
    } else if (Hls.isSupported()) {
      // HLS.js-specific setup code
      const hls = new Hls()
      hls.loadSource(url)
      hls.attachMedia(video)
      loaded = true
    }
  })
</script>

<style lang="scss">
  @import "../variables.scss";

  .cloud {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img,
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 1s ease-out;

      &.loaded {
        opacity: 1;
      }
    }
  }
</style>

<div class="cloud"><video id="myVideo" class:loaded autoplay loop muted /></div>
