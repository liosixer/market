<template>
	<view class="example-fav">
		<view class="uni-center" style="background:#FFFFFF; font-size:0;">
			<image class="image" mode="widthFix" src="../../static/good.jpg" />
		</view>
		
		<uni-section title="仅显示最近3天的订单信息" style="font: bold;" type="line"></uni-section>
		
		<view v-show="list.length == 0">
			<uni-card
			:title="empty.title" 
			:is-shadow="empty.shadow" 
			:note="empty.note" 
			:extra="empty.extra" 
			:thumbnail="empty.thumbnail" >
			<text class="content-box-text">
				{{empty.content}}
			</text>
			</uni-card>
		</view>
		
		<view v-show="list.length > 0" >
			<view v-for="item in list" :key="item.id" class="example-box">
				<uni-card 
				:id="item.id"
				:title="item.title" 
				:is-shadow="item.shadow" 
				:note="item.note" 
				:extra="item.extra" 
				:thumbnail="item.thumbnail" >
				<text class="content-box-text">{{ item.content }}</text>
				<block slot="footer">
					<view class="footer-box">
						<view class="">
							<text class="footer-box__item"></text></view>
						<!-- <view class="" @click.stop="footerClick('modify/' + item.id)">
							<text class="footer-box__item"> 修改订单</text></view> -->
						<view class="" @click.stop="footerClick('cancel/' + item.id)">
							<text class="footer-box__item" style="color: #ff5500;"> 取消订单</text></view>
					</view>
				</block>
				</uni-card>
			</view>
		</view>
		
	</view>
</template>

<script>
	
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import uniCard from '@/components/uni-card/uni-card.vue'
	
	import orderJs from "./order.js";
	
	import utils from "../../common/utils.js";
	
	export default {
		components: {
			uniSection,
			uniList,
			uniListItem,
			uniCard
		},
		data(){
			return {
				basket:{},
				comment:"",
				user:{
					"realname": "",
					"mobile":"",
					"address": ""
				},
				list: [ 
					],
				empty:{
					id: 0,
					title: '',
					content: '空空如也，去买菜吧！',
					shadow: false,
					note: '',
					extra: '',
					thumbnail: ''
				},
			}
		},
		onLoad:function(option){
			// 这里读取一次缓存数据
			try {
				// 将缓存的 数据放到对应的联系人方式里面
				const value = uni.getStorageSync('user');
				if (value) {
					this.user.mobile = value.mobile;
				}
			} catch (e) {
				// error
				uni.showToast({
					title:"载入数据错误",
					icon:"none"
				})
			}
		},
		onShow:function(){
			this.freshOrderList();
		},
		
		onHide:function(){
			//初始化tabindex 防止重复刷新
			this.curTabIndex = -1;
		},
		
		onTabItemTap:function(e){
			// console.log("点击" + e.text);
		},
		
		methods:{
			footerClick(params) {
				var list = params.split("/");
				if (list[0] == "modify"){
					//修改订单
					var orderId = list[1];
					var order = this.basket[orderId];
					uni.switchTab({
					    url: '/pages/home/home'
					});
					uni.$emit("modifyOrder", order);
				}else{
					orderJs.orderCancel(list[1], this.handlerOrderResult);
				}
			},
			
			//处理订单结果
			handlerOrderResult:function(result){
				if (result.data.err_code == 0){
					uni.showToast({
						title:"订单取消成功",
						icon:"none"
					});
					this.freshOrderList();
				}
			},
			
			freshOrderList:function(){
				var mobile = this.user.mobile;
				if (mobile == null) return;
				//请求数据
				orderJs.getRecentOrder(mobile, (result)=>{
					if (result.data.err_code == 0){
						var orderList = result.data.list;
						this.list = [];
						
						for (var i = 0; i < orderList.length; i++) {
							var orderItem = orderList[i];
							this.basket[orderItem.id] = orderItem;
							var create_at = new Date(orderItem.create_at);
							var cell = {
								id: orderItem.id,
								title: utils.dateFormat("YYYY-mm-dd", create_at),
								extra: orderJs.getOrderStatus(orderItem.status),
								content: orderJs.getContent(orderItem.comment, orderItem.item_list),
								shadow: true,
								note: orderItem.status == 1 ? 'Tips' : "",
								thumbnail: ''
							};
							this.list.push(cell);
						}
					}
				})
			}
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
	
	.content-box {
		padding-top: 20rpx;
	}
	
	.content-box-text {
		font-size: 30rpx;
	}
	
	.footer-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: space-between;
		flex-direction: row;
	
	}
	
	.footer-box__item {
		align-items: center;
		padding: 10rpx 0;
		font-size: 30rpx;
		color: #666;
	}
</style>
