import axios from 'axios';

//=============================================================================+
// 전체 고객문의 리스트
//=============================================================================+
export function getInquiryAll(params) {
    return axios({
        method:"get"
        ,url: ('/api/inquiries/')
        ,data: params
    });
}
//=============================================================================+
// 고객문의 리스트 상세페이지
//=============================================================================+
export function getInquiry(id, params) {
    return axios({
        method:"get"
        ,url: ('/api/inquiries/'+id)
        ,data: params
    });
}
//=============================================================================+
// 고객문의 답변등록/수정
//=============================================================================+
export function answerInquiry(id, params) {
    return axios({
        method:"put"
        ,url: ('/api/inquiries/'+id+'/answer')
        ,data: params
    });
}
//=============================================================================+
// 고객문의 문의수정
//=============================================================================+
export function updateInquiry(id, params) {
    return axios({
        method:"put"
        ,url: ('/api/inquiries/'+id)
        ,data: params
    });
}
//=============================================================================+
// 고객문의 문의등록
//=============================================================================+
export function questionInquiry(user_id, params) {
    return axios({
        method:"post"
        ,url: ('/api/inquiries/user/'+user_id)
        ,data: params
    });
}
//=============================================================================+
// 고객문의 문의삭제
//=============================================================================+
export function deleteInquiry(id, params) {
    return axios({
        method:"delete"
        ,url: ('/api/inquiries/'+id)
        ,data: params
    });
}
//=============================================================================+
// 고객문의 답변삭제
//=============================================================================+
export function deleteAnswer(id, params) {
    return axios({
        method:"delete"
        ,url: ('/api/inquiries/'+id+'/answer')
        ,data: params
    });
}