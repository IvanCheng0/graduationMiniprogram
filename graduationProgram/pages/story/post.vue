<template>
	<view class="content">
		<view>
			<input class="textContent" type="text" placeholder="请在此输入你的故事吧~" />
		</view>
		<!--可使用v-for简化代码-->
		<view class="uploadSrc" v-show="buttonTabChoose==0">
			<span class="addSrc" @click="toAddPic" style="margin-right: 10%">添加图片</span>
			<span class="addSrc" @click="toAddVid" style="margin-right: 10%;">添加视频</span>
			<span class="addSrc" @click="toAddVoic">添加语音</span>
		</view>
		<view class="uploadSrc" v-show="buttonTabChoose==1">
			<button class="addSrc" @tap="startRecord" style="margin-right: 10%">开始录音</button>
			<button class="addSrc" @tap="endRecord" style="margin-right: 10%">停止录音</button>
			<button class="addSrc" @tap="playVoice" style="margin-right: 10%">播放录音</button>
			<view class="tag" @click="backToLastPage">返回</view>
		</view>
		
		<view>
			<!--弹窗-->	
			<u-modal v-model="showPop" :show-cancel-button="true" :content="popContent" @confirm="addCurrTag()">
				<input placeholder="请输入要添加的标签" v-model="tempTag"/>
			</u-modal>
		</view>
		<view style="margin-top: 10px;">
			<!--区域滚动-->
			
				<span v-for="(item,idx) in tags" class="tag" style="margin-right: 10px;" @click="delTag(idx)">{{item.value}}</span>
				<!--<span class="tag" @click="toAddTag">点此添加标签</span>-->
				<span class="tag" @click="addTag_newPage">点此添加标签</span>

			<view style="color: #18B566;">点击标签可删除</view>
		</view>
		<view style="position: absolute;right: 10%;width: 40%;">
		<!--按钮-->
			<view class="tag" style="margin-top: 15px;float: right;" @click="toAddLoc" v-show="locFlag==false">+点击添加位置</view>
			<view style="clear:both"></view>
			<view class="tag" style="margin-top: 10px;" @click="delLoc" v-show="locFlag==true">{{currAddress}}</view>
			<view class="radioBox" >
				<checkbox value="anonymous" :checked="realName_or_not==false" />匿名
			</view>
			<view style="clear:both"></view>
			<view>
				<span class="submitButton" @click="submitStory">确认发表</span>
			</view>
		<!--按钮-->
		</view>
		<view class="picContent">此处应有图标</view>
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
						value:'常用标签1'
					},
					{
						value:'常用标签2'
					},
					{
						value:'常用标签3'
					},
					{
						value:'标签4'
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
			addTag_newPage(){
				uni.navigateTo({
					url:'addTag'
				})
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
				uni.showModal({
				    title: '提示',
				    content: '是否确认发布故事？',
					cancelText: '我再想想',
				    success: function (res) {
				        if (res.confirm) {
							uni.showModal({
								title: '提示',
								content: '发布成功！',
								showCancel:false
								//调用发送数据接口
							})
				        } //else if (res.cancel) {
				        //    console.log('用户点击取消');
				        //}
				    }
				});
				
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
	border-radius: 8px;
	margin-top: 5px;
	padding: 5px;
	height: 50%;/*换行！*/
	min-height: 150px;
	background-color: #EBF2FF;
	box-shadow: 8px 8px 5px #C1C6CF;
}
.uploadSrc{
	margin-top: 5%;
	text-align: center;
	min-height: 100px;
}
.addSrc{
	box-shadow: 5px 5px 5px #C1C6CF;
	padding: 10px;
	border-radius: 15px;
	background-color: #D0DEE9;
	height: 100px;
	width: 20%;
	display: inline-block;
}
.picContent{
	margin-top: 15px;
	box-shadow: 5px 5px 5px #C1C6CF;
	padding: 8%;
	border-radius: 15px;
	background-color: #D0DEE9;
	display: inline-block;
	height: 200px;
}
.tag{
	box-shadow: 5px 5px 5px #C1C6CF;
	border-radius: 15px;
	display:inline-block;
	padding: 8px;
	margin: 5px 0 5px 0;
	background-color: #437796;
	color: #FFFFFF;
}
.radioBox{
	box-shadow: 5px 5px 5px #C1C6CF;
	border-radius: 15px;
	margin-top: 15px;
	padding: 10px;
	float: right;
	background-color: #DCB093;
	display: inline-block;
	
}
.submitButton{
	box-shadow: 5px 5px 5px #C1C6CF;
	border-radius: 15px;
	margin-top: 15px;
	padding: 10px;
	text-align: center;
	float: right;
	background-color: #65696C;
	color: #FFFFFF;
	display: inline-block;
}
</style>
