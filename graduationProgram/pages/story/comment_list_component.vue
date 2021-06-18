<template>
	<view id="listComment">
		<comments 
		:p_commentList="commentList"
		v-bind:story-page-type="false">
		</comments>
	</view>
	
</template>
	
<script>
	import comments from '../story/comment_component.vue'
	export default{
		data(){
			return{
				commentList: this.p_commentList,
				replyContent: '',
				like_icon: '../../static/story/icon/like.png',
				like_after_icon: '../../static/story/icon/like_after.png',
			}
		},
		methods:{
			
		},
		props:{
			p_commentList: Array
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
