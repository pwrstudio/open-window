<script>
  // # # # # # # # # # # # # #
  //
  //  OPEN WINDOW
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { Router, Route } from "svelte-routing"

  // ROUTES
  import Main from "./Main.svelte"
</script>

<style lang="scss" global>
  * {
    box-sizing: border-box;
  }
</style>

<main>
  <Router>
    <Route path="/*" component={Main} />
  </Router>
</main>
