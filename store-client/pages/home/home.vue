<template>
	<view class="example-fav">
		<view class="example-body">
			<!-- <uni-notice-bar :show-icon="true" :scrollable="true" :single="true" :text="shopPromotion" /> -->
			<uni-notice-bar color="red" :show-icon="true" :text="shopPromotion" />
		</view>
		
		<view v-for="category in categoryOrder">
			<uni-section :title="category" type="line"></uni-section>
			<view class="example-body example-body-first" style="font-size: 12px;">
				<uni-fav v-for="item in theGoods[category]"
					:checked="item.checked"
					:content-text="item.contentText"
					:star="false"
					class="favBtn" 
					style="width: 46%;"
					@click="favClick(item.name)"
				/>
			</view>
		</view>
		
		<uni-section title="已选菜品" type="line"></uni-section>
		<view class="example-body">
			<view v-for="cell in basket"
				class="uni-flex uni-row uni-flex-cell">
				<view class="flex-item" style="width: 60%;">{{cell.name + " (" +cell.unit_price + cell.unit + ")"}}</view>
				<uni-number-box 
				:min="1" 
				:max="99"
				:ref="cell.name"
				@change="onCellNumChange(cell)"/>
				<button @click="onRemoveCell(cell.name)"
				class="flex-item mini-btn"
				style="width: 50px; height: 35px; line-height: 35px;"
				type="warn" size="mini">X</button>
			</view>
		</view>
		
		<uni-section :title="'已选菜品总价: ' + totalPrice + '元'" type="line"></uni-section>
		<uni-section title="『其他需求可备注在下方输入框内』" type="line"></uni-section>
		<view class="uni-textarea">
			<textarea @blur="bindTextAreaBlur" placeholder="格式:菜品/物品 x3 " auto-height />
		</view>
		
		<uni-section title="联系方式" type="line"></uni-section>
		<view class="uni-form-item uni-column">
			<input id="realname" :value="user.realname" @blur="onInfoChange" class="uni-input" placeholder="请输入姓名..." />
			<input id="mobile" :value="user.mobile" @blur="onInfoChange" class="uni-input" type="number" placeholder="请输入电话..." />
			<input id="address" :value="user.address" @blur="onInfoChange" class="uni-input" placeholder="请输入地址..." />
		</view>
		<!-- <view class="uni-common-mt" style="background:#FFF; padding:5upx;">
			<rich-text :nodes="nodes"></rich-text>
		</view> -->
		<!-- <view class="uni-form-item uni-column"> -->
			<button type="primary" style="background-color: forestgreen; margin: 10upx;" @click="onLinkToOrderList">生成订单并截图给接单员</button>
		<!-- </view> -->
	</view>
</template>

