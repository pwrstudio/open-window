<script>
  // # # # # # # # # # # # # #
  //
  //  LINK
  //
  // # # # # # # # # # # # # #
  // *** PROPS
  export let link = {}
</script>

<style lang="scss">
  @import "../variables.scss";

  .link {
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
