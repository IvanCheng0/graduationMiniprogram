import store from '../../store/index.js'
const baseURL = 'https://story.genielink.cn'
const http = (options) => {
	const token = store.state.userInfo.token
	//如果token不存在就跳转到个人页面，让用户登录
	console.log("post")
	if (!token) {
		uni.showToast({
		    title: '请先登录',
		    duration: 1500,
			position:'center',
		});
		// uni.switchTab({
		// 	url: '../people/people_main'
		// })
		return;
	} else {
		// options.url = options.url + `?token=${token}`
		if (options.url.indexOf("?") !== -1) {
			options.url = options.url + `&token=${token}`
		} else {
			options.url = options.url + `?token=${token}`
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseURL + options.url,
				//请求url中如果没有method，默认是get
				method: options.methods || 'GET',
				//请求url中如果没有data，默认为空
				data: options.params || {},
				success: resolve,
				fail: reject
			})
		})
	}
}
export default http
