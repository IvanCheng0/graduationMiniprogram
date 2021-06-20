import http from "@/pages/utils/request.js"
export default {
	//发布故事
	postStory(options) {
		return http({
			url: '/api/v1/publish',
			methods: 'POST',
			params: options.data
		})
	},
	//获取某个地点的故事
	getStory(options){
		return http({
			url: '/api/v1/getStory',
			params:options
		})
	},
	//请求评论数据1/1
	getComments(options) {
		return http({
			url: '/api/v1/getDiscuss',
			params: options
		})
	},
	//发布评论
	postComment(options) {
		return http({
			url: '/api/v1/pubDiscuss',
			methods: 'POST',
			params: options
		})
	},
	//点赞故事1/1
	postLikeStory(options) {
		return http({
			url: '/api/v1/storyGood',
			methods: 'POST',
			params: options
		})
	},
	//取消点赞故事
	postCancelLikeStory(options) {
		return http({
			url: '/api/v1/storyGoodCancel',
			methods: 'POST',
			params: options
		})
	},
	//收藏故事1/1
	postMarkStory(options) {
		return http({
			url: '/api/v1/storyCollect',
			methods: 'POST',
			params: options
		})
	},
	//取消收藏故事
	postCancelMarkStory(options) {
		return http({
			url: '/api/v1/storyCollectCancel',
			methods: 'POST',
			params: options
		})
	},
	//点赞评论
	postLikeComment(options) {
		return http({
			url: '/api/v1/discussGood',
			methods: 'POST',
			params: options
		})
	},
	//取消点赞评论
	postCancelLikeComment(options) {
		return http({
			url: '/api/v1/discussGoodCancel',
			methods: 'POST',
			params: options
		})
	},
}
