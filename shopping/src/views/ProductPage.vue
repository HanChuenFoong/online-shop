<template>
  <v-dialog :value="dialog" max-width="600" persistent>
    <v-card>
      <v-carousel hide-delimiters height="400">
        <v-carousel-item
          v-for="(img, i) in item?.data?.image || []"
          :key="i"
        >
          <v-img :src="img" contain></v-img>
        </v-carousel-item>
      </v-carousel>
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
    item: Object,
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