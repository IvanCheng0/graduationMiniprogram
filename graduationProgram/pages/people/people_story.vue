<template>
	<div class="container">
		<titleComponent :title="title" @back="back()"></titleComponent>
		<div class="tap" id="tap" :class="tapFixed? 'tapFixed':''">
			<span @click="changeTap" :class="listingShow?'active':''">清单</span>
			<span @click="changeTap" :class="interactiveShow?'active':''">互动</span>
		</div>
		<!-- 清单 -->
		<list :list="lists" v-if="listingShow"></list>
		<!-- 互动 -->
		<list :list="interactives" v-if="interactiveShow"></list>
	</div>
</template>

<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js"></script>
<script>
	import titleComponent from './titleComponent.vue'
	import list from './listItemComponent.vue';
	export default {
		components: {
			list: list,
			titleComponent: titleComponent
		},
		data() {
			return {
				listingShow: true,
				interactiveShow: false,
				tapFixed: false,
				title: {
					name: '我的故事',
					icon: '../../static/people.png'
				},
				lists: [{
					image: '../../static/logo.png',
					label: '标签',
					description: '描述'
				}, {
					image: '../../static/logo.png',
					label: '标签',
					description: '描述'
				}, {
					image: '../../static/logo.png',
					label: '标签',
					description: '描述'
				}, {
					image: '../../static/logo.png',
					label: '标签',
					description: '描述'
				}, {
					image: '../../static/logo.png',
					label: '标签',
					description: '描述'
				}, {
					image: '../../static/logo.png',
					label: '标签',
					description: '描述'
				}, {
					image: '../../static/logo.png',
					label: '标签',
					description: '描述'
				}, {
					image: '../../static/logo.png',
					label: '标签',
					description: '描述'
				}, {
					image: '../../static/logo.png',
					label: '标签',
					description: '描述'
				}],
				interactives: [{
					image: '../../static/logo.png',
					label: '标签2',
					description: '描述'
				}, {
					image: '../../static/logo.png',
					label: '标签2',
					description: '描述'
				}, {
					image: '../../static/logo.png',
					label: '标签2',
					description: '描述'
				}, {
					image: '../../static/logo.png',
					label: '标签2',
					description: '描述'
				}, {
					image: '../../static/logo.png',
					label: '标签2',
					description: '描述'
				}, {
					image: '../../static/logo.png',
					label: '标签',
					description: '描述'
				}, {
					image: '../../static/logo.png',
					label: '标签',
					description: '描述'
				}, {
					image: '../../static/logo.png',
					label: '标签',
					description: '描述'
				}, {
					image: '../../static/logo.png',
					label: '标签',
					description: '描述'
				}]
			}
		},

		methods: {
			// 这里写退出
			back() {
				console.log("1")
				uni.switchTab({
					url: '/pages/people/people_main',
				});
			},
			// 切换tap
			changeTap() {
				this.listingShow = !this.listingShow;
				this.interactiveShow = !this.interactiveShow;
			},

			handleScroll() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				var offsetTop = document.querySelector('#tap').offsetTop
				if (scrollTop > offsetTop) {
					this.tapFixed = true
				} else {
					this.tapFixed = false
				}
			}
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll)
		},
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}

	/* 标题栏 */
	.title {
		height: 100upx;
		line-height: 100upx;
		display: flex;
		align-items: center;
		border-bottom: 2upx solid #a1a1a1;
		width: 100%;
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

	/* tap */
	.tap {
		height: 100upx;
		border-bottom: 2upx solid #A1A1A1;
	}

	.tap>span:first-of-type {
		border-right: 2upx solid #A1A1A1;
	}

	.tap>span {
		display: inline-block;
		width: 50%;
		text-align: center;
		line-height: 100upx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.tapFixed {
		position: fixed;
		top: 0;
		z-index: 999;
		width: 100%;
	}

	/* 清单 */
	/* 	.listItem {
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
	} */

	/* 互动 */
	.interactive {
		flex: 1;
	}

	/* 选中的tap变色 */
	.active {
		background-color: #7a7b7e !important;
		color: #fff !important;
	}
</style>
