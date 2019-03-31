// apply mutations
export const setUser = ({ commit }, user) => {
    commit('userStatus', user)
}