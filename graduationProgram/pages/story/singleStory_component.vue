<template>
	<view>
		<view class="content">
			<!--个人信息、发送时间 需要动态绑定-->
			<view class="info">
				<image src="../../static/story/test/ana.jpg" mode="aspectFit"></image>
				<span style="display: inline-block;">
					<view>{{ usrname}}</view>
					<view>{{ time}}</view>
				</span>
			</view>

			<!--故事内容-->
			<view class="textContent" auto>
				<view>{{showBtn?sliceStr:storyContent}}</view>
				<view @click="showBtn=!showBtn" style="color: #437796;margin-top: 5px;">{{showBtn?"全文":"收起"}}</view>
			</view>

			<!--图片内容-->
			<view class="userImage">
				<view v-for="(image,index) in userImages" :key="index" class="displayImage" :style="{width:imageWidth}">
					<image :src="image " :style="{width:'100%',height:imageHeight}" @tap="_previewImage(`${image}`)"></image>
				</view>
			</view>
			<!-- <view class="src">
			<u-swiper class="storySrc" :list="picList" :autoplay="false" :circular="false" img-mode="aspectFill" @click="viewPic"></u-swiper>
		</view> -->
			<!--标签-->
			<view>
				<view style="margin-top: 10px;">
					<span v-for="(item,idx) in tags" class="tag" style="margin-right: 10px;" v-bind:key="idx">#{{item}}</span>
				</view>
			</view>
			<!--功能-->
			<view class="function">
				<image src="../../static/story/icon/comment.png" class="icon" @click="reply">{{comment_num}}</image>
				<span>
					<image :src="like_flag==true? like_after_icon : like_icon" class="icon" @click="like()">{{like_num}}</image>
				</span>
				<image :src="mark_flag==true? mark_after_icon : mark_icon" class="icon" @click="mark"></image>

			</view>

			<view style="clear: both;"></view>
		</view>
		<!--评论区-->
		<comment-pop :p_commentList="commentList" ref="comment_pop"></comment-pop>

	</view>
</template>

<script>
	import commentList from '../story/comment_list_component.vue'
	import commentPop from '../story/comment_pop_component.vue'
	import api from '../../api/story/api.js'
	export default {
		data() {
			return {
				detailStatus: this.storyPageType, //true: details, false: list
				sid: this.p_sid,
				usrname: this.p_usrname,
				time: this.p_time,
				tags: this.p_tags,
				showBtn: true,
				maxLen: 20,
				// 图片内容
				userImages: [
					'../../static/search/images/3.jpg',
					'../../static/search/images/4.jpg',
					'https://iccem0.oss-cn-shenzhen.aliyuncs.com/105.jpg',
					'https://iccem0.oss-cn-shenzhen.aliyuncs.com/105.jpg',
					// 'https://iccem0.oss-cn-shenzhen.aliyuncs.com/105.jpg',
					// 'https://iccem0.oss-cn-shenzhen.aliyuncs.com/105.jpg',
					// 'https://iccem0.oss-cn-shenzhen.aliyuncs.com/105.jpg',
					// 'https://iccem0.oss-cn-shenzhen.aliyuncs.com/105.jpg',
					// 'https://iccem0.oss-cn-shenzhen.aliyuncs.com/105.jpg',
				],
				imageWidth: '100%',
				imageHeight: '320rpx',
				storyContent: this.p_storyContent,
				comment_num: this.p_comment_num,
				mark_flag: this.p_mark_flag, //获取用户数据
				like_flag: this.p_like_flag, //获取用户数据
				like_num: this.p_like_num,
				mark_icon: '../../static/story/icon/mark.png',
				mark_after_icon: '../../static/story/icon/mark_after.png',
				like_icon: '../../static/story/icon/like.png',
				like_after_icon: '../../static/story/icon/like_after.png',
				replyContent: '',
				commentList: this.p_commentList,
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
			reply() {
				if (this.detailStatus != true) {
					this.$refs.comment_pop.reply();
				}
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
							console.log("postLikeStory", res);
						});
					} else {
						this.like_num--;
						api.postCancelLikeStory({
							sid: this.sid
						}).then(res => {
							console.log("postCancelLikeStory", res);
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
				console.log(this.replyContent);
				//回车发送评论
			},
		},
		onLoad() {
			//获取发布人昵称、头像、发布日期、标签、点赞、评论、收藏
		},
		computed: {
			sliceStr() {
				if (this.storyContent != null) {
					return this.storyContent.substring(0, this.maxLen) + "...";
				}
				return '';
			},

		},
		props: {
			storyPageType: Boolean,
			p_sid: Number,
			p_usrname: String,
			p_time: String,
			p_tags: Array,
			p_storyContent: String,
			p_comment_num: Number,
			p_mark_flag: Boolean,
			p_like_flag: Boolean,
			p_like_num: Number,
			p_commentList: Array,
		},
		components: {
			commentPop,
			commentList
		}
	}
</script>

<style>
	@font-face {
		font-family: "FZCuHeiSongS-B-GB";
		src: url("../../static/story/font/fzchsjwgb10_downyi.com.TTF");
	}

	.content {
		width: 95%;
		margin: 0 auto;
		margin-top: 15px;
		border-bottom: 1px solid #808080;
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
	}

	.displayImage {
		width: 32% !important;
		height: 320rpx !important;

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
