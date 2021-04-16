<template>
	<view>
	<view class="content">
		<view class="tags">
			<span style="margin-left: 10px;">标签</span><!--区域滚动-->
			<scroll-view scroll-x="true"  scroll-left="100" show-scrollbar="true" style="margin-top:5px;height: 25px;">
				<span v-for="item in tags" class="tag">{{item.value}}</span>
			</scroll-view>
			
		</view>
		<view class="textContent">
			{{storyContent}}
		</view>
		<view class="src">
			<span class="storySrc">此处应有图片</span>
			<span class="storySrc">此处应有视频</span>
			<span class="storySrc">此处应有语音</span>
		</view>
		<view>test</view>
		<view>test</view>
		<view>test</view>
		<view>test</view>
		<view>test</view>
		<view>test</view>
		<view>test</view>
		<view>test</view>
		<view>test</view>
		<view>test</view>
		<view>test</view>
		<view>test</view>
		<view>test</view>
		<view>test</view>
		<view>test</view>
		<view>test</view>
		<view>test</view>
		<view>test</view>
		<view>test</view>
	</view>
	<view class="footer">
		<input style="border: 1px solid;margin-left:5px ;width: 40%;float: left;" type="text" placeholder="请输入文字" />
		<span>
			<span class="funcButton" :style="[{backgroundColor: mark_flag==true ? '#FF0000' : '#FFFFFF'}]" @click="mark">收藏</span>
			<span class="funcButton" :style="[{backgroundColor: like_flag==true ? '#FF0000' : '#FFFFFF'}]" @click="like">喜欢</span>
			<span class="funcButton" @click="moreComment">评论</span>
		</span>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '故事详情',
				tags:[
					{
						value:'tag1'
					},
					{
						value:'tag2'
					},
					{
						value:'tag4'
					},
					{
						value:'tag5'
					},
					{
						value:'tag6'
					},
					{
						value:'tag6'
					},
					{
						value:'tag7'
					},
					{
						value:'tag8'
					},
					{
						value:'tag9'
					},
					{
						value:'tag10'
					},
				],
				storyContent:'故事文字描述',
				mark_flag:false,//获取用户数据
				like_flag:false,
				
			}
		},
		methods: {
			mark(){
				this.mark_flag=!this.mark_flag;
				console.log(this.mark_flag);
			},
			like(){
				this.like_flag=!this.like_flag;
			},
			moreComment(){
				
			}
		}
	}
</script>

<style>
.content {
	width: 90%;
	margin: 0 auto;
	margin-top: 15px;
}
.tag{
	border: 1px solid;
	border-radius: 8px;
	margin-left: 10px;
}
.textContent{
	border: 1px solid;
	border-radius: 8px;
	margin-top: 15px;
	padding: 5px 150px 180px 10px;
}
.src{
	margin-top: 15px;
	text-align: center;
}
.storySrc{
	border: 1px solid;
	border-radius: 8px;
	margin-left: 10px;
	
}
.footer{
	width: 100%;
	position: fixed;
	bottom: 0;
	border-top: 1px solid #000000;
	padding: 10px 5px 10px 5px;
	background-color: white;
}
.funcButton{
	float: right;
	border: 1px solid;
	border-radius: 8px;
	margin-right: 20px;
}
</style>
