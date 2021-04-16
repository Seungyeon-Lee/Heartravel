import axios from 'axios';

//=============================================================================+
// 상품 등록
//=============================================================================+
export function addProduct(params) {
    return axios({
        method:"post"
        ,url: ('/api/products')
        ,data: params
    });
}
//=============================================================================+
// 전체 상품 리스트
//=============================================================================+
export function getProductAll(params) {
    return axios({
        method:"get"
        ,url: ('/api/products')
        ,data: params
    });
}
//=============================================================================+
// 특정 상품 상세 리스트
//=============================================================================+
export function getProduct(id, params) {
    return axios({
        method:"get"
        ,url: ('/api/products/' + id)
        ,data: params
    });
}
//=============================================================================+
// 특정 상품 수정
//=============================================================================+
export function updateProduct(id, params) {
    return axios({
        method:"put"
        ,url: ('/api/products/' + id)
        ,data: params
    });
}
//=============================================================================+
// 특정 상품 삭제
//=============================================================================+
export function deleteProduct(id, params) {
    return axios({
        method:"delete"
        ,url: ('/api/products/' + id)
        ,data: params
    });
}