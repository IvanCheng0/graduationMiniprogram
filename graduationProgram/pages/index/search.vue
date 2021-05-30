<template>
	<view>
		<u-search placeholder="请输入关键词" v-model="keyword"></u-search>
		<view class="history">历史记录</view>
		<view class="historyData" v-for="(message,index) in historyData" :key="index" >
			<view>地点：{{message}}</view>
			<image src="../../static/search/images/delete.png" style="width:30rpx;height: 30rpx;margin-right: 10rpx;"></image>
		</view>
		<view class="history">搜索发现</view>
		<view class="historyData" v-for="(message,index) in searchData" :key="index" >
			<view >地点：{{message}}</view>
			<image src="../../static/search/images/delete.png" style="width:30rpx;height: 30rpx;margin-right: 10rpx;"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				historyData:['A1教学楼 我在这里度过无数节...','A1教学楼 我在这里度过无数节...','A1教学楼 我在这里度过无数节...','A1教学楼 我在这里度过无数节...'],
				searchData:['图书馆 每天抢位置学习真是头...','图书馆 每天抢位置学习真是头...','图书馆 每天抢位置学习真是头...','图书馆 每天抢位置学习真是头...'],
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	
	.u-content.data-v-4c556b40{
		height:70rpx !important;
		margin:0 20rpx;
		margin-top:30rpx ;
		
	}
	.u-input.data-v-4c556b40 {
		width:300rpx !important;
	}
	/* 搜索 */
	.u-action.data-v-4c556b40{
		background-color: #EEEEEE;
		height:70rpx !important;
		line-height: 70rpx;
		width:200rpx;
		border-radius:20rpx;
		margin-top:30rpx ;
	}
	.history{
		margin-top: 30rpx;
		font-weight:bold;
		font-size: 35rpx;
		margin-left:40rpx;
	}
	.historyData{
		padding:10rpx 80rpx;
		margin:10rpx 30rpx;
		margin-top:20rpx;
		height:80rpx;
		border-radius:30rpx;
		display:flex;
		align-items: center;
		border:solid #F6F3EE 3rpx;
		background-color:#F6F3EE;
		font-family:'Microsoft JhengHei UI Segoe';
		display:flex;
		justify-content: space-around;
		
	}
	
	

</style>
