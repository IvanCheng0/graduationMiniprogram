<template>
	<view class="content">
		<u-form :model="form" ref="postForm">

		<view id="textContent">
			<u-form-item prop="storyContent">
				<textarea id="textArea" v-model="form.storyContent" placeholder="请在此输入你的故事吧~"></textarea>
			</u-form-item>
		</view>
<!--录音切换显示-->
		<!--<view class="uploadSrc" v-show="buttonTabChoose==0"></view>-->
		<view id="uploadSrc">
			<span>
				<image src="../../static/story/icon/pic.png" style="width: 28px;" mode="widthFix"></image>
				<div>添加图片(上传的图片不能超过5M)</div>
				<u-form-item>
				      <u-upload 
					  :action="action" 
					  :file-list="img_url" 
					  :auto-upload="false"
					  max-count="9" 
					  max-size="5 * 1024 * 1024" 
					  width="180rpx"
					  height="180rpx"
					  del-bg-color="#B4B4B4"></u-upload>     
				</u-form-item>
			</span>
		</view>	
<!--录音、视频功能-->
		<!--
			<span class="addSrc" @click="toAddVid" style="margin-right: 10%;">添加视频</span>
			<span class="addSrc" @click="toAddVoic">添加语音</span>
		
		<view class="uploadSrc" v-show="buttonTabChoose==1">
			<button class="addSrc" @tap="startRecord" style="margin-right: 10%">开始录音</button>
			<button class="addSrc" @tap="endRecord" style="margin-right: 10%">停止录音</button>
			<button class="addSrc" @tap="playVoice" style="margin-right: 10%">播放录音</button>
			<view class="tag" @click="backToLastPage">返回</view>
		</view>
		-->
<!--标签-->
		<view id="tag">
			<span v-for="(item,idx) in tags" @click="delTag(idx)" :key="idx">{{item.value}}</span>	
			<image src="../../static/story/icon/add.png" mode="heightFix" @click="addTag_newPage"></image>

		</view>
		<view>
			<view id="picContent">
				<image src='../../static/story/icon/icon0.png' style="max-width: 90%; max-height: 90%;"></image>
			</view>
<!--按钮-->
			<view id="button">
				<u-select v-model="show" mode="mutil-column-auto" :list="locList" @confirm="selectLoc"></u-select>
				<view class="radioBox">
					<checkbox value="anonymous" :checked="realName_or_not==false" />匿名
				</view>
				<view style="clear: both;"></view>
				<u-form-item prop="location" style="float: right;">
				<view v-show="form.location==''" id="sel_loc" class="viewLoc" @click="show = true">选择地点</view>
				<view v-show="form.location!=''" id="view_loc" v-html="form.location" class="viewLoc" @click="show = true"></view>
				</u-form-item>
			</view>		
		</view>

		<view class="submitButton" @click="submitStory">确认发表</view>
		
		</u-form>	
	</view>
</template>

