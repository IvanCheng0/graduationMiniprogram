<template>
	<div class="root">
		<titleComponent :title="title" :isShownBack="isShownBack"></titleComponent>
		<div class="userInfo">
			<image :src="userInfo.avatar" class="avatar"></image>
			<div>
				<input class="userName" :value="userInfo.name" disabled="true" />
				<textarea class="introduction" :value="userInfo.desc" @blur="saveUserDesc" />
				<u-modal v-model="modalShow" @confirm="confirm" ref="uModal" :async-close="true" content="确认保存？" show-cancel-button
				 confirmText="确认" cancelText="取消"></u-modal>
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
		<authorization v-if="tologin" @cancelChild="getChild"></authorization>
	</div>
</template>

<script>
	import titleComponent from './titleComponent.vue'
	import authorization from '../authorization/authorization.vue'
	import http from '../utils/request.js'
	import {saveUserInfo } from "../../api/people/api.js"
	export default {
		components: {
			titleComponent: titleComponent,
			authorization:authorization
		},
		data() {
			return {
				modalShow: false,
				userInfo:{
					name: "",
					desc: "",
					avatar: '',
				},
				title: '个人中心',
				isShownBack: false,
				tologin:false,
			}
		},
		onLoad() {
			this.login()
			
		},
		methods: {
			goPage(url){
				uni.navigateTo({
					url:`${url}?userInfo=${JSON.stringify(this.userInfo)}`
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
								title:'保存成功'
							})
						}
					}
				})
				this.modalShow = false;
			},
			login(){
				const token = this.$store.state.userInfo.token
				if (!token) {
					this.tologin=true
				} else {
					this.userInfo.name = this.$store.state.userInfo.userName,
					this.userInfo.avatar = this.$store.state.userInfo.avatar,
					this.userInfo.desc = this.$store.state.userInfo.desc
				}
			},
			getChild(val){
				this.tologin=val
				this.userInfo.name = this.$store.state.userInfo.userName,
				this.userInfo.avatar = this.$store.state.userInfo.avatar,
				this.userInfo.desc = this.$store.state.userInfo.desc
			},
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
