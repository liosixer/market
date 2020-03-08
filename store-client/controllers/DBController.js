
// 定义数据管理器
let dbManager = {
	equipItemMapByKey: function(list, key){ //按键装备数据
		var map = {};
		
		for (var i = 0; i < list.length; i++) {
			//  这里避免污染数据,采取拷贝的形式
			//  {...item} 也是一种方式
			let item = Object.assign({}, list[i]);
			// //不拷贝的情况下, 会污染原始数据
			// let item = list[i];
			if (key in item){
				map[key] = item;
			}
		}
		return map;
	},
	// 装配货品
	collectItemsWithCategory: function(list){
		let categoies = {};
		for (var i = 0; i < list.length; i++) {
			var item = Object.assign({}, list[i]);
			if (item.category in categoies){
				categoies[item.category].push(item);
			}else{
				categoies[item.category] = [item];
			}
		}
		return categoies;
	},
	// 按类品获取数据
	groupByCategory: function(list, $category){
		let categoies = {};
		for (let item in list) {
			if (item.category in categoies){
				categoies[item.category] = [item];
			}else{
				categoies[item.category].push(item);
			}
		}
		return categoies[$category];
	}
};

module.exports = dbManager