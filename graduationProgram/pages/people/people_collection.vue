<template>
	<div>
		<title-component :title="title" @back="back()"></title-component>
		<list-component :list="list"></list-component>
	</div>
	
</template>

<script>
	import titleComponent from './titleComponent.vue'
	import listComponent from './listItemComponent.vue'
	export default {
		components: {
			titleComponent: titleComponent,
			listComponent: listComponent
		},
		data() {
			return {
				title: {
					name: '我的收藏',
					icon: '../../static/people.png'
				},
				list: [{
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
				}]
			}
		},
		methods: {
			back() {
				uni.switchTab({
					url: '/pages/people/people_main',
				});
			}
		}

	}
</script>

<style>
</style>
