import {request} from "@/network/request";

export  function getHomeAllDate() {
  return request({
      url: 'api/index',
      /*method: 'get',
      param: {
          id: 1,
      },*/
  })
};
//获取首页分类商品数据
export function getHomeClassGoods(type='sales',page=1) {
    return request({
        url: 'api/index?'+type+'=1&page='+page,
    })
}