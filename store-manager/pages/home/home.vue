<template>
	<view class="example-fav">
		<view class="example-body">
			<!-- <uni-notice-bar :show-icon="true" :scrollable="true" :single="true" :text="shopPromotion" /> -->
			<uni-notice-bar color="red" :show-icon="true" :text="shopNotice" />
		</view>

		<!-- <wuc-tab :tab-list="categoryOrder" :tabCur.sync="TabCur" @change="tabChange" />
		<swiper :current="TabCur" duration="300" @change="swiperChange">
		  <swiper-item v-for="(category,index) in categoryOrder" :key="index">
		    <view :ref="category.name" class="example-body example-body-first" style="font-size: 12px;">
		    	<uni-fav v-for="item in theGoods[category.name]"
		    		:checked="item.checked"
		    		:content-text="item.contentText"
		    		:star="false"
		    		class="favBtn" 
		    		style="width: 46%;"
		    		@click="favClick(item.name)"
		    	/>
		    </view>
		  </swiper-item>
		</swiper> -->

		<uni-section title="仁智便利货架" type="line"></uni-section>
		<uni-collapse :accordion="true">
			<uni-collapse-item v-for="category in categoryOrder" :title="category.name" :show-animation="true">
				<view class="example-body example-body-first" style="font-size: 12px;">
					<uni-fav
						v-for="item in theGoods[category.name]"
						:checked="item.checked"
						:content-text="item.contentText"
						:star="false"
						class="favBtn"
						style="width: 46%;"
						@click="favClick(item.name)"
					/>
				</view>
			</uni-collapse-item>
		</uni-collapse>

		<!-- <view v-for="category in categoryOrder">
			<uni-section :title="category.name" type="line"></uni-section>
			<view class="example-body example-body-first" style="font-size: 12px;">
				<uni-fav v-for="item in theGoods[category.name]"
					:checked="item.checked"
					:content-text="item.contentText"
					:star="false"
					class="favBtn" 
					style="width: 46%;"
					@click="favClick(item.name)"
				/>
			</view>
		</view> -->

		<uni-section title="已选菜品" type="line"></uni-section>
		<view class="example-body">
			<view v-for="cell in basket" class="uni-flex uni-row uni-flex-cell">
				<view class="flex-item" style="width: 60%;">{{ cell.name + ' (' + (cell.unit_price * cell.count).toFixed(2) + '元)' }}</view>
				<uni-number-box :value="cell.count" :min="1" :max="99" :ref="cell.name" @change="onCellNumChange(cell)" />
				<button @click="onRemoveCell(cell.name)" class="flex-item mini-btn" style="width: 50px; height: 35px; line-height: 35px;" type="warn" size="mini">X</button>
			</view>
		</view>

		<uni-section :title="'已选菜品总价: ' + totalPrice + '元'" type="line"></uni-section>
		<uni-section title="『其他需求可备注在下方输入框内』" type="line"></uni-section>
		<view class="uni-textarea"><textarea @blur="bindTextAreaBlur" placeholder="格式:菜品/物品 x3 " auto-height /></view>

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
		<button type="primary" 
		style="background-color: forestgreen; margin: 10upx;" 
		:disabled="btnSaveEnabled == false"
		@click="onSaveOrder">提交订单</button>
		<!-- </view> -->
	</view>
</template>

<script>
import uniSection from '@/components/uni-section/uni-section.vue';
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
import uniFav from '@/components/uni-fav/uni-fav.vue';
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
import WucTab from '@/components/wuc-tab/wuc-tab.vue';

// 数据控制器
import DBController from '../../controllers/DBController.js';

import home from './home.js';

