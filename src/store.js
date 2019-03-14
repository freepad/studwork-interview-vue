import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  starships: [],
  page: 1,
  perPage: 10,
  total: 0
}

const getters = {
  starships: ({ starships }) => starships,
  pages ({ total, perPage }) {
    return Math.ceil(total / perPage)
  }
}

const addStarship = (state, { starship }) => {
  const regexp = /(\d+)(?!.*\d)/g
  starship.id = starship.url.search(regexp)
  state.starships = [...state.starships, starship]
}

const mutations = {
  removestarshipsStarship: state => {
    state.starships = []
  },
  receiveStarship: addStarship,
  receiveStarships (state, { starships }) {
    starships.map(starship => addStarship(state, { starship }))
  },
  total (state, payload) {
    state.total = payload
  },
  perPage (state, payload) {
    state.perPage = payload
  },
  page (state, payload) {
    state.page = payload
  }
}

const actions = {
  fetchStarship ({ commit }, { id }) {
    return axios.get(`https://swapi.co/api/starships/${id}`)
      .then(response => {
        if (response && response.data) {
          commit('receiveStarship', { starship: response.data })
        }
      })
  },

  fetchStarships ({ commit }, payload) {
    let options = {}
    if (payload && payload.search) {
      options = {
        ...options,
        params: {
          search: payload.search
        }
      }
    }

    if (payload && payload.page) {
      options = {
        ...options,
        page: payload.page
      }
    }

    if (payload && payload.cancelToken) {
      options = {
        ...options,
        cancelToken: payload.cancelToken
      }
    }

    return axios.get('https://swapi.co/api/starships', options)
      .then(response => {
        commit('removestarshipsStarship')
        if (response && response.data) {
          commit('total', response.data.count)
          commit('perPage', response.data.results.length)
          commit('receiveStarships', { starships: response.data.results })
        }
      })
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
