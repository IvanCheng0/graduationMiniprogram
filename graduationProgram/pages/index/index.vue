<template>
	<view>
		<u-search placeholder="请输入关键词" @focus="leaveToSearch" style="margin-top:30rpx;" class="search" v-model="keyword" :clearabled="true"  :show-action="false">
		</u-search>
		<view class="areaChoose">
			<view  class="button" @click="toWushan">五山校区</view>
			<view  class="button" @click="toCollegeTown">大学城校区</view>
			<view  class="button"	@click="toInternation">国际校区</view>
			
		</view>
		<view style="margin-left:40rpx;margin-right:40rpx">
			<map :scale="scale"
			 :latitude="latitude"
			 :longitude="longitude"
			 :markers="covers"  
			 @markertap="changeTap"
			 @tap="getLocation"
			 max-scale="19" 
			 min-scale="16">
			</map>
		</view>
	<!-- 	<view class="locate">
			<image @click="locate" src="../../static/search/images/locate.png"></image>
			<view>显示当前位置</view>
		</view> -->
		
	</view>
</template>

<script>
	import api from '../api/search/api.js'
	export default {
		data() {
			return {
				token:"eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEsImV4cCI6MTYyMzk1NDM4MX0.4Ix46RaUm0JWuKRbWRLj9YGb0cEW0a5ahvlD1jg6G98",
				keyword: '',
				title: 'map',
				latitude: 23.046455,
				longitude: 113.405261,
				covers: [{
					id: ['大学城校区','图书馆'],
					latitude: 23.046455, 
					longitude: 113.405261, 		
					title: '图书馆', 
					label: { 
						content: '', 
						color: '#F76350', 
						anchorX: 0, //label的坐标，原点是 marker 对应的经纬度
						anchorY: -80, //label的坐标，原点是 marker 对应的经纬度 
						bgColor: '#fff', //背景色
						padding: 5, 
					},
					callout: { //自定义标记点上方的气泡窗口 点击有效
						content: '图书馆',
						color: '#F76350',
						fontSize: 12,
						borderRadius: 5,
					},					
				}, {
					id: ['大学城校区','A1教学楼'],
					latitude: 23.047667,
					longitude: 113.405512,
					title: 'A1教学楼',
					x: 23.1290,
					y: 113.264,
					label: {
						content: '',
						color: '#F76350',
						bgColor: '#fff',
						anchorX: 0, //label的坐标，原点是 marker 对应的经纬度
						anchorY: -80, //label的坐标，原点是 marker 对应的经纬度
						padding: 5,
						borderRadius: 4,
					},
					callout: {
						content: 'A1教学楼',
						color: '#F76350',
						fontSize: 12
					}
				}],
				scale: 17, //地图层级
			}
		},
		methods: {
			leaveToSearch() {
				uni.navigateTo({
					url: './search'
				})
			},
			getLocation(index){
				// console.log(index)
			},
			changeTap(e){
				console.log(e.detail.markerId)
				if(e.detail.markerId.toString()== ['大学城校区','图书馆'].toString()){
				}else if(e.detail.markerId.toString()==['大学城校区','A1教学楼'].toString()){
					console.log("A1教学楼")
						uni.navigateTo({
							url: '../story/storyList'
						})
				
				}
				 api.getStory({data:{token:`${this.token}`,location_name:'大学城校区-图书馆',page_id: 1}}).then(res=>{
					 console.log(res)
				 })
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
			locate(){
				uni.getLocation({
				    type: 'wgs84',
				    success: function (res) {
				        console.log('当前位置的经度：' + res.longitude);
				        console.log('当前位置的纬度：' + res.latitude);
				    }
				});
			}
		},
	}
</script>

<style>
	@font-face {
		font-family:"FZCuHeiSongS-B-GB";
		src: url("../../static/story/font/fzchsjwgb10_downyi.com.TTF");
	}
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
	map{
		width: 100%; 
		height: 800rpx;
		margin-top:50rpx;
		margin-right:40rpx
	}
	.locate{
		display:flex;
		margin-top: 30rpx;
		margin-left:400rpx;
	}
	.locate image{
		width:40rpx;
		height:35rpx;
		margin-right: 30rpx;
	}
	.locate view{
		font-size: 30rpx;
		font-family:"FZCuHeiSongS-B-GB";
	}
	
</style>
