<template>
	<div class="root">
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
		<div class = "bottom">			
			<view class="myAction">
				<view class="like" >
					<u-icon name="heart" color="#437796" size="80" @click="goPage('./people_story')"></u-icon>
					<view @click="goPage('./people_story')" >喜欢</view>
				</view>
				<view class="commit">
					<u-icon name="chat" color="#437796" size="80" @click="goPage('./people_collection')"></u-icon>
					<view @click="goPage('./people_collection')" >评论</view>
				</view>
				<view class="collect">
					<u-icon name="star" color="#437796" size="80" @click="goPage('./people_footprint')"></u-icon>
					<view @click="goPage('./people_footprint')" >收藏</view>
				</view>
			</view>
			<view class="story">
				<view @click="goPage('./people_action')">我的故事</view>
			</view>
			<view class="footPrint">
				<view @click="goPage('./people_action')">我的足迹</view>
			</view>						
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
	.title{
		height:0.1vh;
		width:1vw;
	}
	.title view{
		height:0.07vh;
		width:0.3vw;
		background-color: #EAF0FC;
	}
	/* 个人信息栏 */
	.userInfo {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 47vh;
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
		margin-top: 20upx;
		background-color: #ffffff;
		border-radius: 25upx;
		box-sizing: border-box;
	}
	.bottom{
		position:absolute;
		bottom: 0;
		width: 100%;
		height: 55vh;
		background: #FFFFFF;
		box-shadow: 0px -5px 8px rgba(147, 147, 147, 0.25);
		border-radius: 20px 20px 0px 0px;
		display:flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.bottom .myAction{
		height:18vh;
		width:90vw;
		display:flex;
		justify-content: space-between;
		margin:0 auto;
	}
	.myAction .like{
		width:27vw;
		background-color: #EEEEEE;
		box-shadow: 1px 3px 6px 3px #D9DCDD;
		border-radius: 10px;
	}
	.myAction .commit{
		width:27vw;
		background-color: #EEEEEE;
		box-shadow: 1px 3px 6px 3px #D9DCDD;
		border-radius: 10px;
	}
	.myAction .collect{
		width:27vw;
		background-color: #EEEEEE;
		box-shadow: 1px 3px 6px 3px #D9DCDD;
		border-radius: 10px;
	}
	.like,.commit,.collect{
		display: flex;
		flex-direction:column;
		justify-content:center;
		align-items: center;
	}
	.like view,.commit view,.collect view{
		font-size:44rpx;
		color: #437796;
	}
	.bottom .story{
		height:10vh;
		width:90vw;
		background-color: #EEEEEE;
		margin:0 auto;
		box-shadow: 1px 3px 6px 3px #D9DCDD;
		border-radius: 10px;
	}
	.bottom .footPrint{
		height:10vh;
		width:90vw;
		background-color: #EEEEEE;
		margin:0 auto;
		box-shadow: 1px 3px 6px 3px #D9DCDD;
		border-radius: 10px;
	}
	.story view{
		width: 30vw;
		height: 5vh;
		font-family: Abhaya Libre Medium;
		font-style: normal;
		font-weight: 500;
		font-size: 4.2vh;
		line-height: 28px;
		color: #437796;
		margin: 0 auto;
		transform: translateY(50%);
	}
	.footPrint view{
		width: 30vw;
		height: 5vh;
		font-family: Abhaya Libre Medium;
		font-style: normal;
		font-weight: 500;
		font-size: 4.2vh;
		line-height: 5vh;
		color: #437796;
		margin: 0 auto;
		/* transform: translateX(96%) translateY(-50%); */
		transform: translateY(50%);
		/* vertical-align:middle; */
	}
</style>