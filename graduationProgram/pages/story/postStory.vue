<template>
	<view class="post">
		
		<u-form :model="form" ref="postForm">
			<!-- 输入文字部分 -->
			<u-form-item style="display: flex;flex-direction: column;">
				<textarea 
				value="" 
				v-model="form.detail"
				placeholder="写下你的故事吧" 
				placeholder-style="margin-top:20rpx;margin-left:20rpx;font-family: Roboto;font-size: 14px;line-height: 22px;" />
				<view class="select" style="">
					<view @click="selectChange" v-if="selectShow">点击添加地点</view>
					<u-select v-model="show"  mode="mutil-column-auto" :list="list" @confirm="confirm" >{{this.form.location_name}}</u-select>
					<view v-if="showPlace" style="float:right" @click="selectChangeAgain">{{this.form.location_name}}</view>
				</view>
			</u-form-item>
			<!-- 上传图片部分 -->
			<view class="chooseImg">
				<u-upload
				ref="uUpload"
				:action="action"
				@on-success="uploadSuccess"
				@on-choose-complete="changeViewShow"
				:show-progress="false"
				max-count="9" 
				max-size="1 * 1024 * 1024" 
				width="200rpx"
				height="200rpx"
				del-bg-color="#B4B4B4"></u-upload>
				<view class="show1"  v-if="showView"></view>
				<view class="show2"  v-if="showView"></view>
			</view>
			<!-- 添加标签 -->
			<view class="tag">
				<span class="tagBtn" v-if="showTags" v-for="(tag,index) in form.tags" :key="index">
					<view>{{tag}}</view>
				</span>
				<span class="tagAdd"  @click="addTag_newPage" >
					<image src="../../static/story/icon/add.png" ></image>
					<span>点击添加标签</span>
				</span>
				<span class="tagBtn" v-if="showBtn">
					<image src="../../static/story/icon/add.png"  @click="addTag_newPage"></image>
				</span>
				<span class="tagBtn" v-if="showBtn">
					<image src="../../static/story/icon/add.png"  @click="addTag_newPage"></image>
				</span>
				
			</view>
			<!-- 匿名发表 -->
			<u-checkbox-group class="nameLess">
				<u-checkbox v-model="form.isShow" shape="circle"  @change="checkboxChange" >匿名发表</u-checkbox>
			</u-checkbox-group>

			<view class="confirm">
				<button @click="confirmPost">确认发表</button>
			</view>
			
		
		</u-form>
		
		
	</view>
</template>

<script>
	import bus from '../utils/bus.js'
	import api from '../api/story/api.js'
	export default{
		data() {
			return {
				token:"eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEsImV4cCI6MTYyMzk1NDM4MX0.4Ix46RaUm0JWuKRbWRLj9YGb0cEW0a5ahvlD1jg6G98",
				form:{
					detail:'',
					showImgList:[],
					tags:['常用标签1','常用标签2'],
					// 匿名发表
					isShow:false,
					location_name: [],
				},	
				// 控制选择地点的显示与隐藏
				selectShow:true,
				// u-select标签的显示与隐藏
				show:false,
				showPlace:false,
				selectDefault:[],
				list: [
					{
						value: 1,
						label: '大学城校区',
						children: [
							{
								value: 2,
								label: 'A1教学楼',
							},
							{
								value: 5,
								label: '一饭',
							},
							{
								value: 5,
								label: '图书馆',
							},
						]
					},
					{
						value: 8,
						label: '五山校区',
						children: [
							{
								value: 9,
								label: '逸夫人文馆',							
							},
							{
								value: 10,
								label: '孙中山像',							
							}
						]
					}
				],
				action:`https://story.genielink.cn/api/v1/upload`,
				showView:true,
				showBtn:true,
				showTags:false,
				}
			},				
			methods:{
				//选择地点的显示与隐藏
				selectChange(){
					this.selectShow=false;
					this.show=true;
					this.showPlace=true;
				},
				selectChangeAgain(){
					this.show=true;
					this.form.location_name=[];
				},
				//打印u-select 的参数 
				confirm(e) {
					console.log(e);
					e.forEach((item)=>{
						this.form.location_name.push(item.label)
					});
					this.form.location_name=this.form.location_name.join('-')
					console.log(this.form.location_name)
				},				
				submitPic(){
					this.$refs.uUpload.upload();
				},
				uploadSuccess(data){
					console.log(data)
					this.form.showImgList.push(data.url);
				},
				//上传图片时两个装饰的方块消失
				changeViewShow(){
					this.showView=false;
				},
				//增加标签
				addTag_newPage(){
					console.log(111)
					this.showBtn=false;
					uni.navigateTo({
						url:'addTag'
					});
					setTimeout(()=>{
						this.showTags=true
					},1000)
				},
				//是否匿名
				checkboxChange(e) {
					console.log(e);
					this.form.isShow=e.value;
					console.log(this.form.isShow)
				},
				confirmPost(){					
					const formData=JSON.stringify(this.form)
					api.postStory({params:`?token=${this.token}`,data:formData})
						
					
				},
					
			},
			onShow(){
				bus.$on('tagsToPostStory',data=>{
					this.form.tags=data;
				})
			}
	}
