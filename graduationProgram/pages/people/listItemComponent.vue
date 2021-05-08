<template>
	<div>
		<div v-for="(item,index) in list" :key="index">
			<div class="listItem">
				<image :src="item.image"></image>
				<div>
					<div class="label">{{item.label}}</div>
					<div class="description">{{item.description}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		// name: list,
		data() {
			return {
			}
		},
		props: {
			list: Array,
			required: true
		}
	}
</script>

<style>
	.listItem {
		height: 300upx;
		width: 100%;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-bottom: 2upx solid #A1A1A1;
	}

	.listItem>image {
		width: 200upx;
		height: 200upx;
	}

	.listItem>div .label {
		width: 200upx;
		height: 50upx;
		border: 2upx solid #eee;
		padding: 7upx;
		white-space: nowrap;
		line-height: 50upx;
		margin-bottom: 10upx;
	}

	.listItem>div .description {
		width: 400upx;
		height: 180upx;
		border: 2upx solid #eee;
		padding: 7upx;
	}
</style>
