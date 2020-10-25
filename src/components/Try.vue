<template>
    <div class="container">
        <div class="container">
            <div class="row">
                <pawn class="col-3 pawn" v-for="(pawn, index) in item.pawns" :key="index" :color="pawn.color"></pawn>
            </div>
            <div class="col-sm-6">
                <p>Bien placés: {{ item.result.wellPlacedColors }}</p>
                <p>Bonnes couleurs: {{ item.result.goodColors }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Pawn from './Pawn.vue'

export default {
  props: ['item'],
  components: {
    Pawn: Pawn
  }
}
</script>

<style scoped>
  .pawn {
      width: 30px;
  }
</style>
