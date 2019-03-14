<template>
  <div>
    <sw-card v-if="loaded && starship">
      <h2 slot="header">Starship</h2>
      <ul slot="content">
        <li v-for="(value, label) in starship" :key="label">
          {{label}}: {{value}}
        </li>
      </ul>
    </sw-card>

    <sw-preloader v-if="!loaded" />
  </div>
</template>

<script>
import swCard from '@/components/swCard'
import swPreloader from '@/components/swPreloader'
import { mapActions } from 'vuex'

export default {
  data: () => ({
    loaded: false
  }),
  computed: {
    id () {
      return this.$route.params.id
    },
    starship () {
      let starships = this.$store.getters['starships']
      let starship = starships.find(starship => starship.id.toString() === this.id)
      return starship
    }
  },
  mounted () {
    if (this.starship) {
      this.loaded = true
    }
    this.fetchStarship({ id: this.id })
      .finally(() => {
        this.loaded = true
      })
  },
  methods: {
    ...mapActions({
      fetchStarship: 'fetchStarship'
    })
  },
  components: {
    swCard,
    swPreloader
  }
}
</script>
