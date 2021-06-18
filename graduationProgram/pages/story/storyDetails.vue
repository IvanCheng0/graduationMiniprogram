<template>
	<view>
		<!--布尔传参不能用驼峰命名^^-->
		<singlestory story-page-type :p_usrname="storyInfo.usrname" :p_sid="storyInfo.sid" :p_time="storyInfo.time" :p_tags="storyInfo.tags"
		 :p_storyContent="storyInfo.storyContent" :p_comment_num="storyInfo.comment_num" :p_mark_flag="storyInfo.mark_flag"
		 :p_like_flag="storyInfo.like_flag" :p_like_num="storyInfo.like_num" :p_commentList="storyInfo.commentList"></singlestory>
		<!--评论区列表-->

		<comment-list :p_commentList="storyInfo.commentList"></comment-list>
	</view>
</template>

<script>
	import singlestory from '../story/singleStory_component.vue'
	import commentList from '../story/comment_list_component.vue'
	import api from '../../api/story/api.js'
	export default {
		data() {
			return {
				storyInfo: {
					usrname: '我是昵称1',
					time: '2021-05-01',
					tags: [{
							value: 'haoye0'
						},
						{
							value: 'haoye1'
						},

					],
					storyContent: '我是内容1 这里是文章测试标题，含标点一共二十个字。这里是文章测试标题，含标点一共二十个字。这里是文章测试标题，含标点一共二十个字。这里是文章测试标题，含标点一共二十个字。这里是文章测试标题，含标点一共二十个字。这里是文章测试标题，含标点一共二十个字。这里是文章测试标题，含标点一共二十个字。这里是文章测试标题，含标点一共二十个字。',
					sid: 1,
					comment_num: 0,
					mark_flag: false, //获取用户数据
					like_flag: false, //获取用户数据
					like_num: 50,
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
		methods: {},
		mounted() {
			//获取发布人昵称、头像、发布日期、标签、点赞、评论、收藏
			api.getComments({
				sid: this.storyInfo.sid,
				page_id: 1
			}).then(res => {
				console.log("storyDetailsComments", res)
				const l = res.data.discussList.length
				const templist = JSON.parse(JSON.stringify(res.data.discussList));
				console.log(templist);
				this.comment_num = l;
				for (var i = 0; i < l; i++) {
					this.storyInfo.commentList.push({
						did: templist[i].did,
						headPic: templist[i].avatar,
						name: res.data.discussList[i].username,
						content: res.data.discussList[i].detail,
						like_num: res.data.discussList[i].count,
						like_flag: res.data.discussList[i].goodFlag,
					});

				}
				//console.log(this.storyInfo.commentList);
			});


		},
		components: {
			singlestory,
			commentList
		}
	}
</script>

<style>


</style>
