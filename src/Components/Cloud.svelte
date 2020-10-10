<script>
  // # # # # # # # # # # # # #
  //
  //  CLOUD
  //
  // # # # # # # # # # # # # #
</script>

<style lang="scss">
  @import "../variables.scss";

  .cloud {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("/sky.jpg");

    img,
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>

<div class="cloud"><video src="/img/sky-3.mp4" autoplay loop muted /></div>
