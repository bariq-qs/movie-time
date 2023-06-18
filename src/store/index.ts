import { createStore } from 'vuex'
import { IGenre } from '@/utils/interfaces/iMovie'
import { genreUseCase } from '@/usecase'

export default createStore({
  state: {
    listGenre: [] as IGenre[]
  },
  getters: {
  },
  mutations: {
    STORE_LIST_GENRE: (state, items: IGenre[]) => {
      state.listGenre = items
    }
  },
  actions: {
    fetchGenre: ({ commit }) => {
      genreUseCase.getGenre()
        .then(({ error, result }) => {
          if (!error) {
            commit('STORE_LIST_GENRE', result.genres)
          }
        })
    }
  },
  modules: {
  },
})
