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
	//请求评论数据
	getComments(options) {
		return http({
			url: '/api/v1/getDiscuss',
			params: options
		})
	},
	//发布评论，还没写发请求
	postComment(options) {
		return http({
			url: `/api/v1/pubDiscuss?sid=${options.sid}`,
			methods: 'POST',
			params: options.data
		})
	},
	//点赞故事
	postLikeStory(options) {
		return http({
			url: `/api/v1/storyGood?sid=${options.sid}`,
			methods: 'POST',
			params: options.data
		})
	},
	//取消点赞故事
	postCancelLikeStory(options) {
		return http({
			url: `/api/v1/storyGoodCancel?sid=${options.sid}`,
			methods: 'POST',
			params: options.data
		})
	},
	//收藏故事1/1
	postMarkStory(options) {
		return http({
			url: `/api/v1/storyCollect?sid=${options.sid}`,
			methods: 'POST',
			params: options.data
		})
	},
	//取消收藏故事
	postCancelMarkStory(options) {
		return http({
			url: `/api/v1/storyCollectCancel?sid=${options.sid}`,
			methods: 'POST',
			params: options.data
		})
	},
	//点赞评论
	postLikeComment(options) {
		return http({
			url: `/api/v1/discussGood?did=${options.did}`,
			methods: 'POST',
			params: options.data
		})
	},
	//取消点赞评论
	postCancelLikeComment(options) {
		return http({
			url: `/api/v1/discussGoodCancel?did=${options.did}`,
			methods: 'POST',
			params: options.data
		})
	},
}
