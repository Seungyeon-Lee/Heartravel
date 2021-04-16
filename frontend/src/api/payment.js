import axios from 'axios';

//=============================================================================+
// 특정 주문 결제 조회
//=============================================================================+
export function getPaymentData(id, params) {
    return axios({
        method:"get"
        ,url: ('/api/payments/'+id)
        ,data: params
    });
}
//=============================================================================+
// 1. 결제대기 2. 결제완료 3. 환불대기 4. 환불완료
//=============================================================================+
export function getOrderDataPayment(id, params) {
    return axios({
        method:"get"
        ,url: ('/api/payments/status/'+id)
        ,data: params
    });
}
//=============================================================================+
// 결제 상태 변경
//=============================================================================+
export function updateOrderDataPayment(id, params) {
    return axios({
        method:"put"
        ,url: ('/api/payments/'+id+'/status')
        ,data: params
    });
}