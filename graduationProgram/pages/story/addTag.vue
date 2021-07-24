<template>
	<view class="content">
		<view>
			<!-- @confirm   点击完成按钮时触发，event.detail = {value: value} -->
			<!-- @input   当键盘输入时，触发input事件，event.detail = {value}     debounce(addTag,500)   -->
			<input class="textContent" placeholder="输入要添加的标签" v-model="tagContent" @input="debounce(addTag,3000)"/>
		</view>

		<view class="part">
			<view >已添加的标签（再次点击标签可删除哟~）</view>
			
			
			<view v-if="selected.length==0" style="color: #3F536E;font-size:11px">暂时没有添加标签噢~</view>
			<span v-for="(item,idx) in selected" style="margin-right: 10px;" @click="delThisTag(idx)" :key="idx">#{{item}}</span>
		</view>
		<view class="part">
			<view>最近使用</view>	
			<span v-for="(item,idx) in recentUsed" style="margin-right: 10px;" @click="addThisTag(idx, recentUsed)" :key="idx">#{{item}}</span>
		</view>
		<view class="part">
			<view>热门标签</view>	
			<span v-for="(item,idx) in hotTags" style="margin-right: 10px;" @click="addThisTag(idx, hotTags)" :key="idx">#{{item}}</span>
		</view>
		<view class="submitButton" @click="addAllTag">完成</view>
	</view>
	
</template>
	
<script>
	import bus from '../utils/bus.js'
	export default {
		onLoad() {
		},
		data() {
			return {
				selected:[
				],
				tagContent:'',
				//最近使用的标签
				recentUsed:['青春回忆','踏进校园'],
				hotTags:['球球老师捞捞我','恋爱','铲屎官','天桥底的美食','冲向饭堂']				

			}
		},
		methods:{
			//防抖
			debounce(func,delay){
				console.log(1111111)
				let timeout=null;
				if(timeout) clearTimeout(timeout)
				timeout=setTimeout(()=>{
					func.apply(this,arguments)
					console.log(22222222)
				},delay)
			},
			//搜索框添加标签
			addTag(){
				this.selected.push(this.tagContent);
				this.tagContent='';
			},
			//标签添加
			addThisTag(idx, list){
				this.selected.push(list[idx]);
			},
			//删除已添加的标签
			delThisTag(idx){
				this.selected.splice(idx,1);
			},
			addAllTag(){
				console.log(this.selected)
				this.$store.commit('tagsToPostStory',this.selected)
				// bus.$emit('tagsToPostStory',this.selected)
				uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
					delta: 1
				});
			}
		},
	}
</script>

<style scoped>
.content {
	width: 90%;
	margin: 0 auto;
	margin-top: 15px;
}
.textContent{
	border: 1px solid;
	border-radius: 25px;
	margin-top: 5px;
	padding: 10px;
}
.part{
	margin: 5px;
}

.part>view{
	display: block;
}
.part>span{
	box-shadow: 5px 5px 5px #C1C6CF;
	border-radius: 15px;
	display:inline-block;
	padding: 8px;
	margin: 5px;
	background-color: #437796;
	color: #FFFFFF;
}
.submitButton{
	box-shadow: 5px 5px 5px #C1C6CF;
	border-radius: 15px;
	margin-top: 15px;
	padding: 10px;
	text-align: center;

	background-color: #65696C;
	color: #FFFFFF;

}
</style>
