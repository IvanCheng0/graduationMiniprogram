<template>
	<div class="outer" @click="$emit('showDetail', listItem.sid)">
		<image :src="avatar? avatar:getAvatar()" class="avatar"></image>
		<div class="des">
			<div class="firstColumn">
				<div class="name">
					{{listItem.name}}
				</div>
				<div class="[listItem.place=='五山校区'?'wushan':'collegeTown']">
					{{listItem.place}}
				</div>
			</div>
			<div class="time">
				{{listItem.time}}
			</div>
			<div class="description">
				{{sliceStr}}
			</div>
			<image v-if="showDel===true" src="../../static/img/people/delete.png" class="delete" @click.stop="$emit('delete', listItem.sid)"></image>
		</div>
		
	</div>
</template>

<script>
	export default {
		methods: {
			getAvatar() {
				return "../../static/avatar_miss.jpg"
			}
		},
		data() {
			return {}
		},
		props: ['listItem', 'avatar', 'showDel'],
		computed:{
			sliceStr: function () {
			      // `this` 指向 vm 实例
				  if(this.listItem.desc.length>15){
					  return (this.listItem.desc.slice(0,15).concat('...'))
				  }
			      else{
					  return this.listItem.desc
				  }
			}
		},
		onLoad() {},
	}
</script>

<style scoped>
	.outer {
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: 14vh;
		width:92vw;
		margin:0 auto;
		margin-bottom: 50upx;
		box-sizing: border-box;
		background: #FFFFFF;
		box-shadow: 0px 4px 5px 1px rgba(0, 0, 0, 0.25);
		border-radius: 20rpx;
	}
	/* 头像 */
	.avatar {
		width: 16vw;
		height: 16vw;
		margin-left: 2vw;
		border-radius: 20%;
		background-color: white;
		box-shadow: 4upx 4upx 4upx #b0aea5;
		box-sizing: border-box;
	}
	.des{
		margin-left: 3vw;
		display: flex;
		flex-direction: column;
	}
	.des .firstColumn{
		display: flex;
		justify-content: space-between;
	}
	.des .firstColumn .name{
		font-weight: bold;
		font-size:28rpx;
	}
	/* 大学城校区 */
	.des .firstColumn .collegeTown{
		/* padding:5rpx 5rpx;*/
		width:150rpx;
		margin-top:-5rpx;
		margin-right: 40rpx;
		display:flex;
		justify-content: center;
		background: #DCB093;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
		border-radius: 5px;
	}
	/* 五山校区 */
	.des .firstColumn .wushan{
		/* padding:5rpx 5rpx;*/
		width:150rpx;
		margin-top:-5rpx;
		margin-right: 40rpx;
		display:flex;
		justify-content: center;
		background: #93B9DC;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
		border-radius: 5px;
	}
	.des .firstColumn .time{
		font-family: Abel;
		font-style: normal;
		font-weight: normal;
		font-size: 24rpx;
		text-align: center;
		color: #000000;
	}
	.des .description{
		font-size:24rpx;
		font-family: Abel;
		color: #666666;
		width: 70vw; 
		overflow: hidden; 
		white-space: nowrap; 
		text-overflow: ellipsis;
	}
	.delete{
		width: 8vw;
		height: 8vw;
		margin-top: 4.5vh;
		position: absolute;
		right: 9vw;
		display: flex;
	}
</style>