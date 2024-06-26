import { createStore } from 'vuex'

interface RootState {
  songData: SongData | null
  chartData: ChartData | null
}

interface SongData {
  title: string
  artist: string
  bpms: string
  charts: ChartData[]
}

interface ChartData {
  chartHeader: string
  type: string
  tag: string
  difficultyNumber: string
  difficulty: string
  notes: string[][]
}

const store = createStore<RootState>({
  state: {
    songData: null,
    chartData: null
  },
  mutations: {
    setSongData(state, songData: SongData) {
      state.songData = songData
    },
    setChartData(state, chartData: ChartData) {
      state.chartData = chartData
    },
    clearSongData(state) {
      state.songData = null
    },
    clearChartData(state) {
      state.chartData = null
    }
  },
  actions: {
    async fetchSongData({ commit }) {
      try {
        const response = await fetch('http://localhost:5000/songData')
        const songData = await response.json()
        commit('setSongData', songData)
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    getSongData: (state) => state.songData
  }
})

export default store
