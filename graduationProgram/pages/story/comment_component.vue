<template>
	<view id="avl_comment">
		<view :style="{ overflow: detailStatus==true? 'auto' : 'visible'}">
			<view v-if="commentList.length==0">
				还没有回复哦～来发表你的回复吧！
			</view>
			<view v-else>
				<view class="comment" v-for="(item, idx) in commentList" :key="idx">
					<image :src="item.headPic"></image>
					<span>
						<view>{{item.name}}</view>
						<view>{{item.content}}</view>
					</span>
					<span>
						<image :src="item.like_flag==true? like_after_icon : like_icon" class="icon" @click="like(idx)">{{item.like_num}}</image>
					</span>
				</view>
			</view>
			<view class="scollComment" v-if="detailStatus!=true">
				<input placeholder="分享你的回忆吧!" v-model="replyContent" @confirm="submit" />
			</view>

		</view>

		<view v-if="detailStatus==true">
			<input placeholder="分享你的回忆吧!" v-model="replyContent" @confirm="submit" />
		</view>
	</view>
</template>

<script>
	import api from '../../api/story/api.js'
	export default {
		data() {
			return {
				sid: 1,
				commentList: this.p_commentList,
				detailStatus: this.storyPageType,
				replyContent: '',
				like_icon: '../../static/story/icon/like.png',
				like_after_icon: '../../static/story/icon/like_after.png',
			}
		},
		methods: {
			like(reply_flag = -1) {
				console.log(this.commentList);
				if (reply_flag == -1) {
					this.commentList[reply_flag].like_flag = !this.commentList[reply_flag].like_flag;
					if (this.commentList[reply_flag].like_flag == true) {
						this.commentList[reply_flag].like_num++;
						api.postLikeComment({
							did: this.commentList[reply_flag].did
						}).then(res => {
							console.log("postLikeComment", res);
						})
					} else {
						this.commentList[reply_flag].like_num--;
					}
				} else {
					this.commentList[reply_flag].like_flag = !this.commentList[reply_flag].like_flag;
				}

			},
			submit() {
				console.log(this.replyContent);
				//回车发送评论
				api.postComment({
					sid: this.sid,
					detail: this.replyContent
				}).then(res => {
					console.log("postComment", res);
				});
			},
			test() {
				console.log(this.detailStatus)
			}
		},
		props: {
			p_commentList: Array,
			storyPageType: Boolean,
		},
		mounted() {
			//console.log(this.commentList);
		}
	}
</script>

<style>
	.icon {
		width: 20px;
		height: 20px;
	}

	#avl_comment>view:nth-child(1) {
		margin: 0 auto;
		padding: 5%;
		border-radius: 20px 20px 0px 0px;
		max-height: 320px;
		overflow: auto;
	}

	#avl_comment>view:nth-child(2) {
		background-color: #437796;
		padding: 3%;

	}

	.scollComment {
		background-color: #437796;
		padding: 3%;
		width: 100vw;
		position: fixed;
		left: 0;
		bottom: 0;
	}

	input {
		background-color: #FFFFFF;
		padding: 2%;
		box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
		opacity: 1;
		border-radius: 10px;
	}

	.comment {
		margin: 3% 0;
	}

	.comment>image {
		width: 40px;
		height: 40px;
		border-radius: 14px;
		margin-right: 5%;
	}

	.comment>span {
		display: inline-block;
		vertical-align: top;
	}

	.comment>span:nth-of-type(2) {
		float: right;
	}

	.comment>span>view:nth-child(1) {
		color: #437796;
	}

	.comment>span>view:nth-child(2) {
		margin-top: 5%;
	}
</style>
