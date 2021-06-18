<template>
	<view class="top">
		<u-search :placeholder="holder" v-model="keyword" @search="search" @custom="search"></u-search>
		<view class="search">搜索发现</view>
		<view class="tagData" v-for="(tag,index) in tags">
			<u-tag :bg-color="bgColor" :border-color="borderColor" :text="tag" color="#000000" shape="circle" @click="toStory(index)"
			 ref="tag"></u-tag>
		</view>
	</view>
</template>

<script>
	import api from '../../api/search/api.js'
	export default {
		data() {
			return {
				holder: '请输入关键词',
				keyword: '',
				tags: ['图书馆', 'A1教学楼', '世博超市', '一饭', '一饭天桥', '二饭', 'C10楼下水果店', 'A1教学楼', '软件学院', '电子商务系'],
				bgColor: '#F6F3EE',
				borderColor: '#F6F3EE'
			}
		},
		methods: {
			async search() {
				const data = await api.searchTip({
					keyword: this.keyword
				})
				uni.navigateTo({
					url: '../story/storyList'
				})
			},
			toStory(index) {
				this.keywod = this.tags[index];
				// this.search();
				this.holder = this.tags[index];
				// this.bgColor='#DCB093';
				// this.borderColor='#DCB093';
			}
		}
	}
</script>

<style>
	.top {
		margin-top: 30rpx;
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
</style>
