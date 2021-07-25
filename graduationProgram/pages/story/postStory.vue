<template>
	<view class="post">

		<u-form :model="form" ref="postForm">
			<!-- 输入文字部分 -->
			<u-form-item style="display: flex;flex-direction: column;">
				<textarea value="" maxlength="-1" v-model="form.detail" placeholder="写下你的故事吧" />
				</u-form-item>
				<!-- 选择地点 -->
			<view class="select">
				<view @click="selectChange"   v-if="selectShow">点击添加地点</view>
				<u-select v-model="show"   mode="mutil-column-auto" :list="list" @confirm="confirm" ></u-select>
				<view v-if="showPlace"  @click="selectChangeAgain">{{location_name}}</view>
			</view>
			
			
			<!-- 匿名发表 -->
		<!-- 	<u-checkbox-group class="nameLess">
				<u-checkbox v-model="notPostIsShow" shape="circle"  @change="checkboxChange" >实名发表</u-checkbox>
			</u-checkbox-group> -->
			
			<!-- 上传图片部分 -->
			<view class="chooseImg">
				<u-upload
				ref="uUpload"
				:action="action"
				:file-list="fileList"
				@on-success="uploadSuccess"				
				@on-choose-complete="changeViewShow"
				@on-uploaded="allPicturesUpload"
				@on-remove="removePictures"
				:show-progress="false"
				size-type="['origin']"
				max-count="9" 
				max-size="10 * 1024 * 1024" 
				width="200rpx"
				height="200rpx"
				del-bg-color="#B4B4B4"></u-upload>
			</view>
	
	
			<view class="confirm">
				<button @click="confirmPost">确认发表</button>
			</view>
		</u-form>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import bus from '../utils/bus.js'
	import api from '../../api/story/api.js'
	export default{
		data() {
			return {
				url: 'https://story.genielink.cn/api/v1/getAddress',
				form:{
					detail:'',
					showImgList:[],
					tags:[],
					// 匿名发表
					// isShow:false,
					location_id:null,
				},
				//不发送的isshow
				notPostIsShow:false,
				// 控制选择地点的显示与隐藏
				selectShow:true,
				// u-select标签的显示与隐藏
				show:false,
				showPlace:false,
				selectDefault:[],
				list: [
					{
						value: 998,
						label: '大学城校区',
						children: []
					},
					{
						value: 999,
						label: '五山校区',
						children: []
					}
				],
				location_name:[],
				action:`https://story.genielink.cn/api/v1/upload`,
				showView:true,
				showBtn:true,
				showTags:false,
				//确认全部图片上传成功
				allPicturesStatus:false,
				//上传图片成功的url
				lists:null,
				fileList:[],
				//获取到的地点
				location:null,
				//要存放到vuex中的
				commonLocation:[],
				}
			},
			//监听selectShow变化，避免弹出了u-select该值为空
			watch:{
				selectShow:{
					watchLocationName(){
						if(this.location_name.length==0 && this.selectShow==false){
							this.show=true
						}
					}
				}
			},
			methods:{
				//选择地点的显示与隐藏
				selectChange(){
					// this.selectShow = !this.selectShow;
					this.show = !this.show;
					this.showPlace = !this.showPlace;
					
				},
				selectChangeAgain(){
					this.show=!this.show;
					this.location_name=[];
					this.selectShow = !this.selectShow;
				},
				//如果this.location_name或者selectshow为false
				
				//打印u-select 的参数 
				confirm(e) {
					//location_id
					this.selectShow = !this.selectShow;
					this.form.location_id=e[1].value
					e.forEach((item)=>{
						this.location_name.push(item.label)
					});
					this.location_name=this.location_name.join('-')
					console.log(this.location_name)
				},				
				submitPic(){
					this.$refs.uUpload.upload();
				},
				//单个图片上传成功时触发
				uploadSuccess(data){
					console.log(data)
					this.form.showImgList.push(data.url);
					// this.fileList.push(data.url)
				},
				//上传图片时两个装饰的方块消失
				changeViewShow(){
					this.showView=false;
				},
				// 所有图片上传成功触发
				allPicturesUpload(lists, name){
					console.log("allPicturesUpload-list",lists)
					lists.forEach(item=>{
						if(item.progress==100){ 
							this.allPicturesStatus = true
							uni.showToast({
							    title: '图片上传成功，请点击确认发表',
							    duration: 1500,
								icon:'success',
								position:'center',
							});
							}
					})
					
					// this.lists=lists;
					// lists.length=0;
					console.log("allPicturesUpload-name",lists)
				},
				//删除图片时触发
				removePictures(index, lists, name){
					let deleteIndex=index
					// this.lists.splice(index,1)
					this.form.showImgList.splice(index,1)
					// return deleteIndex
					console.log("removePictures-index",index)
					console.log("removePictures-list",lists)
					console.log("removePictures-name",name)
				},
				//增加标签
				addTag_newPage(){
					console.log(111)
					setTimeout(()=>{
						this.showBtn=false;
					},500)
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
					this.notPostIsShow=e.value;
				},
				//确认发表
			async confirmPost(){
				//地点选择是必须的
				if(this.form.location_id==null){
					uni.showToast({
					    title: '请选择地点',
					    duration: 1500,
						icon:'none',
						position:'center',
					});
				}else{
					//如果用户上传了图片
					if(this.form.showImgList.length){
						console.log('this.form.showImgList',this.form.showImgList)
						//确认全部图片上传成功
						if(this.allPicturesStatus){
							this.form.isShow=true;
							console.log('this.form.isShow',this.form.isShow)
							const formData=JSON.stringify(this.form)
							const {data:res} = await api.postStory({data:formData});
							console.log(res)
							if(res.code==1001){
								uni.showToast({
								    title: '发布成功',
								    duration: 1500,
									icon:'success',
									position:'center',
								});
								this.$refs.uUpload.clear();
								this.fileList=[]
								this.lists=[];
								this.form.detail='';
								this.form.showImgList=[];
								this.form.tags=[];
								uni.navigateTo({
									url:'../people/people_story'
								})
								
							}else{
								this.showToast()
								// uni.showToast({
								//     title: `图片或文字含有敏感信息，
								// 	请重新上传`,
								//     duration: 1500,
								// 	icon:'loading',
								// 	position:'center',
								// })
								}	
						}
						else{
							//如果全部图片没有上传成功
							uni.showToast({
							    title: '图片上传中',
							    duration: 2000,
								icon:'loading',
								position:'center',
							})
						}
						
					}else{
						console.log(111111111111111111)
						//如果用户没有上传图片，只发布文字
						this.form.isShow=true;
						console.log('this.form.isShow',this.form.isShow)
						const formData=JSON.stringify(this.form)
						const {data:res} = await api.postStory({data:formData});
						console.log(res)
						if(res.code==1001){
							uni.showToast({
							    title: '发布成功',
							    duration: 1500,
								icon:'success',
								position:'center',
							});
							this.$refs.uUpload.clear();
							this.fileList=[]
							this.lists=[];
							this.form.detail='';
							this.form.showImgList=[];
							this.form.tags=[];
							uni.navigateTo({
								url:'../people/people_story'
							})
					}else{
						this.showToast()
						// uni.showToast({
						//     title: '图片或文字含有敏感信息，无法发布',
						//     duration: 1500,
						// 	icon:'loading',
						// 	position:'center',
						// })
					}
					}
					
					}
				},
				//消息提示
				showToast() {
					this.$refs.uToast.show({
						title: '图片或文字含有敏感信息，无法发布',
						type: 'error',
						icon:false,
					})
				},
				
				
				//获取地点数据
				async getLocation(){
						// const res = await this.$http({
						// 	url: '/api/v1/getAddress'
						// })
						uni.request({
							url: `${this.url}`,
							success:(res)=>{
								//大学城校区的数据
								const locationDataTown=res.data.addressList.slice(0,82)
								//五山的数据
								const locationDataWuShan=res.data.addressList.slice(82)
								// console.log('大学城',locationDataTown)
								// console.log('五山',locationDataWuShan)
								//遍历大学城的数据
								locationDataTown.forEach((item,index)=>{
									// let i=0;
									// this.list[0].children[`${index}`].label=item.location_name;
									// console.log('this.list[0].children[`${index}`].label',this.list[0].children[`${index}`].label)
									// this.list[0].children[`${index}`].value=item.aid;
									// i=i+1;
									// console.log(i)
									let dataTown={value:null,label:null}
									let dataWuShan={value:null,label:null}
									dataTown.label=item.location_name;
									dataTown.value=item.aid;
									this.list[0].children.push(dataTown)
									// console.log('this.list[0].children',this.list[0].children)
									//下面这个是将大学城的地点存到vuex中
									this.commonLocation.push(item.location_name)
								})
								//遍历五山的数据
								locationDataWuShan.forEach((item,index)=>{
									let dataWuShan={value:null,label:null}
									dataWuShan.label=item.location_name;
									dataWuShan.value=item.aid;
									this.list[1].children.push(dataWuShan)
									// console.log('this.list[1].children',this.list[1].children)
									//将大学城的和五山的commonLocation拼接
									this.commonLocation.push(item.location_name)
									
								})
								// console.log('commonLocation',this.commonLocation)
							}
						})	
				},
			},
			onLoad() {
				this.getLocation();
				this.$store.emit('getLocationName',this.commonLocation)
			},
			onShow(){
				this.form.tags=this.$store.state.tags
				console.log('this.form.tags',this.form.tags)
				// bus.$on('tagsToPostStory',data=>{
				// 	this.form.tags=data;
				// })
			}
	}
