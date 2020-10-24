<script>
    // # # # # # # # # # # # # #
    //
    //  ALERT BOX
    //
    // # # # # # # # # # # # # #

    // *** GRAPHICS
    import X from "./Graphics/X.svelte"
  </script>
  
  <style lang="scss">
    @import "../variables.scss";
  
    .alert {
      padding: 30px;
      background: black;
      color: white;
      position: fixed;
      top: 30%;
      left: 50%;
      width: 500px;
      max-width: 90%;
      margin-left: -250px;
      z-index: 100;
      font-family: $serif-stack;
      font-size: $font-size-medium;
      transform: scaleY(1.14);
      line-height: 1.1em;

      @include screen-size('small') {
        width: 90%;
        margin-left: 0;
        left: 5%;
      }
      
      .text {
        float: left;
      }

      .close {
        float: right;
        height: 28px;
        width: 28px;
      }
    }
  </style>
  
  <div class="alert">
    <div class='text'>IMPORTANT INFORMATION: At the moment the venue at Kyrkogatan 26 is closed, please check the program for status about the single events and possibilities to take part in them.</div>
  </div>
  