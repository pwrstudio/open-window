<script>
  // # # # # # # # # # # # # #
  //
  //  INFOBAR
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { links } from "svelte-routing"
  import get from "lodash/get"
  import { formatDistance } from "date-fns"
  import MediaQuery from "svelte-media-query"

  //   *** PROPS
  export let nextEvent = false
  export let currentStream = false

  let timeTilNext = ""

  $: {
    setInterval(() => {
      if (nextEvent) {
        const now = Date.now()
        timeTilNext = formatDistance(
          Date.parse(nextEvent.date + " " + nextEvent.startTime),
          now,
          { addSuffix: true, includeSeconds: true }
        )
      }
    })
  }
</script>

<style lang="scss">
  @import "../variables.scss";

  .infobar {
    font-family: $sans-stack;
    font-size: $font-size-small;
    background: $green;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    user-select: none;
    line-height: 1em;

    a {
      display: block;
    }

    @include screen-size("small") {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
</style>

<div class="infobar" use:links>
  <!-- <MediaQuery query="(min-width: 800px)" let:matches>
    {#if matches}
      <span>IMPORTANT: At the moment the venue at Kyrkogatan 26 is closed, please check the program for status about the single events and possibilities to take part in them.</span>
    {:else}
      <span>IMPORTANT: The venue at Kyrkogatan 26 is currently closed.</span>
    {/if}
  </MediaQuery> -->
 {#if currentStream}
    <a
      href={'/program/' + currentStream.date + '/' + get(currentStream, 'slug.current')}>LIVE:
      {currentStream.title}</a>
  {/if}
  {#if nextEvent}
    <a
      href={'/program/' + nextEvent.date + '/' + get(nextEvent, 'slug.current')}>NEXT:
      {nextEvent.title}</a>
    <div>{timeTilNext}</div>
  {/if}
</div>
