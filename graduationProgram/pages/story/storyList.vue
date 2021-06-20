<template>
	<view>
		<!-- 地点 -->
		<button class="button">{{placeData}}</button>
		<view v-for="(item, idx) in storyList" :key="idx">
			<singlestory :p_usrname="item.usrname" :p_time="item.time" :p_tags="item.tags" :p_storyContent="item.storyContent"
			 :p_comment_num="item.comment_num" :p_mark_flag="item.mark_flag" :p_like_flag="item.like_flag" :p_like_num="item.like_num"
			 :p_commentList="item.commentList"></singlestory>
		</view>
	</view>
</template>

<script>
	import singlestory from '../story/singleStory_component.vue'
	import api from '../../api/story/api.js'
	export default {
		data() {
			return {
				placeData: ['大学城校区','A1教学楼'],
				storyList: [],
			}
		},
		methods: {},
		onLoad() {
			api.getStory({
				location_id: this.placeData,
				page_id: 1,
			}).then(res => {
				console.log("storyList", res);
				const temp = JSON.parse(JSON.stringify(res.data.storyList));
				for(var i=0;i<temp.length;i++){
					this.storyList.push({
						sid: temp[i].sid,
						usrname: '我是昵称1',//未获取
						time: temp[i].pubDate,
						tags: temp[i].tagsList,//"tagsList": ["青春回忆"],
						storyContent: temp[i].detail,
						comment_num: 5,//未获取
						mark_flag: temp[i].collectFlag,
						like_flag: temp[i].goodFlag,
						like_num: temp[i].goodCount,
					})
				}
			//获取发布人昵称、头像、发布日期、标签、点赞、评论、收藏
			for (var i = 0; i < this.storyList.length; i++) {
				api.getComments({
					sid: this.storyList[i].sid,
					page_id: 1
				}).then(res => {
					console.log("storyListComments", res)
					const templist = JSON.parse(JSON.stringify(res.data.discussList));
					//console.log('templist');
					console.log(templist);
					for (var j = 0; j < templist.length; j++) {
						this.storyList[i].commentList.push({
							did: templist[j].did,
							headPic: templist[j].avatar,
							name: templist[j].username,
							content: templist[j].detail,
							like_num: templist[j].count,
							like_flag: templist[j].goodFlag,
						});
					}
					console.log(this.storyList[0].commentList);
				});
			}
		},
		components: {
			singlestory
		}
	}
</script>

<style>
	.button {
		font-family: FZCHSJW--GB1-0;
		width: 600rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-weight: bold;
		border-radius: 40rpx;
		background-color: #E2ECFF;
		margin-top: 30rpx;
	}
</style>
