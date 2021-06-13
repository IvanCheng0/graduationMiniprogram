<template>
	<view>
		<u-search placeholder="请输入关键词" v-model="keyword" @search="search" @custom="search"></u-search>
		<view class="search">搜索发现</view>
		<view class="tagData" v-for="(tag,index) in tags"  >
			<u-tag bg-color="#F6F3EE" border-color="#F6F3EE" :text="tag" color="#000000" shape="circle" @click="toStory(index)" ref="tag" ></u-tag>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token:"eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjE0LCJleHAiOjE2MjMzNDgzNTl9.GlUs4Ys8p0hY3l1lhAhNmxGVs_l4iwMwxlE0X1043g4",
				keyword: '',
				tags:['图书馆','A1教学楼','世博超市','一饭','一饭天桥','二饭','C10楼下水果店','A1教学楼','软件学院','电子商务系']
			}
		},
		methods: {
			async search(){
				console.log(11)
				const data=await this.$http({url:'/api/v1/searchTip?token=`${this.token}`&keyword=`${this.keyword}`'})
			},
			toStory(index){
				console.log(index)
			}
		}
	}
</script>

<style>
	
	.search{
		margin-top: 30rpx;
		font-weight:bold;
		font-size: 35rpx;
		margin-left:40rpx;
	}
	.tagData{
		margin:10px;
		float:left;
	}
	
	
	

</style>
