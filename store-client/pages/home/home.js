
let server = require('../../server/server.js');
// let dataBaseReq = server.LOCAL_HOST + ":" + server.PORT_LOCAL_DATA_BASE;


module.exports = {
	readGoods:()=>{
		// 第一种方法 Promise
		return new Promise((resolve, reject) => {
			uni.request({
				url: server.getReqURL() + "/goods",
				success: (res) => {
					resolve(res);
				},
				fail: (err) => {
					// reject(err);
					console.log("【Goods】请求数据失败" + err);
				}
			})
		})
	},
	readShopPromotion:()=>{
		return new Promise((resolve, reject)=>{
			uni.request({
				url: server.getReqURL() + "/shop_promotion",
				success: (res) => {
					resolve(res);
				},
				fail: (err) => {
					// reject(err);
					console.log("【ShopPromotion】请求数据失败");
				}
			})
		})
	},
	readShopInfo:()=>{
		return new Promise((resolve, reject)=>{
			uni.request({
				url: server.getReqURL() + "/shop_info",
				success: (res) => {
					resolve(res);
				},
				fail: (err) => {
					console.log("【ShopInfo】请求数据失败");
				}
			})
		})
	},
	
	saveOrder:(params, $callback)=>{
		uni.request({
			url: server.getReqURL() + "/order/save",
			method: "POST",
			header: {
			  "Content-Type": "application/json; charset=utf-8"
			},
			data: params,
			success: (res) => {
				$callback(res);
			},
			fail: (err) => {
				uni.showToast({
					title:"订单提交失败",
					icon:"none"
				})
			}
		})
	}
}