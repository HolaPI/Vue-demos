const state = {
    loginFlag: false,
    currentUser: null
}
const getters = {
    loginFlag: state => state.loginFlag,
    currentUser: state => state.currentUser
}
const mutations = {
    userStatus(state, user) {
        if (user) {
            state.currentUser = user,
                state.loginFlag = true
        } else {
            state.currentUser = null,
                state.loginFlag = false
        }
    }
}
const actions = {
    // apply mutations
    setUser({ commit }, user) {
        commit('userStatus', user)
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}