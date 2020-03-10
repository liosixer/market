const DATA_BASE_REMOTE = "http://59.110.166.21";
const LOCAL_HOST = "http://localhost";
const DATA_BASE_CURRENT = "http://192.168.1.107";

const REMOTE_RELEASE = "http://59.110.166.21";
const REMOTE_TEST = "http://59.110.166.21";

/** 
 *@description 数据库站点 端口号
 **/
const PORT_DATA_BASE = 42480;

/** 
 *@description 数据库站点 端口号
 **/
const PORT_DATA_BASE_TEST = 42481;
/** 
 *@description 正式站点 端口号
 **/
const PORT_RELEASE = 8080;
/** 
 *@description 测试站点 端口号
 **/
const PORT_TEST = 8081;

const PORT_LOCAL_DATA_BASE = 3000;


const PROXY = 10000;

function getReqURL(){
	return DATA_BASE_REMOTE + ":" + PORT_DATA_BASE
}

module.exports = {
	LOCAL_HOST,
	
	DATA_BASE_REMOTE,
	DATA_BASE_CURRENT,
	
	PORT_DATA_BASE,
	PORT_DATA_BASE_TEST,
	PORT_RELEASE,
	PORT_TEST,
	PORT_LOCAL_DATA_BASE,
	
	PROXY,
	
	getReqURL
}