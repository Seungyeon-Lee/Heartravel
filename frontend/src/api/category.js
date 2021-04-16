import axios from 'axios';

//=============================================================================+
// 카테고리 추가
//=============================================================================+
export function addCategory(params) {
    return axios({
        method:"post"
        ,url: ('/api/categories')
        ,data: params
    });
}
//=============================================================================+
// 전체 카테고리 리스트
//=============================================================================+
export function getCategoryList(params) {
    return axios({
        method:"get"
        ,url: ('/api/categories')
        ,data: params
    });
}
//=============================================================================+
// 카테고리 순서 변경
//=============================================================================+
export function setCategoryOrder(category) {
    return axios({
        method:"put"
        ,url: ('/api/categories/update/order')
        ,data: category
    });
}

//=============================================================================+
// 특정 카테고리 상세 페이지
//=============================================================================+
export function getCategory(id, params) {
    return axios({
        method:"get"
        ,url: ('/api/categories/' + id)
        ,data: params
    });
}
//=============================================================================+
// 특정 카테고리 수정
//=============================================================================+
export function updateCategory(id, params) {
    return axios({
        method:"put"
        ,url: ('/api/categories/' + id)
        ,data: params
    });
}
//=============================================================================+
// 특정 카테고리 상태 수정
//=============================================================================+
export function updateShowStatusCategory(id, params) {
    return axios({
        method:"put"
        ,url: ('/api/categories/' + id + '/status')
        ,data: params
    });
}
//=============================================================================+
// 특정 카테고리 삭제
//=============================================================================+
export function deleteCategory(id, params) {
    return axios({
        method:"delete"
        ,url: ('/api/categories/' + id)
        ,data: params
    });
}