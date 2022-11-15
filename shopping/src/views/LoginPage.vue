<template>
  <v-sheet>
    <v-container>
      <v-row class="justify-content-center">
        <v-col cols="12">
          <v-subheader></v-subheader>
          <v-card
            max-width="400"
            elevation="3"
            :loading="signingIn"
            :disabled="signingIn"
          >
            <div v-if="!creating">
              <v-card-title class="justify-center">Log In Here</v-card-title>
              <v-subheader></v-subheader>
              <v-card-text class="mt-3">
                <v-text-field
                  v-model="selected.email"
                  outlined
                  rounded
                  label="Email Address"
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
                <v-text-field
                  v-model="selected.password"
                  outlined
                  rounded
                  label="Password"
                  :rules="[rules.counter]"
                ></v-text-field>
                <div class="ml-4">
                  <span class="text-subtitle-1">New here?</span>
                  <v-btn text color="teal" outlined @click="createAccount"
                    >Create Account</v-btn
                  >
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" text block @click="signIn"
                  >Sign In</v-btn
                >
              </v-card-actions>
            </div>
            <div v-else>
              <v-text-field
                v-model="selected.name"
                outlined
                rounded
                label="Name"
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
                    label="Birthday date"
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
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="selected.password"
                outlined
                rounded
                label="Password"
                :rules="[rules.counter]"
              ></v-text-field>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  name: "LoginPage",
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
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
};
</script>

<style></style>
