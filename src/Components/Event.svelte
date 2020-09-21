<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE EVENT
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { Router, Route, links, navigate } from "svelte-routing"
  import get from "lodash/get"
  import { renderBlockText, urlFor } from "../sanity"

  // *** COMPONENTS
  import Tag from "./Tag.svelte"

  // *** GRAPHICS
  import LiveIcon from "./Graphics/LiveIcon.svelte"

  // *** GLOBAL
  import { formattedDate } from "../global.js"
  import About from "./About.svelte"

  // *** PROPS
  export let event = []
</script>

<style lang="scss">
  @import "../variables.scss";

  .event-container {
    padding: 15px;
    padding-top: 140px;
    padding-bottom: 40px;
    height: 100vh;
    overflow-y: scroll;

    @include hide-scroll;

    .image {
      margin-bottom: 20px;
      img {
        max-width: 100%;
        max-height: 500px;
      }
    }

    .header {
      width: 100%;
      // background: yellow;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      .text {
        font-family: $serif-stack;
        font-size: $font-size-medium;
        width: calc(100% - 60px);
        padding-right: 10px;
        // background: red;
        transform: scaleY(1.14);

        .title {
        }
        .participant {
          a {
            display: block;
            color: $black;
            text-decoration: none;
            &:hover {
              background-image: linear-gradient(
                to right,
                rgb(163, 255, 0) 0%,
                rgb(255, 255, 0) 75%,
                rgb(255, 0, 0) 100%
              );
              background-size: 100%;
              background-repeat: repeat;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              -moz-background-clip: text;
              -moz-text-fill-color: transparent;
            }
          }
        }
        .time {
        }
      }
      .live-icon {
        // background: green;
        height: 32px;
      }
    }

    .content {
      font-family: $sans-stack;
      font-size: $font-size-normal;
    }

    .tag-container {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      margin-bottom: 20px;
      margin-top: 20px;
    }
  }
</style>

<div class="event-container">
  {#if event.mainImage}
    <div class="image">
      <img
        src={urlFor(event.mainImage)
          .width(800)
          .quality(90)
          .auto('format')
          .url()} />
    </div>
  {/if}
  <div class="header">
    <div class="text">
      <div class="title">{event.title}</div>
      <div class="participant">
        {#if event.participants && Array.isArray(event.participants)}
          {#each event.participants as participant, index (participant._id)}
            <a href={participant.slug.current}>{participant.name}</a>
          {/each}
        {/if}
      </div>
      <div class="time">
        {formattedDate(event.date)}
        {event.startTime}–{event.endTime}
      </div>
    </div>
    <div class="live-icon">
      <LiveIcon />
    </div>
  </div>
  <div class="content">
    {#if get(event, 'content.content', false) && Array.isArray(event.content.content)}
      {@html renderBlockText(event.content.content)}
    {/if}
  </div>
  <div class="tag-container">
    {#if event.tags && Array.isArray(event.tags)}
      {#each event.tags as tag}
        <Tag title={tag} />
      {/each}
    {/if}
  </div>
</div>
