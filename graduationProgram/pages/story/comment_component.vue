<template>
	<view id="avl_comment">
		<view :style="{ overflow: detailStatus=='true'? 'auto' : 'visible'}">
			<view class="contentComment">
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
			</view>


			<view class="scollComment" v-if="detailStatus==false">
				<input placeholder="一起来分享你的回忆吧~(list)" v-model="replyContent" @confirm="submit" />
			</view>

		</view>

		<view v-if="detailStatus==true">
			<input placeholder="一起来分享你的回忆吧~" v-model="replyContent" @confirm="submit" />
		</view>
	</view>
</template>

<script>
	import api from '../../api/story/api.js'
	export default {
		data() {
			return {
				sid: this.p_sid,
				commentList: this.p_commentList,
				detailStatus: this.storyPageType,
				replyContent: '',
				like_icon: '../../static/story/icon/like.png',
				like_after_icon: '../../static/story/icon/like_after.png',
			}
		},
		methods: {
			like(reply_flag) {
				//console.log(this.commentList);
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
					api.postCancelLikeComment({
						did: this.commentList[reply_flag].did
					}).then(res => {
						console.log("postLikeComment", res);
					})
				}
			},
			submit() {
				console.log(this.replyContent, 'replyContent');
				console.log(this.sid, 'sid');
				//回车发送评论replyContent
				api.postComment({
					sid: this.sid,
					data: {
						"detail": this.replyContent
					}
				}).then(res => {
					console.log("pubComment", res.data);
					api.getComments({
						sid: this.sid,
						page_id: 1
					}).then(res2 => {
						//console.log("storyListComments", res2)
						const templist = JSON.parse(JSON.stringify(res2.data.discussList));
						this.commentList = [];
						for (var j = 0; j < templist.length; j++) {
							this.commentList.push({
								did: templist[j].did,
								headPic: templist[j].avatar,
								name: templist[j].username,
								content: templist[j].detail,
								like_num: templist[j].count,
								like_flag: templist[j].goodFlag,
							});
						}
					});
				});
			},
		},
		props: {
			p_commentList: Array,
			p_sid: Number,
			storyPageType: Boolean,
		},
		watch: {
			commentList(val) {
				this.commentList = val;
			}
		},
		onLoad() {
		},
		mounted() {
			//console.log(this.detailStatus,'status');
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
	.contentComment {
		margin: 0 2.5vw 10vh 2.5vw;
	}
	.scollComment {
		background-color: #437796;
		padding: 3%;
		width: 100vw;
		height: 9.5vh;
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