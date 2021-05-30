<template>
	<div>
		<titleComponent :title="title" @back="back()"></titleComponent>
		<div class="tapContainer" >
			<div class="tapItemContainer" v-for="(item, index) in tapList" @click="changeCurrentTapId(index)" >
				<img :src="currentTapId==index?item.tappedSrc:item.src"  class="tapItem">
				</img>
			</div>
		</div>
		<!-- 喜爱 -->
		<div v-if="currentTapId == 0" v-for="item in loveList" :key="item.storyID" class="list">
			<list-item :avatar="userInfo.avatar" :listItem="item" @delete="deleteItem" @showDetail="showDetail"></list-item>
		</div>
		<!-- 留言 -->
		<div v-if="currentTapId == 1" v-for="item in talkList" :key="item.storyID" class="list">
			<list-item :avatar="userInfo.avatar" :listItem="item" @showDetail="showDetail"></list-item>
		</div>
		<!-- 收藏 -->
		<div v-if="currentTapId == 2" v-for="item in colectList" :key="item.storyID" class="list">
			<list-item :avatar="userInfo.avatar" :listItem="item" @showDetail="showDetail"></list-item>
		</div>
	</div>
</template>

<script>
	import titleComponent from './titleComponent.vue';
	import listItem from './actionListItemComponent.vue';
	export default {
		components: {
			titleComponent: titleComponent,
			listItem: listItem
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
				modalShow: false,
				isShownBack: true,
				userInfo: {
					userId: '',
					name: '',
					avatar: '',
				},
				title: '互动',
				// list的数据
				// type: 0->文字   1->语音    2->视频
				loveList: [{
						ID: '424',
						name:'小红',
						type: 0,
						description: '嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻',
						time: '21-5-1'
					},
					{
						ID: '4214',
						type: 1,
						name:'小红',
						description: '嘻嘻嘻',
						time: '21-5-1'
					},
					{
						ID: '1424',
						type: 2,
						name:'小红',
						description: '嘻嘻嘻',
						time: '21-5-1'
					}
				],
				talkList: [{
						ID: '424',
						type: 0,
						name:'小红',
						description: '啦啦啦',
						time: '21-5-1'
					},
					{
						ID: '4214',
						type: 1,
						name:'小红',
						description: '啦啦啦',
						time: '21-5-1'
					},
					{
						ID: '1424',
						type: 2,
						name:'小红',
						description: '啦啦啦',
						time: '21-5-1'
					}
				],
				colectList: [{
						ID: '424',
						type: 0,
						name:'小红',
						description: '啦啦啦啦啦',
						time: '21-5-1'
					},
					{
						ID: '4214',
						type: 1,
						name:'小红',
						description: '啦啦啦啦啦',
						time: '21-5-1'
					},
					{
						ID: '1424',
						type: 2,
						name:'小红',
						description: '啦啦啦啦啦',
						time: '21-5-1'
					}
				],
			}
		},
		methods: {
			back() {
				uni.switchTab({
					url: '/pages/people/people_main',
				});
			},
			changeCurrentTapId(tapId) {
				this.currentTapId = tapId;
			},
			showDetail(id){
				console.log(id);
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
