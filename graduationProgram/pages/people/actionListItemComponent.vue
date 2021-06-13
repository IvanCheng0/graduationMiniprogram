<template>
	<div class="outer" @click="$emit('showDetail', listItem.sid)">
		<image :src="avatar? avatar:getAvatar()" class="avatar"></image>
		<div class="content">
			<div class="name">{{listItem.name}}</div>
			<div class="description">{{listItem.desc}}</div>
		</div>
		<div class="time">{{listItem.time}}</div>
	</div>
</template>

<script>
	export default {
		methods: {
			getAvatar() {
				return "../../static/avatar_miss.jpg"
			}
		},
		data() {
			return {}
		},
		props: ['listItem', 'avatar'],
		onLoad() {},
	}
</script>

<style scoped>
	.outer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 140upx;
		box-sizing: border-box;
		padding: 30upx;
		border-bottom: 1upx solid #707070;
	}

	/* 头像 */
	.outer>.avatar {
		width: 110upx;
		height: 110upx;
		margin-left: 15upx;
		border-radius: 50%;
		background-color: white;
		box-shadow: 4upx 4upx 4upx #b0aea5;
		box-sizing: border-box;
	}
	
	/* 内容 */
	.outer>.content{
		flex: 1;
		padding: 10upx 20upx;
		box-sizing: border-box;
	}
	/* 昵称 */
	.name{
		font-family: FZCuHeiSongS-B-GB;
		font-size: 35upx;
		box-sizing: border-box;
	}
	.description{
		box-sizing: border-box;
		font-family: Microsoft JhengHei UI;
		padding: 0 10upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.time{
		align-self: flex-start;
		font-size: 25upx;
	}
</style>
