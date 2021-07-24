<template>
	<div>
		<view v-if="discussList.length==0" style="position: absolute;top: 30%;width: 85%;margin-left: 10%">
			<image src="../../static/dengshen.jpg" style="height: 60vw;width: 60vw;margin-left: 10%"></image>
			<view style="font-size: 20px;text-align: center;">这里还没有内容噢！</view>
		</view>
		<view v-else class="container">
			<title-component :title="titleName" @back="back()" :isShownBack="isShownBack"></title-component>
		
			<listComment :discussList="discussList" @toStory="toStory"></listComment>
		
		
			<uni-load-more v-if="currLength >= 7" :loadingType="loadingType" :contentText="contentText"></uni-load-more>
			<u-modal v-model="modalShow" @confirm="confirm" ref="uModal" :async-close="true" content="确认删除？" show-cancel-button
			 confirmText="确认" cancelText="取消"></u-modal>
		</view>
	</div>
	
</template>

<script>
	import titleComponent from './titleComponent.vue';
	import listComment from './listCommentComponent.vue'
	import uniLoadMore from '../components/uni-load-more.vue';
	import {
		getMyDiscussList
	} from "../../api/people/api.js"
	export default {
		components: {
			titleComponent: titleComponent,
			uniLoadMore: uniLoadMore,
			listComment: listComment,
		},
		data() {
			return {
				titleName: '我的评论',
				page_id: 1,
				modalShow: false,
				isShownBack: true,
				userInfo: {
					userName: '',
					avatar: '',
				},
				currLength: 0,
				loadingText: '加载中...',
				loadingType: 0, //定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				discussList: [],
				sid:null
			}
		},
		onReachBottom: function() {
			//触底加载
			//为了更加清楚的看到效果，添加了定时器
			this.getmorenews();
		},
		methods: {
			toStory(val){
				uni.navigateTo({
					url: `../story/storyDetails?sid=${val}`, 
				});
			},
			getData(){
				getMyDiscussList(this.page_id).then(res=>{
					console.log('res.data',res.data)
					console.log(res)
							res.data.storyList.forEach((item, index) => {
								let discuss = {
									reply: null,
									replyUser: null,
									date: null,
									sid:null,
								}
								// if (!this.discussList) {
									discuss.reply = item.desc;
									discuss.replyUser = item.username
									discuss.date = item.pubDate
									discuss.sid=item.sid
									this.discussList.push(discuss)
								// } else {
								// 	this.discussList[index].reply = item.desc;
								// 	this.discussList[index].replyUser = item.username
								// 	this.discussList[index].date = item.pubDate
								// }
								console.log(this.discussList)
					
							})

				})
			},
			getmorenews: function() {
				if (this.loadingType !== 0) { //loadingType!=0;直接返回
					return false;
				}
				this.loadingType = 1;
				uni.showNavigationBarLoading(); //显示加载动画
				const _self = this
				//console.log("getMore", this.page_id);
				getMyDiscussList(this.page_id).then((res) => {
					if (res.data.storyList.length != 0) {
						console.log(res.data, "data")
						const temp = JSON.parse(JSON.stringify(res.data.storyList));
						//_self.list = [];
						for (var i = 0; i < temp.length; i++) {
							// const name_may_miss = "匿名用户";
							// const avatar_may_miss = "../../static/avatar_miss.jpg";
							// if (temp[i].isShow) {
							// 	name_may_miss = temp[i].username;
							// 	avatar_may_miss = temp[i].avatar;
							// }
							_self.list.push({
								sid: temp[i].sid,
								name: temp[i].username,
								time: temp[i].pubDate,
								place: temp[i].location_name,
								avatar: temp[i].avatar,
								desc: temp[i].desc
							})
						}
						//_self.list = _self.list.concat(res.data.storyList)
						_self.page_id++
						//console.log("afterGetMore", this.page_id);
						_self.currLength = _self.list.length
						_self.loadingType = 0;
					} else if (res.data.code == 1001) {
						_self.loadingType = 2;
						_self.page_id--;
						console.log("botton page", this.page_id);
						uni.showToast({
							icon:'none',
							title: '没有更多了哦！'
						})
					} else {
						uni.showToast({
							icon: 'loading',
							title: '获取数据失败'
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			// 这里写退出
			back() {
				uni.switchTab({
					url: '/pages/people/people_main',
				});
			},
			// 删除某一项
			deleteItem(itemID) {
				// 这里发起一个删除的信息
				// 弹出弹窗询问是否删除
				this.modalShow = true;
				this.selectID = itemID;
			},
			// 跳转查看详情
			showDetail(itemID) {
				console.log(itemID, "lalala");
			},
			confirm() {
				// 这里要写异步删除
				console.log("删除", this.selectID)
				const _self = this
				deleteMyStory(this.selectID).then((res) => {
					if (res.data && res.data.msg === "success") {
						uni.showToast({
							title: '删除成功'
						})
						_self.modalShow = false;
					} else {
						uni.showToast({
							icon: 'loading',
							title: '请稍后再试'
						})
						_self.modalShow = false;
					}
				}).catch((err) => {
					uni.showToast({
						icon: 'loading',
						title: '请稍后再试'
					})
					_self.modalShow = false;
				})
			}
		},
		onLoad(data) {
			this.getData()
		}

	}
</script>

<style scoped>
	.list {
		margin-top: 50upx;
	}

	/* 弹窗样式 */
	.popup {
		width: 500upx;
		height: 400upx;
		border-radius: 25upx;
	}

	.popupContent {
		width: 100%;
		height: 200upx;
		line-height: 200upx;
		text-align: center;
		font-size: 35upx;
		font-family: FZCuHeiSongS-B-GB;
	}




	.outer {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 14vh;
		width: 92vw;
		margin: 0 auto;
		margin-bottom: 100rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}

	.left {
		width: 5vw;
		height: 18vh;
		background: #DCB093;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
		border-radius: 10px 0px 0px 10px;
	}

	.right {
		width: 85vw;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 20rpx;
		/* background-color: red; */
	}

	.right .date {
		font-family: Abel;
		font-style: normal;
		font-weight: normal;
		font-size: 24rpx;
		line-height: 36rpx;
		color: #000000;
	}

	.right .reply {
		font-family: Abel;
		font-style: normal;
		font-weight: normal;
		font-size: 24rpx;
		line-height: 44rpx;
		color: #666666;
	}

	.right .line {
		height: 3.99rpx;
		background-color: #A9A9A9;
		transform: scale(50%);
		width: 70vw;
		margin-top: 10rpx;
	}

	.right .commit::before {
		display: block;
		height: 20rpx;
		background-color: #A9A9A9;
		transform: scale(50%);
		width: 70vw;
		margin-top: 20rpx;
	}

	.right .commit {
		font-family: Abel;
		font-style: normal;
		font-weight: normal;
		font-size: 20rpx;
		line-height: 36rpx;
		color: #A9A9A9;
	}
</style>
