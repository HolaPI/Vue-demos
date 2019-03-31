import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions.js'
import * as getters from './getters.js'
import * as mutations from './mutations.js'


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        //to set states
        menuItems: {},
        currentUser: null,
        loginFlag: false
    },
    getters,
    mutations,
    actions
})