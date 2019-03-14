<template>
  <div class="home">
    <sw-input v-model="search" placeholder="Search" />

    <template v-if="loaded">
      <sw-table v-if="loaded && starships.length > 0" :headers="headers" :items="starships" />
      <sw-pagination v-if="pages > 1" v-model="page" :count="pages" />
    </template>

    <sw-preloader v-if="!loaded" />
  </div>
</template>

<script>
import swInput from '@/components/swInput'
import swTable from '@/components/swTable'
import swPreloader from '@/components/swPreloader'
import swPagination from '@/components/swPagination'
import axios from 'axios'
import urlParse from 'url-parse'

import { mapGetters } from 'vuex'

export default {
  name: 'home',
  data: () => ({
    search: '',
    headers: {
      name: 'Name',
      model: 'Model',
      manufacturer: 'Manafacturer',
      cost_in_credits: 'Cost in credits',
      length: 'Length',
      starship_class: 'Starship class'
    },
    cancelToken: null,
    loaded: false
  }),
  computed: {
    ...mapGetters({
      starships: 'starships',
      pages: 'pages'
    }),
    page: {
      get () {
        return this.$store.state.page
      },
      set (value) {
        this.$store.commit('page', value)
      }
    }
  },
  watch: {
    search (value) {
      this.page = 1
      this.loadStarships({ search: value })
    },
    page (value) {
      this.loadStarships({ search: this.search, page: value })
    }
  },
  mounted () {
    const { query } = urlParse(window.location, true)
    if (query && query.search) {
      this.search = query.search
    }
    this.loadStarships()
  },
  methods: {
    loadStarships (options = {}) {
      this.loaded = false
      if (this.cancelToken) {
        this.cancelToken.cancel()
        this.cancelToken = null
      }
      this.cancelToken = axios.CancelToken.source()
      options.cancelToken = this.cancelToken.token
      this.$store.dispatch('fetchStarships', options)
        .catch(error => {
          if (axios.isCancel(error)) return

          this.$swal({
            title: 'Ошибка',
            text: 'Попробуйте открыть эту страницу позднее',
            icon: 'error'
          })
        })
        .finally(() => {
          this.loaded = true
        })
    }
  },
  components: {
    swInput,
    swTable,
    swPreloader,
    swPagination
  }
}
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
  }
</style>
