<template>
    <div>
        <div class="pawn" :style="{'background-color': color}"></div>
    </div>
</template>

<script>
export default {
  props: ['color']
}
</script>
<style scoped>
  .pawn {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: inline-block;
  }
</style>
