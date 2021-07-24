<template>
	<view>
		<!-- 地点 -->
		<button class="button">{{placeName}}</button>
		<view v-if="storyList.length==0" style="position: absolute;top: 30%;width: 85%;margin-left: 10%">
			<image src="../../static/dengshen.jpg" style="height: 60vw;width: 60vw;margin-left: 10%"></image>
			<view style="font-size: 20px;text-align: center;">这里还没有故事噢~快去发表吧！</view>
		</view>
		<view v-else>
			<view v-for="(item, idx) in storyList" :key="idx">
				<view class="content">
				<!-- <view class="content" :style="{height: '100%', position: fix? 'fixed' : 'static', overflow: fix?'hidden' : 'auto'}"> -->
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
							<image mode="aspectFill" class="displayImage" :src="image" @tap="_previewImage(idx,index)" :style="{marginLeft: item.imgList.length==1||item.imgList.length==2||item.imgList.length==4? '1.5vw' : '0.5vw'}"></image>
						</view>
					</view>

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
				<comment-pop :p_sid="item.sid" :p_commentList="item.commentList" :ref="'comment_pop'+idx"
				@updateComment="updateCommentList" @fixBackground="fixBackground" :idx="idx"></comment-pop>
			</view>
			<uni-load-more v-if="currLength >= 4" :loadingType="loadingType" :contentText="contentText"></uni-load-more>
		</view>
		<movable-area  class="fixed-box">
			<movable-view class="fixed-button" direction="all" :inertia="true" y="100px">
				<u-icon class="mainMenu" name="plus-circle" size="90" @click="toPostStory"></u-icon>
			</movable-view>
		</movable-area>
	</view>
</template>

