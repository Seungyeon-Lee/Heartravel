import axios from 'axios';

//=============================================================================+
// 특정 주문 배송 조회
//=============================================================================+
export function getDeliveryData(id, params) {
    return axios({
        method:"get"
        ,url: ('/api/deliveries/'+id)
        ,data: params
    });
}
//=============================================================================+
// 1. 배송준비 2. 배송중 3. 배송완료 4. 구매확정
//=============================================================================+
export function getOrderDataDelivery(id, params) {
    return axios({
        method:"get"
        ,url: ('/api/deliveries/status/'+id)
        ,data: params
    });
}
//=============================================================================+
// 주문 정보 변경 (받는 사람 정보)
//=============================================================================+
export function updateReceiverInfoDelivery(id, params) {
    return axios({
        method:"put"
        ,url: ('/api/deliveries/'+id)
        ,data: params
    });
}
//=============================================================================+
// 배송 상태 변경
//=============================================================================+
export function updateOrderDataDelivery(id, params) {
    return axios({
        method:"put"
        ,url: ('/api/deliveries/'+id+'/status')
        ,data: params
    });
}

//=============================================================================+
// 배송회사, 송장번호, 배송중 상태 변경
//=============================================================================+
export function updateDeliveryInformation(id, params) {
    return axios({
        method:"put"
        ,url: ('/api/deliveries/'+id+'/invoice_n_company')
        ,data: params
    });
}