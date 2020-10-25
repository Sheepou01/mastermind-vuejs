<template>
    <div class="container">
        <h1>Salut c'est le plateau</h1>
        <div class="container secret">
          <div class="row">
            <pawn class="col-3 pawn" v-for="(pawn, index) in secretCombination" :key="index" :color="pawn.color"></pawn>
          </div>
        </div>
        <div class="tries">
            <p>Nombre d'essais: {{ nbTries }}</p>
            <try v-for="(item, index) in tries" :key="index" :item="item"></try>
        </div>
        <div class="container proposition">
          <div class="row">
            <pawn class="col-3 pawn" v-for="(pawn, index) in propositionPawns" :key="index" :color="pawn.color"></pawn>
          </div>
          <button @click="deleteLastPawn">X</button>
          <button @click="checkProposition">Valider</button>
        </div>
        <div class="container buttons">
            <div class="row">
                <button v-for="color in colors" :key="color" class ="button col-3" :class="color" @click="addToProp(color)"></button>
            </div>
        </div>
        <p>Nombre d'essais autorisés: {{ limitTries }}</p>
        <p>Nombre de couleurs en jeu: {{ nbColors }}</p>
    </div>
</template>

<script>
import Pawn from './Pawn.vue'
import Try from './Try.vue'

export default {
  components: {
    Pawn: Pawn,
    Try: Try
  },
  data () {
    return {
      tries: [],
      propositionPawns: [],
      secretCombination: [],
      limitTries: 0,
      nbColors: 0,
      nbPawns: 0

    }
  },
  computed: {
    nbTries () {
      return this.tries.length
    },
    settings () {
      return this.$store.getters.settings
    },
    allColors () {
      return this.$store.getters.allColors
    },
    colors () {
      return this.allColors.slice(0, this.nbColors)
    }
  },
  methods: {
    addToProp (color) {
      if (this.propositionPawns.length === this.nbPawns) {
        alert('Nombre maximal atteint.')
        return
      }
      const newPawn = {
        position: this.propositionPawns.length + 1,
        color: color
      }
      this.propositionPawns.push(newPawn)
    },
    deleteLastPawn () {
      this.propositionPawns.pop()
    },
    checkProposition () {
      if (this.propositionPawns.length !== this.nbPawns) {
        alert('Vous devez placer ' + this.nbPawns + ' pions.')
        return
      }
      let wellPlacedColors = 0
      let goodColors = 0

      for (let i = 0; i < this.settings.nbPawns; i++) {
        if (JSON.stringify(this.propositionPawns[i]) === JSON.stringify(this.secretCombination[i])) {
          wellPlacedColors++
        }
      }

      const secretCombinationColors = this.secretCombination.map(item => item.color)
      this.propositionPawns.forEach(item => {
        if (secretCombinationColors.includes(item.color)) {
          goodColors++
          secretCombinationColors.splice(secretCombinationColors.indexOf(item.color), 1)
        }
      })

      goodColors -= wellPlacedColors
      alert('Il ya ' + wellPlacedColors + ' pions bien placé(s) et ' + goodColors + ' couleurs correcte(s).')
      this.saveProp(this.propositionPawns, wellPlacedColors, goodColors)
      this.propositionPawns = []
    },
    saveProp (prop, wellPlacedColors, goodColors) {
      const tryResult = {
        pawns: prop,
        result: {
          wellPlacedColors: wellPlacedColors,
          goodColors: goodColors
        }
      }
      this.tries.push(tryResult)
    },
    checkKey (e) {
      console.log(e.key)
      // TODO
    }
  },
  created () {
    // first we add a listerer on the keyboard to enable play with it
    window.addEventListener('keypress', this.checkKey)

    // then we set variables from the settings
    this.limitTries = this.settings.nbTries
    this.nbColors = this.settings.nbColors
    this.nbPawns = parseInt(this.settings.nbPawns)

    // generating the secret combination the player has to find
    while (this.secretCombination.length < this.settings.nbPawns) {
      const color = this.colors[Math.floor(Math.random() * this.nbColors)]
      const item = {
        position: this.secretCombination.length + 1,
        color: color
      }
      this.secretCombination.push(item)
    }
  }
}
</script>

<style scoped>
    .secret,
    .trie,
    .proposition,
    .buttons {
        margin: 30 auto;
    }

    .button {
        display: inline-block;
        height: 20px;
        width: 30px;
    }

    .yellow {
        background-color: yellow;
    }
    .green {
        background-color: green;
    }
    .red {
        background-color: red;
    }
    .blue {
        background-color: blue;
    }
    .purple {
      background-color: purple;
    }
    .orange {
      background-color: orange;
    }
    .pawn {
        width: 30px;
    }
</style>
