<template>
	<view>
		<u-popup v-model="popup" mode="bottom" backgroundColor="#F4F6FA">
			<comments :p_sid="sid" :p_commentList="commentList" :story-page-type="detailStatus"></comments>
		</u-popup>


	</view>
</template>

<script>
	import comments from '../story/comment_component.vue'
	import api from '../../api/story/api.js'
	export default {
		data() {
			return {
				popup: false,
				detailStatus: false,
				sid: this.p_sid,
				commentList: this.p_commentList,
				replyContent: '',
				like_icon: '../../static/story/icon/like.png',
				like_after_icon: '../../static/story/icon/like_after.png',
			}
		},
		methods: {
			reply() {
				this.popup=true;
				//请求评论数据
				/*api.getComments({
					sid: this.sid,
					page_id: 1
				}).then(res => {
					console.log("PopComments", res)
				})*/
			},
		},
		props: {
			p_commentList: Array,
			p_sid: Number,
		},
		components: {
			comments
		}
	}
</script>

<style>
	
</style>
