<template>
	<view>
		<uni-popup ref="popup" type="bottom" backgroundColor="#F4F6FA">
			<comments :p_commentList="commentList" storyPageType></comments>
		</uni-popup>
		
		
	</view>
</template>

<script>
	import comments from '../story/comment_component.vue'
	import api from '../api/story/api.js'
	export default{
		data(){
			return{
				token:"eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjE0LCJleHAiOjE2MjM3MjAzNTJ9.fRuEUBCVW2YQqU92et_JZrDFcpgF_tasPWWzMDfrgpg",
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
				api.getComments({params:`?token=${this.token}&sid=1&page_id=1`}).then(res=>{
					console.log(res)
				})
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
