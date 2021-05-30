<template>
	<view>
		<uni-popup ref="popup" type="bottom" backgroundColor="#F4F6FA">
			<comments :p_commentList="commentList" storyPageType></comments>
		</uni-popup>
		
		
	</view>
</template>

<script>
	import comments from '../story/comment_component.vue'
	export default{
		data(){
			return{
				commentList: this.p_commentList,
				detailStatus: this.storyPageType,
				replyContent: '',
				like_icon: '../../static/story/icon/like.png',
				like_after_icon: '../../static/story/icon/like_after.png',
			}
		},
		methods:{
			reply(){
				this.$refs.popup.open();
				//请求评论数据
			},
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
			p_commentList: Array,
			storyPageType: Boolean,
		},
		components:{
			comments
		}
	}
</script>

<style>

.uni-popup{
	position: fixed;
	width: 100%;
	bottom: 0;
}

</style>
