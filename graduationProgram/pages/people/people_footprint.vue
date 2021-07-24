<template>
	<div>
		<view v-if="list.length==0" style="position: absolute;top: 30%;width: 85%;margin-left: 10%">
			<image src="../../static/dengshen.jpg" style="height: 60vw;width: 60vw;margin-left: 10%"></image>
			<view style="font-size: 20px;text-align: center;">这里还没有内容噢！</view>
		</view>
		<div v-else class="container">
			<title-component :title="title" @back="back()" :isShownBack="isShownBack"></title-component>
			<div v-for="item in list" :key="item.sid" class="list">
				<list-item :avatar="item.avatar" :listItem="item" v-bind:showDel="false" @showDetail="showDetail"></list-item>
			</div>
		</div>
	</div>
	
</template>

<script>
	import titleComponent from './titleComponent.vue';
	import listItem from './listItemComponent.vue';
	import {getMyHistoryList} from "../../api/people/api.js"
	export default {
		components: {
			listItem: listItem,
			titleComponent: titleComponent
		},
		data() {
			return {
				selectID: '',
				modalShow: false,
				isShownBack: true,
				userInfo: {
					userId: '',
					name: '',
					avatar: '',
				},
				title: '我的足迹',
				// list的数据
				// type: 0->文字   1->语音    2->视频
				list: [],
			}
		},

		methods: {
			// 这里写退出
			back() {
				uni.switchTab({
					url: '/pages/people/people_main',
				});
			},
			// 跳转查看详情
			showDetail(itemID) {
				uni.navigateTo({
					url: `../story/storyDetails?sid=${itemID}`, 
				});
			}
		},
		onLoad() {
			
		},
		onShow() {
			getMyHistoryList().then((res)=>{
				const _self = this
				if (res.data) {
					console.log(res.data, "data")
					const temp = JSON.parse(JSON.stringify(res.data.data));
					console.log("temp",temp)
					_self.list = [];
					for (var i = 0; i < temp.length; i++) {
						// const name_may_miss = "匿名用户";
						// const avatar_may_miss = "../../static/avatar_miss.jpg";
						// if(temp[i].isShow){
						// 	name_may_miss = ;
						// 	avatar_may_miss = ;
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
