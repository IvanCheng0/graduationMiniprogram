<template>
	<view class="content">
		<!--布尔传参不能用驼峰命名^^-->
		<view class="info">
			<image :src="avatar" mode="aspectFit"></image>
			<span style="display: inline-block;">
				<view>{{ usrname}}</view>
				<view>{{ time}}</view>
			</span>
		</view>

		<!--故事内容-->
		<view class="textContent" auto>
			<view>{{storyContent}}</view>
			<view style="color: #437796;margin-top: 5px;">
			</view>
		</view>

		<!--图片内容-->
		<view class="userImage">
			<view v-for="(image,index) in imgList" :key="index">
				<image mode="aspectFill" class="displayImage" :src="image" @tap="_previewImage(`${image}`)" :style="{marginLeft:imgList.length==1||imgList.length==2||imgList.length==4? '1.5vw' : '0.5vw'}"></image>
			</view>
		</view>
		<view>
			<view style="margin-top: 10px;">
				<span v-for="(item,idx) in tags" class="tag" style="margin-right: 10px;" v-bind:key="idx">#{{item}}</span>
			</view>
		</view>
		<!--功能-->
		<view class="function">
			<!--<image src="../../static/story/icon/comment.png" class="icon">{{comment_num}}</image>-->
			<image src="../../static/story/icon/comment.png" class="icon">{{comment_num}}</image>
			<span>
				<image :src="like_flag==true? like_after_icon : like_icon" class="icon" @click="like()">{{like_num}}</image>
			</span>
			<image :src="mark_flag==true? mark_after_icon : mark_icon" class="icon" @click="mark"></image>

		</view>

		<view style="clear: both;"></view>
		<!--评论区-->
		<view style="border-top: 1px solid #808080;">
			<comment-list :p_sid="sid" :p_commentList="commentList"
			:p_locationID="locationID" :p_idx="idx" @updateComment="updateCommentList"></comment-list>
		</view>
		<uni-load-more v-if="currLength >= 8" :loadingType="loadingType" :contentText="contentText"></uni-load-more>

	</view>
</template>

