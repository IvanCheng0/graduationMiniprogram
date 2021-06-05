<template>
  <view class="pop">
    <view class="pop-main">
      <i class="iconfont cancel" @click="cancel"></i>
      <view class="pop-title">需要您的授权</view>
      <view class="pop-text">
        <view>为了提供更好的服务</view> 
        <view>请在稍后的提示框中点击允许</view>
      </view>
	<button  @click="getUserInfo">请登录</button>
    </view>
  </view>
</template>
 
<script>
  export default {
    data() {
      return {
         
      };
    },
    methods: {
	getUserInfo(){
	   console.log("aaaa")
	   //uniapp最新的获取用户信息的方式，旧版已获取不到
	   uni.getUserProfile({
		   desc:'Wexin',     // 这个参数是必须的
		   success:res=>{
			   console.log("用户信息",res.userInfo)
			   //获得openID需要先用wx.login()获取临时登录凭证code,之后服务器端用code和小程序的appid,appSecret请求获取openID
			   uni.login({
			     provider: 'weixin',
			     success: function (res) {
			       console.log(res.code);
				   let code={code:res.code}
				   console.log(code)
				   let data=Object.assign(res.userInfo,code)
				   console.log(data)
				   // 将数据存储到后台
				     uni.request({  
					   url: 'url',  
					   header: {  
						   "Content-Type": "application/x-www-form-urlencoded"  
					   },  
					   data:data,
					   method: "POST",  
					   success: (e) => {  
						   if (e.data.code === 0) {//登录成功后改变vuex的状态，并退出登录页面  
							 //将后端返回的带有token的用户信息存储到vuex中
							 this.$store.commit('login', res.userInfo)
							 
						   }  
					   }  
				   })  
			     }
			   });
		   }
	   })
	          },
	
      cancel() {
        this.$emit('cancelChild',false)
      },
    }
  }
</script>
 
<style scoped>
.pop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.3);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pop-main {
  width: 690upx;
  height: 800upx;
  box-sizing: border-box;
  background-color: #FFFFFF;
  border-radius: 20upx;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  padding: 64upx 0upx 40upx 0upx;
}
/* 删除按钮 */
.cancel {
  position: absolute;
  top: 20upx;
  right: 20upx;
  font-size: 20px;
}
.pop-title {
  padding-bottom: 40upx;
  width: 100%;
  border-bottom: 1px solid #BFBFBF;
  font-size: 16px;
  letter-spacing: 2px;
  text-align: center;
}
.pop-imgsize {
  width: 484upx;
  height: 406upx;
}
.pop-text {
  width: 75%;
  text-align: center;
  font-size: 15px;
  margin: 30upx 0upx;
  letter-spacing: 1px;
}
button {
  background-color: #08BF00;
  color: #FFFFFF;
  text-align: center;
  height: 88upx;
  line-height: 88upx;
  font-size: 14px;
  border-radius: 50upx;
  width: 78%;
}
</style>