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
    z-index: 1000;

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
        top: 4px;
        position: relative;
      }

      .logos {
        font-family: $serif-stack;
        font-size: $font-size-medium;
        position: relative;
        top: 0px;
        float: right;
        img {
          top: 0;
          &.gu {
            height: 18px;
            position: relative;
            top: 4px;
          }
        }
      }
    }
  }
</style>

<div style="overflow: hidden;" class="mobile-title">
  <div class="inner">
    <img src="/img/open-window.svg" alt="Open Window" />
    <span class="logos">
      <img src="/img/hdk-valand.svg" alt="HDK-Valand" />
      <img src="/img/gu2.svg" alt="Göteborgs Universitet" class="gu" />
    </span>
  </div>
</div>