<script>
	import uniLoadMore from '../components/uni-load-more.vue'
	import commentList from '../story/comment_list_component.vue'
	import api from '../../api/story/api.js'
	export default {
		data() {
			return {
				usrname: '',
				avatar: '',
				time: '',
				tags: [],
				storyContent: '',
				imgList: [],
				sid: 0,
				comment_num: 0,
				mark_flag: false,
				like_flag: false,
				like_num: 0,
				replyContent: '',
				commentList: [],
				mark_icon: '../../static/story/icon/mark.png',
				mark_after_icon: '../../static/story/icon/mark_after.png',
				like_icon: '../../static/story/icon/like.png',
				like_after_icon: '../../static/story/icon/like_after.png',
				
				//page_id: 1,
				locationID: 0,
				idx: -1,
				
				page_id: 1,
				loadingText: '正在努力加载中...',
				loadingType: 0, //定义加载方式 0---contentdown  1---contentfresh  2---contentnomore
				contentText: {
					contentdown: '上拉显示更多',
					contentfresh: '正在加载中...',
					contentnomore: '没有更多了哦'
				}
			}
		},
		methods: {
			// changeCommentNum(){
			// 	this.comment_num++;
			// },
			viewPic(e) {
				let url = [];
				for (let i = 0; i < this.picList.length; i++) {
					url.push(this.picList[i].image);
				}
				uni.previewImage({
					urls: url,
					current: e
				});
			},
			// 点击放大图片
			_previewImage(image) {
				console.log(image)
				var imgArr = [];
				imgArr.push(image);
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[0]
				});
			},

			mark() {
				this.mark_flag = !this.mark_flag;
				if (this.mark_flag == true) {
					api.postMarkStory({
						sid: this.sid
					}).then(res => {
						console.log("postMarkStory", res);
					})
				} else {
					api.postCancelMarkStory({
						sid: this.sid
					}).then(res => {
						console.log("postCancelMarkStory", res);
					})
				}
			},
			like(reply_flag = -1) {
				if (reply_flag == -1) {
					this.like_flag = !this.like_flag;
					if (this.like_flag == true) {
						this.like_num++;
						api.postLikeStory({
							sid: this.sid
						}).then(res => {
							console.log("postLikeStory", res.data);
						});
					} else {
						this.like_num--;
						api.postCancelLikeStory({
							sid: this.sid
						}).then(res => {
							console.log("postCancelLikeStory", res.data);
						});
					}
				} else {
					this.commentList[reply_flag].like_flag = !this.commentList[reply_flag].like_flag;
					if (this.commentList[reply_flag].like_flag == true) {
						api.postLikeComment({
							did: this.commentList[reply_flag].did
						}).then(res => {
							console.log("postLikeComment", res);
						});
					} else {
						api.postCancelLikeComment({
							did: this.commentList[reply_flag].did
						}).then(res => {
							console.log("postCancelLikeComment", res);
						});
					}
				}

			},
			updateCommentList(){
				this.comment_num++;
				//console.log((this.comment_num / 8)+1)
				let page = parseInt((this.comment_num / 8) + 1);
				let i = this.comment_num % 8;// == 0? 0 : (this.storyList[idx].comment_num % 8)-1;
				if(i == 0){
					if(this.comment_num != 0){
						page--;i = 7;
					}
				} else{
					i--;
				}
				api.getComments({
					sid: this.sid,
					page_id:  page
					//page_id: this.page_id
				}).then(res => {
					console.log("uupdate",res)
					const templist = JSON.parse(JSON.stringify(res.data.discussList));
					this.commentList.push({
							did: templist[i].did,
							headPic: templist[i].avatar,
							name: templist[i].username,
							content: templist[i].detail,
							like_num: templist[i].count,
							like_flag: templist[i].goodFlag,
						});
				});
				
			},
			getmorenews:function(){
				if (this.loadingType !== 0) {
					return false;
				}
				this.loadingType = 1;
				uni.showNavigationBarLoading();
				const _self = this;
				api.getComments({
					sid: this.sid,
					page_id: this.page_id
				}).then(res => {
					if (res.data){
						if (res.data.discussList.length != 0) {
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
							console.log("get more",this.page_id);
							_self.page_id++;
							_self.currLength = _self.commentList.length
							_self.loadingType = 0;
							console.log("after get more",this.page_id);
							//this.$emit("updateComment",[this.idx,this.commentList]);
						} else{
							_self.loadingType = 2;
							_self.page_id--;
							console.log("botton page", this.page_id);
							uni.showToast({
								icon: 'none',
								title: '没有更多了哦！'
							});
						}
					} else {
						uni.showToast({
							icon: 'loading',
							title: '获取失败！'
						})
					}
				
				}).catch(err => {
					console.log(err)
				});
				//console.log("after get more",this.page_id);
			}
		},
		onLoad() {
		},
		onShow() {
			let pages = getCurrentPages();
			let currentPage = pages[pages.length-1];
			this.sid = Number(currentPage.options.sid);
			api.getSingleStory({
				sid: this.sid
			}).then(res =>{
				console.log("res", res, "this.sid", this.sid);
				const temp = JSON.parse(JSON.stringify(res.data.data));
				// let temp_avatar = '../../static/avatar_miss.jpg';
				// let temp_name = '匿名用户';
				// if (temp.isShow===true) { //实名，有这两个属性
				// 	temp_avatar = temp.avatar;
				// 	temp_name = temp.username;
				// }
				this.usrname = temp.username;
				this.avatar = temp.avatar;
				this.time = temp.pubDate;
				this.tags = temp.tagsList;
				this.storyContent = temp.detail;
				this.imgList = temp.showImgList;
				this.mark_flag = temp.collectFlag;
				this.like_flag = temp.goodFlag;
				this.like_num = temp.goodCount;
				this.comment_num = temp.discussCount;
				//this.commentList = temp.commentList;
				api.getComments({
					sid: this.sid,
					page_id: this.page_id
				}).then(res2 => {
					//console.log("storyListComments", i, temp[i], res2)
					const templist = JSON.parse(JSON.stringify(res2.data.discussList));
					//console.log('templist', templist)
					const tempCommentList = [];
					for (let j = 0; j < templist.length; j++) {
						tempCommentList.push({
							did: templist[j].did,
							headPic: templist[j].avatar,
							name: templist[j].username,
							content: templist[j].detail,
							like_num: templist[j].count,
							like_flag: templist[j].goodFlag,
						});
					}
					this.commentList = tempCommentList;
				});
				this.page_id++;
			})
		},
		onReachBottom() {
			console.log('bottom!')
			this.getmorenews();
		},
		components: {
			commentList
		}
	}
</script>

<style>
	.content {
		width: 97%;
		margin: 0 auto;
		margin-top: 15px;
		font-family: 'Segoe UI';
	}

	.content>view {
		margin-top: 10px;
	}

	.info>image {
		width: 50px;
		height: 50px;
		box-shadow: 1px 2px 2px #C1C6CF;
		border-radius: 50%;
		margin-left: 2.5vw;
	}

	.info>span {
		margin-left: 8px;
		margin-top: 5px;
		vertical-align: top;
	}

	.info>span>view:nth-child(1) {
		font-size: 16px;
	}

	.info>span>view:nth-child(2) {
		font-size: 12px;
		margin-top: 5px;
		opacity: 0.6;
	}

	.textContent {
		width: 90%;
		margin: auto;
	}

	/* 图片展示 */
	.userImage {
		display: flex;
		flex-wrap: wrap;
		margin-left: 3vw;
		margin-top: 2vh;
		overflow: hidden;
	}

	.displayImage {
		height: 30vw;
		width: 30vw;
	}


	.storySrc {
		border-radius: 9px;
		padding: 5px;
		height: 250rpx;
		/*换行！*/
		background: #EEEEEE;
		box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.16);
		width: 90%;
		margin: 0 auto;
	}

	.tag {
		color: #ACACAC;
		background: #FFFBF2;
		border-radius: 15px;
		border: 1px solid #FFFBF2;
		box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.16);

		display: inline-block;
		padding: 8px;
		margin: 5px;

	}

	.function {
		float: right;
		margin-bottom: 10px;
		width: 45%;
		text-align: center;
	}

	.icon {
		width: 20px;
		height: 20px;
	}

	.function>span {
		margin: 0px 12%;
	}
</style>
