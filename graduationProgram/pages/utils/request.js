const baseURL='https://story.genielink.cn'
const http=(options)=>{
	const token=uni.getStorageSync('token')
	//如果token不存在就跳转到个人页面，让用户登录
	if(!token){
		uni.navigateTo({
			url:'../people/people_main'
		})
		return ;
	}else{
		return new Promise((resolve,reject)=>{
			uni.request({
				url:baseURL+options.url,
				//请求url中如果没有method，默认是get
				method:options.methods||'GET',
				//请求url中如果没有data，默认为空
				data: options.data || {},
				header: {Authorization:token},
				success:res=>{
					if(!res){
						return uni.showToast({icon:'loading',title:'获取数据失败'})
					}
					console.log(res.data)
					resolve(res)
				},
				fail:err=>{
					return uni.showToast({
						icon:'loading',
						title:'请求失败'
					})
					reject(err)
				}
			})
		})
	}
} 