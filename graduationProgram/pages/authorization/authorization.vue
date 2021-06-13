<template>
	<view class="pop">
		<view class="pop-main">
			<i class="iconfont cancel" @click="cancel">X</i>
			<view class="pop-title">需要您的授权</view>
			<view class="pop-text">
				<view>为了提供更好的服务</view>
				<view>请在稍后的提示框中点击允许</view>
			</view>
			<button @click="getUserInfo">请登录</button>
		</view>
	</view>
</template>

<script>
	import http from "../utils/request"
	export default {
		data() {
			return {
				userInfo: {},
				code: ""
			};
		},
		methods: {
			getToken() {
				console.log(this.code, this.userInfo.nickName, this.userInfo.avatarUrl ,"data")
				uni.request({
					url:`https://story.genielink.cn/api/v1/getToken?code=${this.code}`,
					method:'POST',
					data: {
						username: this.userInfo.nickName,
						avater: this.userInfo.avatarUrl
					},
					success:res=>{
						if(!res){
							return uni.showToast({icon:'loading',title:'获取数据失败'})
						}
						if (res.statusCode == 500) {
							return uni.showToast({icon:'loading',title:'获取数据失败'})
						}
						if (res.data) {
							const data= {
								username:this.userInfo.nickName,
								avater:this.userInfo.avatarUrl,
								token:res.data.token
							}
							this.$store.commit('login', data)
							console.log("aaaa", this.$store)
						}
						this.cancel()
					},
					fail:err=>{
						return uni.showToast({
							icon:'loading',
							title:'请求失败'
						})
					}
				})
				
			},
			login() {
				uni.login({
						provider: 'weixin',
						success: (res) => {
							this.code = res.code
							this.getToken()
						},
						fail: (res) => {
							if (res.errMsg && res.errMsg.indexOf("ok") !== -1) {
								this.code = res.code
								this.getToken()
							}
						}
				});
		},
		getUserInfo() {
			//uniapp最新的获取用户信息的方式，旧版已获取不到
			uni.getUserProfile({
				desc: 'Wexin', // 这个参数是必须的
				success: (res) => {
					//console.log("用户信息",res.userInfo)
					//获得openID需要先用wx.login()获取临时登录凭证code
					this.userInfo = res.userInfo;
					this.login();
				},
				fail: (res) => {
					if (res.errMsg && (res.errMsg.indexOf("ok") !== -1)) {
						this.userInfo = res.userInfo
						this.login();
					}
				}
			})
		},

		cancel() {
			this.$emit('cancelChild', false)
		},
	}
	}
</script>

<style scoped>
	.pop {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .3);
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.pop-main {
		width: 690upx;
		height: 800upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 20upx;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 14px;
		padding: 64upx 0upx 40upx 0upx;
	}

	/* 删除按钮 */
	.cancel {
		position: absolute;
		top: 20upx;
		right: 20upx;
		font-size: 20px;
	}

	.pop-title {
		padding-bottom: 40upx;
		width: 100%;
		border-bottom: 1px solid #BFBFBF;
		font-size: 16px;
		letter-spacing: 2px;
		text-align: center;
	}

	.pop-imgsize {
		width: 484upx;
		height: 406upx;
	}

	.pop-text {
		width: 75%;
		text-align: center;
		font-size: 15px;
		margin: 30upx 0upx;
		letter-spacing: 1px;
	}

	button {
		background-color: #08BF00;
		color: #FFFFFF;
		text-align: center;
		height: 88upx;
		line-height: 88upx;
		font-size: 14px;
		border-radius: 50upx;
		width: 78%;
	}
</style>
