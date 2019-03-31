//change states 
export const setMenuItems = (state, data) => {
    //change menuItem's sate by replacing with data
    state.menuItems = data;
}
export const removeMenuItems = (state, data) => {
    state.menuItems.forEach((item, index) => {
        if (item == data) {
            state.menuItems.splice(index, 1);
        }
    })
}
export const pushMenuItems = (state, data) => {
    state.menuItems.push(data)
}
export const userStatus = (state, user) => {
    if (user) {
        state.currentUser = user,
            state.loginFlag = true
    } else {
        state.currentUser = null,
            state.loginFlag = false
    }
}
