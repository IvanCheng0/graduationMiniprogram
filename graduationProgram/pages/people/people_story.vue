<template>
	<div class="container">
		<title-component :title="title" @back="back()" :isShownBack="isShownBack"></title-component>
		<div v-for="item in list" :key="item.sid" class="list">
			<list-item :avatar="getAvater()" :listItem="item" @delete="deleteItem" @showDetail="showDetail"></list-item>
		</div>
		<uni-load-more v-if="currLength >= 7" :loadingType="loadingType" :contentText="contentText"></uni-load-more>
		<u-modal v-model="modalShow" @confirm="confirm" ref="uModal" :async-close="true" content="确认删除？" show-cancel-button
		 confirmText="确认" cancelText="取消"></u-modal>
	</div>
</template>

<script>
	import titleComponent from './titleComponent.vue';
	import listItem from './listItemComponent.vue';
	import uniLoadMore from '../components/uni-load-more.vue';
	import {getMyStoryList, deleteMyStory} from "../../api/people/api.js"
	export default {
		components: {
			listItem: listItem,
			titleComponent: titleComponent,
			uniLoadMore: uniLoadMore
		},
		data() {
			return {
				selectID: '',
				page_id:1,
				modalShow: false,
				isShownBack: true,
				userInfo: {
					userName: '',
					avatar: '',
				},
				currLength:0,
				loadingText: '加载中...',
				loadingType: 0, //定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				title: '我的故事',
				// list的数据
				// type: 0->文字   1->语音    2->视频
				list: [{
						sid: '424',
						desc: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦，嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'
					},
					{
						sid: '4214',
						desc: '啦'
					},
					{
						sid: '1424',
						desc: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦，嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'
					},
					{
						sid: '4724',
						desc: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦，嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'
					},
					{
						sid: '4284',
						desc: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦，嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'
					},
					{
						sid: '4994',
						desc: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦，嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'
					},
					{
						sid: '422224',
						desc: '123'
					}
				]
			}
		},
		onReachBottom: function() {
			//触底的时候请求数据，即为上拉加载更多
			//为了更加清楚的看到效果，添加了定时器
			this.getmorenews();
		},
		methods: {
			getAvater() {
				console.log(this.userInfo)
				return this.userInfo.avatar
			},
			getmorenews: function() {
				if (this.loadingType !== 0) { //loadingType!=0;直接返回
					return false;
				}
				this.loadingType = 1;
				uni.showNavigationBarLoading(); //显示加载动画
				const _self = this
				getMyStoryList(this.page_id).then((res)=>{
					uni.hideNavigationBarLoading() //显示加载动画
					if (res.data) {
						if (res.data.storyList && res.data.storyList.length === 0) 
						{
							_self.loadingType = 2
						} else {
							_self.list = _self.list.concat(res.data.storyList)
							_self.page_id++
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
							title:'删除成功'
						})
						_self.modalShow = false;
					} else {
						uni.showToast({
							icon:'loading',
							title:'请稍后再试'
						})
						_self.modalShow = false;
					}
				}).catch((err) => {
					uni.showToast({
						icon:'loading',
						title:'请稍后再试'
					})
					_self.modalShow = false;
				})
			}
		},
		onLoad(data) {
			this.userInfo.name = this.$store.state.userInfo.userName;
			this.userInfo.avatar = this.$store.state.userInfo.avatar;
			const _self = this
			getMyStoryList(this.page_id).then((res)=>{
				if (res.data) {
					console.log(res.data, "data")
					_self.list = _self.list.concat(res.data.storyList)
					_self.page_id++
					_self.currLength = _self.list.length
				} else {
					uni.showToast({
						icon:'loading',
						title:'获取数据失败'
					})
				}
			}).catch((err)=>{
				console.log(err)
			})
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
</style>
