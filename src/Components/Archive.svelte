<script>
  // # # # # # # # # # # # # #
  //
  //  ARCHIVE
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { slide } from "svelte/transition"
  import { Router, Route, links } from "svelte-routing"

  // *** COMPONENTS
  import Slideshow from "./Slideshow.svelte"
  import Tag from "./Tag.svelte"

  // *** GRAPHICS
  import X from "./Graphics/X.svelte"

  let events = [
    {
      time: "09.00–10.15",
      title: "XYZ Knitting or Searching for Mary",
      slug: "test-event",
      participant: "Märta Louise Karlsson",
      location: "Design School",
    },
    {
      time: "09.00–10.15",
      title: "XYZ Knitting or Searching for Mary",
      slug: "test-event",
      participant: "Märta Louise Karlsson",
      location: "Design School",
    },
    {
      time: "09.00–10.15",
      title: "XYZ Knitting or Searching for Mary",
      slug: "test-event",
      participant: "Märta Louise Karlsson",
      location: "Design School",
    },
    {
      time: "09.00–10.15",
      title: "XYZ Knitting or Searching for Mary",
      slug: "test-event",
      participant: "Märta Louise Karlsson",
      location: "Design School",
    },
    {
      time: "09.00–10.15",
      title: "XYZ Knitting or Searching for Mary",
      slug: "test-event",
      participant: "Märta Louise Karlsson",
      location: "Design School",
    },
    {
      time: "09.00–10.15",
      title: "XYZ Knitting or Searching for Mary",
      slug: "test-event",
      participant: "Märta Louise Karlsson",
      location: "Design School",
    },
  ]
</script>

<style lang="scss">
  @import "../variables.scss";

  .archive {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    background: $white;
    padding: 15px;
    padding-top: 80px;

    .close {
      position: absolute;
      top: 10px;
      right: 15px;
      cursor: pointer;
      // background: red;
      transition: transform 0.3s ease-out;

      &:hover {
        transform: scale(1.1);
      }
    }

    .header {
      position: absolute;
      top: 10px;
      left: 0;
      width: 100vw;
      display: flex;
      justify-content: center;
      // background: red;

      img {
        display: block;
        height: 28px;
      }
    }

    .tag-container {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }

    .grid {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: calc(25% - 10px);
        margin-right: 10px;
        margin-bottom: 10px;
        height: 200px;
        position: relative;

        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        .overlay {
          font-family: $sans-stack;
          font-size: $font-size-medium;
          text-align: center;
          padding: 10px;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: $green-transparent;
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          color: $black;
          text-decoration: none;
          &:hover {
            opacity: 1;
          }
        }
      }
    }

    @include screen-size("small") {
      //   padding-bottom: 40px;
    }
  }
</style>

<Router>
  <div class="archive" use:links transition:slide>
    <a class="close" href="/"><X /></a>
    <div class="header"><img src="/img/archive.svg" alt="Program" /></div>
    <div class="tag-container">
      <Tag title="Test" />
      <Tag title="Test" />
      <Tag title="Open Lecture" />
      <Tag title="HDK" />
      <Tag title="Performance" />
      <Tag title="Test" />
    </div>
    <div class="grid">
      {#each events as event}
        <div class="item">
          <img src="/img/test.jpg" />
          <a href={'/archive/' + event.slug} class="overlay">
            <div>{event.title}<br />{event.participant}</div>
          </a>
        </div>
      {/each}
    </div>
    <Route path=":slug" component={Slideshow} />
  </div>
</Router>
