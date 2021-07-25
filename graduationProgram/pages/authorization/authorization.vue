<template>
	<view class="pop" v-if="show">
		<view class="pop-main">
			<!-- <i class="iconfont cancel" @click="cancel">
				<u-icon name="close-circle-fill" color="gray" ></u-icon>
			</i> -->
			<view class="pop-title">微信授权</view>
			<view class="pop-text">
				<image src="../../static/map.jpg" mode=""></image>
				<view class="allow">灯神故事地图申请获得以下权限</view>
				<view class="public">获得你的公开信息（昵称、头像、地区及性别）</view>
			</view>
			<!-- <view class="confirm">
				<view>拒绝</view>
				<view>允许</view>
			</view> -->
			<view class="confirm">
				<button @click="getUserInfo" >允许</button>
				<button @click="show=!show"  >拒绝</button>
			</view>
		</view>
	</view>
</template>

<script>
	import http from "../utils/request"
	export default {
		data() {
			return {
				userInfo: {},
				code: "",
				show:true,
			};
		},
		//先是this.getUserInfo(),之后是this.login(),之后this.getToken()
		methods: {
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
			login() {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						this.code = res.code;
						uni.showToast({
						    title: '登录中',
						    duration: 600,
							icon:'loading',
							position:'center',
						});
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
			getToken() {
				let reqData = {
					username: this.userInfo.nickName,
					avatar: this.userInfo.avatarUrl
				};
				//reqData = JSON.stringify(reqData) 
				uni.request({
					url: `https://story.genielink.cn/api/v1/getToken?code=${this.code}`,
					method: 'POST',
					data: reqData,
					success: res => {
						if (!res) {
							return uni.showToast({
								icon: 'loading',
								title: '获取数据失败'
							})
						}
						if (res.statusCode == 500) {
							return uni.showToast({
								icon: 'loading',
								title: '获取数据失败'
							})
						}
						if (res.data) {
							const data = {
								userName: this.userInfo.nickName,
								avatar: this.userInfo.avatarUrl,
								desc: res.data.desc,
								token: res.data.token
							}
							console.log('token',res.data.token)
							this.$store.commit('login', data)
						}
						this.cancel()
					},
					fail: err => {
						return uni.showToast({
							icon: 'loading',
							title: '请求失败'
						})
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
		width: 622upx;
		height: 541upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 20upx;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 14px;
		/* padding: 32upx 0upx 40upx 0upx; */
	}

	/* 删除按钮 */
	.cancel {
		position: absolute;
		top: 20upx;
		right: 20upx;
		font-size: 20px;
	}

	.pop-title {
		padding-bottom: 20upx;
		margin-top: 20upx;
		width: 100%;
		border-bottom: 2rpx solid #BFBFBF;
		font-size: 32rpx;
		letter-spacing: 4rpx;
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
	
	image{
		margin:0 auto;
		width:134rpx;
		height:126rpx;
		border-radius: 50%;
	}
	.allow{
		font-weight: bold;
		margin-top: 10rpx;
	}
	.public{
		color:gray;
		margin-top:20rpx;
	}
	.confirm{
	/* 	width:100%;
		height:25%; */
		/* display: inline-block !important;
		text-align:center !important;
		vertical-align: center !important; */
		display:flex !important;
		
		
	}
	button {
		background-color: #08BF00;
		color: #FFFFFF;
		text-align: center;
		height: 68upx;
		line-height: 68upx;
		font-size: 14px;
		/* border-radius: 50upx; */
		width: 150rpx;
		margin-top:-14rpx;
		margin-right:63rpx;
		margin-left:53rpx;
	}
</style>
