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

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @include screen-size("small") {
      //   padding-bottom: 40px;
    }
  }
</style>

<div class="cloud" use:links><img src="/sky.jpg" /></div>
