<template>
  <div>
    <v-dialog :value="dialog" max-width="400" persistent hide-overlay>
      <v-card
        class="pa-2"
        max-width="400"
        style="background: rgba( 255, 255, 255, 0.75 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 17.5px );
        -webkit-backdrop-filter: blur( 18.0px );
        border-radius: 10px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );"
        elevation="5"
        :loading="signingIn"
        :disabled="signingIn"
      >
        <v-scroll-x-transition hide-on-leave>
          <div v-if="!creating">
            <v-card-title class="justify-center">Log In</v-card-title>
            <v-subheader></v-subheader>
            <v-card-text class="mt-3">
              <v-text-field
                v-model="selected.email"
                outlined
                rounded
                label="Email Address"
                prepend-icon="mdi-account-outline"
                :rules="[rules.required, rules.email]"
              ></v-text-field>
              <v-text-field
                v-model="selected.password"
                outlined
                rounded
                label="Password"
                prepend-icon="mdi-lock-outline"
                :rules="[rules.counter]"
              ></v-text-field>
              <div class="ml-1 mt-2 text-center">
                <span class="text-subtitle-1">First time here?</span>
                <v-btn text color="teal lighten-1" class="mb-1" @click="createAccount"
                  >Register</v-btn
                >
              </div>
            </v-card-text>
            <v-subheader></v-subheader>
            <v-card-actions>
              <v-btn color="black" text @click="cancelSignIn">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary darken-1" text @click="signIn">Sign In</v-btn>
            </v-card-actions>
          </div>
        </v-scroll-x-transition>
        <v-scroll-x-transition hide-on-leave>
          <div v-if="creating">
            <v-card-title class="justify-center">Sign Up</v-card-title>
            <v-subheader></v-subheader>
            <v-card-text class="mt-3 pa-2">
              <v-text-field
                v-model="selected.name"
                outlined
                rounded
                label="Name"
                prepend-icon="mdi-account-outline"
                :rules="[rules.required]"
              ></v-text-field>
              <v-menu
                ref="birthdate"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Birth Date"
                    outlined
                    rounded
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  :active-picker.sync="activePicker"
                  :max="
                    new Date(
                      Date.now() - new Date().getTimezoneOffset() * 60000
                    )
                      .toISOString()
                      .substr(0, 10)
                  "
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
              <v-text-field
                v-model="selected.email"
                outlined
                rounded
                label="Email Address"
                prepend-icon="mdi-email-outline"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="selected.password"
                outlined
                rounded
                label="Password"
                prepend-icon="mdi-lock-outline"
                :rules="[rules.counter]"
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="mt-3">
              <v-btn color="black" text @click="cancelCreate">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary darken-1" text @click="addAccount">Create</v-btn>
            </v-card-actions>
          </div>
        </v-scroll-x-transition>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useShoeStore } from "../stores/ItemStore";
import { auth } from "../firebase/config.js";

export default {
  name: "LoginPage",
  setup() {
    const shoeStore = useShoeStore();
    return { shoeStore };
  },
  props: {
    dialog: Boolean,
  },
  data() {
    return {
      signingIn: false,
      creating: false,
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) =>
          (!!value && value.length > 8) ||
          "Password must have at least 8 letters",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      selected: {
        name: "",
        birthdate: "",
        email: "",
        password: "",
        cart: [],
      },
      activePicker: null,
      date: null,
      menu: false,
    };
  },
  computed: {
    profileData() {
      return this.shoeStore.profile;
    },
  },
  methods: {
    createAccount() {
      this.creating = true;
    },
    save(date) {
      this.$refs.birthdate.save(date);
    },
    cancelCreate() {
      this.creating = false;
    },
    cancelSignIn() {
      this.$emit("cancel");
    },
    async addAccount() {
      this.signingIn = true;
      try {
        let r = await createUserWithEmailAndPassword(
          auth,
          this.selected.email,
          this.selected.password
        );
        if (!r) throw new Error("Failed to make account");
        this.selected.uid = r.user.uid;
        this.selected.birthdate = this.date;
        delete this.selected.password;
        await this.shoeStore.createAccount(this.selected);
        this.shoeStore.isLoggedIn = Boolean(auth.currentUser)
        this.cancelSignIn()
        this.signingIn = false;
      } catch (err) {
        console.log("Creating account failed");
        this.signingIn = false;
      }
    },
    async signIn() {
      this.signingIn = true;
      try {
        let r = await signInWithEmailAndPassword(
          auth,
          this.selected.email,
          this.selected.password
        );
        if (r) await this.shoeStore.getProfile(r.user.uid)
        this.shoeStore.isLoggedIn = Boolean(auth.currentUser)
        this.cancelSignIn()
        this.signingIn = false;
      } catch (err) {
        console.log("Failed to sign in");
        this.signingIn = false;
      }
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
};
</script>