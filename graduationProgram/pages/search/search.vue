<template>
	<view>
		<u-search placeholder="" v-model="keyword"></u-search>
		<view class="history">历史记录</view>
		<view class="historyData" v-for="message in historyData" >地点：{{message}}</view>
		<view class="history">搜索发现</view>
		<view class="historyData" v-for="message in historyData" >地点：{{message}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '遥看瀑布挂前川',
				historyData:['故事文字第一句','故事文字第二句','故事文字第三句','故事文字第四句']
			}
		},
		methods: {
			
		}
	}
</script>

<style>
		
	.history{
		margin-top: 10rpx;
	}
	.historyData{
		padding:10rpx 100rpx;
		margin-left:30rpx;
		margin-right:30rpx;
		margin-top: 10rpx;
		border:solid #007AFF 3rpx
	}
	
	

</style>
