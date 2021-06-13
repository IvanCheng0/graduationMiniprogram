const baseURL='https://story.genielink.cn'
const http=(options)=>{
	const token="eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjE0LCJleHAiOjE2MjMzNDgzNTl9.GlUs4Ys8p0hY3l1lhAhNmxGVs_l4iwMwxlE0X1043g4"
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
export default http