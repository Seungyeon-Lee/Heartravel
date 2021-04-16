import axios from 'axios';

//=============================================================================+
// 주문 통합 리스트
//=============================================================================+
export function getOrderDataAll(params) {
    return axios({
        method:"get"
        ,url: ('/api/orders')
        ,data: params
    });
}

//=============================================================================+
// 특정 주문 조회
//=============================================================================+
export function getOrderData(id, params) {
    return axios({
        method:"get"
        ,url: ('/api/orders/'+id)
        ,data: params
    });
}
//=============================================================================+
// 특정 주문 물품 조회
//=============================================================================+
export function getOrderProductData(id, params) {
    return axios({
        method:"get"
        ,url: ('/api/orders/detail/'+id)
        ,data: params
    });
}
//=============================================================================+
// 특정 유저 주문 조회
//=============================================================================+
export function getUserOrderData(user_id, params) {
    return axios({
        method:"get"
        ,url: ('/api/orders/user/'+user_id)
        ,data: params
    });
}

