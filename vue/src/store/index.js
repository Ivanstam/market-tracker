import {createStore} from "vuex";
import * as actions from './actions'
import * as mutations from './mutations'

// symbol search
const testStock = [
  {
    symbol: 'BA',
    name: 'Boeing Company',
    type: 'Equity',
    region: 'United States',
    currency: 'USD'
  },
  {
    symbol: 'BAB',
    name: 'Invesco ETF',
    type: 'ETF',
    region: 'United States',
    currency: 'USD'
  },
  {
    symbol: 'BA.LOW',
    name: 'BAE Systems plc',
    type: 'Equity',
    region: 'United Kingdom',
    currency: 'USD'
  },
]

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    stocks: [...testStock],
    stockInfo: {},
    searchedStocks: [],
  },
  getters: {},
  actions,
  mutations,
  modules: {}
})

export default store;
