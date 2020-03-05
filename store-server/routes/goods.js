/**
 * @api {get} /test 接口测试
 * @apiDescription 根据ID（id）获取列表信息
 * @apiGroup test APIs
 *
 * @apiParam {Number} id 任务ID
 * @apiParam {Number} [page] 页数
 * @apiParam {Number} [perpage] 每页的条数
 *
 * @apiParamExample {string} 请求参数格式:
 *    ?id=123&page=1&perpage=20
 *
 * @apiVersion 1.0.0
 * @apiErrorExample {json} 错误返回值:
 *     {
 *        "code": 10003,
 *        "msg": "ParametersError [Method]:get_tests参数错误!",
 *        "error": {
 *            "id": "",
 *            "page": "",
 *            "perpage": ""
 *        },
 *       "status": "fail"
 *     }
 * @apiSuccessExample {json} 正确返回值:
 *     {
 *   "code": 0,
 *   "msg": "OK ",
 *   "data": [
 *       {
 *           "id": "622051004185471233",
 *           "testCode": "000050",
 *       }
 *   ],
 *   "status": "ok",
 *   "count": "14"
 *   }
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var goods = require("../models/good");

    goods.find({},function(err, doc){
      if(err) {
          console.log(err.message)
      }else{
		  res.send(doc);
      }
  });
});

module.exports = router;
