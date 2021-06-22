<template>
	<div class="root">
		<titleComponent :title="title" :isShownBack="isShownBack"></titleComponent>
		<div class="userInfo" v-if='userInfo.avatar' :style="{
					backgroundImage: 'url('+ userInfo.avatar +')',
					backgroundBlendMode: 'multiply',
					backgroundColor: 'rgba(0,0,0,0.2)',
					backgroundSize:'cover',
					backgroundRepeat:'no-repeat',
					backgroundPosition: 'center',
				}">
			<div>
				<image :src="userInfo.avatar" class="avatar"></image>
				<p class="userName"> {{userInfo.name}} </p>
			</div>
		</div>
		<div class = "buttonTable">
			<div class="myAction">
				<img :src="likeIcon"  class="tapItem"> </img>
				<p @click="goPage('./people_story')" class="my_nav">喜欢</p>
			</div>
			<div class="myAction">
				<img :src="messageIcon"  class="tapItem"> </img>
				<button @click="goPage('./people_collection')" class="my_nav">评论</button>
			</div>
			<div class="myAction">
				<img :src="collectIcon"  class="tapItem"> </img>
				<button @click="goPage('./people_footprint')" class="my_nav">收藏</button>
			</div>
		</div>
		<div class="myHistory">
			<button @click="goPage('./people_action')" class="my_nav">我的故事</button>
		</div>
		<div class="myHistory">
			<button @click="goPage('./people_action')" class="my_nav">我的足迹</button>
		</div>
		<authorization v-if="tologin" @cancelChild="getChild"></authorization>
	</div>
</template>

<script>
	import titleComponent from './titleComponent.vue'
	import authorization from '../authorization/authorization.vue'
	import http from '../utils/request.js'
	import {
		saveUserInfo
	} from "../../api/people/api.js"
	import bus from "../utils/bus.js"
	export default {
		components: {
			titleComponent: titleComponent,
			authorization: authorization
		},
		data() {
			return {
				modalShow: false,
				userInfo: {
					name: "樱花散落",
					desc: "",
					avatar: "https://thirdwx.qlogo.cn/mmopen/vi_32/CXJ3iclYDicMPTzic4Qucuvyc35ibcGQOgL88JcuVV0ibWW5QEznA4UuzFY4wwKkJWczFEwhd8mQPxg44euQQIo9G5g/132",
				},
				likeIcon: '../../static/img/people/like.png',
				messageIcon: '../../static/img/people/message.png',
				collectIcon: '../../static/img/people/favor.png',
				title: '个人中心',
				isShownBack: false,
				tologin: false,
			}
		},
		onLoad() {
			this.login()
		},
		methods: {
			goPage(url) {
				setTimeout(() => {
					bus.$emit("hello", {
						msg: "hello"
					})
				}, 500)
				uni.navigateTo({
					url: `${url}?userInfo=${JSON.stringify(this.userInfo)}`
				})
			},
			saveUserDesc() {
				this.modalShow = true;
			},
			confirm() {
				saveUserInfo(this.userInfo.desc).then((res) => {
					if (res.data) {
						if (res.data.msg === "success") {
							uni.showToast({
								title: '保存成功'
							})
						}
					}
				})
				this.modalShow = false;
			},
			login() {
				// const token = this.$store.state.userInfo.token
				// if (!token) {
				// 	this.tologin=true
				// } else {
				// 	this.userInfo.name = this.$store.state.userInfo.userName,
				// 	this.userInfo.avatar = this.$store.state.userInfo.avatar,
				// 	this.userInfo.desc = this.$store.state.userInfo.desc
				// }
			},
			getChild(val) {
				this.tologin = val
				this.userInfo.name = this.$store.state.userInfo.userName,
					this.userInfo.avatar = this.$store.state.userInfo.avatar,
					this.userInfo.desc = this.$store.state.userInfo.desc
			},
		}
	}
</script>

<style>
	.root {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	/* 个人信息栏 */
	.userInfo {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 400upx;
	}

	/* 头像 */
	.userInfo>div>.avatar {
		display: flex;
		margin-left: auto;
		margin-right: auto;
		align-items: center;
		justify-content: center;
		width: 200upx;
		height: 200upx;
		border-radius: 50%;
		border: 2.5px solid #ffffff;
	}

	.userInfo>div {
		align-items: center;
		justify-content: center;
	}

	.userName {
		height: 60upx;
		display: flex;
		font-size: 35upx;
		color: #000000;
		align-items: center;
		justify-content: center;
		margin-bottom: 10upx;
		background-color: #ffffff;
		border-radius: 25upx;
		box-sizing: border-box;
	}

	.myAction {
		display: flex;
		margin-left: 40upx;
		height: 210upx;
		justify-content: center;
		align-items: center;
	}

	.myAction .my_nav {
		width: 200upx;
		font-size: 45upx;
		font-family: FZCuHeiSongS-B-GB;
		height: 100upx;
		line-height: 100upx;
		border-radius: 50upx;
		text-align: center;
		background-color: #CFDEE7;
		box-shadow: -0upx 8upx 8upx #d5d5d5;
	}
	
	.myHistory {
		display: flex;
		height: 210upx;
		justify-content: center;
		align-items: center;
	}
	
	.myHistory .my_nav {
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
	
	.buttonTable {
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