</script>

<style scoped>
	textarea{
		margin:0 auto;
		width: 88vw;
		height: 39vh;
		padding-top:10rpx;
		background: #EAF0FC;
		box-shadow: 2rpx 6rpx 12rpx 6rpx rgba(0, 0, 0, 0.25);
		border-radius: 20rpx;
		margin-top:30rpx;
	}
	/* 选择地点 */
	.select{
		margin:0 auto;
		width: 88vw;
		height: 6vh;
		background:  #EEEEEE;
		box-shadow: 2rpx 6rpx 12rpx 6rpx #D9DCDD;
		border-radius: 10rpx;
		margin-top:43rpx;
	}
	.select view{
		float:right;
		font-family: Roboto;
		font-size: 28rpx;
		/* line-height: 35px; */
		color: #8F8F8F;
		transform: translateY(50%);
	}
	/* 样式穿透给u-upload添加样式 */
	/deep/ .u-list-item.u-add-wrap{
		width:100px !important;
		height: 100px !important;
		background: #D0DEE7;
		box-shadow: 2rpx 6rpx 12rpx 6rpx rgba(0, 0, 0, 0.25);
		border-radius: 20rpx;
		display: absolute;
		left:22rpx;
		top: 47% !important;
		margin-top:4%;
	}	
	/deep/ .u-list-item.u-preview-wrap{
		margin-left: 30rpx;
	}
	
	
	.chooseImg{
		display:relative;
		margin-top:47rpx;
		margin-bottom:-30rpx;
	}
	.chooseImg .show1{
		position: absolute;
		left: 37%;
		top: 43%;
		width: 27%;
		height: 16%;
		background: #EEEEEE;
		box-shadow: 1px 3px 6px 3px #D9DCDD;
		border-radius: 10px;
	}
	.chooseImg .show2{
		position: absolute;
		left:69%;
		top: 43%;
		width: 27%;
		height: 16%;
		background: #EEEEEE;
		box-shadow: 1px 3px 6px 3px #D9DCDD;
		border-radius: 10px;
	}
	.tag{
		display:block;
		display:flex;
		flex-wrap:wrap;
		margin-left: 5%;
		margin-top: 112rpx;
	}
	/* 从addTag页面传过来的增加的tag */
	.tag .tagBtnAdd{
		padding:0 6rpx;
		margin-right:14rpx;
		margin-bottom: 20rpx;
		height: 66rpx;
		background: #437796;
		box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.25);
		border-radius: 30rpx;
	}
	.tag .tagBtnAdd view{
		display:flex;
		align-items:center;
		justify-content:center;
		color:#E2ECFF;
		flex-wrap:wrap;
		transform: translateY(39%);
	}
	.tag .tagAdd{
		box-sizing: border-box;
		height:33px;
		width:118px;
		background: #437796;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
		border-radius: 15px;
		display: flex;
		align-items: center;
	}
	.tag .tagAdd span{
		display:block;
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
	.tag .tagBtn{
		padding:0 ;
		margin:0;
		width:160rpx;
		height: 66rpx;
		background: #437796;
		box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.25);
		border-radius: 30rpx;
	}
	.tagBtn{
		margin-right: 20rpx !important;
	}
	.tagAdd{
		margin-right: 20rpx !important;
	}
	.tagBtn view{
		margin-top:12rpx;
	}
	.tagBtn .icon{
		margin-left:50rpx;
		margin-top:4rpx;
	}
	.nameLess{
		float:right;
		margin-right:40rpx;
		margin-top:42rpx;
	}
	.confirm{
		display:block;
		/* width: 80%; */
		height: 176rpx;
		/* position:fixed; */
		bottom:0;
		margin-top:71rpx;
		/* background: #FFFFFF; */
		/* box-shadow: 0px -4px 6px 2px rgba(84, 84, 84, 0.16); */
		/* display:flex;
		justify-content: center;
		align-items: center; */
	}
	.confirm button{
		width: 80%;
		height: 98rpx;
		background: #DCB093;
		box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.25);
		border-radius: 30rpx;
		/* margin-left:20px; */
		margin:0 auto;
		display:flex;
		justify-content: center;
		align-items: center;
		font-family: Abhaya Libre Medium;
		font-style: normal;
		font-weight: 500;
		font-size: 48rpx;
		line-height: 56rpx;
		color: #FFFFFF;
	}
</style>
