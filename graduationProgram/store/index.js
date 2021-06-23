import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
 
const store = new Vuex.Store({  
    state: {  
        userInfo: {
			token: "",
			userName: "",
			avatar: "",
			desc:","
		},  
        hasLogin: false,
		storyList: [],/*{  location_name: "", list: []},*/
		
    },  
	
    mutations: {  
        login(state, provider) {//改变登录状态  
            state.hasLogin = true  
            state.userInfo.token = provider.token  
            state.userInfo.userName = provider.userName
			state.userInfo.avatar = provider.avatar 
			state.userInfo.desc = provider.desc 
            uni.setStorage({//将用户信息保存在本地  
                key: 'userInfo',  
                data: provider  
            })  
        },  
        logout(state) {//退出登录  
            state.hasLogin = false  
            state.userInfo = {}  
            uni.removeStorage({  
                key: 'userInfo'  
            })  
        },
		initializeStoryList(state, provider){//初始化故事列表
			state.storyList.push({
				location_name: provider.place,
				list: provider.listInfo
			});
		}
    },
	
})
 
export default store