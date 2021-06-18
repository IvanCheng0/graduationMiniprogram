import http from "@/pages/utils/request.js"
export function getMyStoryList(page_id) {
	return http({
		url: "/api/v1/getMyStory",
		params: {
			page_id
		}
	})
}

export function deleteMyStory(sid) {
	return http({
		url: "/api/v1/deleteStory",
		methods: "POST",
		params: {
			sid
		}
	})
}

export function getMyCollectList(page_id) {
	return http({
		url: "/api/v1/getMyCollect",
		params: {
			page_id
		}
	})
}

export function deleteMyCollect(sid) {
	return http({
		url: "api/v1/storyCollectCancel",
		methods: "POST",
		params: {
			sid
		}
	})
}

export function getMyHistoryList() {
	return http({
		url: "/api/v1/getHistory",
	})
}

export function getMyGoodList(page_id) {
	return http({
		url: "/api/v1/getMyGood",
		params: {
			page_id
		}
	})
}

export function getMyDiscussList(page_id) {
	return http({
		url: "/api/v1/getMyDiscuss",
		params: {
			page_id
		}
	})
}

export function saveUserInfo(desc) {
	return http({
		url: "/api/v1/saveUserInfo",
		methods: "POST",
		params: {
			desc
		}
	})
}