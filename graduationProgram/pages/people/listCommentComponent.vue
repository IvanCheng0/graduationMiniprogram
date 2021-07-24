<template>
	<view >
		<view class="outer" @click="$emit('toStory', list.sid)" v-for="(list,index) in discussList" :key="index">
			<!-- <view class="left"></view> -->
			<view class="right">
				<view class="date">{{list.date}}</view>
				<view class="reply">{{list.reply}}</view>
				<view class="line"></view>
				<view class="commit">回复：     <span>{{list.replyUser}}</span></view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		props:['discussList'],
		methods: {

		},
		data() {
			return {}
		},
		onShow() {
			console.log('listcomment',this.discussList)
		},
	}
</script>

<style scoped>
	.outer {
		display: flex;
		align-items: center;
		justify-content: center;
		/* height: 14vh; */
		width:92vw;
		margin:0 auto;
		margin-bottom: 100rpx;
		box-sizing: border-box;
		margin-top:40rpx;
		padding:30rpx;
		background: #FFFFFF;
		box-shadow: 2rpx 8rpx 10rpx 4rpx rgba(0, 0, 0, 0.25);
		border-radius: 20rpx;
	}
	.left{
		width: 10vw;
		/* height: */
		background-color:#DCB093;
	}
	.right{
		width:85vw;
		display:flex;
		flex-direction: column;
		justify-content: space-around;
		padding-left: 20rpx;
		background-color: white;
	}
	.right .reply{
		font-family: Abel;
		font-style: normal;
		font-weight: normal;
		font-size: 32rpx;
		line-height: 44rpx;
		color: #666666;
	}
	.right .line{
		height:3.99rpx;
		background-color: #A9A9A9;
		transform: scale(50%);
		width:70vw;
		margin-top:10rpx;
	}
	.right .commit{
		font-family: Abel;
		font-style: normal;
		font-weight: normal;
		font-size: 25rpx;
		line-height: 36rpx;
		color: #A9A9A9;
	}
</style>