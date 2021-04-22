<template>
	<div>
		<titleComponent @back="back()" :title="title"></titleComponent>
		<div class="userInfo">
			<image src="../../static/people.png" class="avatar"></image>
			<div>
				<div class="name">{{name}}</div>
				<div class="introduction">{{introduction}}</div>
			</div>
		</div>
		<navigator class="my" url="./people_story"><span>我的故事</span></navigator>
		<navigator class="my" url="./people_collection"><span>我的收藏</span></navigator>
		<navigator class="my" url="./people_footprint"><span>我的足迹</span></navigator>
	</div>
</template>

<script>
	import titleComponent from './titleComponent.vue'
	export default {
		components: {
			titleComponent: titleComponent
		},
		data() {
			return {
				name: "小明",
				introduction: "个人介绍",
				title: {
					name: '个人中心',
					icon: '../../static/people.png'
				}
			}
		},
		onLoad() {
			console.log("1253")
		},
		methods: {
			// 这里写退出
			back() {
				console.log('1');
			}
		}
	}
</script>

<style>
	/* 个人信息栏 */
	.userInfo {
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: 400upx;
		border-bottom: 2upx solid #a1a1a1;
	}

	/* 头像 */
	.userInfo>.avatar {
		width: 210upx;
		height: 210upx;
		border-radius: 50%;
		border: 1upx solid #a1a1a1;
		padding: 2upx;
	}

	.userInfo>div {
		width: 400upx;
		font-size: 35upx;
	}

	.userInfo>div .name {
		height: 50upx;
		background-color: #eee;
		width: 400upx;
		border: 1upx solid #a1a1a1;
		padding: 5upx;
		margin-bottom: 10upx;
	}

	.userInfo>div .introduction {
		height: 180upx;
		background-color: #eee;
		width: 400upx;
		border: 1upx solid #a1a1a1;
		padding: 5upx;
	}

	.my {
		display: flex;
		height: 300upx;
		width: 100%;
		border-bottom: 2upx solid #a1a1a1;
		justify-content: center;
		align-items: center;
		font-size: 50upx;
	}

	.my::after {
		content: ">";
		position: absolute;
		right: 25upx;
		font-size: 150upx;
	}

	.my>span {
		display: block;
	}
</style>