<script>
	import uniLoadMore from '../components/uni-load-more.vue'
	import api from '../../api/story/api.js'
	import commentPop from '../story/comment_pop_component'
	//const refreshAsync = false;
	export default {
		data() {
			return {
				fix: false,
				refreshAsync: false,
				placeName: '', //从搜索页获取，地点名称
				placeData: 1, //从搜索页获取，地点id
				storyList: [],

				page_id: 1,
				currLength: 0,
				loadingText: '加载中...',
				loadingType: 0, //定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多了哦'
				},


				//静态资源
				mark_icon: '../../static/story/icon/mark.png',
				mark_after_icon: '../../static/story/icon/mark_after.png',
				like_icon: '../../static/story/icon/like.png',
				like_after_icon: '../../static/story/icon/like_after.png',
			}
		},
		methods: {
			// 点击放大图片
			_previewImage(imgArr_idx, idx) {
				this.refreshAsync = true;
				const imgArr = this.storyList[imgArr_idx].imgList;
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[idx]
				});
			},
			//跳转查看详情
			toViewMore(idx) {
				uni.navigateTo({
					//locationID:地点索引 idx:故事在list中的索引
					//url: `storyDetails?locationID=${this.placeData}&idx=${idx}`,
					url: `storyDetails?sid=${this.storyList[idx].sid}`,
				});
			},
			//去发布新故事 bug
			toPostStory(){
				console.log('to post new one!');
				uni.switchTab({
					url: '/pages/story/postStory',
				});
			},
			//加载更多
			getmorenews: function() {
				if (this.loadingType !== 0) { //loadingType!=0;直接返回  加载方式 0---contentdown  1---contentrefresh 2---contentnomore
					return false;
				}
				this.loadingType = 1;
				uni.showNavigationBarLoading(); //显示加载动画
				const _self = this
				//console.log("getMore", this.page_id);
				api.getStory({
					location_id: this.placeData,
					page_id: this.page_id,
				}).then(res => {
					console.log("res", res);
					if (res.data.storyList.length != 0) {
						console.log("storyList", res);
						const temp = JSON.parse(JSON.stringify(res.data.storyList));
						//console.log("temp", temp)
						for (let i = 0; i < temp.length; i++) {
							// let temp_avatar = '../../static/avatar_miss.jpg';
							// let temp_name = '匿名用户';
							// if (temp[i].isShow) { //实名，有这两个属性
							// 	temp_avatar = temp[i].avatar;
							// 	temp_name = temp[i].username;
							// }
							api.getComments({
								sid: temp[i].sid,
								page_id: 1
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
								//console.log('tempCommentList', tempCommentList)
								temp[i].tempCommentList = tempCommentList
								//console.log(temp[i].sid, 'temp[i].sid')
								this.storyList.push({
									sid: temp[i].sid,
									usrname: temp[i].username, //未获取，根据匿名状况判断
									avatar: temp[i].avatar, //根据匿名状况判断
									time: temp[i].pubDate,
									tags: temp[i].tagsList, //"tagsList": ["青春回忆"],
									storyContent: temp[i].detail,
									imgList: temp[i].showImgList,
									comment_num: temp[i].discussCount,
									mark_flag: temp[i].collectFlag,
									like_flag: temp[i].goodFlag,
									like_num: temp[i].goodCount,
									commentList: temp[i].tempCommentList,
								});
							});
						}
						_self.page_id++;
						_self.currLength = this.storyList.length
						_self.loadingType = 0;
					} else if (res.data) { //到底了
						_self.loadingType = 2;
						_self.page_id--;
						console.log("botton page", this.page_id);
						uni.showToast({
							icon: 'none',
							title: '没有更多了哦！'
						});
					} else {
						uni.showToast({
							icon: 'loading',
							title: '获取数据失败'
						});
					}
				}).catch((err) => {
					console.log(err)
				})
				const provider = {
					place: this.placeData,
					listInfo: this.storyList
				};
				this.$store.commit('updateStoryList', provider);
				console.log('update', this.$store.state.storyList);
			},

			//弹出pop评论
			reply(idx) {
				//console.log(this.$refs[`comment_pop${idx}`][0])
				this.fix = true;
				this.$refs[`comment_pop${idx}`][0].reply();
			},
			fixBackground(){
				this.fix = false;
			
			},
			//接收pop评论数据并更新
			updateCommentList(idx) {
				console.log("data:",idx);
				//data[0]: 故事在store中的索引 data[1]: 故事更新后的评论
				// for (var i = 0; i < this.$store.state.storyList.length; i++) {
				// 	if (this.$store.state.storyList[i].locationID == this.placeData) {
				// 		this.$store.state.storyList[i].list[data[0]].commentList = data[1];
				// 		this.$store.state.storyList[i].list[data[0]].comment_num++;
				// 	}
				// }
				//console.log(this.storyList);
				
				this.storyList[idx].comment_num++;
				let page = parseInt((this.storyList[idx].comment_num / 8) + 1);
				let i = this.storyList[idx].comment_num % 8;// == 0? 0 : (this.storyList[idx].comment_num % 8)-1;
				if(i == 0){
					page--;
					i = 7;
				} else{
					i--;
				}
				console.log(page)
				api.getComments({
					sid: this.storyList[idx].sid,
					page_id:  page
				}).then(res => {
					console.log("uupdate",res)
					const templist = JSON.parse(JSON.stringify(res.data.discussList));
					
					this.storyList[idx].commentList.push({
							did: templist[i].did,
							headPic: templist[i].avatar,
							name: templist[i].username,
							content: templist[i].detail,
							like_num: templist[i].count,
							like_flag: templist[i].goodFlag,
						});
				});
				
				// this.storyList[idx].comment_num++
				// const temp = parseInt((this.storyList[idx].comment_num / 8)+1)
				// console.log(temp)
				// api.getComments({
				// 	sid: this.storyList[idx].sid,
				// 	page_id:  temp
				// }).then(res => {
				// 	console.log("uupdate",res)
				// 	const templist = JSON.parse(JSON.stringify(res.data.discussList));
				// 	const i = (this.storyList[idx].comment_num % 8)-1;
				// 	this.storyList[idx].commentList.push({
				// 			did: templist[i].did,
				// 			headPic: templist[i].avatar,
				// 			name: templist[i].username,
				// 			content: templist[i].detail,
				// 			like_num: templist[i].count,
				// 			like_flag: templist[i].goodFlag,
				// 		});
				// });
			},
			//收藏
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
			//点赞
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
			}

		},
		onLoad(data) {
			this.placeData = data.aid; //地点id
			this.placeName = data.place; //地点名称
			console.log("placeData", this.placeData, "this.placeName", this.placeName);
			const provider = {
				place: this.placeData,
				listInfo: [],
			};
			this.$store.commit('initializeStoryList', provider);
			//console.log('initialize1', this.$store.state.storyList);
		},
		onShow() {
			if (this.refreshAsync) {
				this.refreshAsync = false;
				return;
			} else {
				//this.placeData = option.place;
				//console.log("place:", this.placedata)

				//console.log("placeData2", this.placeData, "this.placeName", this.placeName);
				const provider2 = {
					place: this.placeData,
					listInfo: [],
				};
				this.$store.commit('initializeStoryList', provider2);
				//console.log('initialize2', this.$store.state.storyList);

				//console.log("placeData", this.placeData, "this.placeName", this.placeName);
				this.storyList = []; //清空刷新
				this.page_id = 1; //重置
				
				api.getStory({
					location_id: this.placeData,
					page_id: this.page_id,
				}).then(res => {
					console.log("storyList", res);
					const temp = JSON.parse(JSON.stringify(res.data.storyList));
					//console.log("temp", temp)
					for (let i = 0; i < temp.length; i++) {
						// let temp_avatar = '../../static/avatar_miss.jpg';
						// let temp_name = '匿名用户';
						// if (temp[i].isShow) { //实名，有这两个属性
						// 	temp_avatar = temp[i].avatar;
						// 	temp_name = temp[i].username;
						// }
						let page = parseInt((temp[i].discussCount / 8) + 1);
						let k = temp[i].discussCount % 8;
						if(k == 0){
							if(temp[i].discussCount != 0){
								page--;k = 7;
							}
						} else{
							k--;
						}
						
						api.getComments({
							sid: temp[i].sid,
							page_id: page//只显示最新一页评论
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
							//console.log('tempCommentList', tempCommentList)
							temp[i].tempCommentList = tempCommentList
							//console.log(temp[i].sid, 'temp[i].sid')
							//const k = i;
							this.storyList.push({
								sid: temp[i].sid,
								usrname: temp[i].username, //未获取，根据匿名状况判断
								avatar: temp[i].avatar, //根据匿名状况判断
								time: temp[i].pubDate,
								tags: temp[i].tagsList, //"tagsList": ["青春回忆"],
								storyContent: temp[i].detail,
								imgList: temp[i].showImgList,
								comment_num: temp[i].discussCount,
								mark_flag: temp[i].collectFlag,
								like_flag: temp[i].goodFlag,
								like_num: temp[i].goodCount,
								commentList: temp[i].tempCommentList,
							});
							//console.log('this.storyList[i]',this.storyList[i])
						});
					}
				})
				this.page_id++;
				//vuex赋值
				const provider = {
					place: this.placeData,
					listInfo: this.storyList
				};
				this.$store.commit('updateStoryList', provider);
				//console.log('update', this.$store.state.storyList);
			}
		},
		onReachBottom: function() {
			//触底的时候请求数据，即为上拉加载更多
			//为了更加清楚的看到效果，添加了定时器
			this.getmorenews();
		},
		components: {
			uniLoadMore,
			commentPop
		}
	}
</script>

<style>
	.fixed-box {
	        pointer-events: none; 
	        width: 100vw;
	        height: 100vh;
	        position: fixed;
	        left: 2px;
	        bottom: 0;
	        z-index: 100000;
	}
	.fixed-button {
	        pointer-events: auto;
	        width: 110rpx;
	        height: 360rpx;
	        right: 0;
	        left: auto;
	        top: 60vh;
	        display: flex;
	        justify-content: center;
	        align-items: center;
	        border-radius: 55rpx;
	} 
	
	.mainMenu{
	        width: 90rpx;
	        height: 90rpx;
	        background: #fff;
	        position: absolute;
	        left: 2rpx;
	        bottom: -2rpx; 
	        display: flex;
	        justify-content: center;
	        align-items: center;
	        border-radius: 45rpx;
	}
	
	.button {
		font-family: 'Segoe UI';
		width: 600rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-weight: bold;
		border-radius: 40rpx;
		background-color: #E2ECFF;
		margin-top: 30rpx;
	}

	.content {
		width: 97%;
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
