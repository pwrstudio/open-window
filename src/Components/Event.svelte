<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE EVENT
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { Router, Route, links, navigate } from "svelte-routing"
  import get from "lodash/get"
  import { loadData, renderBlockText, urlFor } from "../sanity"

  // *** COMPONENTS
  import Tag from "./Tag.svelte"
  import Link from "./Link.svelte"

  // *** GRAPHICS
  import LiveIcon from "./Graphics/LiveIcon.svelte"

  // *** GLOBAL
  import { QUERY, formattedDate } from "../global.js"

  // *** PROPS
  export let slug = []

  let event = {}
  $: {
    console.log(slug)
    loadData(QUERY.SINGLE, { slug: slug }).then((res) => {
      console.dir(res)
      event = res
    })
  }
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
  {#if event && event.title}
    <!-- IMAGE -->
    {#if event.mainImage}
    <div class="image">
      <img
        src={urlFor(event.mainImage)
          .width(600)
          .quality(90)
          .auto('format')
          .url()} />
    </div>
  {/if}
    <!-- HEADER -->
    <div class="header">
    <div class="text">
      <!-- TITLE -->
      <div class="title">{event.title}</div>
      <!-- PARTICIPANTS -->
      <div class="participant">
        {#if event.participants && Array.isArray(event.participants)}
          {#each event.participants as participant (participant._id)}
            {#if participant.link}
              <a href={participant.link} class="participant" target="_blank">{participant.name}</a>
            {:else}
              <div class="participant">{participant.name}</div>
            {/if}
          {/each}
        {/if}
      </div>
      <!-- DATE -->
      <div class="time">
        {formattedDate(event.date)}
        {event.startTime}–{event.endTime}
      </div>
    </div>
    <div class="live-icon">
      <LiveIcon />
    </div>
  </div>
    <!-- TEXT -->
    <div class="content">
    {#if get(event, 'content.content', false) && Array.isArray(event.content.content)}
      {@html renderBlockText(event.content.content)}
    {/if}
  </div>
    <!-- LINKS-->
    <div class="link-container">
    {#if event.links && Array.isArray(event.links)}
      {#each event.links as link}
        <Link {link} />
      {/each}
    {/if}
  </div>
    <!-- TAGS -->
    <div class="tag-container">
    {#if event.tags && Array.isArray(event.tags)}
      {#each event.tags as tag}
        <Tag title={tag} link={true} />
      {/each}
    {/if}
  </div>
  {/if}
</div>
