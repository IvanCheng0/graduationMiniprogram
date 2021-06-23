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
				<image mode="aspectFill" class="displayImage" :src="image"  @tap="_previewImage(`${image}`)"></image>
			</view>
		</view>
		<view>
			<view style="margin-top: 10px;">
				<span v-for="(item,idx) in tags" class="tag" style="margin-right: 10px;" v-bind:key="idx">#{{item}}</span>
			</view>
		</view>
		<!--功能-->
		<view class="function">
			<image src="../../static/story/icon/comment.png" class="icon">{{comment_num}}</image>
			<span>
				<image :src="like_flag==true? like_after_icon : like_icon" class="icon" @click="like()">{{like_num}}</image>
			</span>
			<image :src="mark_flag==true? mark_after_icon : mark_icon" class="icon" @click="mark"></image>

		</view>

		<view style="clear: both;"></view>
		<!--评论区-->
		<view>
			<comment-list :p_sid="sid" :p_commentList="commentList"></comment-list>
		</view>

	</view>
</template>

<script>
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
				like_num: 50,
				replyContent: '',
				commentList: [],
				mark_icon: '../../static/story/icon/mark.png',
				mark_after_icon: '../../static/story/icon/mark_after.png',
				like_icon: '../../static/story/icon/like.png',
				like_after_icon: '../../static/story/icon/like_after.png',

			}
		},
		methods: {
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
			submit() {
				console.log(this.replyContent, 'replyContent');
				//回车发送评论replyContent
				api.postComment({
					sid: this.sid,
					data: {
						"detail": this.replyContent
					}
				}).then(res => {
					console.log("pubComment", res.data);
					this.replyContent = '';
				});
			},
		},
		onLoad(option) {
			//console.log(option,"option0");
			console.log(this.$store.state, "aaaa")
			const locationName = option.locationName;
			console.log("locationName",locationName);
			const idx = option.idx;
			for (var i = 0; i < this.$store.state.storyList.length; i++) {
				console.log("$store.location_name",this.$store.state.storyList[i].location_name);
				if (this.$store.state.storyList[i].location_name == locationName) {
					//console.log(this.$store.state.storyList[i], "store.list location YES");
					//console.log(this.$store.state.storyList[i].list[idx], 'store list[i]');
					this.sid = this.$store.state.storyList[i].list[idx].sid;
					this.usrname = this.$store.state.storyList[i].list[idx].usrname;
					this.avatar = this.$store.state.storyList[i].list[idx].avatar;
					this.time = this.$store.state.storyList[i].list[idx].time;
					this.tags = this.$store.state.storyList[i].list[idx].tags;
					this.storyContent = this.$store.state.storyList[i].list[idx].storyContent;
					this.imgList = this.$store.state.storyList[i].list[idx].imgList;
					this.comment_num = this.$store.state.storyList[i].list[idx].comment_num;
					this.mark_flag = this.$store.state.storyList[i].list[idx].mark_flag;
					this.like_flag = this.$store.state.storyList[i].list[idx].like_flag;
					this.like_num = this.$store.state.storyList[i].list[idx].like_num;
					this.commentList = this.$store.state.storyList[i].list[idx].commentList;
				}
				console.log("this.commentList",this.commentList);
				//console.log("this.avatar",this.avatar);
			}
			
		},

		components: {
			commentList
		}
	}
</script>

<style>
	.content {
		width: 95%;
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
		font-size: 8px;
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
		margin-left: 30rpx;
		margin-top: 2vh;
		overflow: hidden;
	}
	
	.displayImage {
		height: 30vw;
		width: 30vw;
		margin-left: 1vw;
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
