<template>
	<view class="content">
		<u-form :model="form" ref="postForm">
		<view id="textContent">
			<u-form-item prop="storyContent">
				<textarea id="textArea" v-model="form.detail" placeholder="请在此输入你的故事吧~"></textarea>
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
					  ref="uUpload"
					  :action="action" 
					  @on-success="uploadSuccess"
					  max-count="9" 
					  max-size="1 * 1024 * 1024" 
					  width="180rpx"
					  height="180rpx"
					  del-bg-color="#B4B4B4"></u-upload>     
				</u-form-item>
			</span>
		</view>	
		<!-- tag -->
		<view id="tag">
			<span v-for="(item,idx) in this.form.tags" @click="delTag(idx)" :key="idx">{{item}}</span>	
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
					<checkbox-group @change="checkboxChange">
						<checkbox value="anonymous" :checked="form.isShow" />匿名
					</checkbox-group>					
				</view>
				<view style="clear: both;"></view>
				<u-form-item  style="float: right;">
				<view v-show="form.location_id==''" id="sel_loc" class="viewLoc" @click="show = true">选择地点</view>
				<view v-show="form.location_id!=''" id="view_loc" v-html="form.location_id" class="viewLoc" @click="show = true"></view>
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
				token:"eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjE0LCJleHAiOjE2MjMzNDgzNTl9.GlUs4Ys8p0hY3l1lhAhNmxGVs_l4iwMwxlE0X1043g4",
				form:{
					detail:'',
					showImgList:[
					],
					tags:['常用标签1','常用标签2'],
					isShow:false,
					location_id: '',
				},
				rules:{
					detail:{
						required: true,
						message: '请输入故事内容~',
						trigger: 'change',
					},
					location_id:{
						required: true,
						message: '请选择地点~',
						trigger: 'change',
					},
				},
				//选择地点是否显示
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
				
				action:`https://story.genielink.cn/api/v1/upload`,
				
				voicePath: '',
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
			uploadSuccess(data){
				console.log(data)
				this.form.showImgList=data;
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
			//增加标签
			addTag_newPage(){
				uni.navigateTo({
					url:'addTag'
				})
			},
			
			delTag(idx){
				this.tags.splice(idx,1);
			},
			//是否匿名
			checkboxChange(){
				this.form.isShow=true;
				console.log(this.form.isShow)
			},
			selectLoc(res){
				this.form.location_id = res[0].label
				+ '<br /><center>'
				+ res[1].label + "</center>";
			},
			submitStory(){
				this.form.showImgList=this.$refs.uUpload.lists
				console.log(this.form.showImgList)
				console.log('form',this.form)
				let postData=JSON.stringify(this.form)
				var that = this;
				this.$refs.postForm.validate(valid =>{
					console.log("valid");
					if(valid){
						console.log("验证通过！");
						uni.showModal({
						    title: '提示',
						    content: '是否确认发布故事？',
							cancelText: '我再想想',
						    success:  async function (res) {
						        if (res.confirm) {
									const data = await that.$http({url:`/api/v1/publish?token=${that.token}`,methods:`POST`,data:postData});
									//console.log(that.img_url);//上传后才有
									//that.submitPic();
									uni.showModal({
										title: '提示',
										content: '发布成功！',
										showCancel:false,
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