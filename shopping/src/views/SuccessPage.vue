<template>
    <v-sheet class="grey" height="100%">
      <v-subheader></v-subheader>
      <v-subheader></v-subheader>
      <div class="d-flex flex-row justify-center">
        <v-card max-width="600" class="justify-center">
          <v-card-title class="justify-center">Order Complete</v-card-title>
          <v-card-text class="text-center">
            <div class="font-weight-bold">Confirmation ID: {{routeId}}</div>
            <v-subheader></v-subheader>
            Your order is complete and payment has been processed. A confirmation email has been sent to your email address. Please await 2-3 business days for your product(s) to arrive. Thank You!
          </v-card-text>
          <v-card-actions>
            <v-btn block color="primary" @click="redirectToHome">
              <v-icon>mdi-chevron-left</v-icon>
              <span class="ml-3">Return to homepage</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-sheet>
</template>

<script>
export default {
  name: 'SuccessPage',
  methods: {
    redirectToHome() {
      this.$router.push("/")
    }
  },
  computed: {
    routeId() {
      return this.$route.query.session_id
    }
  }
}
</script>

<style>

</style>