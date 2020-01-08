<template>
  <v-container
    fill-height
    class="align-start greetings-container"
    :class="[step == 1 ? 'greetings-bg-1' : '', step == 4 ? 'greetings-bg-2' : '']"
  >
    <v-row no-gutters>
      <v-col>
        <v-row>
          <v-col class="d-flex justify-center">
            <h3 class="text-center greetings-h3">{{ currentTitle }}</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-window v-model="step" touchless="true">
              <v-window-item :value="1">
                <div
                  class="caption grey--text text--darken-1 text-center"
                >Bring your media to the next level!</div>
                <v-row class="justify-center">
                  <v-col class="col-sm-4 col-md-4 col-lg-3 col-xl-2 d-flex justify-space-around">
                    <v-btn
                      rounded
                      color="third"
                      elevation="0"
                      @click="setStep(2)"
                      class="no-hover-btn text-capitalize"
                      height="48px"
                    >Sign Up</v-btn>
                    <v-btn
                      color="primary"
                      class="no-focus-btn"
                      @click="setStep(3)"
                      elevation="0"
                      fab
                      small
                      height="48px"
                      width="48px"
                      title="Sign In"
                    >
                      <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-window-item>

              <v-window-item :value="2">
                <SignUp @setStep="setStep(3)" />
              </v-window-item>

              <v-window-item :value="3">
                <SignIn @setStep="setStep(2)" />
              </v-window-item>

              <v-window-item :value="4" class="container fill-height">
                <v-container>
                  <v-row>
                    <v-col class="d-flex justify-center pt-12">
                      <v-btn
                        v-if="user.id > 0"
                        to="/home"
                        color="primary"
                        class="no-focus-btn text-capitalize"
                      >Get Started</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppUser from "../models/user";
import SignUp from "@/components/sign-up.vue";
import SignIn from "@/components/sign-in.vue";
import axios from "axios";

@Component({
  components: {
    SignUp,
    SignIn
  },
  created() {
    axios.get("fake-data.json").then(response => {
      this.$store.dispatch("SetFakeData", response.data.users);
    });
  }
})
export default class GreetingsPage extends Vue {
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
  setStep(step: number) {
    this.$store.dispatch("SetStep", step);
  }

  get step(): number {
    return this.$store.getters.getStep;
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
.greetings-container {
  background-position: bottom;
  background-size: 100% 65%;
}
.greetings-bg-1 {
  background-image: url("../assets/woman.svg");
}
.greetings-bg-2 {
  background-image: url("../assets/woman3.svg");
}
.underline {
  text-decoration: underline;
}

.no-hover-btn:hover:before,
.no-focus-btn:focus::before {
  opacity: 0 !important;
}
</style>
