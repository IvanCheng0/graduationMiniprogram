<template>
	<view>
		<u-search placeholder="" v-model="keyword" :clearabled="true" @search="search()" :show-action="false">
		</u-search>
		<map style="width: 100%; height: 600px;" :controls="controls" :scale="scale" :latitude="latitude"
			:longitude="longitude" :markers="covers" @callouttap="handleTap">
		</map>
		<!-- //底部三个按钮 -->
		<view class="areaChoose">
			<view>五山校区</view>
			<view>大学城校区</view>
			<view>国际校区</view>
		</view>

		<u-search placeholder="" v-model="keyword"></u-search>
		<view class="history">历史记录</view>
		<view class="historyData" v-for="message in historyData">地点：{{message}}</view>
		<view class="history">搜索发现</view>
		<view class="historyData" v-for="message in historyData">地点：{{message}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '遥看瀑布挂前川',
				historyData: ['故事文字第一句', '故事文字第二句', '故事文字第三句', '故事文字第四句'],
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					id:0,
				    latitude: 23.053981,//纬度
				    longitude: 113.413298,//经度
				    // iconPath: '../../static/image/personal_center.png',	//显示的图标			
					title:'阿打算',//标注点名
					label:{//为标记点旁边增加标签
				            content:'文本1',//文本
				            color:'#F76350',//文本颜色
					    anchorX:0,//label的坐标，原点是 marker 对应的经纬度
					    anchorY:-80,//label的坐标，原点是 marker 对应的经纬度 
// 					    x:39.909,//这个组件微信在1.2.0以后就废弃了
// 					    y:116.39742,
				            bgColor:'#fff',//背景色
				            padding:5,//文本边缘留白
					    borderWidth:1,//边框宽度
					    borderColor:'#D84C29',//边框颜色							
					    textAlign:'right'//文本对齐方式。
				     },
					 callout:{//自定义标记点上方的气泡窗口 点击有效
				            content:'地点1',
				            color:'#F76350',
				            fontSize:12,
							borderRadius:5,
				     },
// 					 anchor:{//经纬度在标注图标的锚点，默认底边中点
// 						 x:5,
// 						 y:1,
// 					  }
				}, {
					id:1,
				    latitude: 39.90,
				    longitude: 116.39,
				    iconPath: '../../static/logo.png',
					title:'阿迪达斯',
					x:23.1290,
					y:113.264,
					label:{
					        content:'文本2',
					        color:'#F76350',
					        bgColor:'#fff',
					        padding:5,
					        borderRadius:4,
					 },
					 callout:{
					        content:'地点2',
					        color:'#F76350',
					        fontSize:12
					 }
				}],
				scale:15,//地图层级
				controls:[{//在地图上显示控件，控件不随着地图移动
					id:1,//控件id
					iconPath:'../../static/logo.png',//显示的图标	
					position:{//控件在地图的位置
						left:15,
						top:15,
						width:50,
						height:50
					},	
				}],
				// circles:[{//在地图上显示圆
				// 	latitude: 39.90,
				// 	longitude: 116.39,
				// 	fillColor:"#FFC41F",//填充颜色
				// 	color:"#12A1DD",//描边的颜色
				// 	radius:500,//半径
				// 	strokeWidth:2//描边的宽度
				// }],
				// polyline:[{//指定一系列坐标点，从数组第一项连线至最后一项
				// 	points:[
				// 		{latitude: 39.909,longitude: 116.39742},
				// 		{latitude: 39.90,longitude: 116.39},
				// 	],
				// 	color:"#0000AA",//线的颜色
				// 	width:2,//线的宽度
				// 	dottedLine:true,//是否虚线
				// 	arrowLine:true,	//带箭头的线 开发者工具暂不支持该属性
				// }],
			}
		},
		methods: {
			search() {
				uni.navigateTo({
					url: '../searchPlace/searchPlace'
				})
			}
		},
	}
</script>

<style>
	.history {
		margin-top: 10rpx;
	}

	.historyData {
		padding: 10rpx 100rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 10rpx;
		border: solid #007AFF 3rpx
	}

	.areaChoose {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin-top: 50rpx
	}

	.areaChoose view {
		border: #007AFF 3rpx solid;
		padding: 10rpx;
		border-radius: 10rpx;
	}
</style>