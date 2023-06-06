import {createStore} from "vuex";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    }
  },
  getters: {},
  actions: {
    register({commit}, user) {
      // Post request to the auth controller return user data and token to state and session
      return fetch(`http://localhost:8000/api/register`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        method: "POST",
        body: JSON.stringify(user),
      })
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        commit("setUser", json);
        return json;
      })
    }
  },
  mutations: {
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    }
  },
  modules: {}
})

export default store;
