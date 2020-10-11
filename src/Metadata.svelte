<script>
  // # # # # # # # # # # # # #
  //
  //  METADATA
  //
  // # # # # # # # # # # # # #
  // _lodash
  import get from "lodash/get"
  import has from "lodash/has"
  import isArray from "lodash/isArray"
  import isEmpty from "lodash/isEmpty"
  import truncate from "lodash/truncate"

  // *** STORES
  import { toPlainText, urlFor } from "./sanity.js"

  // *** PROPS
  export let post = {}

  console.dir(post)

  const stripHtml = html => {
    let tmp = document.createElement("DIV")
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ""
  }

  const DEFAULT_DESCRIPTION =
    "Welcome to Open Window – a platform to share what we do within design at HDK-Valand."
  const DEFAULT_IMAGE = "https://openwindow.se/sky.jpg"

  let title = ""
  let description = ""
  let image = ""

  $: {
    title =
      (has(post, "title") && !isEmpty(post.title)
        ? stripHtml(post.title) + " | "
        : "") + "Open Window"
  }

  $: {
    description =
      has(post, "content.content") &&
      isArray(post.content.content) &&
      !isEmpty(post.content.content)
        ? truncate(toPlainText(post.content.content), {
            length: 160,
            separator: /.? +/,
          })
        : DEFAULT_DESCRIPTION
  }

  $: {
    image =
      has(post, "mainImage") && post.mainImage
        ? urlFor(post.mainImage).quality(80).height(800).width(600).url()
        : DEFAULT_IMAGE
  }
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta property="twitter:title" content={title} />
  <meta property="description" content={description} />
  <meta property="og:description" content={description} />
  <meta property="twitter:description" content={description} />
  <meta property="image" content={image} />
  <meta property="og:image" content={image} />
  <meta property="twitter:image" content={image} />
</svelte:head>
