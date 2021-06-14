import http from '../../utils/request.js'
export default {
	//发布故事
	postStory(options){
		console.log(this)
		return http({url:'/api/v1/publish' + options.params,methods:'POST',data:options.data})
	},
	//请求评论数据
	getComments(options){
		return http({url:'/api/v1/getDiscuss' + options.params,})
	},
	//发布评论
	postComments(options){
		return http({url:'/api/v1/pubDiscuss' + options.params,methods:'POST',data:options.data})
	}
	
}