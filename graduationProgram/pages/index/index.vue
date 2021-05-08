<template>
	<view class="content">
		<u-search placeholder="" v-model="keyword" :clearabled="true" @search="search()" :show-action="false"></u-search>
		<!-- //底部三个按钮 -->
		<view class="areaChoose">
			<view>五山校区</view>
			<view>大学城校区</view>
			<view>国际校区</view>
		</view>
		
		
		
		
		<u-tabbar v-model="current" :list="list" :mid-button="true"></u-tabbar>
		
	</view>
	
	
	
</template>

<script>
	export default {		
		data() {
			return {
				keyword: 'Hello',
				list: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '寻找故事',												
						customIcon: false,
					},				
					{
						iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
						selectedIconPath: "https://cdn.uviewui.com/uview/common/min_button_select.png",
						text: '发布故事',
						midButton: true,
						customIcon: false,
					},					
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '个人中心',
						isDot: false,
						customIcon: false,
					},
				],
				current: 0
			}
		},
		onLoad() {	
			console.log("1253")
		},
		methods: {
			search(){
				uni.navigateTo({
					url:'../searchPlace/searchPlace'
				})
			}

		},
		// onReady(){
		// 	search(){
				
		// 	}
		// }
	}
</script>

<style>
	.areaChoose{
		display:flex;
		flex-direction: row;
		justify-content: space-around;
		margin-top:50rpx
		
	} 
	.areaChoose view{
		border:#007AFF 3rpx solid;
		padding:10rpx;
		border-radius: 10rpx;
	}
	
	
</style>
