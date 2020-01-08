<template>
  <div>
    <v-row class="justify-center">
      <v-col class="col-sm-4 col-md-4 col-lg-3">
        <div class="white sign-in-block">
          <ValidationObserver
            class="d-flex flex-column"
            ref="form"
            v-slot="{ invalid, validated, passes, validate }"
          >
            <ValidationProvider
              ref="email"
              name="email"
              rules="required|email"
              v-slot="{ errors, valid }"
            >
              <v-text-field
                height="36px"
                label="Email"
                type="email"
                v-model="email"
                :success="valid"
                required
                filled
                rounded
                dense
                :error-messages="[...errors, ...customEmailErrors]"
                @keyup="validateEmailUnique()"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              ref="password"
              name="password"
              rules="required"
              v-slot="{ errors, valid }"
            >
              <v-text-field
                height="36px"
                ref="passwordField"
                class="v-input-custom"
                label="Password"
                filled
                rounded
                dense
                v-model="password"
                :error-messages="[...errors, ...customPasswordErrors]"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                :success="valid"
                required
              ></v-text-field>
            </ValidationProvider>
            <v-btn
              rounded
              color="primary"
              elevation="0"
              @click="passes(submit)"
              class="no-hover-btn text-capitalize"
              height="48px"
              :disabled="invalid || !validated"
            >Sign In</v-btn>
          </ValidationObserver>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="primary--text text-center">
          Don’t have an account yet?
          <br />
          <a @click="$emit('setStep')" class="underline">Sign Up</a>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import axios from "axios";
import AppUser from "../models/user";
import { VeeObserver } from "vee-validate/dist/types/types";
import CryptoJS from "crypto-js";

@Component({
  components: {
    ValidationObserver,
    ValidationProvider
  }
})
export default class SignIn extends Vue {
  email: string = "";
  password: string = "";
  showPassword: boolean = false;
  customEmailErrors: string[] = [];
  customPasswordErrors: string[] = [];
  keyUpTimer: number = 0;

  submit() {
    let users: AppUser[] = this.$store.getters.getFakeData;

    let u = users.find(el => {
      if (el.email === this.email) {
        return true;
      }
      return false;
    });
    if (u) {
      if (
        u.password ===
        CryptoJS.HmacSHA1(this.password, "best-ever-key").toString()
      ) {
        this.$store.dispatch("SetUser", u);
        this.$store.dispatch("SetStep", 4);
      } else {
        this.customPasswordErrors.push(
          "Wrong auth pair. Have you forgot your password?"
        );

        setTimeout(() => {
          let f = this.$refs.passwordField as any;
          this.password = "";
          f.reset();
          this.customPasswordErrors.pop();
        }, 2000);
      }
    } else {
      this.customEmailErrors.push(
        "There is no account with this email yet. Try to sign up"
      );
      setTimeout(() => {
        let f = this.$refs.form as any;
        this.email = "";
        this.password = "";
        f.reset();
        this.customEmailErrors.pop();
      }, 2000);
    }
  }

  validateEmailUnique() {}
}
</script>

<style scoped lang="scss">
.sign-in-block {
  border-radius: 40px;
  padding: 16px;
}
.underline {
  text-decoration: underline;
}
.no-hover-btn {
  margin: 21px 0 0;
}
.no-hover-btn:hover:before,
.no-focus-btn:focus::before {
  opacity: 0 !important;
}
.v-text-field.v-text-field--enclosed.v-input-custom {
  margin-top: 21px;
}
</style>