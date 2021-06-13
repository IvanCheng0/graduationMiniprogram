import http from "@/pages/utils/request.js"
export function getMyStoryList(page_id) {
	console.log("112312")
	return http({
		url: "/api/v1/getMyStory",
		params: {
			page_id
		}
	})
}