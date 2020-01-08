<template>
  <div>
    <v-row class="justify-center">
      <v-col class="col-sm-4 col-md-4 col-lg-3">
        <div class="d-flex flex-column white sign-up-block">
          <ValidationObserver
            class="d-flex flex-column"
            ref="obs"
            v-slot="{ invalid, validated, passes, validate }"
          >
            <ValidationProvider
              ref="name"
              name="name"
              rules="required|max:16"
              v-slot="{ errors, valid }"
            >
              <v-text-field
                height="36px"
                :counter="16"
                label="Full name"
                type="text"
                filled
                rounded
                dense
                v-model="name"
                :success="valid"
                :error-messages="errors"
                required
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              ref="email"
              name="email"
              rules="required|email"
              v-slot="{ errors, valid }"
            >
              <v-text-field
                height="36px"
                class="v-input-custom"
                label="Email"
                type="email"
                v-model="email"
                :success="valid"
                :error-messages="[...errors, ...customEmailErrors]"
                required
                filled
                rounded
                dense
                @keyup="validateEmailUnique()"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              ref="password"
              name="password"
              :rules="{ required: true, min: 8, regex: /^(.*)[A-Z]{2}(.*)[-?#$%&=]{1}(.*)$/ }"
              v-slot="{ errors, valid }"
            >
              <v-text-field
                height="36px"
                label="Password"
                :counter="''"
                class="v-input-custom"
                ref="passwordField"
                v-model="password"
                :success="valid"
                :error-messages="errors"
                required
                filled
                rounded
                dense
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              ref="password"
              name="password"
              :rules="{required: true, is: password}"
              v-slot="{ errors, valid }"
            >
              <v-text-field
                height="36px"
                class="v-input-custom"
                label="Repeat password"
                v-model="confirmPassword"
                :success="valid"
                :error-messages="errors"
                required
                filled
                rounded
                dense
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showConfirmPassword ? 'text' : 'password'"
                @click:append="showConfirmPassword = !showConfirmPassword"
              ></v-text-field>
            </ValidationProvider>
            <v-btn
              rounded
              color="primary"
              elevation="0"
              @click="passes(submit)"
              class="no-hover-btn text-capitalize"
              :disabled="invalid || !validated"
              height="48px"
            >Sign Up</v-btn>
          </ValidationObserver>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="main-color text-center">
          Already have an account?
          <br />
          <a @click="$emit('setStep')" class="underline">Sign In</a>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import AppUser from "../models/user";
import axios from "axios";
import CryptoJS from "crypto-js";

//QWE333221?
//GodsAndMonsters$

@Component({
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mounted() {}
})
export default class SignUp extends Vue {
  name: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  keyUpTimer: number = 0;
  customEmailErrors: string[] = [];
  submit() {
    let role = 1;
    let user = new AppUser(
      Math.floor(2 + Math.random() * 10000),
      this.name,
      this.email,
      role,
      CryptoJS.HmacSHA1(this.password, "best-ever-key").toString()
    );
    this.validateEmailUnique();
    this.$store.dispatch("CreateNewUser", user);
  }

  validateEmailUnique() {
    clearTimeout(this.keyUpTimer);
    this.keyUpTimer = setTimeout(() => {
      let users: AppUser[] = this.$store.getters.getFakeData;

      if (
        users.find(el => {
          if (el.email === this.email) {
            return true;
          }
          return false;
        })
      ) {
        this.customEmailErrors.push("This email already exists");
      } else {
        this.customEmailErrors.pop();
      }
    }, 300);
  }
}
</script>

<style scoped lang="scss">
.sign-up-block {
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
