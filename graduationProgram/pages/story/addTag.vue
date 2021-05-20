<template>
	<view class="content">
		<view>
			<input class="textContent" type="text" :placeholder="tagContent" />
			<!--可以搜索-->
		</view>
		<view class="part">
			<view>已添加的标签</view>
			<span v-for="(item,idx) in selected" style="margin-right: 10px;" @click="delThisTag(idx)">#{{item.value}}</span>
		</view>
		<view class="part">
			<view>最近使用</view>	
			<span v-for="(item,idx) in recentUsed" style="margin-right: 10px;" @click="addThisTag(idx, recentUsed)">#{{item.value}}</span>
		</view>
		<view class="part">
			<view>热门标签</view>	
			<span v-for="(item,idx) in hotTags" style="margin-right: 10px;" @click="addThisTag(idx, hotTags)">#{{item.value}}</span>
		</view>
		<view class="submitButton" @click="addAllTag">提交标签</view>
	</view>
	
</template>
	
<script>
	export default {
		data() {
			return {
				selected:[
					{
						value:'你暂时没有添加标签噢',
					}
				],
				tagContent:'# 搜索你想添加的标签',
				recentUsed:[
					{
						value:'青春回忆'
					},
					{
						value:'踏进校园'
					},
				],
				hotTags:[
					{
						value:'摆脱老师捞捞我'
					},
					{
						value:'恋爱'
					},
					{
						value:'铲屎官'
					},
					{
						value:'天桥底的美食'
					},
					{
						value:'冲向饭堂'
					},
				],

			}
		},
		methods:{
			addThisTag(idx, list){
				
				if(this.selected[0]=='暂无标签'){
					this.selected=[{value:list[idx]}];
					console.log(this.selected)
					
				}
				else{
					this.selected.push(list[idx]);

				}
			},
			delThisTag(idx){
				this.selected.splice(idx,1);
			},
			addAllTag(){
				uni.navigateBack({
					
				})
			}
		},
	}
</script>

<style>
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
