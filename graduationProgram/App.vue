<script>
	export default {
		onLaunch() {
		    uni.getStorage({//获得保存在本地的用户信息  
				key: 'uerInfo',  
				success:(res) => {  
					this.login(res.data);  
					uni.request({// 再次校验并刷新token的有效时间  
						url: 'url',  
						header: {  
							"Content-Type": "application/x-www-form-urlencoded",  
							"Token":res.data.token  
						},  
						data: {  
							"username":res.data.user_name  
						},  
						method: "POST",  
						success: (e) => {  
							if (e.statusCode === 200 && e.data.code === 0) {  
								this.$store.commit('login',e.data)  
							}  
						} ,
					})
				}
			})  
	},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}	
	   
</script>

<style lang="scss">
	/*每个页面公共css */
	 @import "./uview-ui/index.scss"; 
	@import "./static/font/FZ.css";
	@import "./static/search/icon/searchPlaceIcon.css";
</style>
