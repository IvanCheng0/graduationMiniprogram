<template>
	<view class="top">
		<!-- @search用户确定搜索时触发，用户按回车键，或者手机键盘右下角的"搜索"键时触发 -->
		<!-- @custom  用户点击右侧控件时触发 -->
		<!-- @change 输入框内容发生变化时触发  @change="fuzzyQuery"-->
		<u-search :placeholder="holder" v-model="keyword" @search="search" @custom="search" @change="fuzzyQuery"></u-search>
		<view class="search">搜索发现</view>
		<view class="tagData" v-for="(tag,index) in tags" :key="index" v-if="showTag">
			<u-tag :bg-color="bgColor" :border-color="borderColor" :text="tag" color="#000000" shape="circle" @click="toStory(index,tag)"
			 ref="tag"></u-tag>
		</view>


		<!-- 搜索提示框 -->
		<view class="searchTips" v-if="showSearchTips">
			<view v-for="(tips,index) in searchTipsList" :key="index" class="searchTipsContent" @click="getTipsIndex(index,tips)">
				<view>{{tips}}</view>
			</view>
		</view>

	</view>
</template>

<script>
	import api from '../../api/search/api.js'
	export default {
		data() {
			return {
				holder: '请输入你想搜索的地点',
				keyword: '',
				tags: ['图书馆', 'A1教学楼', '世博超市', '第一学生饭堂', '天桥', '第二学生饭堂', '生活区操场','生活区篮球场'],
				bgColor: '#F6F3EE',
				borderColor: '#F6F3EE',
				locationName: null,
				showTag: true,
				showSearchTips: false,
				commonLocation: [],
				searchTipsList: [],
				location_id: [],
				page_id: 1,
				// searchListData:searchData(),

			}
		},
		onShow() {
			// this.locationName = this.$store.state.locationName
			// console.log('this.locationName', this.locationName)
			this.getLocation()
		},
		// computed:{
		// 	searchData(){
		// 	  let searchTipsContent = this.keyword;
		// 	  if(searchTipsContent){
		// 		  // return this.locationName.filter(item=>{
		// 			 //  String(item).search(searchTipsContent) != -1;

		// 		  // })
		// 		  // console.log('searchListData',this.searchListData)
		// 	  }
		// 	}
		// },
		methods: {
			fuzzyQuery() {
				if (this.keyword.length > 0) {
					this.showSearchTips = true;
					this.showTag = false;
					let searchTipsContent = this.keyword;
					if (searchTipsContent) {
						this.searchTipsList = []
						this.commonLocation.forEach((item, index) => {
							if (String(item).search(searchTipsContent) != -1) {
								this.searchTipsList.push(item)
								console.log(index)
								this.location_id.push(index)
							}
						})
						// return this.commonLocation.filter(item => {
						// 	String(item).search(searchTipsContent) != -1;

						// })
						// console.log('searchListData', this.searchListData)
					}

				}

			},
			async search() {
				const data = await api.searchTip({
					keyword: this.keyword
				})
				//把数据传到storyList页面

				// uni.navigateTo({
				// 	url: '../story/storyList'
				// })
			},
			toStory(index,tag) {
				this.keywod = this.tags[index];
				// this.search();
				this.holder = this.tags[index];
				// this.bgColor='#DCB093';
				// this.borderColor='#DCB093';
				setTimeout(()=>{
					let aid=this.getAid(this.commonLocation,tag)
					console.log('aid',aid)
					uni.navigateTo({
						url: `../story/storyList?place=${tag}&aid=${aid+1}`
					})
				},1800)
			},
			//根据标签查询到aid
			getAid(arr,tag){
				// arr.forEach((item,index)=>{
				// 	if(item==tag) return index;
				// })
				console.log('arr',arr)
				console.log('tag',tag)
				// arr.map((item,index)=>{
				// 	if(item==tag){
				// 		return index;
				// 	}
				// })
				for(let i=0;i<arr.length;i++){
					if(arr[i]==tag){
						console.log('i',i)
						return i
					}
				}
			},


			//获取地点数据
			async getLocation() {
				const res = await this.$http({
					url: '/api/v1/getAddress'
				})
				res.data.addressList.forEach((item, index) => {
					this.commonLocation.push(item.location_name)
				})

				console.log('commonLocation', this.commonLocation)
			},
			getTipsIndex(index,tips){
				this.location_id=index+1;
				let aid=this.getAid(this.commonLocation,tips)
				console.log('aid',aid)
				console.log('tips',tips)
				console.log('this.location_id',this.location_id)
				uni.navigateTo({
					url: `../story/storyList?place=${tips}&aid=${aid+1}`
				})
			}
		},

	}
</script>

<style>
	.u-search{
		margin-top:40rpx !important;
	}
	.search {
		margin-top: 30rpx;
		font-weight: bold;
		font-size: 35rpx;
		margin-left: 40rpx;
	}

	.tagData {
		margin: 10px;
		float: left;
	}

	.searchTips {
		background-color: #F6F3EE;
		/* display: flex;
		flex-wrap: nowrap; */
		height: 50vh;
		width: 88vw;
		margin-left: 20rpx;
		/* align-items: center; */
		/* justify-content: center; */
		margin-top: -4rpx;


	}

	.searchTips .searchTipsContent {
		font-size: 32rpx;
		/* border-top: 5rpx solid #000000; */
		margin-top: 25rpx;
	}
</style>
