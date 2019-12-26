<template>
  <v-app>
    <v-content>
      <GreetingsPage />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import GreetingsPage from "@/components/greetings-page.vue";

export default Vue.extend({
  name: "App",

  components: {
    GreetingsPage
  },

  data: () => ({
    //
  })
});
</script>

<style lang="scss" scoped>
// .v-content {
//   background-image: url("./assets/woman.svg");
// }
</style>
