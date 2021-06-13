<template>
	<div class="container">
		<title-component :title="title" @back="back()" :isShownBack="isShownBack"></title-component>
		<div v-for="item in list" :key="item.sid" class="list">
			<list-item :avatar="item.avatar" :listItem="item" @showDetail="showDetail"></list-item>
		</div>
	</div>
</template>

<script>
	import titleComponent from './titleComponent.vue';
	import listItem from './listItemFootPrintComponent.vue';
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
				list: [{
						sid: '424',
						avatar: "",
						desc: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦，嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'
					},
					{
						sid: '4214',
						avatar: "",
						desc: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦，嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'
					},
					{
						sid: '1424',
						avatar: "",
						desc: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦，嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'
					}
				]
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
				console.log(itemID);

			}
		},
		onLoad() {
			getMyHistoryList().then((res)=>{
				if (res.data) {
					console.log(res.data, "data")
					_self.list = _self.list.concat(res.data.historyList)
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
