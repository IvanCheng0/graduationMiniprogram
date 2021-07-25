import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: {
			token: "",
			userName: "",
			avatar: "",
			desc: ","
		},
		hasLogin: false,
		storyList: [],
		/*{  location_name: "", list: []},*/
		//存放所有的地点数据
		locationName: [],
		tags: [],

	},

	mutations: {
		login(state, provider) { //改变登录状态  
			state.hasLogin = true
			state.userInfo.token = provider.token
			state.userInfo.userName = provider.userName
			state.userInfo.avatar = provider.avatar
			state.userInfo.desc = provider.desc
			uni.setStorage({ //将用户信息保存在本地  
				key: 'userInfo',
				data: provider
			})
		},
		logout(state) { //退出登录  
			state.hasLogin = false
			state.userInfo = {}
			uni.removeStorage({
				key: 'userInfo'
			})
		},
		//存放地点数据
		getLocationName(state, provider) {
			state.locationName = provider
		},
		//存放添加标签中的tags
		tagsToPostStory(state, provider) {
			state.tags = provider
		},
		initializeStoryList(state, provider) { //初始化故事列表
			for (let i = 0; i < state.storyList.length; i++) {
				if (state.storyList[i].locationID == provider.place) {
					return
				}
			}
			state.storyList.push({
				locationID: provider.place,
				list: provider.listInfo
			});
		},
		updateStoryList(state, provider) { //更新故事列表
			for (let i = 0; i < state.storyList.length; i++) {
				if (state.storyList[i].locationID == provider.place) {
					state.storyList[i].list = provider.listInfo;
					//console.log('update', state.storyList[i].list);
				}
			}
			//console.log('update', state.storyList[i].list);
		},
	},

})

export default store
