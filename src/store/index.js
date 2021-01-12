import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo} from '@/api/getData'

Vue.use(Vuex)

export const store = new Vuex.Store({
    // 设置属性
    state: {
        isLogin: false,
    },

    // 获取属性的状态
    getters: {
        //获取登录状态
        isLogin: state => state.isLogin,
    },

    // 设置属性状态
    mutations: {
        //保存登录状态
        userStatus(state, flag) {
            state.isLogin = flag
        },
    },

    // 应用mutations
    actions: {
        //获取登录状态
        userLogin({commit}, flag) {
            commit("userStatus", flag)
        },
    }
})


const state = {

	adminInfo: {
		avatar: 'default.jpg'
	},
}

const mutations = {
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	}
}

const actions = {
	async getAdminData({commit}){
		try{
			const res = await getAdminInfo()
			if (res.status === 1) {
				commit('saveAdminInfo', res.data);
			}else{
				throw new Error(res.type)
			}
		}catch(err){
			// console.log(err.message)
		}
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})
