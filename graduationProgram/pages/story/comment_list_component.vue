<template>
	<view id="listComment">
		<comments :p_sid="sid" :p_commentList="commentList" :story-page-type="detailStatus">
		</comments>
	</view>
	
</template>
	
<script>
	import comments from '../story/comment_component.vue'
	export default{
		data(){
			return{
				commentList: this.p_commentList,
				detailStatus: 1,
				sid: this.p_sid,
				replyContent: '',
				like_icon: '../../static/story/icon/like.png',
				like_after_icon: '../../static/story/icon/like_after.png',
			}
		},
		methods:{
			
		},
		props:{
			p_commentList: Array,
			p_sid: Number
		},
		components:{
			comments
		},
		mounted(){
			//console.log(this.commentList);
		}
	}
</script>

<style>
</style>
