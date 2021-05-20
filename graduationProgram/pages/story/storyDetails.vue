<template>
	<view>
	<view class="content">
		<view>
			<image src="../story/ana.jpg" class="headPic" mode="aspectFit"></image>
			<span style="display: inline-block;">
				<view>昵称</view>
				<view>2021-05-01</view>
			</span>
		</view>
		<view class="textContent">
			{{storyContent}}
		</view>
		<view class="src">
			<span class="storySrc">此处应有图片/视频/语音</span>
			
		</view>
		<view>
			<span style="">标签</span><!--区域滚动-->
			<view style="margin-top: 10px;">
				<!--区域滚动-->
					<span v-for="(item,idx) in tags" class="tag" style="margin-right: 10px;">#{{item.value}}</span>
			</view>
			
			
		</view>
		<view class="function">
			<span>评论图标</span>
			<span>点赞图标</span>
			<span>收藏图标</span>
		</view>
		
		
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
						value:'haoye0'
					},
					{
						value:'haoye1'
					},
					{
						value:'haoye2'
					},
					{
						value:'haoye3'
					},
					{
						value:'好耶0'
					},
					{
						value:'好耶1'
					},
					{
						value:'好耶2'
					},
					{
						value:'好耶3'
					},
				],
				storyContent:'……………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………',
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
.content>view{
	margin-top: 10px;
}
.headPic{
	width: 40px;
	height: 40px;
}
.tag{
	box-shadow: 5px 5px 5px #C1C6CF;
	border-radius: 15px;
	display:inline-block;
	padding: 8px;
	margin: 5px;
	background-color: #437796;
	color: #FFFFFF;
}
.textContent{
	
}
.src{
	text-align: center;
}
.storySrc{
	border-radius: 8px;
	padding: 5px;
	height: 150px;/*换行！*/
	min-height: 150px;
	background-color: #EBF2FF;
	box-shadow: 8px 8px 5px #C1C6CF;

	
}
.footer{
	width: 100%;
	position: fixed;
	bottom: 0;
	border-top: 1px solid #000000;
	padding: 10px 5px 10px 5px;
	background-color: white;
}
.function{
	position: absolute;
	right: 10%;
	margin-top: 10px;
}
.function>span{
	margin-right: 10px;
}
</style>
