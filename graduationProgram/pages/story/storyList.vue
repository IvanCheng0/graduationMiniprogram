<template>
	<view>
		<!-- 地点 -->
		<button  class="button">{{placeData}}</button>
		<view v-for="(item, idx) in storyList" :key="idx">
			<singlestory 
		:p_usrname="item.usrname"
		:p_time="item.time"
		:p_tags="item.tags"
		:p_storyContent="item.storyContent"
		:p_comment_num="item.comment_num"
		:p_mark_flag="item.mark_flag"
		:p_like_flag="item.like_flag"
		:p_like_num="item.like_num"
		:p_commentList="item.commentList"></singlestory>
		</view>
	</view>
</template>

<script>
import singlestory from '../story/singleStory_component.vue'
	export default {
		data() {
			return {
				placeData:'A1教学楼',
				storyList:[
					{
						id: '我是故事id1',
						usrname: '我是昵称1',
						time: '2021-05-01',
						tags:[
							{
								value:'haoye0'
							},
							{
								value:'haoye1'
							},
							
						],
						storyContent:'我是内容1 这里是文章测试标题，含标点一共二十个字。这里是文章测试标题，含标点一共二十个字。这里是文章测试标题，含标点一共二十个字。这里是文章测试标题，含标点一共二十个字。这里是文章测试标题，含标点一共二十个字。这里是文章测试标题，含标点一共二十个字。这里是文章测试标题，含标点一共二十个字。这里是文章测试标题，含标点一共二十个字。',
						comment_num: 5,
						mark_flag:false,//获取用户数据
						like_flag:false,//获取用户数据
						like_num:50,
						mark_icon: '../../static/story/icon/mark.png',
						mark_after_icon: '../../static/story/icon/mark_after.png',
						like_icon: '../../static/story/icon/like.png',
						like_after_icon: '../../static/story/icon/like_after.png',
						replyContent: '',
						commentList: [
							{
								headPic: '../../static/story/test/head.jpg',
								name: '一只快乐的肥宅猪猪猫',
								content: '我在这里也有很多回忆！',
								like_num: 5,
								like_flag: false,
							},
							{
								headPic: '../../static/story/test/head.jpg',
								name: '一只快乐的肥宅猪猪猫',
								content: '我在这里也有很多回忆！',
								like_num: 5,
								like_flag: false,
							},
							{
								headPic: '../../static/story/test/head.jpg',
								name: '一只快乐的肥宅猪猪猫',
								content: '我在这里也有很多回忆！',
								like_num: 5,
								like_flag: false,
							},
							{
								headPic: '../../static/story/test/head.jpg',
								name: '一只快乐的肥宅猪猪猫',
								content: '我在这里也有很多回忆！',
								like_num: 5,
								like_flag: false,
							},
							{
								headPic: '../../static/story/test/head.jpg',
								name: '一只快乐的肥宅猪猪猫',
								content: '我在这里也有很多回忆！',
								like_num: 5,
								like_flag: false,
							},
							{
								headPic: '../../static/story/test/head.jpg',
								name: '一只快乐的肥宅猪猪猫',
								content: '我在这里也有很多回忆！',
								like_num: 5,
								like_flag: false,
							},
							{
								headPic: '../../static/story/test/head.jpg',
								name: '一只快乐的肥宅猪猪猫',
								content: '我在这里也有很多回忆！',
								like_num: 5,
								like_flag: false,
							},
						],
					},
					{
						usrname: '我是昵称2',
						time: '2021-05-01',
						tags:[
							{
								value:'haoye0'
							},
							{
								value:'haoye1'
							},
							
						],
						storyContent:'我是内容2 这里是文章测试标题，含标点一共二十个字。这里是文章测试标题，含标点一共二十个字。这里是文章测试标题，含标点一共二十个字。这里是文章测试标题，含标点一共二十个字。这里是文章测试标题，含标点一共二十个字。这里是文章测试标题，含标点一共二十个字。这里是文章测试标题，含标点一共二十个字。这里是文章测试标题，含标点一共二十个字。',
						comment_num: 5,
						mark_flag:false,//获取用户数据
						like_flag:false,//获取用户数据
						like_num:50,
						mark_icon: '../../static/story/icon/mark.png',
						mark_after_icon: '../../static/story/icon/mark_after.png',
						like_icon: '../../static/story/icon/like.png',
						like_after_icon: '../../static/story/icon/like_after.png',
						replyContent: '',
						commentList: [
							{
								headPic: '../../static/story/test/head.jpg',
								name: '一只快乐的肥宅猪猪猫',
								content: '我在这里也有很多回忆！',
								like_num: 5,
								like_flag: false,
							},
							{
								headPic: '../../static/story/test/head.jpg',
								name: '一只快乐的肥宅猪猪猫',
								content: '我在这里也有很多回忆！',
								like_num: 5,
								like_flag: false,
							},
							{
								headPic: '../../static/story/test/head.jpg',
								name: '一只快乐的肥宅猪猪猫',
								content: '我在这里也有很多回忆！',
								like_num: 5,
								like_flag: false,
							},
							{
								headPic: '../../static/story/test/head.jpg',
								name: '一只快乐的肥宅猪猪猫',
								content: '我在这里也有很多回忆！',
								like_num: 5,
								like_flag: false,
							},
							{
								headPic: '../../static/story/test/head.jpg',
								name: '一只快乐的肥宅猪猪猫',
								content: '我在这里也有很多回忆！',
								like_num: 5,
								like_flag: false,
							},
							{
								headPic: '../../static/story/test/head.jpg',
								name: '一只快乐的肥宅猪猪猫',
								content: '我在这里也有很多回忆！',
								like_num: 5,
								like_flag: false,
							},
							{
								headPic: '../../static/story/test/head.jpg',
								name: '一只快乐的肥宅猪猪猫',
								content: '我在这里也有很多回忆！',
								like_num: 5,
								like_flag: false,
							},
						],
					},
				]
				
			}
		},
		methods: {
		},
		onLoad(){
			//获取发布人昵称、头像、发布日期、标签、点赞、评论、收藏
		},
		components:{
			singlestory
		}
	}
</script>

<style>
.button{
	font-family: FZCHSJW--GB1-0;
	width:600rpx;
	height: 80rpx;
	line-height: 80rpx;
	font-weight: bold;
	border-radius: 40rpx;
	background-color: #E2ECFF;
	margin-top:30rpx ;
	}

</style>
