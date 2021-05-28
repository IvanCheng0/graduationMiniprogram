<template>
	<view>
		<u-search placeholder="请输入关键词" style="margin-top:30rpx;" class="search" v-model="keyword" :clearabled="true" @search="search()" :show-action="false">
		</u-search>
		<view class="areaChoose">
			<view  class="button" @click="toWushan">五山校区</view>
			<view  class="button" @click="toCollegeTown">大学城校区</view>
			<view  class="button"	@click="toInternation">国际校区</view>
		</view>
		<view style="margin-left:40rpx;margin-right:40rpx">
			<map style="width: 100%; height: 800rpx;margin-top:50rpx;margin-right:40rpx" :controls="controls" :scale="scale" :latitude="latitude"
			 :longitude="longitude" :markers="covers"  @markertap="changeTap" max-scale="19" min-scale="16">
			</map>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				title: 'map',
				latitude: 23.046455,
				longitude: 113.405261,
				covers: [{
					id: 0,
					latitude: 23.046455, 
					longitude: 113.405261, 		
					title: '图书馆', //标注点名
					label: { //为标记点旁边增加标签
						content: '图书馆', 
						color: '#F76350', 
						anchorX: 0, //label的坐标，原点是 marker 对应的经纬度
						anchorY: -80, //label的坐标，原点是 marker 对应的经纬度 
						bgColor: '#fff', //背景色
						padding: 5, 
						// borderWidth: 1, //边框宽度
						// borderColor: '#D84C29', //边框颜色							
						// textAlign: 'right' //文本对齐方式。
					},
					callout: { //自定义标记点上方的气泡窗口 点击有效
						content: '地点1',
						color: '#F76350',
						fontSize: 12,
						borderRadius: 5,
					},					
				}, {
					id: 5,
					latitude: 23.047667,
					longitude: 113.405512,
					title: 'A1教学楼',
					x: 23.1290,
					y: 113.264,
					label: {
						content: 'A1教学楼',
						color: '#F76350',
						bgColor: '#fff',
						anchorX: 0, //label的坐标，原点是 marker 对应的经纬度
						anchorY: -80, //label的坐标，原点是 marker 对应的经纬度
						padding: 5,
						borderRadius: 4,
					},
					callout: {
						content: '地点2',
						color: '#F76350',
						fontSize: 12
					}
				}],
				scale: 17, //地图层级
				controls: [{ //在地图上显示控件，控件不随着地图移动
					id: 1, //控件id
					iconPath: '../../static/logo.png', //显示的图标	
					position: { //控件在地图的位置
						left: 15,
						top: 15,
						width: 50,
						height: 50
					},
				}],
			}
		},
		methods: {
			search() {
				uni.switchTab({
					url: '../searchPlace/searchPlace'
				})
			},
			changeTap(e){
				console.log(e.detail.markerId)
				if(e.detail.markerId==5){
					uni.switchTab({
						url:"../search/search"
					})
				}else if(e.detail.markerId==0){
					uni.switchTab({
						url:"../searchPlace/searchPlace"
					})
				}
			},
			toWushan() {
				this.latitude = 23.154165
				this.longitude = 113.345922
			},
			toCollegeTown() {
				this.latitude = 23.046455
				this.longitude = 113.405261
			},
			toInternation() {
				this.latitude = 23.008579
				this.longitude = 113.407349
			},

		},
	}
</script>

<style>
	.areaChoose {
		display: flex;
		justify-content: space-around;
		margin-top: 50rpx;
	}

	.areaChoose .button {
		border-radius: 20rpx;
		background-color: #E2ECFF !important;
		padding:10rpx;
		font-family: 'Microsoft JhengHei UI Segoe';
		color:#AFAFAF;
	}

	.u-content.data-v-4c556b40 {
		margin: 0 50rpx;
		background-color: #E2ECFF !important;
		margin-top:30rpx ;
	}

	.u-input.data-v-4c556b40 {
		background-color: #E2ECFF !important;
	}
	
</style>
