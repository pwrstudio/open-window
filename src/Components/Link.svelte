<script>
  // # # # # # # # # # # # # #
  //
  //  LINK
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { onMount, onDestroy } from "svelte"
  import { links } from "svelte-routing"

  // *** PROPS
  export let link = {}

  console.dir(link)
</script>

<style lang="scss">
  @import "../variables.scss";

  .link {
    // padding: 0px 15px;
    // height: 30px;
    // margin-right: 10px;
    // margin-bottom: 10px;
    // background: $white;
    // box-shadow: 0px 0px 10px grey;
    // user-select: none;
    // cursor: pointer;
    // position: relative;
    // color: transparent;
    // font-family: $sans-stack;
    // font-size: $font-size-small;
    float: left;
    margin-right: 5px;

    img {
      height: 32px;
    }

    .text {
      color: $black;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      z-index: 2;
      line-height: 35px;
    }
  }
</style>

<a href={link.url} target="_blank" class="link">
  {#if link._type == 'instagram'}
    <img src="/img/instagram.svg" />
  {:else if link._type == 'twitter'}
    <img src="/img/twitter.svg" />
  {:else if link._type == 'facebook'}
    <img src="/img/facebook.svg" />
  {:else}<img src="/img/web.svg" />{/if}
</a>
