<template>
  <v-dialog :value="dialog" max-width="600">
    <v-card>
      <v-card-title>Your Shopping Cart</v-card-title>
      <v-card-subtitle class="pt-2">Confirm the purchase of these items.</v-card-subtitle>
      <v-card-text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe suscipit veniam ipsa ducimus! Saepe hic veritatis quia maxime ratione? Sint nihil vel corrupti! Laborum dolores neque sed iste aperiam autem?
      </v-card-text>
      <v-card-actions>
        <v-btn color="grey" text @click="cancelCart">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" text>Continue</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
  },
methods: {
  cancelCart() {
    this.$emit('cancel')
  }
}
}
</script>

<style>

</style>