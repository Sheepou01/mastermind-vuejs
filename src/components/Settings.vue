<template>
    <div class="container">
        <form>
            <div class="form-group">
                <label for="nb_colors">Nombre de couleurs différentes possibles</label>
                <select class="form-control" id="nb_colors" v-model="nbColors">
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                </select>
            </div>
            <div class="form-group">
                <label for="nb_pawns">Longueur de la combinaison à trouver</label>
                <select class="form-control" id="nb_pawns" v-model="nbPawns">
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                </select>
            </div>
            <div class="form-group">
                <label for="nb_tries">Nombre d'essais maximum autorisés</label>
                <select class="form-control" id="nb_tries" v-model="nbTries">
                    <option>10</option>
                    <option>12</option>
                    <option>15</option>
                    <option>20</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary" @click="update">Valider</button>
        </form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      nbColors: '',
      nbPawns: '',
      nbTries: ''
    }
  },
  methods: {
    update (e) {
      e.preventDefault()
      const settings = {
        nbColors: this.nbColors,
        nbPawns: this.nbPawns,
        nbTries: this.nbTries
      }
      this.$store.commit('updateSettings', settings)
    }
  },
  created () {
    const settings = this.$store.getters.settings
    this.nbColors = settings.nbColors
    this.nbPawns = settings.nbPawns
    this.nbTries = settings.nbTries
  }
}
</script>

<style scoped>

</style>
