import {laravelClient, stockClient} from '../axios.js'

const key = import.meta.env.VITE_API_ALPHA_KEY;

// Back-end user actions
export function register({commit}, user) {
    // Post request to the auth controller, return user data and token to state and session
  return laravelClient.post('/register', user)
    .then((response) => {
      commit('setUser', response.data);
      return response.data;
    })
}

export function login({commit}, user) {
  // Post request to the auth controller, return user data and token to state and session
  return laravelClient.post('/login', user)
    .then((response) => {
      commit('setUser', response.data);
      return response;
    })
}

export function logout({commit}) {
  // Post request to the auth controller, with the session to be wiped
  return laravelClient.post('/logout')
    .then((response) => {
      commit('logout');
      return response.data;
  })
}

// Alphavantage calls/actions
export function getStockInfo({ commit }, symbol) {
  return stockClient.get(`query?function=OVERVIEW&symbol=${symbol}&apikey=${key}`)
    .then((response) => {
      commit('setStockInfo', response);
      return response;
    });
}

export function searchStocks({commit}, keyword) {
  return stockClient.get(`query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${key}`)
    .then((response) => {
      commit('setSearchedStocks', response);
      return response;
    });
}
