<template>
	<view class="example-fav">
		<view class="uni-center" style="background:#FFFFFF; font-size:0;">
			<image class="image" mode="widthFix" src="../../static/good.jpg" />
		</view>
		
		<uni-section title="已选物品  『走的时候,别忘了截图发给接单员哦』" style="font: bold;" type="line"></uni-section>
		<view class="uni-padding-wrap uni-common-mt">
		<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
			<view class="text" v-for="item in basket"
			style="font-size: 14px;">{{ item.name + "  x" + item.num}}</view>
		</view>
		</view>
		<uni-section title="备注" type="line"></uni-section>
		<view class="uni-textarea">
			<textarea :value="comment" disabled auto-height />
		</view>
		<uni-section title="联系方式" type="line"></uni-section>
		<uni-list>
			<uni-list-item :show-arrow="false" :title="'姓名：' + user.realname" />
			<uni-list-item :show-arrow="false" :title="'电话：' + user.mobile" />
			<uni-list-item :show-arrow="false" :title="'地址：' + user.address" />
		</uni-list>
	</view>
</template>

<script>
	
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	
	import user from "../../db/user.js"
	export default {
		components: {
			uniSection,
			uniList,
			uniListItem
		},
		data(){
			return {
				basket:[],
				comment:"",
				user:{
					"realname": "",
					"mobile":"",
					"address": ""
				}
			}
		},
		onLoad:function(option){
			const data = JSON.parse(decodeURIComponent(option.data));
			this.user = data.user;
			this.basket = data.basket;
			this.comment = data.comment;
		},
		onShow:function(){
			// // 获取当前数据
			// this.comment = uni.getStorageSync('comment');
			// this.user = user;
			// this.basket = uni.getStorageSync('basket');
			// this.theName = "姓名：" + this.info.name;
			// this.theTel = "电话：" + this.info.tel;
			// this.theAddress = "地址：" + this.info.address;
		}
	}
</script>

<style>
	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14rpx;
		background-color: #ffffff;
	}
	
	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 30rpx;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 30rpx;
	}
	
	.example-info-text {
		font-size: 28rpx;
		line-height: 36rpx;
	}
	
	
	.example-body {
		flex-direction: column;
		padding: 30rpx;
		background-color: #ffffff;
	}
	
	.flex-item {
		width: 33.3%;
		height: 200upx;
		text-align: center;
		line-height: 200upx;
	}
	
	.flex-item-V {
		width: 100%;
		height: 150upx;
		text-align: center;
		line-height: 150upx;
	}
	
	.text {
		margin: 2upx 10upx;
		padding: 0 20upx;
		background-color: #F4F5F6;
		height: 40upx;
		line-height: 40upx;
		text-align: center;
		color: #333333 ;
		font-size: 32upx;
	}
	
	.desc {
		/* text-indent: 40upx; */
	}
</style>
