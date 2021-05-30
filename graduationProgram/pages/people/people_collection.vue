<template>
	<div class="container">
		<title-component :title="title" @back="back()" :isShownBack="isShownBack"></title-component>
		<div v-for="item in list" :key="item.storyID" class="list">
			<list-item :avatar="userInfo.avatar" :listItem="item" @delete="deleteItem" @showDetail="showDetail"></list-item>
		</div>
		<u-modal v-model="modalShow" @confirm="confirm" ref="uModal" :async-close="true" content="确认删除？" show-cancel-button
		 confirmText="确认" cancelText="取消"></u-modal>
	</div>
</template>

<script>
	import titleComponent from './titleComponent.vue';
	import listItem from './listItemComponent.vue';
	export default {
		components: {
			titleComponent: titleComponent,
			listItem: listItem
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
				title: '我的收藏',
				// list的数据
				// type: 0->文字   1->语音    2->视频
				list: [{
						ID: '424',
						type: 0,
						description: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦，嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'
					},
					{
						ID: '4214',
						type: 1,
						description: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦，嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'
					},
					{
						ID: '1424',
						type: 2,
						description: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦，嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'
					},
					{
						ID: '4724',
						type: 1,
						description: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦，嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'
					},
					{
						ID: '4284',
						type: 2,
						description: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦，嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'
					},
					{
						ID: '4994',
						type: 0,
						description: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦，嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'
					},
					{
						ID: '422224',
						type: 1,
						description: '123'
					}
				]
			}
		},
		methods: {
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
				console.log(itemID);

			},
			confirm() {
				// 这里要写异步删除
				setTimeout(() => {
					// 3秒后自动关闭
					this.modalShow = false;
					// 如果不想关闭，而单是清除loading状态，需要通过ref手动调用方法
					// this.$refs.uModal.clearLoading();
				}, 3000)
			}
		},
		onLoad(data) {
			// 获取‘个人中心’页面传过来的数据
			let userInfo = JSON.parse(data.userInfo);
			// 赋值
			this.userInfo.name = userInfo.name;
			this.userInfo.userId = userInfo.userId;
			this.userInfo.avatar = userInfo.avatar;
		}
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
