import {laravelClient, stockClient} from '../axios.js'
import store from "./index.js";

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

export function getUserStocks({ commit }, user) {
  console.log(user);
  return laravelClient.get('/stocks', user)
    .then((response) => {
      commit('setUserStocks', response.data);
      return response.data
    });
}

export function setUserStock({ commit }) {
  let stockInfo = JSON.parse(JSON.stringify(store.state.stockInfo));
  console.log(stockInfo);
  return laravelClient.post('/stocks', stockInfo)
    .then((response) => {
      commit('setUserStocks', response.data)
      return response;
    });
}

// Alphavantage calls/actions

export function getNews({commit}, category) {
  return stockClient.get(`news/?category=${category}&token=${key}`)
    .then((response) => {
      commit('setNews', response);
      return response;
    });
}

export function getStockInfo({ commit }, symbol) {
  return stockClient.get(`stock/profile2?symbol=${symbol}&token=${key}`)
    .then((response) => {
      commit('setStockInfo', response);
      return response;
    });
}

export function searchStocks({commit}, keyword) {
  return stockClient.get(`search?q=${keyword}&token=${key}`)
    .then((response) => {
      commit('setSearchedStocks', response);
      return response;
    });
}

export function searchByExchange({commit}, mic) {
  return stockClient.get(`stock/symbol?exchange=US&mic=${mic}&token=${key}`)
    .then((response) => {
      commit('setExchangeStocks', response);
      return response;
    });
}

export function getCandleData({commit}, symbol) {
  const unixToday = Math.floor((Date.now() / 1000));
  const unixLastYear = Math.floor(unixToday - 31536000)
  return stockClient.get(`stock/candle?symbol=${symbol}&resolution=D&from=${unixLastYear}&to=${unixToday}&token=${key}`)
    .then((response) => {
      commit('setCandleData', response);
      return response;
    });
}
