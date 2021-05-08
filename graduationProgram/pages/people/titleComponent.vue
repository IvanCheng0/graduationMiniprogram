<template>
	<div class="title">
		<span class="backBtn" @click='$emit("back")'></span> 
		<span class="personal">{{title.name}}
		</span>
		<image :src="title.icon" class="icon"></image>
	</div>
</template>

<script>
	export default {
		props: {
			title: Object,
			required: true
		}
	}
</script>

<style>
	/* 标题栏 */
	.title {
		height: 100upx;
		line-height: 100upx;
		display: flex;
		align-items: center;
		border-bottom: 2upx solid #a1a1a1;
	}

	/* 返回按钮 */
	.backBtn {
		padding: 0 20upx;
		font-size: 40upx;
	}

	/* 个人中心四个字 */
	.personal {
		flex: 1;
		text-align: center;
		font-size: 40upx;
		font-weight: 500;
	}

	/* 右边的图标 */
	.icon {
		display: inline-block;
		width: 50upx;
		height: 50upx;
		line-height: 100upx;
		vertical-align: center;
	}
</style>
