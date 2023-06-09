import {createStore} from "vuex";
import * as actions from './actions'
import * as mutations from './mutations'

const store = createStore({
  state: {
    user: {data: {}, token: sessionStorage.getItem("TOKEN")},
    searchedStocks: [],
    exchangeStocks: [],
    userStocks: [],
    newsData: [],
    candleData: {},
    stockInfo: {},
  },
  getters: {
    // Paginate on the exchange list page also searches the state for keywords, if empty: return everything
    paginateExchangeStocks: (state, getters) => (index, max, keyword) => {
      let searchedExchangeStock = keyword === '' ?
        state.exchangeStocks : getters.searchExchangeStocks(keyword);
      return searchedExchangeStock.slice(index, max);
    },
    // Currently for use during pagination
    searchExchangeStocks: (state) => (keyword) => {
      return state.exchangeStocks.filter(stock => stock.description.match(keyword.toUpperCase()));
    },
    // TODO: Move calculated variables to mutations for a better overview
    getStockInfo: (state) => {
      const stockInfo = state.stockInfo;
      // Cap in millions, shares in thousands
      stockInfo.marketCapitalization = Math.floor(state.stockInfo.marketCapitalization);
      stockInfo.shareOutstanding = state.stockInfo.shareOutstanding * 1000;
      // Add new calculated shareprice attribute
      stockInfo.sharePrice = (stockInfo.marketCapitalization / stockInfo.shareOutstanding * 1000).toFixed(2);
      return stockInfo;
    },
    getUserStocks: (state) => {
      const userStocks = state.userStocks;
      return userStocks;
    },
    getNewsAmount: (state) => {
      return state.newsData.length;
    },
    getUser: (state) => {
      return state.user;
    },
    getCandleData: (state) => {
      return state.candleData;
    },
    getCurrentSymbol: (state) => {
      return state.stockInfo.ticker;
    },
    paginateNews: (state) => (index, max) => {
      return state.newsData.slice(index, max);
    }
  },
  actions,
  mutations,
  modules: {}
})

export default store;
