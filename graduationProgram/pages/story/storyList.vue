<template>
	<view>
		<!-- 地点 -->
		<button class="button">{{placeData}}</button>
		<view v-for="(item, idx) in storyList" :key="idx">
			<view class="content">
				<!--个人信息、发送时间 需要动态绑定-->
				<view class="info">
					<image :src="item.avatar" mode="aspectFit"></image>
					<span style="display: inline-block;">
						<view>{{ item.usrname}}</view>
						<view>{{ item.time}}</view>
					</span>
				</view>

				<!--故事内容-->
				<view class="textContent" auto>
					<view>{{item.storyContent.length>20?item.storyContent.substring(0, 20) + "...":item.storyContent}}</view>
					<view style="color: #437796;">
						<span @click="toViewMore(idx)" style="position: flex;right: 10%;">查看详情</span>
					</view>
				</view>

				<!--图片内容-->
				<view class="userImage">
					<view v-for="(image,index) in item.imgList" :key="index">
						<image mode="aspectFill" class="displayImage" :src="image" @tap="_previewImage(`${image}`)"
						:style="{marginLeft: item.imgList.length<=4? '2vw' : '0.5vw'}"></image>
					</view>
				</view>
				<!-- <view class="src">
				
				
				margin-left: 2vw;
					<u-swiper class="storySrc" :list="picList" :autoplay="false" :circular="false" img-mode="aspectFill" @click="viewPic"></u-swiper>
				</view> -->
				<!--标签-->
				<view>
					<view style="margin-top: 10px;">
						<span v-for="(tag,idx2) in item.tags" class="tag" style="margin-right: 10px;" v-bind:key="idx2">#{{tag}}</span>
					</view>
				</view>
				<!--功能-->
				<view class="function">
					<image src="../../static/story/icon/comment.png" class="icon" @click="reply(idx)">{{item.comment_num}}</image>
					<span>
						<image :src="item.like_flag==true? like_after_icon : like_icon" class="icon" @click="like(idx)">{{item.like_num}}</image>
					</span>
					<image :src="item.mark_flag==true? mark_after_icon : mark_icon" class="icon" @click="mark(idx)"></image>

				</view>

				<view style="clear: both;"></view>
			</view>
			<!--评论区-->
			<comment-pop :p_sid="item.sid" :p_commentList="item.commentList" :ref="'comment_pop'+idx"></comment-pop>

		</view>

	</view>
</template>

<script>
	import singlestory from '../story/singleStory_component.vue'
	import api from '../../api/story/api.js'
	import commentPop from '../story/comment_pop_component.vue'
	export default {
		data() {
			return {
				placeData: '大学城校区-A1教学楼', //从搜索页进入
				storyList: [],
				imageWidth: '100%',
				imageHeight: '320rpx', //图片尺寸

				//静态资源
				mark_icon: '../../static/story/icon/mark.png',
				mark_after_icon: '../../static/story/icon/mark_after.png',
				like_icon: '../../static/story/icon/like.png',
				like_after_icon: '../../static/story/icon/like_after.png',
			}
		},
		methods: {
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
			toViewMore(idx) {
				//console.log(this.storyKey,idx, "cccc");
				uni.navigateTo({
					url: `storyDetails?locationName=${this.placeData}&idx=${idx}`,
				});
			},
			reply(idx) {
				//console.log(this.$refs[`comment_pop${idx}`][0])
				this.$refs[`comment_pop${idx}`][0].reply();
			},
			mark(idx) {
				this.storyList[idx].mark_flag = !this.storyList[idx].mark_flag;
				if (this.storyList[idx].mark_flag == true) {
					api.postMarkStory({
						sid: this.storyList[idx].sid
					}).then(res => {
						console.log("postMarkStory", res);
					})
				} else {
					api.postCancelMarkStory({
						sid: this.storyList[idx].sid
					}).then(res => {
						console.log("postCancelMarkStory", res);
					})
				}
			},
			like(idx) {
				this.storyList[idx].like_flag = !this.storyList[idx].like_flag;
				if (this.storyList[idx].like_flag == true) {
					this.storyList[idx].like_num++;
					api.postLikeStory({
						sid: this.storyList[idx].sid
					}).then(res => {
						console.log("postLikeStory", res.data);
					});
				} else {
					this.storyList[idx].like_num--;
					api.postCancelLikeStory({
						sid: this.storyList[idx].sid
					}).then(res => {
						console.log("postCancelLikeStory", res.data);
					});
				}


			},
		},
		onShow(option) {
			this.placeData = option.place;
			console.log("place:",placeData);
			this.storyList = [];//清空刷新
			api.getStory({
				location_name: this.placeData,
				page_id: 1,
			}).then(res => {
				console.log("storyList", res);
				const flag = 0;
				const temp = JSON.parse(JSON.stringify(res.data.storyList));
				for (let i = 0; i < temp.length; i++) {
					let temp_avatar = '../../static/avatar_miss.jpg'; //匿名头像，有点问题
					let temp_name = '匿名用户';
					if (temp[i].isShow) { //实名，有这两个属性
						temp_avatar = temp[i].avatar;
						temp_name = temp[i].username;
					}
					api.getComments({
						sid: temp[i].sid,
						page_id: 1
					}).then(res2 => {
						console.log("storyListComments", i, temp[i], res2)
						const templist = JSON.parse(JSON.stringify(res2.data.discussList));
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
						temp[i].tempCommentList = tempCommentList
						//console.log(temp[i], 'temp[i]')
						const k = i;
						this.storyList.push({
							sid: temp[k].sid,
							usrname: temp_name, //未获取，根据匿名状况判断
							avatar: temp_avatar, //根据匿名状况判断
							time: temp[k].pubDate,
							tags: temp[k].tagsList, //"tagsList": ["青春回忆"],
							storyContent: temp[k].detail,
							imgList: temp[k].showImgList,
							comment_num: temp[k].tempCommentList.length,
							mark_flag: temp[k].collectFlag,
							like_flag: temp[k].goodFlag,
							like_num: temp[k].goodCount,
							commentList: temp[k].tempCommentList,
						});
						console.log('this.storyList[k].avatar',this.storyList[k].avatar)


					});
				}
			})
			//获取发布人昵称、头像、发布日期、标签、点赞、评论、收藏
			const provider = {
				place: this.placeData,
				listInfo: this.storyList
			};
			this.$store.commit('initializeStoryList', provider);
		},
		components: {
			singlestory,
			commentPop
		}
	}
</script>

<style>
	.button {
		font-family: FZCHSJW--GB1-0;
		width: 600rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-weight: bold;
		border-radius: 40rpx;
		background-color: #E2ECFF;
		margin-top: 30rpx;
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
		margin-left: 3vw;
		margin-top: 2vh;
		overflow: hidden;
	}

	.displayImage {
		height: 30vw;
		width: 30vw;
	}
	/*.

	.displayImage:nth-child(2):nth-last-child(3){
		height: 30vw;
		width: 30vw;
	    margin-right: 45vw;
		object-fit: cover;
	}
*/
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
