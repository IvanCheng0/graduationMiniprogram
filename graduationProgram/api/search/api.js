import http from "@/pages/utils/request.js"
export default {
	getStory(options) {
		return http({
			url: '/api/v1/getStory',
			params: options
		})
	},
	searchTip(options) {
		return http({
			url: '/api/v1/searchTip',
			params: options
		})
	}
}
// import http from '../../utils/request.js'
// export function getStory(options){
// 		return http({url:'/api/v1/getStory',data:options.data})
// 	}
