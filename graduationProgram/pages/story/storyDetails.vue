<template>
	<view>
		<!--布尔传参不能用驼峰命名^^-->
		<singlestory 
		story-page-type 
		:p_usrname="storyInfo.usrname"
		:p_time="storyInfo.time"
		:p_tags="storyInfo.tags"
		:p_storyContent="storyInfo.storyContent"
		:p_comment_num="storyInfo.comment_num"
		:p_mark_flag="storyInfo.mark_flag"
		:p_like_flag="storyInfo.like_flag"
		:p_like_num="storyInfo.like_num"
		:p_commentList="storyInfo.commentList"></singlestory>
<!--评论区列表-->

		<comment-list :p_commentList="storyInfo.commentList"></comment-list>
	</view>
</template>

<script>
import singlestory from '../story/singleStory_component.vue'
import commentList from '../story/comment_list_component.vue'
	export default {
		data() {
			return {
				storyInfo:
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
							
						],
					
					},
				
				
			}
		},
		methods: {
		},
		onLoad(){
			//获取发布人昵称、头像、发布日期、标签、点赞、评论、收藏
		},
		components:{
			singlestory,
			commentList
		}
	}
</script>

<style>


</style>