<script>
	
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	import uniFav from '@/components/uni-fav/uni-fav.vue'
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	
	import goods from "../../db/goods.js";
	import promotion from "../../db/promotion.js";
	import shop from "../../db/shop.js";
	import user from "../../db/user.js";
	// 数据控制器
	import DBController from "../../controllers/DBController.js"
	
	export default {
		components: {
			uniSection,
			uniList,
			uniListItem,
			uniSwipeAction,
			uniNumberBox,
			uniFav,
			uniNoticeBar
		},
		data() {
			return {
				theGoods: {},
				itemList:[],
				categoryOrder:[],
				categories:[],
				itemMap:{}, //所有item存储器
				basket:[],
				// nodes: [{
				// 	name: 'div',
				// 	attrs: {
				// 		class: 'div-class',
				// 		style: 'line-height: 40px; color: red; text-align:center;'
				// 	},
				// 	children: [{
				// 		type: 'text',
				// 		text: 'Hello&nbsp;uni-app!'
				// 	}]
				// }],
				options: [{
					text: '删除',
					style: {
						backgroundColor: 'rgb(255,58,49)'
					}
				}],
				totalPrice: 0,
				user:{
					"realname": "",
					"mobile":"",
					"address": ""
				},
				shopPromotion:""
			}
		},
		methods: {
			favClick(name) {
				var item = this.itemMap[name];
				item.checked = !item.checked;
				uni.showToast({
					title: item.checked ? "" + item.name : "移除" + item.name,
					icon:'none'
				});
				
				// 往菜篮子添加/移除菜品
				if (item.checked == true){
					this.addItemToBasket(item);
				}else{
					this.removeItemFromBasket(item.name);
				}
				this.$forceUpdate();
			},
			onRemoveCell:function(itemName) {
				// 修改以选中的按钮状态
				var item = this.itemMap[itemName];
				item.checked = !item.checked;
				this.removeItemFromBasket(itemName);
			},
			onCellNumChange:function(cell){
				let numbox = this.$refs[cell.name][0];
				cell.num = numbox.inputValue;
				this.totalPrice = this.getTotalPrice();
			},
			addItemToBasket:function(item){
				// 拷贝一份数据
				let copy = {...item};
				copy.num = 1;
				this.basket.push(copy);
				this.totalPrice = this.getTotalPrice();
			},
			removeItemFromBasket:function(itemName){
				for (var i = 0; i < this.basket.length; i++) {
					if (this.basket[i].name == itemName){
						this.basket.splice(i, 1);
					}
				}
				this.totalPrice = this.getTotalPrice();
			},
			updateItemInBasket:function(item){
				// console.log("更新：" + item.name)
			},
			getTotalPrice:function(){
				let total = 0;
				for (var i = 0; i < this.basket.length; i++) {
					let cell = this.basket[i];
					total += cell.unit_price * cell.num;
				}
				return parseFloat(total).toFixed(1);
			},
			bindTextAreaBlur: function (e) {
				this.comment = e.detail.value;
			},
			onLinkToOrderList:function(){
				// 联系人信息添加到缓存
				uni.setStorageSync('user', this.user);
				
				var data = encodeURIComponent(JSON.stringify({basket:this.basket, comment:this.comment, user:this.user}));
				uni.navigateTo({
					url:"../orderlist/order-list?data=" + data
				});
			},
			onInfoChange:function(event){
				// 当前事件在上面打包的文件里没有出发
				this.user[event.currentTarget.id] = event.detail.value;
			}
		},
		onLoad: function(){
			// 组装数据， 本来这里应该放到 服务器上去执行的
			this.theGoods = DBController.collectItemsWithCategory(goods.item_list);
			// // 按名称建立一个item表
			// this.itemMap = DBController.equipItemMapByKey(goods.item_list, "name");
			
			// 货架顺序
			this.categoryOrder = promotion.category_order;
			for (var i = 0; i < this.categoryOrder.length; i++) {
				var category = this.categoryOrder[i];
				// 按顺序放到货架上
				var items = this.theGoods[category];
				// 这里将本地的可显示的进行配置，不影响
				for (var j = 0; j < items.length; j++) {
					var item = items[j];
					var itemName = item.name;
					item.checked = false;
					var des = "(" + item.unit_price + "元/" + item.unit + ")";
					item.contentText = {
						contentDefault: itemName + des,
						contentFav: itemName
					};
					// 将所有的可装备的数据放入盒子里
					this.itemMap[itemName] = item;
				}
			}
			
			//店铺促销
			this.shopPromotion = promotion.shop;
			
			// 店铺名称
			uni.setNavigationBarTitle({
			    title: shop.name
			});
			
			// 这里读取一次缓存数据
			try {
				// 将缓存的 数据放到对应的联系人方式里面
				const value = uni.getStorageSync('user');
				if (value) {
					this.user.realname = value.realname;
					this.user.address = value.address;
					this.user.mobile = value.mobile;
				}
			} catch (e) {
			    // error
			}
		},
		onShow:function(){
			// 填充联系人信息
			
		}
	}
</script>

<style>
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 28rpx;
		line-height: inherit;
	}

	.example {
		padding: 0 30rpx 30rpx;
	}

	.example-info {
		padding: 30rpx;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14rpx;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 30rpx;
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

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}


	/* #ifdef MP-ALIPAY */
	.uni-fav {
		margin-left: 20rpx;
	}

	/* #endif */


	.favBtn {
		margin: 0 20rpx 20rpx 0;
	}


	.example-body-fullWidth {
		padding: 32rpx 0;
	}

	.example-body-first {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: flex-start;
	}

	.favBtn-nav {
		/* left:-50rpx;
 */
	}
	
	.cont {
		height: 45px;
		line-height: 45px;
		padding: 0 15px;
		position: relative;
		background-color: #fff;
		font-size: 15px;
		border-bottom-color: #F5F5F5;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}
	
	.flex-item {
		/* width: 33.3%; */
		height: 80upx;
		text-align: center;
		line-height: 80upx;
	}
	
	.flex-item-V {
		width: 100%;
		height: 150upx;
		text-align: center;
		line-height: 150upx;
	}
	
	.uni-flex-cell{
		-webkit-justify-content:space-between;
		justify-content: space-between;
	}
</style>