<template>
	<div class="root">
		<titleComponent :title="title" :isShownBack="isShownBack"></titleComponent>
		<div class="userInfo">
			<image :src="userInfo.avatar" class="avatar"></image>
			<div>
				<input class="userName" :value="userInfo.name" />
				<textarea class="introduction" :value="userInfo.introduction" />
			</div>
		</div>
		<div class="my">
			<button @click="goPage('./people_story')" class="my_nav">我的故事</button>
		</div>
		<div class="my">
			<button @click="goPage('./people_collection')" class="my_nav">我的收藏</button>
		</div>
		<div class="my">
			<button @click="goPage('./people_footprint')" class="my_nav">我的足迹</button>
		</div>
		<div class="my">
			<button @click="goPage('./people_action')" class="my_nav">我的互动</button>
		</div>
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
				// userInfo:{
				// 	// userId 标识唯一用户
				// 	userId:'',
				// 	name: "叫什么名字呀",
				// 	introduction: "说点什么吧~",
				// 	avatar: ''
				// },
				userInfo:{
					// userId 标识唯一用户
					userId:'123456',
					name: "大美女",
					introduction: "大可爱大聪明",
					avatar: '../../static/img/people/avatar.jpg'
				},
				title: '个人中心',
				isShownBack: false
			}
		},
		onLoad() {
			console.log("1253")
		},
		methods: {
			goPage(url){
				uni.navigateTo({
					url:`${url}?userInfo=${JSON.stringify(this.userInfo)}`
				})
			}
		}
	}
</script>

<style>
	.root{
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}
	/* 个人信息栏 */
	.userInfo {
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: 340upx;
	}

	/* 头像 */
	.userInfo>.avatar {
		margin-left: 30upx;
		width: 200upx;
		height: 200upx;
		
		border-radius: 23%;
	}

	.userInfo>div {
		margin-right: 30upx;
		width: 400upx;
		font-size: 35upx;
		font-family: FZCuHeiSongS-B-GB;
	}

	.userInfo>div .userName {
		height: 70upx;
		width: 400upx;
		padding: 10upx 20upx;
		color: #898989;
		margin-bottom: 10upx;
		background-color: #d5d5d5;
		border-radius: 25upx;
		box-sizing: border-box;
	}

	.userInfo>div .introduction {
		height: 120upx;
		width: 400upx;
		color: #898989;
		padding: 15upx 20upx;
		border-radius: 25upx;
		background-color: #d5d5d5;
		box-sizing: border-box;
	}

	.my {
		display: flex;
		height: 210upx;
		justify-content: center;
		align-items: center;
	}
	.my .my_nav{
		width: 80%;
		font-size: 45upx;
		font-family: FZCuHeiSongS-B-GB;
		height: 100upx;
		line-height: 100upx;
		border-radius: 50upx;
		text-align: center;
		background-color: #CFDEE7;
		box-shadow: -0upx 8upx 8upx #d5d5d5;
	}
	
</style>
