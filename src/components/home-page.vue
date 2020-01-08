<template>
  <v-container class="fill-height">
    <v-row>
      <v-col>
        <span class="calm">The best ever app...</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppUser from "../models/user";

@Component
export default class HomePage extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.calm {
    color: var(--v-info-base);
}
</style>
