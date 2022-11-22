<template>
  <v-sheet class="grey" height="100%">
    <v-subheader></v-subheader>
    <v-subheader></v-subheader>
    <div class="d-flex flex-row justify-center">
      <v-card max-width="400" class="justify-center">
        <v-card-title class="justify-center">Order Declined</v-card-title>
        <v-card-text class="text-center">
          Sometime lifes happens. Your order has failed. Please try again.
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
name: 'DeclinedPage',
methods: {
  redirectToHome() {
    this.$router.push("/")
  }
},
}
</script>