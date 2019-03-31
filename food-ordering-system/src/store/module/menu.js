const state = {
    //to set states
    menuItems: {},
}
const getters = {
    getMenuItems: state => state.menuItems
}
const mutations = {
    //change states 
    setMenuItems(state, data) {
        //change menuItem's sate by replacing with data
        state.menuItems = data;
    },
    removeMenuItems(state, data) {
        state.menuItems.forEach((item, index) => {
            if (item == data) {
                state.menuItems.splice(index, 1);
            }
        })
    },
    pushMenuItems(state, data) {
        state.menuItems.push(data)
    }

}
const actions = {

}
export default {
    state,
    getters,
    mutations,
    actions
}