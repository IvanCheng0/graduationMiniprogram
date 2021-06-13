<template>
	<div>
		<titleComponent :title="title" @back="back()"></titleComponent>
		<div class="tapContainer">
			<div class="tapItemContainer" v-for="(item, index) in tapList" :key="item.sid" @click="changeCurrentTapId(index)" >
				<img :src="currentTapId==index?item.tappedSrc:item.src"  class="tapItem">
				</img>
			</div>
		</div>
		<!-- 喜爱 -->
		<div v-if="currentTapId == 0" v-for="item in goodList" :key="item.sid" class="list">
			<list-item :avatar="userInfo.avatar" :listItem="item" @delete="deleteItem" @showDetail="showDetail"></list-item>
		</div>
		<!-- 留言 -->
		<div v-if="currentTapId == 1" v-for="item in talkList" :key="item.sid" class="list">
			<list-item :avatar="userInfo.avatar" :listItem="item" @showDetail="showDetail"></list-item>
		</div>
		<!-- 收藏 -->
		<div v-if="currentTapId == 2" v-for="item in collectList" :key="item.sid" class="list">
			<list-item :avatar="userInfo.avatar" :listItem="item" @showDetail="showDetail"></list-item>
		</div>
		<uni-load-more v-if="currLength >= 7" :loadingType="loadingType" :contentText="contentText"></uni-load-more>
	</div>
</template>

<script>
	import titleComponent from './titleComponent.vue';
	import listItem from './actionListItemComponent.vue';
	import uniLoadMore from '../components/uni-load-more.vue';
	import {getMyGoodList, getMyDiscussList, getMyCollectList} from "../../api/people/api.js"
	export default {
		components: {
			titleComponent: titleComponent,
			listItem: listItem,
			uniLoadMore: uniLoadMore
		},
		data() {
			return {
				// 上方tap选项
				tapList: [{
					index: 0,
					src: '../../static/img/people/like.png',
					tappedSrc: '../../static/img/people/like_after.png'
				}, {
					index: 1,
					src: '../../static/img/people/message.png',
					tappedSrc: '../../static/img/people/message_after.jpg'
				}, {
					index: 2,
					src: '../../static/img/people/favor.png',
					tappedSrc: '../../static/img/people/mark_after.png'
				}],
				// 被选中的tap
				currentTapId: 0,
				selectID: '',
				goodPage: 1,
				talkPage: 1,
				collectPage: 1,
				currLength: 0,
				modalShow: false,
				isShownBack: true,
				loadingText: '加载中...',
				loadingType: 0, //定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				title: '互动',
				// list的数据
				// type: 0->文字   1->语音    2->视频
				goodList: [{
						sid: '424',
						name:'小红',
						desc: '嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻',
						time: '21-5-1'
					},
					{
						sid: '4214',
						name:'小红',
						desc: '嘻嘻嘻',
						time: '21-5-1'
					},
					{
						sid: '1424',
						name:'小红',
						desc: '嘻嘻嘻',
						time: '21-5-1'
					}
				],
				talkList: [{
						sid: '424',
						name:'小红',
						desc: '啦啦啦',
						time: '21-5-1'
					},
					{
						sid: '4214',
						name:'小红',
						desc: '啦啦啦',
						time: '21-5-1'
					},
					{
						sid: '1424',
						name:'小红',
						desc: '啦啦啦',
						time: '21-5-1'
					}
				],
				collectList: [{
						sid: '424',
						name:'小红',
						desc: '啦啦啦啦啦',
						time: '21-5-1'
					},
					{
						sid: '4214',
						name:'小红',
						desc: '啦啦啦啦啦',
						time: '21-5-1'
					},
					{
						sid: '1424',
						name:'小红',
						desc: '啦啦啦啦啦',
						time: '21-5-1'
					}
				],
			}
		},
		onReachBottom: function() {
			//触底的时候请求数据，即为上拉加载更多
			//为了更加清楚的看到效果，添加了定时器
			this.getmorenews();
		},
		methods: {
			getmorenews: function() {
				if (this.loadingType !== 0) { //loadingType!=0;直接返回
					return false;
				}
				this.loadingType = 1;
				uni.showNavigationBarLoading(); //显示加载动画
				const _self = this
				let getApi = getMyGoodList;
				let currPage = this.goodPage;
				if (this.currentTapId === 0) {
					// 点赞
					getApi = getMyGoodList
					currPage = this.goodPage
				}
				if (this.currentTapId === 1) {
					// 评论
					getApi = getMyDiscussList
					currPage = this.talkPage
				}
				if (this.currentTapId === 2) {
					// 收藏
					getApi = getMyCollectList
					currPage = this.collectPage
				}
				getApi(currPage).then((res)=>{
					uni.hideNavigationBarLoading() //显示加载动画
					if (res.data) {
						if (res.data.data && res.data.data.length === 0) 
						{
							_self.loadingType = 2
						} else {
							_self.list = _self.list.concat(res.data.data)
							_self.page_id++
							
							if (_self.currentTapId === 0) {
								// 点赞
								_self.goodList = _self.goodList.concat(res.data.discussList)
								_self.goodPage++
							}
							if (_self.currentTapId === 1) {
								// 评论
								_self.talkList = _self.talkList.concat(res.data.storyList)
								_self.talkPage++
							}
							if (_self.currentTapId === 2) {
								// 收藏
								_self.collectList = _self.collectList.concat(res.data.storyList)
								_self.collectPage++
							}
							this.loadingType = 0;
						}
					} else {
						uni.showToast({
							icon:'loading',
							title:'获取数据失败'
						})
					}
				}).catch((err)=>{
					console.log(err)
				})
			},
			back() {
				uni.switchTab({
					url: '/pages/people/people_main',
				});
			},
			changeCurrentTapId(tapId) {
				this.currentTapId = tapId;
				if (this.currentTapId === 0) {
					this.currLength = this.goodList.length
				}
				if (this.currentTapId === 1) {
					this.currLength = this.talkList.length
				}
				if (this.currentTapId === 2) {
					this.currLength = this.collectList.length
				}
			},
			showDetail(id){
				console.log(id);
			}
		},
		onLoad(data) {
			const _self = this
			getMyGoodList(this.goodPage).then((res) => {
				if (res.data) {
					_self.goodList = _self.goodList.concat(res.data.discussList)
					_self.goodPage++
					_self.currLength = _self.goodList.length
				}
			})
			
			getMyDiscussList(this.talkPage).then((res) => {
				if (res.data) {
					_self.talkList = _self.talkList.concat(res.data.storyList)
					_self.talkPage++
				}
			})
			
			getMyCollectList(this.collectPage).then((res) => {
				if (res.data) {
					_self.collectList = _self.collectList.concat(res.data.storyList)
					_self.collectPage++
				}
			})
		}
	}
</script>

<style>
	* {
		padding: 0;
		margin: 0;
	}

	/* 选中的tap变色 */
	.active {
		background-color: #7a7b7e !important;
		color: #fff !important;
	}

	/* tap */
	.tapContainer {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		width: 100%;
		height: 120upx;
		border-bottom: 2upx solid #707070;
	}

	.tapItemContainer {
		flex: 1;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.tapItem {
		width: 100%;
		width: 70upx;
		height: 70upx;
	}

</style>
