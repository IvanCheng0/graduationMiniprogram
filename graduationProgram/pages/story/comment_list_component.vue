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
			like(reply_flag=-1){
				if(reply_flag==-1){
					this.like_flag=!this.like_flag;
					if(this.like_flag==true){
						this.like_num++;
					}
					else{
						this.like_num--;
					}
				}
				else{
					this.commentList[reply_flag].like_flag=!this.commentList[reply_flag].like_flag;
				}
				
			},
			submit(){
				console.log(this.replyContent);
				//回车发送评论
			},
		},
		props:{
			p_commentList: Array
		},
		components:{
			comments
		}
	}
</script>

<style>
</style>
