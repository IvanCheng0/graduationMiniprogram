<template>
	<div class="title">
		<span class="backBtn" @click='$emit("back")' v-if="isShownBack">
			</span> <span class="personal">{{title}}
		</span>
	</div>
</template>

<script>
	export default {
		props: ['title', 'isShownBack']
	}
</script>

<style>
	/* 标题栏 */
	.title {
		position: relative;
		height: 150upx;
		border-bottom: 4upx solid #4572CD;
		box-shadow: -0upx 3upx 3upx #d5d5d5;
	}


	/* 返回按钮 */
	.backBtn {
		font-size: 100upx;
		color: #333333;
		float: left;
		margin-left: 20upx;
		display: inline-block;
		height: 150upx;
		line-height: 150upx;
	}

	/* 个人中心四个字 */
	.personal {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		font-size: 50upx;
		font-family: FZCuHeiSongS-B-GB;
		padding: 15upx 70upx;
		border-radius: 70upx;
		background-color: #E2ECFF;
		box-shadow: -0upx 5upx 5upx #4572CD;
	}
</style>