</script>

<style scoped>
	textarea{
		margin:0 auto;
		width: 336px;
		height: 169px;
		background: #EAF0FC;
		box-shadow: 1px 3px 6px 3px rgba(0, 0, 0, 0.25);
		border-radius: 10px 10px 0 0;
		margin-top:15px;
	}
	.select{
		position:absolute;
		width: 336px;
		height: 37px;
		left: 20px;
		top:165px;
		background: #FFFFFF;
		border-radius: 0px 0px 10px 10px;
	}
	.select view{
		float:right;
		font-family: Roboto;
		font-size: 14px;
		line-height: 35px;
		color: #8F8F8F;
	}
	/* 样式穿透给u-upload添加样式 */
	/deep/ .u-list-item.u-add-wrap{
		width: 100px !important;
		height: 100px !important;
		background: #D0DEE7;
		box-shadow: 1px 3px 6px 3px rgba(0, 0, 0, 0.25);
		border-radius: 10px;
		display: absolute;
		left:18px;
	}
	.chooseImg{
		display:relative;
		margin-top:15px;
	}
	.chooseImg .show1{
		position: absolute;
		left: 140px;
		top: 224px;
		width: 100px;
		height: 100px;
		background: #EEEEEE;
		box-shadow: 1px 3px 6px 3px #D9DCDD;
		border-radius: 10px;
	}
	.chooseImg .show2{
		position: absolute;
		left: 256px;
		top: 224px;
		width: 100px;
		height: 100px;
		background: #EEEEEE;
		box-shadow: 1px 3px 6px 3px #D9DCDD;
		border-radius: 10px;
	}
	#tag>image{
		height: 60px;
		vertical-align: top;
	}
	.tag{
		display:flex;
		margin-left: 20px;
		margin-top: 20px;;
	}
	.tag .tagAdd{
		/* padding:0 ; */
		/* margin:0; */
		box-sizing: border-box;
		height:33px;
		width:118px;
		background: #437796;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
		border-radius: 15px;
		display: flex;
		align-items: center;
	}
	.tag .tagAdd image{
		width:26px;
		height:23px;
		margin-left:5px ;
	}
	.tag .tagAdd span{
		width: 88px;
		height: 19px;
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 12.5px;
		line-height: 14px;
		color: #E2ECFF;
		margin-left: 1.8px;
		margin-top:3.5px;
	}
	/* .tag:nth-child(n+2){
		width:68px;
		height: 30px;
		background: #437796;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
		border-radius: 15px;
	} */
	/deep/ .tag .tagBtn{
		padding:0 ;
		margin:0;
		width:80px;
		height: 33px;
		background: #437796;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
		border-radius: 15px;
	}
	.tagBtn{
		margin-right: 10px !important;
	}
	.tagAdd{
		margin-right: 10px !important;
	}
	.tagBtn image{
		width:26px;
		height:23px;
		margin-left:25px ;
		margin-top: 5px;
	}
	.tagBtn view{
		margin-top:6px;
	}
	.nameLess{
		/* float:right; */
		margin-left:286px;
		margin-top:15px;
	}
	.confirm{
		width: 446px;
		height: 88px;
		margin-top:10px;
		background: #FFFFFF;
		box-shadow: 0px -4px 6px 2px rgba(84, 84, 84, 0.16);
		display:flex;
		justify-content: center;
		align-items: center;
	}
	.confirm button{
		width: 331px;
		height: 49px;
		background: #DCB093;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
		border-radius: 15px;
		margin-left:20px;
		display:flex;
		justify-content: center;
		align-items: center;
		font-family: Abhaya Libre Medium;
		font-style: normal;
		font-weight: 500;
		font-size: 24px;
		line-height: 28px;
		color: #FFFFFF;
	}
</style>
