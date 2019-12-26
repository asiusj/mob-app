<template>
  <v-container fill-height class="align-start">
    <v-row no-gutters>
      <v-col>
        <v-row>
          <v-col class="d-flex justify-center">
            <h3 class="text-center greetings-h3">{{ currentTitle }}</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-window v-model="step">
              <v-window-item :value="1">
                <div
                  class="caption grey--text text--darken-1 text-center"
                >Bring your media to the next level!</div>
                <v-row class="justify-center">
                  <v-col class="col-sm-4 col-md-4 col-lg-2 d-flex justify-space-around">
                    <v-btn rounded color="third" elevation="0" class="no-hover-btn">Sign Up</v-btn>
                    <v-btn color="primary" elevation="0" fab small dark>
                      <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-window-item>

              <v-window-item :value="2">
                <v-card-text>
                  <v-text-field label="Password" type="password"></v-text-field>
                  <v-text-field label="Confirm Password" type="password"></v-text-field>
                  <span
                    class="caption grey--text text--darken-1"
                  >Please enter a password for your account</span>
                </v-card-text>
              </v-window-item>

              <v-window-item :value="3">
                <div class="pa-4 text-center">
                  <v-img
                    class="mb-4"
                    contain
                    height="128"
                    src="https://cdn.vuetifyjs.com/images/logos/v.svg"
                  ></v-img>
                  <h3 class="title font-weight-light mb-2">Welcome to Vuetify</h3>
                  <span class="caption grey--text">Thanks for signing up!</span>
                </div>
              </v-window-item>

              <v-window-item :value="4">
                <div class="pa-4 text-center">
                  <v-img
                    class="mb-4"
                    contain
                    height="128"
                    src="https://cdn.vuetifyjs.com/images/logos/v.svg"
                  ></v-img>
                  <h3 class="title font-weight-light mb-2">Welcome to Vuetify</h3>
                  <span class="caption grey--text">Thanks for signing up!</span>
                </div>
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>

        <!-- <v-divider></v-divider>

        <v-card-actions>
          <v-btn :disabled="step === 1" text @click="step--">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="step === 4" color="primary" depressed @click="step++">Next</v-btn>
        </v-card-actions> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppUser from "../models/user";
// import { mdiArrowRight } from "@mdi/js";

@Component
export default class GreetingsPage extends Vue {
  step = 1;

  get currentTitle(): string {
    switch (this.step) {
      case 1:
        return "Ready for a great User experience?";
      case 2:
        return "Sign Up";
      case 3:
        return "Sign In";
      default:
        return `Hello, ${this.user.name}`;
    }
  }

  get user(): AppUser {
    return this.$store.getters.getUser;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.greetings-h3 {
  max-width: 190px;
}
</style>
