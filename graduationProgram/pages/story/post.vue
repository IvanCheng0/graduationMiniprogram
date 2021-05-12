<template>
	<view class="content">
		<view>
			<input class="textContent" type="text" placeholder="请在此输入你的故事吧~" />
		</view>
		<!--可使用v-for简化代码-->
		<view class="uploadSrc" v-show="buttonTabChoose==0">
			<span class="addSrc" @click="toAddPic">添加图片</span>
			<span class="addSrc" @click="toAddVid">添加视频</span>
			<span class="addSrc" @click="toAddVoic">添加语音</span>
		</view>
		<view class="uploadSrc" v-show="buttonTabChoose==1">
			<button class="addSrc" @tap="startRecord">开始录音</button>
			<button class="addSrc" @tap="endRecord">停止录音</button>
			<button class="addSrc" @tap="playVoice">播放录音</button>
			<view class="addTag" @click="backToLastPage">返回</view>
		</view>
		<view class="addTag" @click="toAddTag">+点击添加标签</view>
		<view>
			<!--弹窗-->	
			<u-modal v-model="showPop" :show-cancel-button="true" :content="popContent" @confirm="addCurrTag()">
				<input placeholder="请输入要添加的标签" v-model="tempTag"/>

			</u-modal>
		</view>
		<view style="margin-top: 10px;">
			<!--区域滚动-->
			<scroll-view scroll-x="true" style="white-space: nowrap;height: 30px;">
				<span v-for="(item,idx) in tags" class="tag" style="" @click="delTag(idx)">{{item.value}}</span>
			</scroll-view>
			<view style="color: #18B566;">点击标签可删除</view>
		</view>
		<view class="addLoc" @click="toAddLoc" v-show="locFlag==false">+点击添加位置</view>
		<view class="tag" style="margin-top: 10px;" @click="delLoc" v-show="locFlag==true">{{currAddress}}</view>
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
const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();

innerAudioContext.autoplay = true;

	export default {
		data() {
			return {
				title: '发布故事',
				buttonTabChoose:0,
				realName_or_not: false,
				img:[
					{
						path:'1.jpg'
					},
				],
				voicePath: '',
				tags:[
					{
						value:'haoye'
					},
					{
						value:'好耶'
					}
				],
				showPop:false, //弹窗
				
				popContent:'hello world',
				tempTag:'',
				locFlag:false,
				currAddress:'',
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
				this.buttonTabChoose=1;
			},
			startRecord() {
			    console.log('开始录音');
			    recorderManager.start();
			},
			endRecord() {
			    console.log('录音结束');
			    recorderManager.stop();
			},
			playVoice() {
			    console.log('播放录音');
			
			    if (this.voicePath) {
			        innerAudioContext.src = this.voicePath;
			        innerAudioContext.play();
			    }
			},
			backToLastPage(){
				this.buttonTabChoose=0;
			},
			toAddTag(){
				this.showPop=true;
			},
			addCurrTag(){
				if(this.tempTag==''){
					//this.tagEmpty=true;
					uni.showModal({
						title:'提示',
						content:'内容不能为空！',
						showCancel:false
					})
				}
				//输入不能为空
				else{
					this.tags.push({
						value:this.tempTag,
					});
					this.tempTag='';
					
				}
			},
			
			delTag(idx){
				this.tags.splice(idx,1);
			},
			
			toAddLoc(){
				const that = this;
				uni.chooseLocation({
					success:function(res){
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
				        console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						that.currAddress=res.name+res.address;
						console.log(that.currAddress);
						that.locFlag=true;
					}
				})
			},
			delLoc(){
				this.locFlag=false;
				this.currAddress='';
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
.addLoc{
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
	margin-right: 10px;
	display:inline-block;
	padding: 2px;
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
