import http from '../../utils/request.js'
export default {
	getStory(options){
		console.log(this)
		return http({url:'/api/v1/getStory',data:options.data})
	},
	
}
// import http from '../../utils/request.js'
// export function getStory(options){
// 		return http({url:'/api/v1/getStory',data:options.data})
// 	}