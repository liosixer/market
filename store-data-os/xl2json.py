# -*- coding: utf-8 -*-
import xlrd
import datetime
import json


# 打开文件
today = datetime.datetime.now().strftime('%Y_%m_%d')
workbook = xlrd.open_workbook(today + '.xlsx')

# 根据sheet索引或者名称获取sheet内容
sheet = workbook.sheet_by_index(0)

# sheet的名称，行数，列数
totalRow = sheet.nrows
totalCol = sheet.ncols

# 解析标签
titles = sheet.row_values(0)
# # 将要写入json文件的 以 json 为前缀
# json_title_list = []
# # 品类们
# json_categories = []
# 商品的键
item_keys = []
# # 品类顺序
# json_category_order = {}

for title in titles:
    titlePieces = str(title).split("/")
    # json_title_list.append({"name":titlePieces[1], "description":titlePieces[0]})
    item_keys.append(titlePieces[1])

# 这里移除第一个类别元素
item_keys = item_keys

# 解析itemlist 数据
json_item_list = []

rowScore = range(totalRow)[1:]
colScore = range(totalCol)

# 逐行扫描
for rowIndex in rowScore:
    # 这里开始装配数据
    item = {}
    for colIndex in colScore:
        # 获取键
        itemKey = item_keys[colIndex]
        # 装备值，  这里做一个强制转换
        value = sheet.cell_value(rowIndex, colIndex);
        if itemKey != "unit_price":
            item[itemKey] = value
        else:
            item[itemKey] = float(value)
    json_item_list.append(item)


# 数据已经拼接完毕
# 添加到json文件里面

# 定义一个变量
jsonContent = dict()
jsonContent = json_item_list
# 后面的参数是调整生成的json的格式，不加也行，就是丑点
jsondata = json.dumps(jsonContent, ensure_ascii=False, sort_keys=True, indent=4)

file = open('goods.json', 'w', encoding='utf-8')
file.write(jsondata)
file.close()