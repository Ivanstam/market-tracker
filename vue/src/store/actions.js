import { laravelClient } from '../axios.js'

const key = import.meta.env.VITE_API_SECRET_KEY;

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
        commit('logout')
        return response.data;
    })
}
