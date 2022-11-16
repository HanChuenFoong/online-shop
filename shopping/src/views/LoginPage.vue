<template>
  <v-sheet class="blue-grey lighten-3">
    <v-container>
      <v-row class="justify-content-center">
        <v-col cols="12">
          <v-subheader></v-subheader>
          <v-card
            class="pa-2"
            style="
              background: rgba(117, 117, 117, 0.3);
              box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
              backdrop-filter: blur(7px);
              -webkit-backdrop-filter: blur(7px);
              border-radius: 10px;
              border: 1px solid rgba(255, 255, 255, 0.18);
            "
            max-width="400"
            elevation="5"
            :loading="signingIn"
            :disabled="signingIn"
          >
            <v-scroll-x-transition hide-on-leave>
              <div v-if="!creating">
                <v-card-title class="justify-center">Log In Here</v-card-title>
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
                  <div class="ml-1 mt-2">
                    <span class="text-subtitle-1">New here?</span>
                    <v-btn text color="teal" class="mb-1" @click="createAccount"
                      >Register</v-btn
                    >
                  </div>
                </v-card-text>
                <v-subheader></v-subheader>
                <v-card-actions>
                  <v-btn color="primary" text block @click="signIn"
                    >Sign In</v-btn
                  >
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
                    v-model="selected.birthdate"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
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
                  <v-btn color="green darken-3" text @click="addAccount"
                    >Create</v-btn
                  >
                </v-card-actions>
              </div>
            </v-scroll-x-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import { useShoeStore } from "../stores/ItemStore";
export default {
  name: "LoginPage",
  setup() {
    const shoeStore = useShoeStore();
    return { shoeStore };
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
      },
      activePicker: null,
      date: null,
      menu: false,
    };
  },
  computed: {},
  methods: {
    signIn() {
      this.signingIn = true;
    },
    createAccount() {
      this.creating = true;
    },
    save(date) {
      this.$refs.birthdate.save(date);
    },
    cancelCreate() {
      this.creating = false;
      // reset result
    },
    async addAccount() {
      console.log(this.shoeStore.name);
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
};
</script>