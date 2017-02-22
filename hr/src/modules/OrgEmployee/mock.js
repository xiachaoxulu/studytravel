var successRes = {
  "result": 1,
  "success": true,
  "err_msg": "请求处理成功",
  "err_code": 8888
}

var dataTpl = {
  "result": 1,
  "success": true,
  "err_msg": "请求处理成功",
  "err_code": 8888
}

export default {

  // 是否开启本模块 mock
  inservice: true,

  // 品牌
  addBrand(args) {
    return dataTpl;
  },
  removeBrand(args) {
    return dataTpl;
  },
  editBrand(args) {
    return dataTpl;
  },
  getBrandByID(args) {
    dataTpl.result = { "ID": 1, "brandCode": "123", "brandName": "木屋烧烤", "companyID": 1, "createTime": 1464585974000, "valid": 1 };
    return dataTpl;
  },
  getBrand(args) {
    dataTpl.result = [{ "ID": 1, "brandCode": "123", "brandName": "木屋烧烤", "companyID": 1, "createTime": 1464585974000, "valid": 1 },
      { "ID": 2, "brandCode": "23", "brandName": "其他", "companyID": 1, "createTime": 1464585977000, "valid": 1 }
    ];
    return dataTpl;
  },

  // 区域
  addArea(args) {
    return dataTpl;
  },
  removeArea(args) {
    return dataTpl;
  },
  editArea(args) {
    return dataTpl;
  },
  getAreaByID(args) {
    dataTpl.result = { "ID": 1, "brandCode": "123", "brandName": "木屋烧烤", "companyID": 1, "createTime": 1464585974000, "valid": 1 };
    return dataTpl;
  },
  getArea(args) {
    dataTpl.result = [{ "ID": 1, "areaCode": "001000000", "areaName": "华北区", "companyID": 1, "createTime": 1462435285000, "des": "", "parentID": -1, "valid": 1 },
      { "ID": 2, "areaCode": "001001000", "areaName": "北京市场", "companyID": 1, "createTime": 1462435285000, "des": "", "parentID": 1, "valid": 1 },
      { "ID": 3, "areaCode": "001001001", "areaName": "一区", "companyID": 1, "createTime": 1462435285000, "des": "", "parentID": 2, "userID": 199, "userName": "雷云", "valid": 1 },
      { "ID": 4, "areaCode": "001001002", "areaName": "二区", "companyID": 1, "createTime": 1462435285000, "des": "", "parentID": 2, "valid": 1 },
      { "ID": 5, "areaCode": "001001003", "areaName": "三区", "companyID": 1, "createTime": 1462435285000, "des": "", "parentID": 2, "valid": 1 },
      { "ID": 6, "areaCode": "001001004", "areaName": "四区", "companyID": 1, "createTime": 1462435285000, "des": "", "parentID": 2, "valid": 1 },
      { "ID": 7, "areaCode": "001001005", "areaName": "天津一区", "companyID": 1, "createTime": 1462435285000, "des": "", "parentID": 2, "valid": 1 },
      { "ID": 8, "areaCode": "001001006", "areaName": "后勤", "companyID": 1, "createTime": 1462435285000, "des": "", "parentID": 2, "valid": 1 },
      { "ID": 9, "areaCode": "002000000", "areaName": "华南区", "companyID": 1, "createTime": 1462435285000, "des": "", "parentID": -1, "valid": 1 },
      { "ID": 10, "areaCode": "002001000", "areaName": "深圳市场", "companyID": 1, "createTime": 1462435285000, "des": "", "parentID": 9, "valid": 1 }
    ]
    return dataTpl;
  },

  getBrandAreaStoreTree(args) {
    dataTpl.result = {
      "allList": [{
        "ID": 1,
        "areaCode": "001000000",
        "areaName": "华北区",
        "brandID": 1,
        "companyID": 1,
        "createTime": 1462435285000,
        "des": "",
        "parentID": -1,
        "storeCount": 20,
        "valid": 1
      }, {
        "ID": 2,
        "areaCode": "001001000",
        "areaName": "北京市场",
        "brandID": 1,
        "companyID": 1,
        "createTime": 1462435285000,
        "des": "",
        "parentID": 1,
        "storeCount": 20,
        "valid": 1
      }, {
        "ID": 3,
        "areaCode": "001001001",
        "areaName": "一区",
        "brandID": 1,
        "companyID": 1,
        "createTime": 1462435285000,
        "des": "",
        "parentID": 2,
        "storeCount": 7,
        "userID": 199,
        "valid": 1
      }, {
        "ID": 4,
        "areaCode": "001001002",
        "areaName": "二区",
        "brandID": 1,
        "companyID": 1,
        "createTime": 1462435285000,
        "des": "",
        "parentID": 2,
        "storeCount": 3,
        "valid": 1
      }, {
        "ID": 5,
        "areaCode": "001001003",
        "areaName": "三区",
        "brandID": 1,
        "companyID": 1,
        "createTime": 1462435285000,
        "des": "",
        "parentID": 2,
        "storeCount": 4,
        "valid": 1
      }, {
        "ID": 6,
        "areaCode": "001001004",
        "areaName": "四区",
        "brandID": 1,
        "companyID": 1,
        "createTime": 1462435285000,
        "des": "",
        "parentID": 2,
        "storeCount": 3,
        "valid": 1
      }, {
        "ID": 7,
        "areaCode": "001001005",
        "areaName": "天津一区",
        "brandID": 1,
        "companyID": 1,
        "createTime": 1462435285000,
        "des": "",
        "parentID": 2,
        "storeCount": 2,
        "valid": 1
      }, {
        "ID": 1,
        "areaCode": "001000000",
        "areaName": "华北区",
        "brandID": 2,
        "companyID": 1,
        "createTime": 1462435285000,
        "des": "",
        "parentID": -1,
        "storeCount": 20,
        "valid": 1
      }, {
        "ID": 2,
        "areaCode": "001001000",
        "areaName": "北京市场",
        "brandID": 2,
        "companyID": 1,
        "createTime": 1462435285000,
        "des": "",
        "parentID": 1,
        "storeCount": 20,
        "valid": 1
      }, {
        "ID": 3,
        "areaCode": "001001001",
        "areaName": "一区",
        "brandID": 2,
        "companyID": 1,
        "createTime": 1462435285000,
        "des": "",
        "parentID": 2,
        "storeCount": 7,
        "userID": 199,
        "valid": 1
      }, {
        "ID": 4,
        "areaCode": "001001002",
        "areaName": "二区",
        "brandID": 2,
        "companyID": 1,
        "createTime": 1462435285000,
        "des": "",
        "parentID": 2,
        "storeCount": 3,
        "valid": 1
      }, {
        "ID": 7,
        "areaCode": "001001005",
        "areaName": "天津一区",
        "brandID": 2,
        "companyID": 1,
        "createTime": 1462435285000,
        "des": "",
        "parentID": 2,
        "storeCount": 2,
        "valid": 1
      }, {
        "ID": 8,
        "areaCode": "001001006",
        "areaName": "后勤",
        "brandID": 2,
        "companyID": 1,
        "createTime": 1462435285000,
        "des": "",
        "parentID": 2,
        "storeCount": 1,
        "valid": 1
      }],
      "brandList": [{
        "ID": 1,
        "brandCode": "123",
        "brandName": "木屋烧烤",
        "companyID": 1,
        "createTime": 1464585974000,
        "storeCount": 14,
        "valid": 1
      }, {
        "ID": 2,
        "brandCode": "23",
        "brandName": "其他",
        "companyID": 1,
        "createTime": 1464585977000,
        "storeCount": 6,
        "valid": 1
      }],
      "storeList": [{
        "ID": 73,
        "address": "北京市朝阳区金蝉西路甲一号",
        "area": "468.00",
        "areaID": 3,
        "brandID": 1,
        "businessEndTime": "",
        "businessStartTime": "",
        "cbdID": "",
        "city": "",
        "companyID": 1,
        "companyName": "木屋烧烤",
        "createTime": 1462437022000,
        "deptID": 102,
        "des": "010-67497577",
        "latitude": 1,
        "longitude": 1,
        "manageType": "",
        "openTime": "",
        "province": "",
        "storeCode": "",
        "storeName": "欢乐谷",
        "storeType": "",
        "valid": 1
      }, {
        "ID": 74,
        "address": "北京市石景山区石景山路2号北京台湾街C2-5-a",
        "area": "449.62",
        "areaID": 3,
        "brandID": 1,
        "businessEndTime": "",
        "businessStartTime": "",
        "cbdID": "",
        "city": "",
        "companyID": 1,
        "companyName": "木屋烧烤",
        "createTime": 1462437022000,
        "deptID": 102,
        "des": "010-68647507",
        "latitude": 1,
        "longitude": 1,
        "manageType": "",
        "openTime": "",
        "province": "",
        "storeCode": "",
        "storeName": "台湾街",
        "storeType": "",
        "valid": 1
      }, {
        "ID": 75,
        "address": "北京市朝阳区西坝河中里6号楼",
        "area": "460.00",
        "areaID": 5,
        "brandID": 1,
        "businessEndTime": "",
        "businessStartTime": "",
        "cbdID": "",
        "city": "",
        "companyID": 1,
        "companyName": "木屋烧烤",
        "createTime": 1462437022000,
        "deptID": 102,
        "des": "010-64636651",
        "latitude": 1,
        "longitude": 1,
        "manageType": "",
        "openTime": "",
        "province": "",
        "storeCode": "",
        "storeName": "国展店",
        "storeType": "",
        "valid": 1
      }, {
        "ID": 76,
        "address": "北京市朝阳区农光里206号一楼",
        "area": "480.00",
        "areaID": 3,
        "brandID": 1,
        "businessEndTime": "",
        "businessStartTime": "",
        "cbdID": "",
        "city": "",
        "companyID": 1,
        "companyName": "木屋烧烤",
        "createTime": 1462437022000,
        "deptID": 102,
        "des": "010-87376867",
        "latitude": 1,
        "longitude": 1,
        "manageType": "",
        "openTime": "",
        "province": "",
        "storeCode": "",
        "storeName": "武胜路",
        "storeType": "",
        "valid": 1
      }, {
        "ID": 77,
        "address": "北京市丰台区大成路超市发侧300",
        "area": "300.00",
        "areaID": 6,
        "brandID": 1,
        "businessEndTime": "",
        "businessStartTime": "",
        "cbdID": "",
        "city": "",
        "companyID": 1,
        "companyName": "木屋烧烤",
        "createTime": 1462437022000,
        "deptID": 102,
        "des": "010-68676061",
        "latitude": 1,
        "longitude": 1,
        "manageType": "",
        "openTime": "",
        "province": "",
        "storeCode": "",
        "storeName": "大成路",
        "storeType": "",
        "valid": 1
      }, {
        "ID": 78,
        "address": "北京市海淀区花园路甲2号院4号楼地上一层西南侧",
        "area": "220.00",
        "areaID": 4,
        "brandID": 1,
        "businessEndTime": "",
        "businessStartTime": "",
        "cbdID": "",
        "city": "",
        "companyID": 1,
        "companyName": "木屋烧烤",
        "createTime": 1462437022000,
        "deptID": 102,
        "des": "010-56232829",
        "latitude": 1,
        "longitude": 1,
        "manageType": "",
        "openTime": "",
        "province": "",
        "storeCode": "",
        "storeName": "牡丹园",
        "storeType": "",
        "valid": 1
      }, {
        "ID": 79,
        "address": "北京市朝阳区望京湖光北街9号望京广场一层北侧",
        "area": "408.00",
        "areaID": 5,
        "brandID": 1,
        "businessEndTime": "",
        "businessStartTime": "",
        "cbdID": "",
        "city": "",
        "companyID": 1,
        "companyName": "木屋烧烤",
        "createTime": 1462437022000,
        "deptID": 102,
        "des": "010-57199182",
        "latitude": 1,
        "longitude": 1,
        "manageType": "",
        "openTime": "",
        "province": "",
        "storeCode": "",
        "storeName": "望京店",
        "storeType": "",
        "valid": 1
      }, {
        "ID": 80,
        "address": "天津市和平区新兴路30号西侧红旗毛纺织厂院内红宏宇餐厅",
        "area": "400.00",
        "areaID": 7,
        "brandID": 2,
        "businessEndTime": "",
        "businessStartTime": "",
        "cbdID": "",
        "city": "",
        "companyID": 1,
        "companyName": "木屋烧烤",
        "createTime": 1462437022000,
        "deptID": 102,
        "des": "022-83131717",
        "latitude": 1,
        "longitude": 1,
        "manageType": "",
        "openTime": "",
        "province": "",
        "storeCode": "",
        "storeName": "海光寺",
        "storeType": "",
        "valid": 1
      }, {
        "ID": 81,
        "address": "北京市海淀区北土城西路105号1区块",
        "area": "180.00",
        "areaID": 4,
        "brandID": 2,
        "businessEndTime": "",
        "businessStartTime": "",
        "cbdID": "",
        "city": "",
        "companyID": 1,
        "companyName": "木屋烧烤",
        "createTime": 1462437022000,
        "deptID": 102,
        "des": "010-57425002",
        "latitude": 1,
        "longitude": 11,
        "manageType": "",
        "openTime": "",
        "province": "",
        "storeCode": "",
        "storeName": "健德门",
        "storeType": "",
        "valid": 1
      }, {
        "ID": 82,
        "address": "北京市朝阳区八里庄东里1号",
        "area": "308.00",
        "areaID": 3,
        "brandID": 2,
        "businessEndTime": "",
        "businessStartTime": "",
        "cbdID": "",
        "city": "",
        "companyID": 1,
        "companyName": "木屋烧烤",
        "createTime": 1462437022000,
        "deptID": 102,
        "des": "010-56135091",
        "latitude": 1,
        "longitude": 1,
        "manageType": "",
        "openTime": "",
        "province": "",
        "storeCode": "",
        "storeName": "朝阳路",
        "storeType": "",
        "valid": 1
      }, {
        "ID": 83,
        "address": "北京市丰台区蒲黄榆路28号方庄芳群园一区3#BC综合楼1-A5",
        "area": "214.50",
        "areaID": 3,
        "brandID": 1,
        "businessEndTime": "",
        "businessStartTime": "",
        "cbdID": "",
        "city": "",
        "companyID": 1,
        "companyName": "木屋烧烤",
        "createTime": 1462437022000,
        "deptID": 102,
        "des": "010-57147392",
        "latitude": 1,
        "longitude": 1,
        "manageType": "",
        "openTime": "",
        "province": "",
        "storeCode": "",
        "storeName": "方庄店",
        "storeType": "",
        "valid": 1
      }, {
        "ID": 84,
        "address": "北京市海淀区阜成路111号106",
        "area": "360.00",
        "areaID": 6,
        "brandID": 1,
        "businessEndTime": "",
        "businessStartTime": "",
        "cbdID": "",
        "city": "",
        "companyID": 1,
        "companyName": "木屋烧烤",
        "createTime": 1462437022000,
        "deptID": 102,
        "des": "010-58487761",
        "latitude": 1,
        "longitude": 1,
        "manageType": "",
        "openTime": "",
        "province": "",
        "storeCode": "",
        "storeName": "阜成路",
        "storeType": "",
        "valid": 1
      }, {
        "ID": 85,
        "address": "北京市朝阳区朝阳公园路1号1-4",
        "area": "340.00",
        "areaID": 5,
        "brandID": 1,
        "businessEndTime": "",
        "businessStartTime": "",
        "cbdID": "",
        "city": "",
        "companyID": 1,
        "companyName": "木屋烧烤",
        "createTime": 1462437022000,
        "deptID": 102,
        "des": "010-58487759",
        "latitude": 1,
        "longitude": 1,
        "manageType": "",
        "openTime": "",
        "province": "",
        "storeCode": "",
        "storeName": "好运街",
        "storeType": "",
        "valid": 1
      }, {
        "ID": 86,
        "address": "北京市石景山区阜成路300号之喜隆多新国际购物中心一层143号",
        "area": "357.00",
        "areaID": 6,
        "brandID": 1,
        "businessEndTime": "",
        "businessStartTime": "",
        "cbdID": "",
        "city": "",
        "companyID": 1,
        "companyName": "木屋烧烤",
        "createTime": 1462437022000,
        "deptID": 102,
        "des": "010-58487602",
        "latitude": 1,
        "longitude": 1,
        "manageType": "",
        "openTime": "",
        "province": "",
        "storeCode": "",
        "storeName": "苹果园",
        "storeType": "",
        "valid": 1
      }, {
        "ID": 87,
        "address": "天津市河西区大沽南路531号",
        "area": "346.00",
        "areaID": 7,
        "brandID": 1,
        "businessEndTime": "",
        "businessStartTime": "",
        "cbdID": "",
        "city": "",
        "companyID": 1,
        "companyName": "木屋烧烤",
        "createTime": 1462437022000,
        "deptID": 102,
        "des": "022-83451717",
        "latitude": 1,
        "longitude": 1,
        "manageType": "",
        "openTime": "",
        "province": "",
        "storeCode": "",
        "storeName": "大沽南路",
        "storeType": "",
        "valid": 1
      }, {
        "ID": 88,
        "address": "上海市共和新路4985号1层至3层",
        "area": "273.00",
        "areaID": 3,
        "brandID": 2,
        "businessEndTime": "",
        "businessStartTime": "",
        "cbdID": "",
        "city": "",
        "companyID": 1,
        "companyName": "木屋烧烤",
        "createTime": 1462437022000,
        "deptID": 102,
        "des": "021-60643499",
        "latitude": 1,
        "longitude": 1,
        "manageType": "",
        "openTime": "",
        "province": "",
        "storeCode": "",
        "storeName": "万达店",
        "storeType": "",
        "valid": 1
      }, {
        "ID": 89,
        "address": "北京市燕郊加工中心",
        "area": "0.00",
        "areaID": 8,
        "brandID": 2,
        "businessEndTime": "",
        "businessStartTime": "",
        "cbdID": "",
        "city": "",
        "companyID": 1,
        "companyName": "木屋烧烤",
        "createTime": 1462437022000,
        "deptID": 102,
        "des": "",
        "latitude": 1,
        "longitude": 1,
        "manageType": "",
        "openTime": "",
        "province": "",
        "storeCode": "",
        "storeName": "物资部",
        "storeType": "",
        "valid": 1
      }, {
        "ID": 90,
        "address": "",
        "area": "0.00",
        "areaID": 4,
        "brandID": 2,
        "businessEndTime": "",
        "businessStartTime": "",
        "cbdID": "",
        "city": "",
        "companyID": 1,
        "companyName": "木屋烧烤",
        "createTime": 1462437022000,
        "deptID": 102,
        "des": "",
        "latitude": 1,
        "longitude": 1,
        "manageType": "",
        "openTime": "",
        "province": "",
        "storeCode": "",
        "storeName": "双榆树",
        "storeType": "",
        "valid": 1
      }, {
        "ID": 91,
        "address": "",
        "area": "0.00",
        "areaID": 3,
        "brandID": 1,
        "businessEndTime": "",
        "businessStartTime": "",
        "cbdID": "",
        "city": "",
        "companyID": 1,
        "companyName": "木屋烧烤",
        "createTime": 1462437022000,
        "deptID": 102,
        "des": "",
        "latitude": 1,
        "longitude": 1,
        "manageType": "",
        "openTime": "",
        "province": "",
        "storeCode": "",
        "storeName": "四道口",
        "storeType": "",
        "valid": 1
      }, {
        "ID": 92,
        "address": "",
        "area": "0.00",
        "areaID": 5,
        "brandID": 1,
        "businessEndTime": "",
        "businessStartTime": "",
        "cbdID": "",
        "city": "",
        "companyID": 1,
        "companyName": "木屋烧烤",
        "createTime": 1462437022000,
        "deptID": 102,
        "des": "",
        "latitude": 1,
        "longitude": 1,
        "manageType": "",
        "openTime": "",
        "province": "",
        "storeCode": "",
        "storeName": "和平里店",
        "storeType": "",
        "valid": 1
      }]
    };
    return dataTpl;
  },

  getCompanyDeptStoreTree(args) {
    dataTpl.result = { "storeList": [{ "ID": 1, "acreage": 12, "address": "11", "areaID": 2, "brandID": 1, "businessEndTime": "23:00", "businessStartTime": "09:00", "cbdID": "108002", "companyID": 1, "companyName": "木屋烧烤", "createTime": 1466563077000, "deptID": 4, "leadingID": 5, "manageType": "106002", "organizeID": 7, "organizeType": "store", "storeCode": "bj01", "storeName": "北京一店", "storeType": "107001", "valid": 1 }, { "ID": 2, "acreage": 320, "areaID": 3, "brandID": 1, "businessEndTime": "12:00", "cbdID": "108001", "companyID": 1, "companyName": "木屋烧烤", "createTime": 1466564505000, "deptID": 8, "manageType": "106002", "organizeID": 10, "organizeType": "store", "storeCode": "tj001", "storeName": "天津一店", "storeType": "107001", "valid": 1 }, { "ID": 3, "acreage": 32, "areaID": 2, "brandID": 1, "businessEndTime": "11:30", "businessStartTime": "00:00", "cbdID": "108001", "companyID": 1, "companyName": "木屋烧烤", "createTime": 1466564923000, "deptID": 4, "manageType": "106001", "organizeID": 11, "organizeType": "store", "storeCode": "bj002", "storeName": "北京二店", "storeType": "107001", "valid": 1 }, { "ID": 4, "acreage": 240, "areaID": 2, "brandID": 1, "businessEndTime": "17:00", "businessStartTime": "09:00", "cbdID": "108003", "companyID": 1, "companyName": "木屋烧烤", "createTime": 1466673264000, "deptID": 4, "leadingID": 1, "manageType": "106001", "organizeID": 15, "organizeType": "store", "storeCode": "BCGWZX", "storeName": "北辰购物中心店", "storeType": "107001", "valid": 1 }], "departList": [{ "ID": 1, "companyID": 1, "createTime": 1466562098000, "departmentName": "总公司1", "organizeID": 1, "parentID": -1, "valid": 1 }, { "ID": 2, "companyID": 1, "createTime": 1466562664000, "departmentName": "北京分公司", "organizeID": 2, "parentID": 1, "valid": 1 }, { "ID": 3, "companyID": 1, "createTime": 1466562670000, "departmentName": "财务部", "organizeID": 3, "parentID": 1, "valid": 1 }, { "ID": 4, "companyID": 1, "createTime": 1466562678000, "departmentName": "北京运营部", "organizeID": 4, "parentID": 2, "valid": 1 }, { "ID": 7, "companyID": 1, "createTime": 1466564335000, "departmentName": "天津分公司", "organizeID": 8, "parentID": 1, "valid": 1 }, { "ID": 8, "companyID": 1, "createTime": 1466564348000, "departmentName": "天津运营部", "organizeID": 9, "parentID": 7, "valid": 1 }, { "ID": 10, "companyID": 1, "createTime": 1466649647000, "departmentName": "一部", "leadingID": 3, "organizeID": 13, "parentID": 8, "valid": 1 }, { "ID": 11, "companyID": 1, "createTime": 1466649669000, "departmentName": "二部", "leadingID": 2, "organizeID": 14, "parentID": 8, "valid": 1 }, { "ID": 12, "companyID": 1, "createTime": 1467020271000, "departmentName": "三部", "leadingID": 5, "organizeID": 26, "parentID": 8, "valid": 1 }], "teamList": [{ "ID": 1, "companyID": 1, "createTime": 1466674116000, "deptID": 4, "organizeID": 16, "storeID": 1, "teamCode": "BJ001", "teamName": "服务员组", "valid": 1 }, { "ID": 2, "companyID": 1, "createTime": 1466674237000, "deptID": 4, "organizeID": 17, "storeID": 1, "teamCode": "BJ002", "teamName": "迎宾组", "valid": 1 }, { "ID": 3, "companyID": 1, "createTime": 1466674362000, "deptID": 4, "organizeID": 18, "storeID": 1, "teamCode": "BJ003", "teamName": "后厨组", "valid": 1 }, { "ID": 4, "companyID": 1, "createTime": 1466675775000, "deptID": 4, "organizeID": 19, "storeID": 3, "teamCode": "BJ2001", "teamName": "服务员组", "valid": 1 }, { "ID": 5, "companyID": 1, "createTime": 1466675831000, "deptID": 4, "organizeID": 20, "storeID": 3, "teamCode": "BJ2001", "teamName": "迎宾组", "valid": 1 }, { "ID": 6, "companyID": 1, "createTime": 1466676053000, "deptID": 4, "organizeID": 21, "storeID": 3, "teamCode": "BJ2003", "teamName": "后厨组", "valid": 1 }, { "ID": 7, "companyID": 1, "createTime": 1466676074000, "deptID": 4, "organizeID": 22, "storeID": 4, "teamCode": "BJBC01", "teamName": "服务员组", "valid": 1 }, { "ID": 8, "companyID": 1, "createTime": 1466676117000, "deptID": 4, "organizeID": 23, "storeID": 4, "teamCode": "BJBC002", "teamName": "迎宾组", "valid": 1 }], "companyName": "木屋烧烤" }
    return dataTpl;
  },

  // 模拟数据，可通过arg参数动态返回数据
  getDeptTree(arg) {
    dataTpl.result = [
      { "ID": 1, "companyID": 1, "createTime": 1462431874000, "departmentName": "木屋人事", "des": "木屋人事", "organizeID": 362, "organizeType": "dept", "parentID": -1, "valid": 1 },
      { "ID": 2, "companyID": 1, "createTime": 1462431965000, "departmentName": "北京分公司", "des": "北京分公司", "organizeID": 363, "organizeType": "dept", "parentID": 1, "valid": 1 },
      { "ID": 3, "companyID": 1, "createTime": 1462431978000, "departmentName": "北京物资部", "des": "北京物资部", "organizeID": 364, "organizeType": "dept", "parentID": 1, "valid": 1 },
      { "ID": 4, "companyID": 1, "createTime": 1462431995000, "departmentName": "深圳物资部", "des": "深圳物资部", "organizeID": 365, "organizeType": "dept", "parentID": 1, "valid": 1 },
      { "ID": 5, "companyID": 1, "createTime": 1462432007000, "departmentName": "深圳公司", "des": "深圳公司", "organizeID": 366, "organizeType": "dept", "parentID": 1, "valid": 1 },
      { "ID": 92, "companyID": 1, "createTime": 1453876007000, "departmentName": "总经理", "des": "总经理", "organizeID": 367, "organizeType": "dept", "parentID": 2, "valid": 1 },
      { "ID": 93, "companyID": 1, "createTime": 1453876007000, "departmentName": "财务部", "des": "财务部", "organizeID": 368, "organizeType": "dept", "parentID": 2, "valid": 11 },
      { "ID": 94, "companyID": 1, "createTime": 1453876007000, "departmentName": "培训中心", "des": "培训中心", "organizeID": 369, "organizeType": "dept", "parentID": 2, "valid": 11 },
      { "ID": 95, "companyID": 1, "createTime": 1453876007000, "departmentName": "人资部", "des": "人资部", "organizeID": 370, "organizeType": "dept", "parentID": 2, "valid": 11 },
      { "ID": 96, "companyID": 1, "createTime": 1453876007000, "departmentName": "运营支持中心", "des": "运营支持中心", "organizeID": 371, "organizeType": "dept", "parentID": 2, "valid": 11 },
      { "ID": 97, "companyID": 1, "createTime": 1453876007000, "departmentName": "维安部", "des": "维安部", "organizeID": 372, "organizeType": "dept", "parentID": 2, "valid": 11 },
      { "ID": 98, "companyID": 1, "createTime": 1453876007000, "departmentName": "市场部", "des": "市场部", "organizeID": 373, "organizeType": "dept", "parentID": 2, "valid": 11 },
      { "ID": 99, "companyID": 1, "createTime": 1453876007000, "departmentName": "上海事业部", "des": "上海事业部", "organizeID": 374, "organizeType": "dept", "parentID": 2, "valid": 11 },
      { "ID": 100, "companyID": 1, "createTime": 1453876007000, "departmentName": "品管部", "des": "品管部", "organizeID": 375, "organizeType": "dept", "parentID": 2, "valid": 11 },
      { "ID": 101, "companyID": 1, "createTime": 1453876007000, "departmentName": "总经办", "des": "总经办", "organizeID": 376, "organizeType": "dept", "parentID": 2, "valid": 11 },
      { "ID": 102, "companyID": 1, "createTime": 1453876007000, "departmentName": "运营部", "des": "运营部", "organizeID": 377, "organizeType": "dept", "parentID": 2, "valid": 11 },
      { "ID": 103, "companyID": 1, "createTime": 1459566799000, "departmentName": "计划组", "des": "计划组", "organizeID": 378, "organizeType": "dept", "parentID": 3, "valid": 12 },
      { "ID": 104, "companyID": 1, "createTime": 1459566799000, "departmentName": "采购部", "des": "采购部", "organizeID": 379, "organizeType": "dept", "parentID": 3, "valid": 12 },
      { "ID": 105, "companyID": 1, "createTime": 1459566799000, "departmentName": "生产部", "des": "生产部", "organizeID": 380, "organizeType": "dept", "parentID": 3, "valid": 12 },
      { "ID": 106, "companyID": 1, "createTime": 1459566799000, "departmentName": "品控部", "des": "品控部", "organizeID": 381, "organizeType": "dept", "parentID": 3, "valid": 12 },
      { "ID": 107, "companyID": 1, "createTime": 1459566799000, "departmentName": "储运部", "des": "储运部", "organizeID": 382, "organizeType": "dept", "parentID": 3, "valid": 12 },
      { "ID": 108, "companyID": 1, "createTime": 1459566799000, "departmentName": "人事行政组", "des": "人事行政组", "organizeID": 383, "organizeType": "dept", "parentID": 3, "valid": 12 },
      { "ID": 109, "companyID": 1, "createTime": 1459566799000, "departmentName": "财务部", "des": "财务部", "organizeID": 384, "organizeType": "dept", "parentID": 3, "valid": 12 },
      { "ID": 110, "companyID": 1, "createTime": 1459566799000, "departmentName": "网销分公司", "des": "网销分公司", "organizeID": 385, "organizeType": "dept", "parentID": 3, "valid": 12 },
      { "ID": 111, "companyID": 1, "createTime": 1459242664000, "departmentName": "储运部", "des": "储运部", "organizeID": 386, "organizeType": "dept", "parentID": 4, "valid": 13 },
      { "ID": 112, "companyID": 1, "createTime": 1459242664000, "departmentName": "生产部", "des": "生产部", "organizeID": 387, "organizeType": "dept", "parentID": 4, "valid": 13 },
      { "ID": 113, "companyID": 1, "createTime": 1459242664000, "departmentName": "计划组", "des": "计划组", "organizeID": 388, "organizeType": "dept", "parentID": 4, "valid": 13 },
      { "ID": 114, "companyID": 1, "createTime": 1459242664000, "departmentName": "采购部", "des": "采购部", "organizeID": 389, "organizeType": "dept", "parentID": 4, "valid": 13 },
      { "ID": 115, "companyID": 1, "createTime": 1459242664000, "departmentName": "后勤", "des": "后勤", "organizeID": 390, "organizeType": "dept", "parentID": 4, "valid": 13 },
      { "ID": 116, "companyID": 1, "createTime": 1459242664000, "departmentName": "人事行政组", "des": "人事行政组", "organizeID": 391, "organizeType": "dept", "parentID": 4, "valid": 13 },
      { "ID": 117, "companyID": 1, "createTime": 1459242664000, "departmentName": "财务部", "des": "财务部", "organizeID": 392, "organizeType": "dept", "parentID": 4, "valid": 13 },
      { "ID": 118, "companyID": 1, "createTime": 1459242664000, "departmentName": "承包", "des": "承包", "organizeID": 393, "organizeType": "dept", "parentID": 4, "valid": 13 },
      { "ID": 119, "companyID": 1, "createTime": 1459242664000, "departmentName": "品控部", "des": "品控部", "organizeID": 394, "organizeType": "dept", "parentID": 4, "valid": 13 },
      { "ID": 120, "companyID": 1, "createTime": 1459242664000, "departmentName": "总监", "des": "总监", "organizeID": 395, "organizeType": "dept", "parentID": 4, "valid": 13 },
      { "ID": 121, "companyID": 1, "createTime": 1459242664000, "departmentName": "司机", "des": "司机", "organizeID": 396, "organizeType": "dept", "parentID": 4, "valid": 13 }
    ];
    return dataTpl;
  },
  // 获取岗位树
  getPostTree(args) {
    dataTpl.result = [{
      "ID": 149,
      "authorized": 5,
      "companyID": 1,
      "createTime": 1465886344000,
      "maxlevel": 10,
      "maxlevelName": "1",
      "minlevel": 10,
      "minlevelName": "1",
      "organizeID": 386,
      "organizeName": "储运部",
      "parentID": -1,
      "positionID": 70,
      "postCode": "001",
      "postName": "名称1",
      "postType": 3,
      "postTypeName": "高层",
      "valid": 1
    }, {
      "ID": 150,
      "authorized": 3,
      "companyID": 1,
      "createTime": 1465886395000,
      "maxlevel": 6,
      "maxlevelName": "服务员高级",
      "minlevel": 6,
      "minlevelName": "服务员高级",
      "organizeID": 386,
      "organizeName": "储运部",
      "parentID": 149,
      "positionID": 70,
      "postCode": "002",
      "postName": "名称2",
      "postType": 4,
      "postTypeName": "中层",
      "uppostName": "名称1",
      "valid": 1
    }];
    return dataTpl;
  },

  // 获取员工列表
  getEmployeeListByPost(args) {
    dataTpl.result = [{
      postID: 1,
      postName: '管理组',
      employeeList: [{
        photo: null,
        name: ''
      }, {}, {}]
    }];
  },

  // 部门
  addDept(args) {
    return dataTpl;
  },
  removeDept(args) {
    return dataTpl;
  },
  editDept(args) {
    return dataTpl;
  },
  getDeptByID(args) {
    dataTpl.result = {
      "ID": 100,
      "companyID": 1,
      "createTime": 1453876007000,
      "departmentName": "品管部",
      "des": "品管部",
      "organizeID": 375,
      "organizeType": "dept",
      "parentID": 2,
      "valid": 11
    };
    return dataTpl;
  },

  // 门店
  addStore(args) {
    return dataTpl;
  },
  removeStoreList(args) {
    return dataTpl;
  },
  editStore(args) {
    return dataTpl;
  },
  getStoreByID(args) {
    dataTpl.result = {
      "ID": 73,
      "address": "北京市朝阳区金蝉西路甲一号",
      "area": "468.00",
      "areaCode": "001001001",
      "areaID": 3,
      "areaName": "一区",
      "brandCode": "123",
      "brandID": 1,
      "brandName": "木屋烧烤",
      "businessEndTime": "",
      "businessStartTime": "",
      "cbdID": "",
      "city": "",
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462437022000,
      "deptID": 102,
      "deptName": "运营部",
      "des": "010-67497577",
      "latitude": 1,
      "longitude": 1,
      "manageType": "",
      "openTime": "",
      "organizeID": 398,
      "province": "",
      "storeCode": "",
      "storeName": "欢乐谷",
      "storeType": "",
      "valid": 1
    };
    return dataTpl;
  },
  getStore(args) {
    dataTpl.result = [{
      "ID": 73,
      "address": "北京市朝阳区金蝉西路甲一号",
      "area": "468.00",
      "areaID": 3,
      "brandID": 1,
      "businessEndTime": "",
      "businessStartTime": "",
      "cbdID": "",
      "city": "",
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462437022000,
      "deptID": 102,
      "des": "010-67497577",
      "latitude": 1,
      "longitude": 1,
      "manageType": "",
      "openTime": "",
      "organizeID": 398,
      "organizeType": "store",
      "province": "",
      "storeCode": "",
      "storeName": "欢乐谷",
      "storeType": "",
      "valid": 1
    }, {
      "ID": 74,
      "address": "北京市石景山区石景山路2号北京台湾街C2-5-a",
      "area": "449.62",
      "areaID": 3,
      "brandID": 1,
      "businessEndTime": "",
      "businessStartTime": "",
      "cbdID": "",
      "city": "",
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462437022000,
      "deptID": 102,
      "des": "010-68647507",
      "latitude": 1,
      "longitude": 1,
      "manageType": "",
      "openTime": "",
      "organizeID": 399,
      "organizeType": "store",
      "province": "",
      "storeCode": "",
      "storeName": "台湾街",
      "storeType": "",
      "valid": 1
    }, {
      "ID": 75,
      "address": "北京市朝阳区西坝河中里6号楼",
      "area": "460.00",
      "areaID": 5,
      "brandID": 1,
      "businessEndTime": "",
      "businessStartTime": "",
      "cbdID": "",
      "city": "",
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462437022000,
      "deptID": 102,
      "des": "010-64636651",
      "latitude": 1,
      "longitude": 1,
      "manageType": "",
      "openTime": "",
      "organizeID": 400,
      "organizeType": "store",
      "province": "",
      "storeCode": "",
      "storeName": "国展店",
      "storeType": "",
      "valid": 1
    }, {
      "ID": 76,
      "address": "北京市朝阳区农光里206号一楼",
      "area": "480.00",
      "areaID": 3,
      "brandID": 1,
      "businessEndTime": "",
      "businessStartTime": "",
      "cbdID": "",
      "city": "",
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462437022000,
      "deptID": 102,
      "des": "010-87376867",
      "latitude": 1,
      "longitude": 1,
      "manageType": "",
      "openTime": "",
      "organizeID": 401,
      "organizeType": "store",
      "province": "",
      "storeCode": "",
      "storeName": "武胜路",
      "storeType": "",
      "valid": 1
    }, {
      "ID": 77,
      "address": "北京市丰台区大成路超市发侧300",
      "area": "300.00",
      "areaID": 6,
      "brandID": 1,
      "businessEndTime": "",
      "businessStartTime": "",
      "cbdID": "",
      "city": "",
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462437022000,
      "deptID": 102,
      "des": "010-68676061",
      "latitude": 1,
      "longitude": 1,
      "manageType": "",
      "openTime": "",
      "organizeID": 402,
      "organizeType": "store",
      "province": "",
      "storeCode": "",
      "storeName": "大成路",
      "storeType": "",
      "valid": 1
    }, {
      "ID": 78,
      "address": "北京市海淀区花园路甲2号院4号楼地上一层西南侧",
      "area": "220.00",
      "areaID": 4,
      "brandID": 1,
      "businessEndTime": "",
      "businessStartTime": "",
      "cbdID": "",
      "city": "",
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462437022000,
      "deptID": 102,
      "des": "010-56232829",
      "latitude": 1,
      "longitude": 1,
      "manageType": "",
      "openTime": "",
      "organizeID": 403,
      "organizeType": "store",
      "province": "",
      "storeCode": "",
      "storeName": "牡丹园",
      "storeType": "",
      "valid": 1
    }, {
      "ID": 79,
      "address": "北京市朝阳区望京湖光北街9号望京广场一层北侧",
      "area": "408.00",
      "areaID": 5,
      "brandID": 1,
      "businessEndTime": "",
      "businessStartTime": "",
      "cbdID": "",
      "city": "",
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462437022000,
      "deptID": 102,
      "des": "010-57199182",
      "latitude": 1,
      "longitude": 1,
      "manageType": "",
      "openTime": "",
      "organizeID": 404,
      "organizeType": "store",
      "province": "",
      "storeCode": "",
      "storeName": "望京店",
      "storeType": "",
      "valid": 1
    }, {
      "ID": 80,
      "address": "天津市和平区新兴路30号西侧红旗毛纺织厂院内红宏宇餐厅",
      "area": "400.00",
      "areaID": 7,
      "brandID": 2,
      "businessEndTime": "",
      "businessStartTime": "",
      "cbdID": "",
      "city": "",
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462437022000,
      "deptID": 102,
      "des": "022-83131717",
      "latitude": 1,
      "longitude": 1,
      "manageType": "",
      "openTime": "",
      "organizeID": 405,
      "organizeType": "store",
      "province": "",
      "storeCode": "",
      "storeName": "海光寺",
      "storeType": "",
      "valid": 1
    }, {
      "ID": 81,
      "address": "北京市海淀区北土城西路105号1区块",
      "area": "180.00",
      "areaID": 4,
      "brandID": 2,
      "businessEndTime": "",
      "businessStartTime": "",
      "cbdID": "",
      "city": "",
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462437022000,
      "deptID": 102,
      "des": "010-57425002",
      "latitude": 1,
      "longitude": 11,
      "manageType": "",
      "openTime": "",
      "organizeID": 406,
      "organizeType": "store",
      "province": "",
      "storeCode": "",
      "storeName": "健德门",
      "storeType": "",
      "valid": 1
    }, {
      "ID": 82,
      "address": "北京市朝阳区八里庄东里1号",
      "area": "308.00",
      "areaID": 3,
      "brandID": 2,
      "businessEndTime": "",
      "businessStartTime": "",
      "cbdID": "",
      "city": "",
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462437022000,
      "deptID": 102,
      "des": "010-56135091",
      "latitude": 1,
      "longitude": 1,
      "manageType": "",
      "openTime": "",
      "organizeID": 407,
      "organizeType": "store",
      "province": "",
      "storeCode": "",
      "storeName": "朝阳路",
      "storeType": "",
      "valid": 1
    }, {
      "ID": 83,
      "address": "北京市丰台区蒲黄榆路28号方庄芳群园一区3#BC综合楼1-A5",
      "area": "214.50",
      "areaID": 3,
      "brandID": 1,
      "businessEndTime": "",
      "businessStartTime": "",
      "cbdID": "",
      "city": "",
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462437022000,
      "deptID": 102,
      "des": "010-57147392",
      "latitude": 1,
      "longitude": 1,
      "manageType": "",
      "openTime": "",
      "organizeID": 408,
      "organizeType": "store",
      "province": "",
      "storeCode": "",
      "storeName": "方庄店",
      "storeType": "",
      "valid": 1
    }, {
      "ID": 84,
      "address": "北京市海淀区阜成路111号106",
      "area": "360.00",
      "areaID": 6,
      "brandID": 1,
      "businessEndTime": "",
      "businessStartTime": "",
      "cbdID": "",
      "city": "",
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462437022000,
      "deptID": 102,
      "des": "010-58487761",
      "latitude": 1,
      "longitude": 1,
      "manageType": "",
      "openTime": "",
      "organizeID": 409,
      "organizeType": "store",
      "province": "",
      "storeCode": "",
      "storeName": "阜成路",
      "storeType": "",
      "valid": 1
    }, {
      "ID": 85,
      "address": "北京市朝阳区朝阳公园路1号1-4",
      "area": "340.00",
      "areaID": 5,
      "brandID": 1,
      "businessEndTime": "",
      "businessStartTime": "",
      "cbdID": "",
      "city": "",
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462437022000,
      "deptID": 102,
      "des": "010-58487759",
      "latitude": 1,
      "longitude": 1,
      "manageType": "",
      "openTime": "",
      "organizeID": 410,
      "organizeType": "store",
      "province": "",
      "storeCode": "",
      "storeName": "好运街",
      "storeType": "",
      "valid": 1
    }, {
      "ID": 86,
      "address": "北京市石景山区阜成路300号之喜隆多新国际购物中心一层143号",
      "area": "357.00",
      "areaID": 6,
      "brandID": 1,
      "businessEndTime": "",
      "businessStartTime": "",
      "cbdID": "",
      "city": "",
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462437022000,
      "deptID": 102,
      "des": "010-58487602",
      "latitude": 1,
      "longitude": 1,
      "manageType": "",
      "openTime": "",
      "organizeID": 411,
      "organizeType": "store",
      "province": "",
      "storeCode": "",
      "storeName": "苹果园",
      "storeType": "",
      "valid": 1
    }, {
      "ID": 87,
      "address": "天津市河西区大沽南路531号",
      "area": "346.00",
      "areaID": 7,
      "brandID": 1,
      "businessEndTime": "",
      "businessStartTime": "",
      "cbdID": "",
      "city": "",
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462437022000,
      "deptID": 102,
      "des": "022-83451717",
      "latitude": 1,
      "longitude": 1,
      "manageType": "",
      "openTime": "",
      "organizeID": 412,
      "organizeType": "store",
      "province": "",
      "storeCode": "",
      "storeName": "大沽南路",
      "storeType": "",
      "valid": 1
    }, {
      "ID": 88,
      "address": "上海市共和新路4985号1层至3层",
      "area": "273.00",
      "areaID": 3,
      "brandID": 2,
      "businessEndTime": "",
      "businessStartTime": "",
      "cbdID": "",
      "city": "",
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462437022000,
      "deptID": 102,
      "des": "021-60643499",
      "latitude": 1,
      "longitude": 1,
      "manageType": "",
      "openTime": "",
      "organizeID": 413,
      "organizeType": "store",
      "province": "",
      "storeCode": "",
      "storeName": "万达店",
      "storeType": "",
      "valid": 1
    }, {
      "ID": 89,
      "address": "北京市燕郊加工中心",
      "area": "0.00",
      "areaID": 8,
      "brandID": 2,
      "businessEndTime": "",
      "businessStartTime": "",
      "cbdID": "",
      "city": "",
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462437022000,
      "deptID": 102,
      "des": "",
      "latitude": 1,
      "longitude": 1,
      "manageType": "",
      "openTime": "",
      "organizeID": 414,
      "organizeType": "store",
      "province": "",
      "storeCode": "",
      "storeName": "物资部",
      "storeType": "",
      "valid": 1
    }, {
      "ID": 90,
      "address": "",
      "area": "0.00",
      "areaID": 4,
      "brandID": 2,
      "businessEndTime": "",
      "businessStartTime": "",
      "cbdID": "",
      "city": "",
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462437022000,
      "deptID": 102,
      "des": "",
      "latitude": 1,
      "longitude": 1,
      "manageType": "",
      "openTime": "",
      "organizeID": 415,
      "organizeType": "store",
      "province": "",
      "storeCode": "",
      "storeName": "双榆树",
      "storeType": "",
      "valid": 1
    }, {
      "ID": 91,
      "address": "",
      "area": "0.00",
      "areaID": 3,
      "brandID": 1,
      "businessEndTime": "",
      "businessStartTime": "",
      "cbdID": "",
      "city": "",
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462437022000,
      "deptID": 102,
      "des": "",
      "latitude": 1,
      "longitude": 1,
      "manageType": "",
      "openTime": "",
      "organizeID": 416,
      "organizeType": "store",
      "province": "",
      "storeCode": "",
      "storeName": "四道口",
      "storeType": "",
      "valid": 1
    }, {
      "ID": 92,
      "address": "",
      "area": "0.00",
      "areaID": 5,
      "brandID": 1,
      "businessEndTime": "",
      "businessStartTime": "",
      "cbdID": "",
      "city": "",
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462437022000,
      "deptID": 102,
      "des": "",
      "latitude": 1,
      "longitude": 1,
      "manageType": "",
      "openTime": "",
      "organizeID": 417,
      "organizeType": "store",
      "province": "",
      "storeCode": "",
      "storeName": "和平里店",
      "storeType": "",
      "valid": 1
    }];
    return dataTpl;
  },

  // 门店小组
  addStoreTeam() {
    return dataTpl;
  },
  removeStoreTeamList() {
    return dataTpl;
  },
  editStoreTeam() {
    return dataTpl;
  },
  getStoreTeamByID() {
    return dataTpl;
  },

  // 获取岗位分类树
  getPostTypeTree(args) {
    dataTpl.result = [{
      "ID": 1,
      "companyID": 1,
      "createTime": 1465282927000,
      "parentID": -1,
      "postType": "管理类",
      "valid": 1
    }, {
      "ID": 2,
      "companyID": 1,
      "createTime": 1465282863000,
      "parentID": 1,
      "postType": "总部",
      "valid": 1
    }, {
      "ID": 3,
      "companyID": 1,
      "createTime": 1465282898000,
      "parentID": 2,
      "postType": "高层",
      "valid": 1
    }];
    return dataTpl;
  },

  getPostTypeByID(args) {
    dataTpl.result = {
      "ID": 2,
      "companyID": 1,
      "createTime": 1465282863000,
      "parentID": 1,
      "postType": "总部",
      "valid": 1
    }
    return dataTpl;
  },

  addPostType(args) {
    return successRes;
  },

  editPostType(args) {
    return dataTpl;
  },

  removePostType(args) {
    return dataTpl;
  },

  getRank(args) {
    dataTpl.result = [{
      "ID": 2,
      "companyID": 1,
      "createTime": 1465181046000,
      "orderNum": 1,
      "rankCode": "C1",
      "rankName": "厨师1级",
      "valid": 1
    }, {
      "ID": 3,
      "companyID": 1,
      "createTime": 1465182102000,
      "orderNum": 2,
      "rankCode": "C2",
      "rankName": "厨师2级",
      "valid": 1
    }, {
      "ID": 4,
      "companyID": 1,
      "createTime": 1465182174000,
      "orderNum": 3,
      "rankCode": "C3",
      "rankName": "厨师3级",
      "valid": 1
    }];
    return dataTpl;
  },

  getRankByID(args) {
    dataTpl.result = {
      "ID": 2,
      "companyID": 1,
      "createTime": 1465181046000,
      "orderNum": 1,
      "rankCode": "C1",
      "rankName": "厨师1级",
      "valid": 1
    };
    return dataTpl;
  },

  addRank(args) {
    return dataTpl;
  },

  editRank(args) {
    return dataTpl;
  },

  removeRank(args) {
    return dataTpl;
  },

  // 技能
  getSkill(args) {
    dataTpl.result = [{
      "ID": 1,
      "skillCode": "SK",
      "skillName": "烧烤",
      "skilllevelList": [
        { "ID": 1, "createTime": 1465529073000, "skillID": 1, "skillLevel": "1", "skillName": "1级", "valid": 1 },
        { "ID": 2, "createTime": 1465529085000, "skillID": 1, "skillLevel": "2", "skillName": "2级", "valid": 1 },
        { "ID": 3, "createTime": 1465529096000, "skillID": 1, "skillLevel": "3", "skillName": "3级", "valid": 1 }
      ]
    }, {
      "ID": 2,
      "skillCode": "HB",
      "skillName": "汉堡",
      "skilllevelList": [
        { "ID": 4, "createTime": 1465550944000, "skillID": 2, "skillLevel": "1", "skillName": "1级", "valid": 1 },
        { "ID": 5, "createTime": 1465550958000, "skillID": 2, "skillLevel": "2", "skillName": "2级", "valid": 1 },
        { "ID": 6, "createTime": 1465550968000, "skillID": 2, "skillLevel": "3", "skillName": "3级", "valid": 1 }
      ]
    }, {
      "ID": 3,
      "skillCode": "PC",
      "skillName": "配餐",
      "skilllevelList": [
        { "ID": 7, "createTime": 1465551041000, "skillID": 3, "skillLevel": "1", "skillName": "1级", "valid": 1 },
        { "ID": 9, "createTime": 1465551056000, "skillID": 3, "skillLevel": "2", "skillName": "2级", "valid": 1 }
      ]
    }];
    return dataTpl;
  },

  getSkillByID(args) {
    dataTpl.result = { "ID": 1, "createTime": 1465529046000, "skillCode": "SK", "skillName": "烧烤", "valid": 1 };
    return dataTpl;
  },

  getSkillLevelByID(args) {
    dataTpl.result = { "ID": 1, "createTime": 1465529073000, "skillID": 1, "skillLevel": "1", "skillName": "1级", "valid": 1 };
    return dataTpl;
  },

  addSkill(args) {
    return dataTpl;
  },

  addSkillLevel(args) {
    return dataTpl;
  },

  removeSkill(args) {
    return dataTpl;
  },

  removeSkillLevel(args) {
    return dataTpl;
  },

  editSkill(args) {
    return dataTpl;
  },

  editSkillLevel(args) {
    return dataTpl;
  },

  getPost(args) {
    dataTpl.result = [{
      "ID": 19,
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462861535000,
      "des": "",
      "postCode": "010001",
      "postName": "分公司总经理",
      "valid": 1
    }, {
      "ID": 20,
      "companyID": 1,
      "companyName": "木屋烧烤",
      "createTime": 1462861535000,
      "des": "",
      "postCode": "010002",
      "postName": "行政主管",
      "valid": 1
    }];
    return dataTpl;
  },

  getPostByID(args) {
    dataTpl.result = {
      "ID": 19,
      "companyID": 1,
      "createTime": 1462861535000,
      "des": "",
      "postCode": "010001",
      "postName": "分公司总经理",
      "valid": 1
    };
    return dataTpl;
  },

  addPost(args) {
    return dataTpl;
  },

  removePost(args) {
    return dataTpl;
  },

  editPost(args) {
    return dataTpl;
  },

  getPosition(args) {
    dataTpl.result = [{
      "ID": 70,
      "companyID": 1,
      "createTime": 1465806336000,
      "positionCode": "001",
      "positionName": "总监",
      "postPojoList": [],
      "valid": 1
    }, {
      "ID": 71,
      "companyID": 1,
      "createTime": 1465806391000,
      "positionCode": "002",
      "positionName": "经理",
      "postPojoList": [],
      "valid": 1
    }];
    return dataTpl;
  },
  getPositionByID(args) {
    dataTpl.result = { "ID": 70, "companyID": 1, "createTime": 1465806336000, "positionCode": "001", "positionName": "总监", "valid": 1 };
    return dataTpl;
  },
  addPosition(args) {
    return dataTpl;
  },
  removePosition(args) {
    return dataTpl;
  },
  editPost(args) {
    return dataTpl;
  },

  // ---

  testAuthority(args) {
    dataTpl.result = [{
      "ID": -3,
      "menuName": "权限管理",
      "parentID": -1
    }, {
      "ID": 14,
      "createTime": 1461569501000,
      "des": "角色管理",
      "isLeft": 0,
      "menuName": "角色管理",
      "moduleID": 3,
      "parentID": -3,
      "url": "Web.view.companyconf.role.Role",
      "valid": 1
    }, {
      "ID": 17,
      "createTime": 1461569553000,
      "des": "",
      "isLeft": 0,
      "menuName": "菜单权限",
      "moduleID": 3,
      "parentID": -3,
      "url": "Web.view.companyconf.authority.Menu",
      "valid": 1
    }, {
      "ID": 18,
      "createTime": 1461569577000,
      "des": "数据权限",
      "isLeft": 0,
      "menuName": "数据权限",
      "moduleID": 3,
      "parentID": -3,
      "url": "Web.view.companyconf.authority.Data",
      "valid": 1
    }, {
      "ID": 20,
      "createTime": 1461569604000,
      "des": "",
      "isLeft": 0,
      "menuName": "操作员管理",
      "moduleID": 3,
      "parentID": -3,
      "url": "Web.view.companyconf.operator.Operator",
      "valid": 1
    }, {
      "ID": 21,
      "createTime": 1461569612000,
      "des": "",
      "isLeft": 0,
      "menuName": "工作流配置",
      "moduleID": 3,
      "parentID": -3,
      "url": "Web.view.companyconf.wfconfig.WFConfig",
      "valid": 1
    }, {
      "ID": -5,
      "menuName": "组织架构",
      "parentID": -1
    }, {
      "ID": 23,
      "createTime": 1462262659000,
      "des": "",
      "isLeft": 0,
      "menuName": "组织管理",
      "moduleID": 5,
      "parentID": -5,
      "url": "Web.view.basedata.org.Org",
      "valid": 1
    }, {
      "ID": 24,
      "createTime": 1461571632000,
      "des": "",
      "isLeft": 1,
      "menuName": "职位",
      "moduleID": 5,
      "parentID": -5,
      "url": "Web.view.basedata.position.Position",
      "valid": 1
    }, {
      "ID": 25,
      "createTime": 1461571640000,
      "des": "",
      "isLeft": 0,
      "menuName": "岗位",
      "moduleID": 5,
      "parentID": -5,
      "url": "Web.view.basedata.post.Post",
      "valid": 1
    }, {
      "ID": 26,
      "createTime": 1461571651000,
      "des": "",
      "isLeft": 0,
      "menuName": "岗位分配",
      "moduleID": 5,
      "parentID": -5,
      "url": "Web.view.basedata.postallot.PostAllot",
      "valid": 1
    }, {
      "ID": 27,
      "createTime": 1461571666000,
      "des": "",
      "isLeft": 0,
      "menuName": "小组分类",
      "moduleID": 5,
      "parentID": -5,
      "url": "Web.view.basedata.teamtype.TeamType",
      "valid": 1
    }, {
      "ID": 44,
      "createTime": 1461571621000,
      "des": "",
      "isLeft": 0,
      "menuName": "职级",
      "moduleID": 5,
      "parentID": -5,
      "url": "Web.view.basedata.rank.Rank",
      "valid": 1
    }, {
      "ID": -6,
      "menuName": "门店管理",
      "parentID": -1
    }, {
      "ID": 32,
      "createTime": 1461571821000,
      "des": "",
      "isLeft": 0,
      "menuName": "区域",
      "moduleID": 6,
      "parentID": -6,
      "url": "Web.view.basedata.area.Area",
      "valid": 1
    }, {
      "ID": 33,
      "createTime": 1461571828000,
      "des": "",
      "isLeft": 0,
      "menuName": "品牌",
      "moduleID": 6,
      "parentID": -6,
      "url": "Web.view.basedata.brand.Brand",
      "valid": 1
    }, {
      "ID": 34,
      "createTime": 1461571838000,
      "des": "",
      "isLeft": 1,
      "menuName": "宿舍",
      "moduleID": 6,
      "parentID": -6,
      "url": "Web.view.basedata.dormitory.Dormitory",
      "valid": 1
    }, {
      "ID": -7,
      "menuName": "员工管理",
      "parentID": -1
    }, {
      "ID": 36,
      "createTime": 1461571892000,
      "des": "",
      "isLeft": 0,
      "menuName": "员工入职",
      "moduleID": 7,
      "parentID": -7,
      "url": "Web.view.manpowerplan.usermanage.UserManage",
      "valid": 1
    }, {
      "ID": 37,
      "createTime": 1461571904000,
      "des": "",
      "isLeft": 0,
      "menuName": "员工转正",
      "moduleID": 7,
      "parentID": -7,
      "url": "Web.view.manpowerplan.official.Official",
      "valid": 1
    }, {
      "ID": 38,
      "createTime": 1461571913000,
      "des": "",
      "isLeft": 1,
      "menuName": "员工异动",
      "moduleID": 7,
      "parentID": -7,
      "url": "Web.view.manpowerplan.transaction.Transaction",
      "valid": 1
    }, {
      "ID": 39,
      "createTime": 1461571921000,
      "des": "",
      "isLeft": 0,
      "menuName": "员工离职",
      "moduleID": 7,
      "parentID": -7,
      "url": "Web.view.manpowerplan.dimission.Dimission",
      "valid": 1
    }, {
      "ID": 40,
      "createTime": 1461571935000,
      "des": "",
      "isLeft": 0,
      "menuName": "黑名单",
      "moduleID": 7,
      "parentID": -7,
      "url": "Web.view.manpowerplan.blacklist.Blacklist",
      "valid": 1
    }, {
      "ID": 41,
      "createTime": 1461571946000,
      "des": "",
      "isLeft": 0,
      "menuName": "合同档案",
      "moduleID": 7,
      "parentID": -7,
      "url": "Web.view.manpowerplan.contract.Contract",
      "valid": 1
    }, {
      "ID": -8,
      "menuName": "招聘管理",
      "parentID": -1
    }, {
      "ID": 43,
      "createTime": 1461829396000,
      "des": "",
      "isLeft": 0,
      "menuName": "岗位发布",
      "moduleID": 8,
      "parentID": -8,
      "url": "Web.view.postjobsrecruitment.postjobs.Postjobs",
      "valid": 1
    }, {
      "ID": 45,
      "createTime": 1462448680000,
      "des": "",
      "isLeft": 0,
      "menuName": "岗位申请查询",
      "moduleID": 8,
      "parentID": -8,
      "url": "Web.view.postjobsrecruitment.postshow.Postshow",
      "valid": 1
    }, {
      "ID": -9,
      "menuName": "排班",
      "parentID": -1
    }, {
      "ID": 46,
      "createTime": 1462506324000,
      "des": "",
      "isLeft": 1,
      "menuName": "部门排班",
      "moduleID": 9,
      "parentID": -9,
      "url": "Web.view.schedule.Department",
      "valid": 1
    }, {
      "ID": 47,
      "createTime": 1462506347000,
      "des": "",
      "isLeft": 0,
      "menuName": "门店排班",
      "moduleID": 9,
      "parentID": -9,
      "url": "Web.view.schedule.Store",
      "valid": 1
    }, {
      "ID": -10,
      "menuName": "考勤",
      "parentID": -1
    }, {
      "ID": 48,
      "createTime": 1463111159000,
      "des": "",
      "isLeft": 1,
      "menuName": "日考勤",
      "moduleID": 10,
      "parentID": -10,
      "url": "Web.view.attendance.department.Day",
      "valid": 1
    }, {
      "ID": 49,
      "createTime": 1463111169000,
      "des": "",
      "isLeft": 0,
      "menuName": "月考勤",
      "moduleID": 10,
      "parentID": -10,
      "url": "Web.view.attendance.department.Month",
      "valid": 1
    }, {
      "ID": 50,
      "createTime": 1463111180000,
      "des": "",
      "isLeft": 0,
      "menuName": "考勤规则",
      "moduleID": 10,
      "parentID": -10,
      "url": "Web.view.attendance.rule.Rule",
      "valid": 1
    }];
    return dataTpl;
  },
  getEmployeeByPostID(args) {
    dataTpl.result = [{
      "ID": 1756,
      "deptID": 2,
      "deptName": "北京分公司",
      "photourl": "",
      "postName": "大堂经理",
      "postTypeID": 4,
      "postTypeName": "中层",
      "userName": "苏新",
      "userNamePY": "suxin",
      "userNum": "08770103"
    }];
    return dataTpl;
  },
  getEmployeeByOrgID(args) {
    dataTpl.result = [{ "ID": 1539, "deptID": 105, "deptName": "生产部", "userName": "杨菊莲", "userNum": "ZY01040100184" },
      { "ID": 1541, "deptID": 105, "deptName": "生产部", "userName": "张加友", "userNum": "ZY01040100186" },
      { "ID": 1544, "deptID": 105, "deptName": "生产部", "userName": "赵文根", "userNum": "ZY01040100189" },
      { "ID": 1546, "deptID": 105, "deptName": "生产部", "userName": "王利霞", "userNum": "ZY01040100191" },
      { "ID": 1547, "deptID": 105, "deptName": "生产部", "userName": "骆润", "userNum": "ZY01040100192" },
      { "ID": 1549, "deptID": 105, "deptName": "生产部", "userName": "天津大强水产", "userNum": "ZY01040100194" },
      { "ID": 1550, "deptID": 105, "deptName": "生产部", "userName": "北京中冷物流", "userNum": "ZY01040100195" },
      { "ID": 1551, "deptID": 105, "deptName": "生产部", "userName": "赵青贵", "userNum": "ZY01040100196" },
      { "ID": 1552, "deptID": 105, "deptName": "生产部", "userName": "陈自发", "userNum": "ZY01040100197" },
      { "ID": 1553, "deptID": 105, "deptName": "生产部", "userName": "朱守斌", "userNum": "ZY01040100198" },
      { "ID": 1554, "deptID": 105, "deptName": "生产部", "userName": "张帅", "userNum": "ZY01040100199" },
      { "ID": 1555, "deptID": 105, "deptName": "生产部", "userName": "北京金锐昌盛物流", "userNum": "ZY01040100200" },
      { "ID": 1556, "deptID": 105, "deptName": "生产部", "userName": "李春红", "userNum": "ZY01040100201" },
      { "ID": 1557, "deptID": 105, "deptName": "生产部", "userName": "丛淑艳", "userNum": "ZY01040100202" },
      { "ID": 1558, "deptID": 105, "deptName": "生产部", "userName": "何熙治", "userNum": "ZY01040100203" },
      { "ID": 1559, "deptID": 105, "deptName": "生产部", "userName": "程金凤", "userNum": "ZY01040100204" },
      { "ID": 792, "deptID": 105, "deptName": "生产部", "userName": "曹善荣", "userNum": "ZY00100300004" },
      { "ID": 1561, "deptID": 105, "deptName": "生产部", "userName": "常吉翠", "userNum": "ZY01040100206" },
      { "ID": 794, "deptID": 105, "deptName": "生产部", "userName": "查秀芬", "userNum": "ZY00100300006" },
      { "ID": 795, "deptID": 105, "deptName": "生产部", "userName": "常吉翠", "userNum": "ZY00100300007" },
      { "ID": 1563, "deptID": 105, "deptName": "生产部", "userName": "卢翠华", "userNum": "ZY01040100208" },
      { "ID": 1565, "deptID": 105, "deptName": "生产部", "userName": "徐常武", "userNum": "ZY01040100210" },
      { "ID": 816, "deptID": 105, "deptName": "生产部", "userName": "方修英", "userNum": "ZY00100300028" },
      { "ID": 1584, "deptID": 105, "deptName": "生产部", "userName": "赵桂琴", "userNum": "ZY01040100229" },
      { "ID": 817, "deptID": 105, "deptName": "生产部", "userName": "方绪群", "userNum": "ZY00100300029" },
      { "ID": 818, "deptID": 105, "deptName": "生产部", "userName": "方银相", "userNum": "ZY00100300030" }
    ];
    return dataTpl;
  },
  //****************花名册mock
  getAllEmployee(args) {
    dataTpl.result = {
      recordCount: 500,
      recordList: [

        {
          "ID": 18,
          "bankCard": "6222020200115114569",
          "birthDay": "1990/09/07 0:00:00",
          "companyID": 1,
          "createTime": 1453878203000,
          "deptID": 93,
          "deptName": "财务部",
          "gender": "118002",
          "genderName": "女",
          "healthEndTime": "",
          "hukouAddress": "",
          "hukouType": "NULL",
          "isMarried": "NULL",
          "nation": "113001",
          "nationName": "汉族",
          "nowCode": "",
          "phone": "13001980868",
          "positionID": 0,
          "postID": 31,
          "postName": "收银",
          "rankID": 0,
          "state": "120002",
          "stateName": "在职",
          "urgentPerson": "",
          "userIDCard": "131182199009072029",
          "userName": "贾双双",
          "userNum": "ZY010200017",
          "userType": "120005",
          "userTypeName": "全职",
          "valid": 1
        }, {
          "ID": 19,
          "bankCard": "6212260200061372674",
          "birthDay": "1991/08/15 0:00:00",
          "companyID": 1,
          "createTime": 1453878203000,
          "deptID": 93,
          "deptName": "财务部",
          "gender": "118002",
          "genderName": "女",
          "healthEndTime": "",
          "hukouAddress": "",
          "hukouType": "NULL",
          "isMarried": "NULL",
          "nation": "113001",
          "nationName": "汉族",
          "nowCode": "",
          "phone": "18655847085",
          "positionID": 0,
          "postID": 32,
          "postName": "aaa",
          "rankID": 0,
          "state": "120002",
          "stateName": "在职",
          "urgentPerson": "",
          "userIDCard": "341221199108150629",
          "userName": "李惠杰",
          "userNum": "ZY010200018",
          "userType": "120005",
          "userTypeName": "全职",
          "valid": 1
        }, {
          "ID": 20,
          "bankCard": "6212260200072210111",
          "birthDay": "1992/11/16 0:00:00",
          "companyID": 1,
          "createTime": 1453878203000,
          "deptID": 93,
          "deptName": "财务部",
          "gender": "118002",
          "genderName": "女",
          "healthEndTime": "",
          "hukouAddress": "",
          "hukouType": "NULL",
          "isMarried": "NULL",
          "nation": "113001",
          "nationName": "汉族",
          "nowCode": "",
          "phone": "15991264560",
          "positionID": 0,
          "postID": 32,
          "postName": "aaa",
          "rankID": 0,
          "state": "120002",
          "stateName": "在职",
          "urgentPerson": "",
          "userIDCard": "610203199211164641",
          "userName": "裴静",
          "userNum": "ZY010200019",
          "userType": "120005",
          "userTypeName": "全职",
          "valid": 1
        }, {
          "ID": 21,
          "bankCard": "6215590200005230495",
          "birthDay": "1987/06/01 0:00:00",
          "companyID": 1,
          "createTime": 1453878203000,
          "deptID": 93,
          "deptName": "财务部",
          "gender": "118002",
          "genderName": "女",
          "healthEndTime": "",
          "hukouAddress": "",
          "hukouType": "NULL",
          "isMarried": "NULL",
          "nation": "113001",
          "nationName": "汉族",
          "nowCode": "",
          "phone": "18910179244",
          "positionID": 0,
          "postID": 33,
          "postName": "aa",
          "rankID": 0,
          "state": "120002",
          "stateName": "在职",
          "urgentPerson": "",
          "userIDCard": "132133198706014026",
          "userName": "贺杏峰",
          "userNum": "ZY010200020",
          "userType": "120005",
          "userTypeName": "全职",
          "valid": 1
        }, {
          "ID": 22,
          "bankCard": "6212260200078630437",
          "birthDay": "1990/11/25 0:00:00",
          "companyID": 1,
          "createTime": 1453878203000,
          "deptID": 93,
          "deptName": "财务部",
          "gender": "118002",
          "genderName": "女",
          "healthEndTime": "",
          "hukouAddress": "",
          "hukouType": "NULL",
          "isMarried": "NULL",
          "nation": "113001",
          "nationName": "汉族",
          "nowCode": "",
          "phone": "18210231245",
          "positionID": 0,
          "postID": 34,
          "postName": "34",
          "rankID": 0,
          "state": "120002",
          "stateName": "在职",
          "urgentPerson": "",
          "userIDCard": "130726199011252521",
          "userName": "徐万红",
          "userNum": "ZY010200021",
          "userType": "120005",
          "userTypeName": "全职",
          "valid": 1
        },
      ]
    }
    return dataTpl;
  },
  getEmployeesByIDs(args) {

    dataTpl.result = [

      {
        "ID": 18,
        "bankCard": "6222020200115114569",
        "birthDay": "1990/09/07 0:00:00",
        "companyID": 1,
        "createTime": 1453878203000,
        "deptID": 93,
        "deptName": "财务部",
        "gender": "118002",
        "genderName": "女",
        "healthEndTime": "",
        "hukouAddress": "",
        "hukouType": "NULL",
        "isMarried": "NULL",
        "nation": "113001",
        "nationName": "汉族",
        "nowCode": "",
        "phone": "13001980868",
        "positionID": 0,
        "postID": 31,
        "postName": "收银",
        "rankID": 0,
        "state": "120002",
        "stateName": "在职",
        "urgentPerson": "",
        "userIDCard": "131182199009072029",
        "userName": "贾双双",
        "userNum": "ZY010200017",
        "userType": "120005",
        "userTypeName": "全职",
        "valid": 1
      }, {
        "ID": 19,
        "bankCard": "6212260200061372674",
        "birthDay": "1991/08/15 0:00:00",
        "companyID": 1,
        "createTime": 1453878203000,
        "deptID": 93,
        "deptName": "财务部",
        "gender": "118002",
        "genderName": "女",
        "healthEndTime": "",
        "hukouAddress": "",
        "hukouType": "NULL",
        "isMarried": "NULL",
        "nation": "113001",
        "nationName": "汉族",
        "nowCode": "",
        "phone": "18655847085",
        "positionID": 0,
        "postID": 32,
        "postName": "aaa",
        "rankID": 0,
        "state": "120002",
        "stateName": "在职",
        "urgentPerson": "",
        "userIDCard": "341221199108150629",
        "userName": "李惠杰",
        "userNum": "ZY010200018",
        "userType": "120005",
        "userTypeName": "全职",
        "valid": 1
      },
    ]

    return dataTpl;
  },
  getOfficeReason(args) {
    dataTpl.result = [{
      "ID": 18,
      "code": '120001',
      "codeName": "转正时间已到"
    }, {
      "ID": 19,
      "code": '120002',
      "codeName": "表现优秀"
    }]
    return dataTpl;
  },
  office(args) {
    return dataTpl;
  },
  getDismissReason(args) {
    dataTpl.result = [{
      "ID": 18,
      "code": '120001',
      "codeName": "换一个环境挑战自己"
    }, {
      "ID": 19,
      "code": '120002',
      "codeName": "这里的环境太差"
    }]
    return dataTpl;
  },
  dismiss() {
    return dataTpl;
  },
  getBlackReason(args) {
    dataTpl.result = [{
      "ID": 18,
      "code": '120001',
      "codeName": "素质太差"
    }, {
      "ID": 19,
      "code": '120002',
      "codeName": "偷东西"
    }]
    return dataTpl;
  },
  black() {
    return dataTpl;
  },
  //上传头像
  photoUpload() {
    dataTpl.result = {
      path: "test.jpg"
    };
    return dataTpl;
  }
}
