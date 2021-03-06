<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE EVENT
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { links } from "svelte-routing"
  import get from "lodash/get"
  import { loadData, renderBlockText, urlFor } from "../sanity"

  import { isWithinInterval } from "date-fns"

  // *** COMPONENTS
  import Tag from "./Tag.svelte"
  import Link from "./Link.svelte"
  import Metadata from "../Metadata.svelte"
  import EmbedBlock from "./Blocks/EmbedResponsive.svelte"

  // *** GRAPHICS
  import LiveIcon from "./Graphics/LiveIcon.svelte"

  // *** GLOBAL
  import { QUERY, formattedDate } from "../global.js"
  import { document } from "lodash/_freeGlobal"

  let imgEl = {}
  let loaded = true

  // *** PROPS
  export let slug = []
  let now = Date.now()
  let oldSlug = ""
  let islive = false
  let isArchived = false
  let event = {}

  $: {
    if (slug !== oldSlug) {
      loaded = false
      event = {}
      loadData(QUERY.SINGLE, { slug: slug })
        .then(res => {
          // __ Check if event is live
          now = Date.now()
          event = res.find(e => e._type === "event")
          if (event) {
            const startPoint = Date.parse(event.date + " " + event.startTime)
            const endPoint = Date.parse(event.date + " " + event.endTime)
            islive = isWithinInterval(now, {
              start: startPoint,
              end: endPoint,
            })
            // __ Scroll to top
            const eventContainer = document.querySelector(".event-container")
            eventContainer ? eventContainer.scrollTo(0, 0) : null
          }

          const archive = res.find(e => e._id === "archive")
          if (archive && archive.archivedEvents) {
            isArchived = archive.archivedEvents.find(e => e._ref === event._id)
          }
        })
        .catch(err => {
          console.dir(err)
        })
      oldSlug = slug
    }
  }
</script>

<style lang="scss">
  @import "../variables.scss";

  .event-container {
    padding: 15px;
    height: 100vh;
    overflow-y: scroll;
    padding-bottom: 160px;

    @include screen-size("small") {
      padding: 0;
      margin: 15px;
      margin-top: 90px;
      border-top: 1px solid black;
      padding-top: 30px;
      padding-bottom: 160px;
    }

    @include hide-scroll;

    .image {
      margin-bottom: 20px;
      min-height: 200px;
      img {
        max-width: 100%;
        max-height: 500px;
      }
    }

    .video {
      margin-bottom: 20px;
      width: 100%;
    }

    .header {
      width: 100%;
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

      @include screen-size("small") {
        width: auto;
        float: right;
      }
    }
  }

  .link-container {
    display: inline-block;
    margin-bottom: 10px;
  }
</style>

<div class="event-container" use:links>
  {#if event && event.title}
    <!-- METADATA -->
    <Metadata post={event} />
    <!-- IMAGE -->
    {#if isArchived && event.streamId}
      <EmbedBlock image={event.mainImage} url={event.streamId} />
    {:else if event.mainImage}
      <div class="image">
        <img
          bind:this={imgEl}
          alt={event.title}
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
                <a
                  href={participant.link}
                  class="participant"
                  target="_blank">{participant.name}</a>
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
      {#if islive}
        <a href="/" class="live-icon">
          <LiveIcon />
        </a>
      {/if}
    </div>
    <!-- TEXT -->
    <div class="content">
      {#if get(event, 'content.content', false) && Array.isArray(event.content.content)}
        {@html renderBlockText(event.content.content)}
      {/if}
    </div>
    <!-- LINKS-->
    {#if event.links && Array.isArray(event.links)}
      <div class="link-container">
        {#each event.links as link}
          <Link {link} />
        {/each}
      </div>
    {/if}
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
