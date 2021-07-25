<template>
	<view>
		<u-search placeholder="请输入关键词" @focus="leaveToSearch" style="" class="search" v-model="keyword" :clearabled="true"
		 :show-action="false">
		</u-search>
		<view class="areaChoose">
			<view class="button" @click="toWushan">五山校区</view>
			<view class="button" @click="toCollegeTown">大学城校区</view>
			<view class="button" @click="toInternation">国际校区</view>

		</view>
		<view style="margin-left:40rpx;margin-right:40rpx">
			<map :scale="scale" :latitude="latitude" :longitude="longitude" :markers="covers" @markertap="changeTap" @tap="getLocation"
			 max-scale="19" min-scale="16">
			</map>
		</view>
		<!-- 	<view class="locate">
			<image @click="locate" src="../../static/search/images/locate.png"></image>
			<view>显示当前位置</view>
		</view> -->
		<!-- <authorization v-if="tologin" @cancelChild="getChild"></authorization> -->
	</view>
</template>

<script>
	import api from '../../api/search/api.js'
	import authorization from '../authorization/authorization.vue'
	export default {
		components: {
			authorization: authorization
		},
		data() {
			return {
				url: 'https://story.genielink.cn/api/v1/getAddress',
				userInfo: {
					name: "",
					desc: "",
					avatar: "",
				},
				keyword: '',
				title: 'map',
				latitude: 23.046455,
				longitude: 113.405261,
				tologin: false,
				// data是获取的全部地点数据
				data: null,
				covers: [],
				scale: 17,
			}
		},
		onShow() {
			this.getLocationData();
		},
		methods: {
			// 获取经纬度数据
			getLocationData() {
				// const res = await uni.request({
				// 	url: `${this.url}`
				// });
				uni.request({
					url: `${this.url}`,
					success: (res) => {
						this.data = res.data.addressList;
						console.log('data', this.data)
						this.data.forEach((item, index) => {
							const latitude = parseFloat(item.position.split(',')[0])
							const longitude = parseFloat(item.position.split(',')[1])
							let coordinate = {
								id: null,
								latitude: null,
								longitude: null,
								title: null,
								width: '30rpx',
								height: '60rpx'
							}
							coordinate.id = index;
							coordinate.latitude = latitude;
							coordinate.longitude = longitude;
							coordinate.title = item.location_name;
							if (!this.covers[index]) {
								this.covers.push(coordinate)
							} else {
								this.covers[index] = coordinate
							}
						
						})
						// console.log(this.covers)
						
						
					}
				});
				
			},

			leaveToSearch() {
				uni.navigateTo({
					url: './search'
				})
			},
			login() {
				const token = this.$store.state.userInfo.token
				if (!token) {
					this.tologin = true
				} else {
					this.userInfo.name = this.$store.state.userInfo.userName,
						this.userInfo.avatar = this.$store.state.userInfo.avatar,
						this.userInfo.desc = this.$store.state.userInfo.desc
				}
			},
			getChild(val) {
				this.tologin = val
				this.userInfo.name = this.$store.state.userInfo.userName,
					this.userInfo.avatar = this.$store.state.userInfo.avatar,
					this.userInfo.desc = this.$store.state.userInfo.desc
			},
			//二分查找
			bsearch(arr, value) {
				let low = 0;
				let high = arr.length - 1;
				while (low <= high) {
					let mid = Math.floor(low + (high - low) / 2);
					if (arr[mid] == value) {
						return mid
					} else if (arr[mid] < value) {
						low = mid + 1
					} else {
						high = mid - 1
					}
				}
				return -1;
			},
			changeTap(e) {
				// 下面这部分代码是之前发网络请求获取地点数据来获取相关信息
				// console.log('e.detail.markerId', e.detail.markerId)
				e.detail.markerId = e.detail.markerId + 1
				let arr = new Array();
				this.data.forEach(item => {
					arr.push(item.aid)
				})
				// console.log('arr', arr)
				const index = this.bsearch(arr, e.detail.markerId)
				// console.log('index', index)
				const name = this.data[index].campus + '-' + this.data[index].location_name
				// console.log('name', name)
				const aid = this.data[index].aid
				console.log('aid', aid)
				uni.navigateTo({
					url: `../story/storyList?place=${name}&aid=${aid}`
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
			locate() {
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				});
			}
		},
	}
</script>

<style>
	.u-search {
		margin-top: 40rpx !important;
	}

	.areaChoose {
		display: flex;
		justify-content: space-around;
		margin-top: 50rpx;
	}

	.areaChoose .button {
		border-radius: 20rpx;
		background-color: #E2ECFF !important;
		padding: 10rpx;
		font-family: 'Microsoft JhengHei UI Segoe';
		color: #AFAFAF;
	}

	.u-content.data-v-4c556b40 {
		margin: 0 50rpx;
		background-color: #E2ECFF !important;
		margin-top: 30rpx;
	}

	.u-input.data-v-4c556b40 {
		background-color: #E2ECFF !important;
	}

	map {
		width: 100%;
		height: 75vh;
		margin-top: 50rpx;
		margin-right: 40rpx;
		/* border:10rpx solid #4572CD; */
	}

	.locate {
		display: flex;
		margin-top: 30rpx;
		margin-left: 400rpx;
	}

	.locate image {
		width: 40rpx;
		height: 35rpx;
		margin-right: 30rpx;
	}

	.locate view {
		font-size: 30rpx;
	}
</style>
