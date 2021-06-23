<template>
	<view>
		<view class="content">
			<!--个人信息、发送时间 需要动态绑定-->
			<view class="info">
				<image :src="avatarUrl" mode="aspectFit"></image>
				<span style="display: inline-block;">
					<view>{{ usrname}}</view>
					<view>{{ time}}</view>
				</span>
			</view>

			<!--故事内容-->
			<view class="textContent" auto>
				<view>{{showBtn?sliceStr:storyContent}}</view>
				<view style="color: #437796;margin-top: 5px;">
					<span @click="showBtn=!showBtn">{{showBtn?"全文":"收起"}}</span>
					<span v-if="detailStatus==false" @click="toViewMore(p_idx)" style="position: absolute;right: 10%;">查看详情</span>
				</view>
			</view>

			<!--图片内容-->
			<view class="userImage">
				<view v-for="(image,index) in imgList" :key="index" class="displayImage" :style="{width:imageWidth}">
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
		<comment-pop v-if="detailStatus==false" :p_sid="sid" :p_commentList="commentList" ref="comment_pop"></comment-pop>

	</view>
</template>

<script>
	import commentList from '../story/comment_list_component.vue'
	import commentPop from '../story/comment_pop_component.vue'
	import api from '../../api/story/api.js'
	export default {
		data() {
			return {
				storyKey:this.p_key,
				detailStatus: this.storyPageType, //true: details, false: list
				sid: this.p_sid,
				idx: this.p_idx,
				location_name: this.p_locationName,
				usrname: this.p_usrname,
				avatarUrl: this.p_avatarUrl,
				time: this.p_time,
				tags: this.p_tags,
				showBtn: true,
				maxLen: 20,
				// 图片内容
				imgList: this.p_imgList,
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
			toViewMore(idx){
				console.log(this.storyKey,idx, "cccc");
				uni.navigateTo({
					url:`storyDetails?locationName=${this.location_name}&idx=${idx}`,
				});
			},
			/*
			viewPic(e) {
				let url = [];
				for (let i = 0; i < this.picList.length; i++) {
					url.push(this.picList[i].image);
				}
				uni.previewImage({
					urls: url,
					current: e
				});
			},*/
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
			like(reply_flag = -1){
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
			/*
			submit() {
				console.log(this.replyContent,'replyContent');
				//回车发送评论replyContent
				api.postComment({
					sid: this.sid,
					data:{
						"detail": this.replyContent
					}
				}).then(res => {
					console.log("pubComment", res.data);
				});
			},*/
		},
		onReady() {
			//console.log(this.p_locationName ," bbbb");locationName
			const locationName=this.storyKey.locationName;
			const idx=this.storyKey.idx;
			console.log(idx,'idx');
			console.log(this.storyKey,'storykey');
			for(var i=0;i<this.$store.state.storyList.length;i++){
				if(this.$store.state.storyList[i].location_name==locationName){
					console.log(this.$store.state.storyList[i],"store.list location YES");
					console.log(this.$store.state.storyList[i].list[idx],'store list[i]');
					this.sid=this.$store.state.storyList[i].list[idx].sid;
					this.usrname=this.$store.state.storyList[i].list[idx].usrname;
					this.avatarUrl=this.$store.state.storyList[i].list[idx].avatar;
					this.time=this.$store.state.storyList[i].list[idx].time;
					this.tags=this.$store.state.storyList[i].list[idx].tags;
					this.storyContent=this.$store.state.storyList[i].list[idx].storyContent;
					this.imgList=this.$store.state.storyList[i].list[idx].imgList,
					this.comment_num=this.$store.state.storyList[i].list[idx].comment_num;
					this.mark_flag=this.$store.state.storyList[i].list[idx].mark_flag;
					this.like_flag=this.$store.state.storyList[i].list[idx].like_flag;
					this.like_num=this.$store.state.storyList[i].list[idx].like_num;
				}
			}
			//获取发布人昵称、头像、发布日期、标签、点赞、评论、收藏
			console.log(this.storyContent,'aaa');
		},
		onLoad() {
			//console.log(this.p_locationName ," bbbb");locationName
			const locationName=this.storyKey.locationName;
			const idx=this.storyKey.idx;
			console.log(idx,'idx');
			console.log(this.storyKey,'storykey');
			for(var i=0;i<this.$store.state.storyList.length;i++){
				if(this.$store.state.storyList[i].location_name==locationName){
					console.log(this.$store.state.storyList[i],"store.list location YES");
					console.log(this.$store.state.storyList[i].list[idx],'store list[i]');
					this.sid=this.$store.state.storyList[i].list[idx].sid;
					this.usrname=this.$store.state.storyList[i].list[idx].usrname;
					this.avatarUrl=this.$store.state.storyList[i].list[idx].avatar;
					this.time=this.$store.state.storyList[i].list[idx].time;
					this.tags=this.$store.state.storyList[i].list[idx].tags;
					this.storyContent=this.$store.state.storyList[i].list[idx].storyContent;
					this.imgList=this.$store.state.storyList[i].list[idx].imgList,
					this.comment_num=this.$store.state.storyList[i].list[idx].comment_num;
					this.mark_flag=this.$store.state.storyList[i].list[idx].mark_flag;
					this.like_flag=this.$store.state.storyList[i].list[idx].like_flag;
					this.like_num=this.$store.state.storyList[i].list[idx].like_num;
				}
			}
			//获取发布人昵称、头像、发布日期、标签、点赞、评论、收藏
			console.log(this.storyContent,'aaa');
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
			p_key:Object,
			storyPageType: Boolean,
			p_sid: Number,//故事id
			p_idx: Number,//在这个地点的story索引
			p_locationName: String,
			p_usrname: String,
			p_time: String,//
			p_tags: Array,//标签
			p_storyContent: String,//内容
			p_imgList: Array,//图片
			p_comment_num: Number,
			p_mark_flag: Boolean,
			p_like_flag: Boolean,
			p_like_num: Number,//点赞数
			p_commentList: Array,//评论
			//p_isShow: Boolean,//匿名
			p_avatarUrl: String,//头像
		},
		watch:{
			like_flag(val){
				this.like_flag=val;
			}
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
