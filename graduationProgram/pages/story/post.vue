<template>
	<view class="content">
		<view>
			<input class="textContent" type="text" placeholder="请在此输入你的故事吧~" />
		</view>
		<view class="uploadSrc">
			<span class="addSrc" @click="toAddPic">添加图片</span>
			<span class="addSrc" @click="toAddVid">添加视频</span>
			<span class="addSrc" @click="toAddVoic">添加语音</span>
		</view>
		
		<view class="addTag" @click="toAddTag">+点击添加标签</view>
		<view style="margin-top: 10px;">
			<!--区域滚动-->
			<scroll-view scroll-x="true"  scroll-left="100" show-scrollbar="true" style="margin-top:5px;height: 25px;">
				<span v-for="(item,idx) in tags" class="tag" @click="delTag(idx)">{{item.value}}</span>
			</scroll-view>
			<view style="color: #18B566;">点击标签可删除</view>
		</view>
		<radio-group class="radioBox">
			<view>
				<radio value="realName" :checked="realName_or_not==true">实名</radio>
				<radio value="notRealName" :checked="realName_or_not==false">匿名</radio>
			</view>
		</radio-group>
		<view class="submitButton" @click="submitStory">确认发表</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '发布故事',
				realName_or_not: false,
				img:[
					{
						path:'1.jpg'
					},
				],
				tags:[
					{
						value:'tag1'
					},
					{
						value:'tag2'
					}
				]
			}
		},
		onLoad() {	
			console.log("1253")
		},
		methods: {
			toAddPic(){
				var that = this;
				uni.showActionSheet({
					itemList:['从相册中选择','拍摄照片或视频'],
					itemColor:'#007AFF',
					success:function(res){
						if(!res.cancel){
							if(res.tapIndex==0){
								that.choosePic('album');
							}
							else if(res.tapIndex==1){
								that.choosePic('camera');
							}
						}
					}
				})
				
			},
			choosePic(type){
				const that = this;
				uni.chooseImage({
					count: 9,
					sizeType:['original','compressed'],//原图或压缩图
					sourceType:[type],//相册或拍摄
					success:function(res){
						//console.log(JSON.stringify(res.tempFilePaths));
						var imgFiles = res.tempFilePaths;
						for(var i=0;i<imgFiles.length;i++){
							that.img.push({
								path:imgFiles[i]
							});//添加图片路径。本地路径，可以预览。
							console.log(that.img);
							var uper = uni.uploadFile({
								url:'',//服务器地址
								filePath:imgFiles[i],
								name:'test',//文件key，故事索引+此处索引
								
								success:function(res1){
									console.log(res1.data);
									
									
								}
							})
						}
						
					}
				})
			},
			toAddVid(){
				
			},
			toAddVoic(){
				
			},
			toAddTag(){
				//填充输入标签代码
				//this.setData({
				//	tags:this.tags.push({
				//		value:'tag3'
				//	})
				//})
				this.tags.push({
					value:'tag3'
				});
			},
			delTag(idx){
				this.tags.splice(idx,1);
			},
			submitStory(){
				
			},
		}
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
	border-radius: 8px;
	margin-top: 5px;
	padding: 5px 150px 180px 10px;
}
.uploadSrc{
	margin-top: 15px;
	text-align: center;
}
.addSrc{
	border: 1px solid;
	border-radius: 8px;
	margin-left: 5px;
}
.addTag{
	border: 1px solid;
	border-radius: 8px;
	margin-top: 15px;
	position: relative;
	left: 70%;
	text-align: center;
	width: 30%;
}

.tag{
	border: 1px solid;
	border-radius: 8px;
	margin-left: 10px;
}
.radioBox{
	margin: 15px;
	position: relative;
	left: 65%;
}
.submitButton{
	border: 1px solid;
	border-radius: 8px;
	padding: 5px 10px;
	font-size: 20px;
	text-align: center;
	width: 50%;
	margin: 0 auto;
}
</style>
