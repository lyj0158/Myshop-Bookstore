import {request} from "@/network/request";

export function getCategoriesList(){
    return request({
        url: 'api/goods'
    })
}
export function getGoodsList(cid=0,type='sales',pages=1){
    return request({
        url: 'api/goods?category_id='+cid+'&'+type+'=1&page'+pages
    })
}