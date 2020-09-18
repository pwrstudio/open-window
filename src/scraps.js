// WRITABLE
// const UI = { state: false, slug: false, errorMessage: false }
// const setUIState = (newState, newSlug = false, errorMessage = false) => {
//   switch (newState) {
//     case STATE.READY:
//       UI.state = STATE.READY
//       UI.slug = false
//       history.pushState({}, "", "/")
//       break
//     case STATE.PROGRAM_WEEK:
//       UI.state = STATE.PROGRAM_WEEK
//       UI.slug = false
//       history.pushState({}, "", "/program/")
//       break
//     case STATE.PROGRAM_DAY:
//       UI.state = STATE.PROGRAM_DAY
//       UI.slug = newSlug
//       history.pushState({}, "", "/program/" + UI.slug)
//       break
//     case STATE.PROGRAM_EVENT:
//       UI.state = STATE.PROGRAM_EVENT
//       UI.slug = newSlug
//       history.pushState({}, "", "/program/" + UI.slug)
//       break
//     case STATE.ARCHIVE:
//       UI.state = STATE.ARCHIVE
//       UI.slug = false
//       history.pushState({}, "", "/archive/")
//       break
//     case STATE.ARCHIVE_EVENT:
//       UI.state = STATE.ARCHIVE_EVENT
//       UI.slug = newSlug
//       history.pushState({}, "", "/archive/" + UI.slug)
//       break
//     case STATE.ABOUT:
//       UI.state = STATE.ABOUT
//       UI.slug = false
//       history.pushState({}, "", "/about/")
//       break
//     case STATE.ABOUT_PAGE:
//       UI.state = STATE.ABOUT_PAGE
//       UI.slug = newSlug
//       history.pushState({}, "", "/about/" + UI.slug)
//       break
//     default:
//       UI.state = STATE.ERROR
//       UI.slug = false
//       UI.errorMessage = errorMessage
//       history.pushState({}, "", "/error/")
//   }
// }

// $: {
//   console.log("STATE: ", UI.state)
// }

// $: {
//   if (section || slug) {
//     urlParamsToState()
//   }
// }

// Load data
// let projectPost = false
// let authorPost = false
// let projects = []
// let authors = []
// let metaPost = false
let posts = loadData(QUERY.ALL)

export const STATE = {
  ERROR: 0,
  READY: 1,
  PROGRAM_WEEK: 2,
  PROGRAM_DAY: 3,
  PROGRAM_EVENT: 4,
  ARCHIVE: 5,
  ARCHIVE_EVENT: 6,
  ABOUT: 7,
  ABOUT_PAGE: 8,
}

// const urlParamsToState = () => {
//   console.log("URL TO PARAMS !!!")
//   switch (section) {
//     case "program":
//       slug
//         ? setUIState(STATE.PROGRAM_EVENT, slug)
//         : setUIState(STATE.PROGRAM_WEEK)
//       break
//     case "about":
//       slug ? setUIState(STATE.ABOUT_PAGE, slug) : setUIState(STATE.ABOUT)
//       break
//     case "archive":
//       slug ? setUIState(STATE.ARCHIVE_EVENT, slug) : setUIState(STATE.ARCHIVE)
//       break
//     default:
//       setUIState(STATE.READY)
//   }
// }
