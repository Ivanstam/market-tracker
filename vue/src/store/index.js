import {createStore} from "vuex";
import * as actions from './actions'
import * as mutations from './mutations'

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    stockInfo: {},
    searchedStocks: [],
    exchangeStocks: [],
    exchangeSelection: Boolean,
  },
  getters: {
    paginate: (state) => (index, max) => {
      return state.exchangeStocks.slice(index, max);
    },
    getStockCap: (state) => {
      const marketCap = state.stockInfo.marketCapitalization;
      return Math.floor(marketCap).toLocaleString() + ' K';
    }
  },
  actions,
  mutations,
  modules: {}
})

export default store;
