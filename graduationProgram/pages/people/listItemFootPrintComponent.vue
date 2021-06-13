<template>
	<div class="outer" @click="$emit('showDetail', listItem.ID)">
		<image :src="avatar" class="avatar"></image>
		<div class="des">
			<div class="description">
				{{listItem.desc}}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
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
		justify-content: space-around;
		height: 135upx;
		margin-bottom: 50upx;
		box-sizing: border-box;
	}

	/* 头像 */
	.outer>.avatar {
		width: 110upx;
		height: 110upx;
		margin-left: 15upx;
		border-radius: 20%;
		background-color: white;
		box-shadow: 4upx 4upx 4upx #b0aea5;
		box-sizing: border-box;
	}

	.outer .description {
		width: 400upx;
		font-size: 35upx;
		min-height: 70upx;
		font-family: FZCuHeiSongS-B-GB;
		box-sizing: border-box;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		float: left;
	}

	.outer .des {
		padding: 15upx 20upx;
		box-sizing: border-box;
		background-color: #CFDEE7;
		box-shadow: 4upx 4upx 4upx #b0aea5;
		border-radius: 35upx;
	}

	.outer>.delete {
		height: 90upx;
		margin-right: 15upx;
		width: 90upx;
	}
</style>
