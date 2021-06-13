<template>
	<view class="content">
		<view>
			<input class="textContent" placeholder="输入要添加的标签" v-model="tagContent" @confirm="addTag"/>
			<!--可以搜索-->
		</view>

		<view class="part">
			<view >已添加的标签（再次点击标签可删除哟~）</view>
			
			
			<view v-if="selected.length==0" style="color: #3F536E;font-size:8px">暂时没有添加标签噢~</view>
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
	export default {
		onLoad() {
			// let pages = getCurrentPages();  //获取所有页面栈实例列表
			// let nowPage = pages[ pages.length - 1];  //当前页页面实例
			// let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
			// this.selected = prevPage.$vm.tags;  //获取所有页面栈实例列表
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
			//搜索框添加标签
			addTag(){
				if(this.tagContent==''){
					//this.tagEmpty=true;
					uni.showModal({
						title:'提示',
						content:'内容不能为空！',
						showCancel:false
					})
				}
				else{
					this.selected.push(this.tagContent);
					this.tagContent='';
				}
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
				// let pages = getCurrentPages();  //获取所有页面栈实例列表
				// let nowPage = pages[ pages.length - 1];  //当前页页面实例
				// let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				// var temp = prevPage.$vm.tags;
				// prevPage.$vm.tags = this.selected;   //修改上一页data里面的tags
				uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
					delta: 1
				});
			}
		},
	}
</script>

<style scoped>
@font-face {
	font-family:"FZCuHeiSongS-B-GB";
	src: url("../../static/story/font/fzchsjwgb10_downyi.com.TTF");
}
.content {
	font-family: 'FZCuHeiSongS-B-GB';
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
