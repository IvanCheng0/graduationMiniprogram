<template>
	<view>
		<button  class="button">{{placeData}}</button>
		<view v-for="(item,index) in user" :key="index">
			<view class="user" >
				<image :src="item.userImageURL"  class="headImage" ></image>
				<view class="imgRight">
					<view class="nickname">{{item.nickname}}</view>
					<view class="date">{{item.date}}</view>
				</view>						
			</view>
			<view class='descriptionFold' @click="unfold" v-if="foldTrue" ref="description" >{{item.description|capitalize}}展开</view>
			<view  v-else-if="descriptionTrue" @click="fold" class="descriptionUnfold" >{{item.description}}>>收起</view>	
			<!-- 图片展示 -->
			<view class="userImage">
				<view v-for="(image,index) in item.userImages" :key="index" class="displayImage" :style="{width:imageWidth}"  >
					<image :src="image " :style="{width:'100%',height:imageHeight}"  @tap="_previewImage(`${image}`)"  ></image>		
				</view>
			</view>
			<text v-for="label in labels" class="label" >{{label}}</text>
			<!-- 点赞收藏图标 -->
			<view style="margin-left:360rpx;margin-top:20rpx;">
				<text class="iconfont icon-pinglun " @click="show=true" style="color:#8A8A8A"><text style="font-size: 30rpx;">5</text></text>
				<text class="iconfont icon-shoucang " @click="changeShouCangColor" :style="{color:shouCangColor}"><text style="font-size: 30rpx;">10</text></text>
				<text class="iconfont icon-add " @click="changeAddColor" :style="{color:addColor}"><text style="font-size: 30rpx;">1</text></text>
			</view>
			<view class="line" style=""></view>
		</view>
		
		
		
		<!-- 评论的弹出层 -->
		<u-popup v-model="show" mode="bottom" height="60%">			
				<!-- 评论 -->
			<view class="user" v-for="(item,index) in userComment " :key="index">
				<image :src="item.commentImageURL"  class="commentImage" ></image>
				<view class="imgRight">
					<view class="commentUser">{{item.commentUser}}</view>
					<view class="comment">{{item.comment}}</view>						
				</view>	
				<text class="iconfont icon-shoucang " @click="changeShouCangColor" style="color:#8A8A8A;margin-right: 20rpx;"><text style="font-size: 30rpx;">{{item.numLike}}</text></text>
			</view>
			<view style="position:fixed;bottom:0;background-color:#437796;width:100%;height:100rpx;"></view>
			<input v-model="value" placeholder="分享你的回忆吧"  type="text" border="true" style="position:fixed;bottom:20rpx;left:6%;width:650rpx;height:60rpx;border-radius: 15rpx;background-color: white;margin:0 auto;" />
		</u-popup>
	</view>
</template>