<script>
const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = true;
	export default {
		data() {
			return {
				form:{
					storyContent:'',
					location: '',
				},
				rules:{
					storyContent:{
						required: true,
						message: '请输入故事内容~',
						trigger: 'change',
					},
					location:{
						required: true,
						message: '请选择地点~',
						trigger: 'change',
					},
				},
				show: false,
				locList:[
					{
						value: '五山校区',
						label: '五山校区',
						children:[{
							value: '西湖',
							label: '西湖',
						},
						{
							value: '剥削楼',
							label: '剥削楼',
						},
						{
							value: '分手亭',
							label: '分手亭',
						},
						{
							value: '北二饭堂',
							label: '北二饭堂',
						},
						]
					},
					{
						value: '大学城校区',
						label: '大学城校区',
						children:[{
							value: '图书馆',
							label: '图书馆',
						},
						{
							value: '天桥底',
							label: '天桥底',
						},
						{
							value: '碎石村',
							label: '碎石村',
						},
						]
					},
				],
				
				title: '发布故事',
				//buttonTabChoose:0,
				
				realName_or_not: false,
				
				action:'https://zy.zaozhijob.com/api/v1/job/upload',
				img_url:[
				],
				voicePath: '',
				tags:[
					{
						value:'常用标签1'
					},
					{
						value:'常用标签2'
					},
				],
			}
		},
		onLoad() {	
			console.log("1253")
		},
		onReady() {
			console.log("onready")
			this.$refs.postForm.setRules(this.rules);
		},
		methods: {
			submitPic(){
				this.$refs.uUpload.upload();
			},
			
			preview(url){
				uni.previewImage({
					current: url, //当前点击预览的图片索引
					urls: this.img_url,//预览图片的链接
					longPressActions:{
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						},
					}									
				})
			},
			delPic(idx){
				let images = this.img_url;
				images.splice(idx, 1);
				this.setData({
					img_url: images
				});
			},
			/*toAddVid(){
				
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
			},*/
			addTag_newPage(){
				uni.navigateTo({
					url:'addTag'
				})
			},
			
			delTag(idx){
				this.tags.splice(idx,1);
			},
			selectLoc(res){
				console.log(res);
				this.form.location = res[0].label
				+ '<br /><center>'
				+ res[1].label + "</center>";
			},
			/*toAddLoc(){
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
			},*/
			submitStory(){
				console.log("test");
				var that = this;
				this.$refs.postForm.validate(valid =>{
					console.log("valid");
					if(valid){
						console.log("验证通过！");
						uni.showModal({
						    title: '提示',
						    content: '是否确认发布故事？',
							cancelText: '我再想想',
						    success: function (res) {
						        if (res.confirm) {
									//console.log(that.img_url);//上传后才有
									//that.submitPic();
									uni.showModal({
										title: '提示',
										content: '发布成功！',
										showCancel:false
										//调用发送数据接口
									})
						        } 
						    }
						});
					}
					else{
						console.log("验证失败:(!");
					}
				});
				
				
				
			},
		}
	}
</script>

<style>
@font-face {
	font-family:"FZCuHeiSongS-B-GB";
	src: url("../../static/story/font/fzchsjwgb10_downyi.com.TTF");
}
.content {
	font-family: 'Segoe UI';
	width: 90%;
	margin: 0 auto;
	margin-top: 15px;
}
.content>.u-form>view{
	margin-top: 5%;
}
#textArea{
	border-radius: 8px;
	margin-top: 5px;
	padding: 5px;
	min-height: 150px;
	width: 90%;
	margin: 0 auto;
	background-color: #EBF2FF;
	box-shadow: 8px 8px 5px #C1C6CF;
}
#uploadSrc{
	text-align: center;
}
#uploadSrc>span{
	margin: 0 auto;
	background-color: #D0DEE9;
	box-shadow: 5px 5px 5px #C1C6CF;
	padding: 10px;
	border-radius: 15px;
	display: inline-block;
	width: 80vw;
	
}
#picContent{
	display: inline-block;
	width: 60vw;
	height: 20vw;
}	
#tag>span{
	box-shadow: 5px 5px 5px #C1C6CF;
	border-radius: 15px;
	display:inline-block;
	padding: 8px;
	margin: 5px 0 5px 0;
	background-color: #437796;
	color: #FFFFFF;
	margin-right: 10px;
}
#tag>image{
	height: 60px;
	vertical-align: top;
}
#button{
	display: inline-block;
	width: 25vw;
}
#button>view:nth-child(2), #sel_loc, #view_loc{
	padding: 8px;
	border-radius: 15px;
	box-shadow: 5px 5px 5px #C1C6CF;
	float: right;
}
.radioBox{
	background-color: #DCB093;
	margin-bottom: 10px;
}
.viewLoc{
	background-color: #D0DEE9;
}
.submitButton{
	margin-top: 10px;
	text-align: center;
	background-color: #65696C;
	color: #FFFFFF;
	padding: 8px;
	border-radius: 15px;
	box-shadow: 5px 5px 5px #C1C6CF;
	width: 80%;
	margin: 0 auto;
}
</style>