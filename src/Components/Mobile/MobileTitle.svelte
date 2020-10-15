<script>
  // # # # # # # # # # # # # #
  //
  //  MOBILE TITLE
  //
  // # # # # # # # # # # # # #

  // IMPORTS
</script>

<style lang="scss">
  @import "../../variables.scss";

  .mobile-title {
    background: $green;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;

    .inner {
      user-select: none;
      border-bottom: 1px solid $black;
      display: flex;
      justify-content: space-between;
      width: calc(100% - 20px);
      margin-left: 20px;
      margin-right: 20px;

      img {
        height: 15px;
      }

      .hdk-valand {
        font-family: $serif-stack;
        font-size: $font-size-medium - 4px;
        transform: scaleY(1.14);
        white-space: nowrap;
      }
    }
  }
</style>

<div style="overflow: hidden;" class="mobile-title">
  <div class="inner">
    <img src="/img/open-window.svg" alt="Open Window" />
    <span class="hdk-valand">HDK Valand</span>
  </div>
</div>
