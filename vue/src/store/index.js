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
  },
  getters: {

    // Paginate on the exchange list page also searches the state for keywords, if empty: return everything
    paginate: (state, getters) => (index, max, keyword) => {
      let searchedExchangeStock = keyword === '' ?
        state.exchangeStocks : getters.searchExchangeStocks(keyword);
      return searchedExchangeStock.slice(index, max);
    },
    searchExchangeStocks: (state) => (keyword) => {
      return state.exchangeStocks.filter(stock => stock.description.match(keyword.toUpperCase()));
    },
    getStockCap: (state) => {
      const marketCap = state.stockInfo.marketCapitalization;
      return Math.floor(marketCap).toLocaleString() + ' K';
    },
  },
  actions,
  mutations,
  modules: {}
})

export default store;
