<template>
	<view>
		<u-popup v-model="popup" mode="bottom" backgroundColor="#F4F6FA" @close="$emit('fixBackground')">
			<view class="avl_comment">
				<view style="overflow: visible">
					<view class="contentComment">
						<view v-if="commentList.length==0">
							还没有回复哦～来发表你的回复吧！
						</view>
						<view v-else>
							仅显示最新评论，更多可到详情中查看哦~
							<view class="comment" v-for="(item, idx) in commentList" :key="idx">
								<image :src="item.headPic"></image>
								<span style="width: 70%;">
									<view>{{item.name}}</view>
									<span>{{item.content}}</span>
								</span>
								<span>
									<image :src="item.like_flag==true? like_after_icon : like_icon" class="icon" @click="like(idx)">{{item.like_num}}</image>
								</span>
							</view>
							<uni-load-more v-if="currLength >= 8" :loadingType="loadingType" :contentText="contentText"></uni-load-more>
						</view>
					</view>

					<view class="scollComment">
						<input placeholder="一起来分享你的回忆吧~" v-model="replyContent" @confirm="submit" />
					</view>

				</view>

			</view>
		</u-popup>
		
	</view>
</template>

<script>
	import uniLoadMore from '../components/uni-load-more.vue'
	//import comments from '../story/comment_component.vue'
	import api from '../../api/story/api.js'
	export default {
		data() {
			return {
				popup: false,
				sid: this.p_sid,
				commentList: this.p_commentList,
				replyContent: '',
				like_icon: '../../static/story/icon/like.png',
				like_after_icon: '../../static/story/icon/like_after.png',

				page_id: 1,
				currLength: 0,
				loadingText: '加载中...',
				loadingType: 0, //定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多了哦'
				},
			}
		},
		methods: {
			reply() {
				this.popup = true;
			},
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
				// console.log(this.replyContent, 'replyContent');
				// console.log(this.sid, 'sid');
				//回车发送评论replyContent
				api.postComment({
					sid: this.sid,
					data: {
						"detail": this.replyContent
					}
				}).then(res => {
					console.log("pubComment", res.data);
					// api.getComments({
					// 	sid: this.sid,
					// 	page_id: 1
					// }).then(res2 => {
					// 	//console.log("storyListComments", res2)
					// 	const templist = JSON.parse(JSON.stringify(res2.data.discussList));
					// 	this.commentList = [];
					// 	for (var j = 0; j < templist.length; j++) {
					// 		this.commentList.push({
					// 			did: templist[j].did,
					// 			headPic: templist[j].avatar,
					// 			name: templist[j].username,
					// 			content: templist[j].detail,
					// 			like_num: templist[j].count,
					// 			like_flag: templist[j].goodFlag,
					// 		});
					// 	}
					// 	this.$emit("updateComment",[this.idx,this.commentList]);
					this.$emit("updateComment",this.idx);
					this.replyContent = "";
					// });
				});
			},
			getmorenews: function() {
				if (this.loadingType !== 0) { //loadingType!=0;直接返回  加载方式 0---contentdown  1---contentrefresh 2---contentnomore
					return false;
				}
				this.page_id += 1;
				this.loadingType = 1;
				uni.showNavigationBarLoading(); //显示加载动画
				const _self = this
				console.log("getMore", this.page_id);
				api.getComments({
					sid: this.sid,
					page_id: this.page_id
				}).then(res => {
					if (res.data) {
						if (res.data.discussList.length != 0){
							const templist = JSON.parse(JSON.stringify(res.data.discussList));
							for (let j = 0; j < templist.length; j++) {
								_self.commentList.push({
									did: templist[j].did,
									headPic: templist[j].avatar,
									name: templist[j].username,
									content: templist[j].detail,
									like_num: templist[j].count,
									like_flag: templist[j].goodFlag,
								});
							}
							_self.currLength = this.commentList.length
							_self.loadingType = 0;
						} else{
							_self.loadingType = 2;
							_self.page_id--;
							console.log("botton page", this.page_id);
							uni.showToast({
								icon: 'none',
								title: '没有更多了哦！'
							});
						}
					} else{
						uni.showToast({
							icon:'loading',
							title:'获取失败！'
						})
					}
				}).catch(err => {
					console.log(err)
				});
			},
		},
		// onShow() {
			
		// },
		onReachBottom: function() {
			console.log('bottom!')
			//this.getMoreNews();
		},
		props: {
			idx: Number,
			p_commentList: Array,
			p_sid: Number,
		},
		components: {
			uniLoadMore,
			//comments
		},
		watch: {
			p_sid(val){
				this.sid = this.p_sid;
				//console.log("listComponent Sid in list_component created", this.sid);
			},
			p_commentList(val) {
				this.commentList = val;
				//console.log("this.p_commentList in list_component", this.p_commentList);
		
			}
		}
	}
</script>

<style>
	.icon {
		width: 20px;
		height: 20px;
	}

	.avl_comment>view:nth-child(1) {
		margin: 0 auto;
		padding: 5%;
		border-radius: 20px 20px 0px 0px;
		max-height: 60vh;
		overflow: auto;
	}

	.avl_comment>view:nth-child(2) {
		background-color: #437796;
		padding: 3%;

	}

	.contentComment {
		margin: 0 1vw 10vh 1vw;
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

	.scollComment>input {
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
