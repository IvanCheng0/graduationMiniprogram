<template>
	<div>
		<view v-if="list.length==0" style="position: absolute;top: 30%;width: 85%;margin-left: 10%">
			<image src="../../static/dengshen.jpg" style="height: 60vw;width: 60vw;margin-left: 10%"></image>
			<view style="font-size: 20px;text-align: center;">这里还没有内容噢！</view>
		</view>
		<div v-else class="container">
			<title-component :title="title" @back="back()" :isShownBack="isShownBack"></title-component>
			<div v-for="item in list" :key="item.sid" class="list">
				<list-item :avatar="item.avatar" :listItem="item" v-bind:showDel="true" @delete="deleteItem" @showDetail="showDetail"></list-item>
			</div>
			<uni-load-more v-if="currLength >= 7" :loadingType="loadingType" :contentText="contentText"> </uni-load-more>
			<u-modal v-model="modalShow" @confirm="confirm" ref="uModal" :async-close="true" content="确认删除？" show-cancel-button
			 confirmText="确认" cancelText="取消"></u-modal>
		</div>
	</div>
	
</template>

<script> 
	import titleComponent from './titleComponent.vue';
	import listItem from './listItemComponent.vue';
	import uniLoadMore from '../components/uni-load-more.vue';
	import {getMyCollectList, deleteMyCollect} from "../../api/people/api.js"
	export default {
		components: {
			titleComponent: titleComponent,
			listItem: listItem,
			uniLoadMore: uniLoadMore,
		},
		data() {
			return {
				selectID: '',
				modalShow: false,
				isShownBack: true,
				page_id:1,
				userInfo: {
					userId: '',
					name: '',
					avatar: '',
				},
				currLength: 0,
				title: '我的收藏',
				loadingText: '加载中...',
				loadingType: 0, //定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多了哦'
				},
				// list的数据
				// type: 0->文字   1->语音    2->视频
				list: [],
			}
		},
		onReachBottom: function() {
			//触底的时候请求数据，即为上拉加载更多
			//为了更加清楚的看到效果，添加了定时器
			console.log("111", this.currLength)
			this.getmorenews();
		},
		methods: {
			onStart(){
				this.page_id = 1;
				const _self = this
				getMyCollectList(this.page_id).then((res)=>{
					if (res.data) {
						console.log(res.data, "data")
						const temp = JSON.parse(JSON.stringify(res.data.storyList));
						_self.list = [];
						for (var i = 0; i < temp.length; i++) {
							// const name_may_miss = "匿名用户";
							// const avatar_may_miss = "../../static/avatar_miss.jpg";
							// if(temp[i].isShow){
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
			},
			getmorenews: function() {
				if (this.loadingType !== 0) { //loadingType!=0;直接返回
					return false;
				}
				this.loadingType = 1;
				uni.showNavigationBarLoading(); //显示加载动画
				const _self = this
				getMyCollectList(this.page_id).then((res)=>{
					/* concat没有处理数据，会显示undefined
					if (res.data) {
						if (res.data.storyList && res.data.storyList.length === 0) 
						{
							_self.loadingType = 2
						} else {
							_self.list = _self.list.concat(res.data.storyList)
							_self.page_id++
							
							this.loadingType = 0;
						}
					}*/
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
			// 删除某一项
			deleteItem(itemID) {
				// 这里发起一个删除的信息
				// 弹出弹窗询问是否删除
				this.modalShow = true;
				this.selectID = itemID;
			},
			// 跳转查看详情
			showDetail(itemID) {
				uni.navigateTo({
					url: `../story/storyDetails?sid=${itemID}`, 
				});
			},
			confirm() {
				//console.log("删除", this.selectID)
				const _self = this
				deleteMyCollect(this.selectID).then((res) => {
					console.log(res);
					if (res.data && res.data.code==1001) {
						uni.showToast({
							title:'删除成功'
						})
						_self.modalShow = false;
						_self.onStart();
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
		onLoad() {
			
		},
		onShow() {
			this.onStart();
		},
	}
</script>

<style>
	.list {
		margin-top: 50upx;
	}
	
	/* 弹窗样式 */
	.popup {
		width: 500upx;
		height: 400upx;
		border-radius: ;
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
