let server = require('../../server/server.js');

//订单状态 0 创建 1待确认 2分拣中 3用户取消订单 4 商户取消订单 5配送中 6 订单完成
const STATUS_OBJECT = {1:"待商家确认", 2:"分拣中", 3:"用户取消订单", 4:"商户取消订单", 5:"配送中", 6:"订单完成"};
module.exports = {
	getRecentOrder:($mobile, $callback)=>{
		uni.request({
			url: server.getReqURL() + "/order/list/" + $mobile,
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
	},
	
	getOrderStatus:($status)=>{
		return STATUS_OBJECT[$status];
	},
	
	getContent:($comment, $itemList)=>{
		let content = "";
		if ($itemList.length > 0){
			for (var i = 0; i < $itemList.length; i++) {
				content += $itemList[i].name + " x" + $itemList[i].count + "; ";
			}
		}
		if ($comment.length > 0){
			content += "【备注】" + $comment;
		}
		return content;
	},
	
	orderCancel:($id, $callback)=>{
		uni.request({
			url: server.getReqURL() + "/order/cancel/" + $id,
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