<script>
	export default {
		//过滤器使description变成fold的样子
		filters:{
			capitalize(value){
				if(!value)return
				value=value.toString()
				if(value.length>20){
					return value.substr(0,20)+'......'										
				}else{
					return value
				}
			}
		},
		data() {
			return {
				placeData:'A1教学楼',
				user:[{
					userImageURL: 'https://iccem0.oss-cn-shenzhen.aliyuncs.com/105.jpg',
					nickname:'昵称',
					date:'21-5-1',
					description:'故事描述故事描述故事描述故事描述故事描述故事描述故事描述故事描述故事描述故事描述故事描述故事描述故事描述故事描述故事描述',
					userImages:[
						'../../static/search/images/3.jpg',
						'../../static/search/images/4.jpg',
						'https://iccem0.oss-cn-shenzhen.aliyuncs.com/105.jpg',
						'https://iccem0.oss-cn-shenzhen.aliyuncs.com/105.jpg',
						'https://iccem0.oss-cn-shenzhen.aliyuncs.com/105.jpg',
						'https://iccem0.oss-cn-shenzhen.aliyuncs.com/105.jpg',
						// 'https://iccem0.oss-cn-shenzhen.aliyuncs.com/105.jpg',
						// 'https://iccem0.oss-cn-shenzhen.aliyuncs.com/105.jpg',
						// 'https://iccem0.oss-cn-shenzhen.aliyuncs.com/105.jpg',
						],		
				},],
				foldTrue:true,
				descriptionTrue:false,	
				imageWidth:'100%',
				imageHeight:'320rpx',			
				labels:['#标签1','#标签1','#标签1',],
				shouCangColor:'#8A8A8A',
				addColor:'#8A8A8A',
				show:false,				
				userComment:[{
					commentImageURL:'https://iccem0.oss-cn-shenzhen.aliyuncs.com/105.jpg',
					commentUser:'一只快乐的猫猫',
					comment:'我在这里也有很多回忆,',
					numLike:'10',
					},{
					commentImageURL:'https://iccem0.oss-cn-shenzhen.aliyuncs.com/105.jpg',
					commentUser:'一只快乐的猫猫',
					comment:'我在这里也有很多回忆,',
					numLike:'10',
					},
				]
					
				
				
				
			}
		},
		methods: {
			fold(){		
				this.foldTrue=true;
				this.descriptionTrue=false;	
			},
			unfold(){					
				this.foldTrue=false;
				this.descriptionTrue=true;
				this.unfoldTrue=false;
			},
			_previewImage(image) {
				console.log(image)
				var imgArr = [];
				imgArr.push(image);
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[0]
				});
			},
			changeShouCangColor(){
				this.shouCangColor='#FF0000'
			},
			changeAddColor(){
				this.addColor='#FFDD00'
			}
		},
		onShow(){						
				// if(this.userImages.length==1){
				// 	this.imageHeight='600rpx';
				// 	this.imageWidth='60%';
				// }else if(this.userImages.length=4){
				// 	this.imageHeight='320rpx';
				// 	this.imageWidth='60%';
				// }
		},
		
	
	
	}
	
	
</script>

<style>
	.button{
		font-family: FZCHSJW--GB1-0;
		width:600rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-weight: bold;
		border-radius: 40rpx;
		background-color: #E2ECFF;
		margin-top:30rpx ;
	}
	.user{
		margin-top:40rpx;
		display: flex;
		
	}
	.headImage{
		height:100rpx ;
		width:100rpx;
		border-radius: 100rpx;
		margin-left: 40rpx;
	}
	.imgRight{
		margin-left: 40rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.nickname{
		font-family: FZCHSJW--GB1-0;
		font-size: 40rpx;
		font-weight: bold;		
	}
	.date{
		font-size: 20rpx;
	}
	.descriptionFold,.descriptionUnfold{
		font-family: FZCHSJW--GB1-0;
		margin-left:40rpx;
		margin-top:25rpx;
		margin-right:20rpx;
	}
	.descriptionUnfold{
		font-family: FZCHSJW--GB1-0;
	}
	.userImage{
		display:flex;
		flex-wrap: wrap;
		margin-left:30rpx;
	}
	.displayImage{
		width:32% !important;
		height:320rpx !important;
		
	}
	.label{
		margin-left:50rpx;
		margin-top:20rpx;
		background-color: #FFFBF2;
		width:300rpx;
		height:100rpx;
		color:#ACACAC;
	}
	.iconfont.icon-pinglun{
		margin-right: 40rpx;font-size: 50rpx;
	}
	.iconfont.icon-shoucang{
		margin-right: 40rpx;font-size: 50rpx;
	}
	.iconfont.icon-add{
		margin-right: 40rpx;font-size: 50rpx;
	}
	.line{
	  position:relative;
	  margin-top:20rpx;
	}
	
	.line::after {
	  content: " ";
	  position: absolute;
	  left: 0;
	  top: 0;
	  width: 100%;
	  height: 1px;
	  background-color: #8A8A8A;
	}
	/* 弹出层 */
	.user{
		margin-top:40rpx;
		display: flex;
		
	}
	.commentImage{
		height:100rpx ;
		width:100rpx;
		border-radius: 20% !important;
		margin-left: 40rpx;
		box-sizing: border-box;
	}
	.imgRight{
		margin-left: 40rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.commentUser{
		font-family:Microsoft JhengHei UI Segoe;
		font-size: 30rpx;
		color:#437796
	}
	.comment{
		font-size: 33rpx;
	}

</style>
