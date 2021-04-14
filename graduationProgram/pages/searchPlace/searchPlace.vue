<template>
	<view>
		<view class="place">地点名称</view>
		<view class="user">
			<u-avatar :src="src" mode="square"></u-avatar>
			<view>昵称</view>
		</view>
		<view class="text"></view>
		
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg'
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.place{
		background-color: grey ;
		padding:30rpx 2000rpx
	}
	.user{
		display: flex;
		flex-direction: row;
		margin:30rpx;
		
	}
	.user view{
		margin-left:20rpx;
		background-color: grey;
		height:40rpx;
		width:200rpx;
		padding:15rpx  70rpx;
		
	}
	
	.text{
		border:solid grey 3rpx;
		width:100%;
		height:100px;
		background-color: grey;
		
	}

</style>
