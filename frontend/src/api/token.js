import axios from 'axios';

//=============================================================================+
// JWT Token 처리
//=============================================================================+
//token 을 session 에 저장
export function setToken(_this, token) {
    _this.$session.set('token', token);
}
//token 을 headers 에 저장하고 axios 통신하기
export function setAuthToken(_this) {
    axios.defaults.headers.common['Authorization'] = _this.$session.get('token');
}
//logout 시 session 에 있는 token 제거
export function removeAuthToken(_this) {
    _this.$session.remove('token');
    sessionStorage.clear();
}