export default {
	components: {
		uniSection,
		uniList,
		uniListItem,
		uniSwipeAction,
		uniNumberBox,
		uniFav,
		uniNoticeBar
		// WucTab
	},
	data() {
		return {
			theGoods: {},
			categoryOrder: [],
			categories: [],
			dailySupply: {}, //所有item存储器
			basket: [],
			options: [
				{
					text: '删除',
					style: {
						backgroundColor: 'rgb(255,58,49)'
					}
				}
			],
			totalPrice: 0,
			user: {
				realname: '',
				mobile: '',
				address: ''
			},
			shopNotice: '',
			shopInfo: {
				name: 'xx便利店'
			},
			comment:""
		};
	},
	methods: {
		favClick(name) {
			var item = this.dailySupply[name];
			item.checked = !item.checked;
			uni.showToast({
				title: item.checked ? '' + item.name : '移除' + item.name,
				icon: 'none'
			});

			// 往菜篮子添加/移除菜品
			if (item.checked == true) {
				this.addItemToBasket(item);
			} else {
				this.removeItemFromBasket(item.name);
			}
			this.$forceUpdate();
		},
		onRemoveCell: function(itemName) {
			// 修改以选中的按钮状态
			var item = this.dailySupply[itemName];
			item.checked = !item.checked;
			this.removeItemFromBasket(itemName);
		},
		onCellNumChange: function(cell) {
			let numbox = this.$refs[cell.name][0];
			cell.count = numbox.inputValue;
			this.totalPrice = this.getTotalPrice();
		},
		addItemToBasket: function(item) {
			// 拷贝一份数据
			let copy = { ...item };
			this.basket.push(copy);
			//默认添加的数量为1
			this.totalPrice = this.getTotalPrice();
		},
		removeItemFromBasket: function(itemName) {
			for (var i = 0; i < this.basket.length; i++) {
				if (this.basket[i].name == itemName) {
					this.basket.splice(i, 1);
				}
			}
			this.totalPrice = this.getTotalPrice();
		},
		updateItemInBasket: function(item) {
			// console.log("更新：" + item.name)
		},
		getTotalPrice: function() {
			let total = 0;
			for (var i = 0; i < this.basket.length; i++) {
				let cell = this.basket[i];
				total += cell.unit_price * cell.count;
			}
			return parseFloat(total).toFixed(1);
		},
		bindTextAreaBlur: function(e) {
			this.comment = e.detail.value;
		},
		onSaveOrder: function() {
			// 联系人信息添加到缓存
			uni.setStorageSync('user', this.user);

			var mobile = this.user.mobile;
			var deliveryInfo = { ...this.user };
			var item_list = [];
			for (var i = 0; i < this.basket.length; i++) {
				var item = this.basket[i];
				item_list.push({ name: item.name, count: item.count });
			}
				
			home.saveOrder(
				{
					mobile: mobile,
					delivery_info: deliveryInfo,
					item_list: item_list,
					comment: this.comment
				},
				res => {
					if (res.data.err_code == 0) {
						uni.showToast({
							title: '订单提交成功'
						});
						uni.$emit("resetCart", {});
					} else {
						uni.showToast({
							title: '请核实联系人信息以及商品信息等'
						});
					}
				}
			);
		},
		onInfoChange: function(event) {
			// 当前事件在上面打包的文件里没有出发
			this.user[event.currentTarget.id] = event.detail.value;
		},
		storeDecorate: function(goods, shopName) {
			//获取商品的货架顺序并进行排序
			//装备商品数据；
			this.theGoods = DBController.collectItemsWithCategory(goods);
			for (var i = 0; i < this.categoryOrder.length; i++) {
				var category = this.categoryOrder[i].name;
				// 按顺序放到货架上
				var items = this.theGoods[category];
				// 这里将本地的可显示的进行配置，不影响
				for (var j = 0; j < items.length; j++) {
					var item = items[j];
					var itemName = item.name;
					item.checked = false;
					var des = '(' + item.unit_price + '元/' + item.unit + ')';
					item.contentText = {
						contentDefault: itemName + des,
						contentFav: itemName
					};
					// 将所有的可装备的数据放入盒子里
					this.dailySupply[itemName] = item;
				}
			}

			// 店铺名称
			uni.setNavigationBarTitle({
				title: shopName
			});
		},
		//装载购物车
		refillCart: function($bastket = [], $comment = '', $deilveryInfo = {}) {
			// 配送信息暂时不做调整
			//1. 恢复菜单的初始状态
			for (let item in this.dailySupply) {
				this.dailySupply[item].checked = false;
			}
			//2. 恢复菜篮子的初始状态
			this.basket = [];
			//备注信息填充
			this.comment = $comment;
			//根据今日菜品填充菜篮子以及菜单状态【这里有一个时效性的判断】
			var selected = [];
			for (var i = 0; i < $bastket.length; i++) {
				var item = $bastket[i];
				if (item.name in this.dailySupply) {
					this.dailySupply[item.name].checked = true;
					item.unit_price = this.dailySupply[item.name].unit_price;
					selected.push(item);
				}
			}
			this.basket = selected;
			this.totalPrice = 0;
		},
		
		onResetCart:function(){
			//清空购物车
			this.refillCart();
		},
		
		onModifyOrder:function(order){
			//修改订单；
			this.refillCart(order.item_list, order.comment, order.delivery_info);
		}
	},
	onLoad: function() {
		//这里需要加载两个列表的数据，商品以及商超的促销数据;
		Promise.all([home.readGoods(), home.readShopPromotion(), home.readShopInfo()]).then(results => {
			//商品数据
			var goods = results[0].data;
			//促销数据
			var promotion = results[1].data[0];
			this.shopNotice = promotion.notice;
			var cagyOrder = promotion.category_order;
			// { name: '精选' }, { name: '订阅' }
			for (var i = 0; i < cagyOrder.length; i++) {
				this.categoryOrder.push({ name: cagyOrder[i] });
			}
			//商城数据
			this.shopInfo = results[2].data[0];

			this.storeDecorate(goods, this.shopInfo.name);
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
		
		uni.$on('resetCart', this.onResetCart);
		uni.$on('modifyOrder', this.onModifyOrder);
	},
	onShow: function() {
		
	},
	onTabItemTap:function(e){
		
	},
	onHide:function(){
		//初始化tabindex 防止重复刷新
		this.curTabIndex = -1;
	},
	computed:{
		btnSaveEnabled:function(){
			var hasItem = this.basket.length > 0;
			var hasRealName = this.user.realname.length > 0;
			var hasMobile = this.user.mobile.length == 11;
			var hasAddress = this.user.address.length > 0;
			var hasComment = this.comment.length > 0;
			
			return (hasItem || hasComment) && hasRealName && hasMobile && hasAddress;
		}
	}
};
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
	color: #ffffff;
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
	background-color: #007aff;
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
	border-bottom-color: #f5f5f5;
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

.uni-flex-cell {
	-webkit-justify-content: space-between;
	justify-content: space-between;
}
</style>
