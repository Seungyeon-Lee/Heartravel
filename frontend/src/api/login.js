import axios from 'axios';
import * as TOKEN from './token';

const RESPONSE_TIME_OUT = 10 * 1000;

//=============================================================================+
// 로그인
//=============================================================================+
export function login(params) {
    return axios({
        method:"post"
        ,url: ('/api/users/login')
        ,data: params
        ,timeout : RESPONSE_TIME_OUT
    });
}

//=============================================================================+
// 아이디 찾기
//=============================================================================+
export function findId(params) {
    return axios({
        method:"get"
        ,url: ('/api/users/find/id')
        ,data: params
        ,timeout : RESPONSE_TIME_OUT
    });
}

//=============================================================================+
// 회원가입
//=============================================================================+
export function signUp(params) {
    return axios({
        method:"post"
        ,url: ('/api/users/sign-up')
        ,data: params
        ,timeout : RESPONSE_TIME_OUT
    });
}

//=============================================================================+
// 회원가입 - 아이디 중복체크
//=============================================================================+
export function idDuplicationChk(params) {
    return axios({
        method:"post"
        ,url: ('/api/users/sign-up/id-duplication-chk')
        ,data: params
        ,timeout : RESPONSE_TIME_OUT
    });
}

