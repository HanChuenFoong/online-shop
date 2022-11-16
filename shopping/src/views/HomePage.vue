<template>
  <v-sheet class="grey lighten-3" :height="sheetHeight">
    <v-container>
      <v-subheader></v-subheader>
      <div class="text-h6">
        The only site for all your shoe needs!
      </div>
      <div class="subtitle-1">
        Shop adidaz for all styles of shoes including sneakers, high-performance running shoes, and comfy slides.
      </div>
      <v-subheader></v-subheader>

      <!-- <v-card
      class="mx-auto"
      max-width="400"
    >
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title>Top 10 Australian beaches</v-card-title>
      </v-img>
      <v-card-subtitle class="pb-0">
        Number 10
      </v-card-subtitle>
      <v-card-text class="text--primary">
        <div>Whitehaven Beach</div>
        <div>Whitsunday Island, Whitsunday Islands</div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="orange"
          text
        >
          Share
        </v-btn>
        <v-btn
          color="orange"
          text
        >
          Explore
        </v-btn>
      </v-card-actions>
    </v-card> -->
    </v-container>
  </v-sheet>
</template>

<script>
  export default {
    name: 'HomePage',
    computed: {
      sheetHeight() {
        return this.$vuetify.breakpoint.height
      }
    }
  }
</script>