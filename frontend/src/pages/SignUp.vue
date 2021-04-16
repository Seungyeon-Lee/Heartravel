<template>
    <div class="contents_wrapper">
        <h2 class="align-center">회원가입</h2>
        <div class="h_center sign_up_wrapper">
            <input type="text" class="input_nor width_100" v-model="user.user_id" autocomplete="off" placeholder="아이디"/>
            <input type="password" class="input_nor width_100" v-model="user.password" autocomplete="off" placeholder="비밀번호"/>
            <input type="password" class="input_nor width_100" v-model="user.check_password" autocomplete="off" placeholder="비밀번호 확인"/>
            <input type="text" class="input_nor width_100" v-model="user.user_name" autocomplete="off" placeholder="이름"/>
            <input type="text" class="input_nor width_75" style="margin-right: 12px;" v-model="user.postcode" autocomplete="off" placeholder="우편주소" readonly/>
            <button style="height:30px; border-radius: 2px; float: right" class="width_20 btn_nor" @click="showPostPopup">우편주소</button>
            <input type="text" class="input_nor width_100" v-model="user.address" autocomplete="off" placeholder="주소" readonly/>
            <input type="text" class="input_nor width_100" v-model="user.address_detail" autocomplete="off" placeholder="상세주소" ref="address_detail"/>
            <input type="tel" class="input_nor width_100" v-model="user.phone" autocomplete="off" placeholder="휴대폰 번호" />
            <input type="text" class="input_nor width_100" v-model="user.email" autocomplete="off" placeholder="이메일" />
            <div class="font_11 margin_top_12 margin_bottom_20">
                <div class="checkbox_white">
                    <input type="checkbox" id="check01">
                    <label for="check01"><span class="col_red">(필수)</span> 이용 약관 및 개인 정보수집 및 이용에 동의</label>
                </div>
                <div class="margin_top_5 checkbox_white">
                    <input type="checkbox" id="check02">
                    <label for="check02">(선택) 쇼핑 정보 수신 동의</label>
                </div>
            </div>
            <button class="btn_nor margin_auto width_100" value="회원가입 완료"  style="border-radius: 4px" @click="signUp">회원가입 완료</button>
        </div>
        <postcode-popup v-show="UI.IS_SHOW_POST_POPUP"
                        @hidePostPopup="hidePostPopup"
                        @handleAddress="handleAddress">
        </postcode-popup>
    </div>
</template>

<script>
    import * as SIGNUP_API from '../api/login';
    import PostcodePopup from "../components_user/PostcodePopup";
    export default {
        name: "SignUp",
        components: {PostcodePopup},
        data:function(){
            return{
                user: {
                    user_id: '',
                    password: '',
                    check_password: '',
                    user_name: '',
                    postcode: '',
                    address: '',
                    address_detail: '',
                    phone: '',
                    email: ''
                },
                UI: {
                    IS_SHOW_MENU: false,
                    IS_SHOW_POST_POPUP: false,
                }
            }
        },
        methods:{
            closeMenu:function(){
                this.$parent.$data.UI.IS_SHOW_SIGN_UP = false;
            },

            isDuplicatedId: async function(){
                try {
                    const user_id = {user_id: this.user.user_id };
                    const rs = await SIGNUP_API.idDuplicationChk(user_id);
                    if (rs.data.code === 'fail') {
                        alert('이미 사용중인 아이디 입니다');
                        return true;
                    } else if (rs.data.code === 'success'){
                        alert('사용가능한 아이디 입니다.');
                        return true;
                    }
                } catch (err) {
                    console.error(err);
                }
            },

            async signUp() {
                //아이디 값 존재 체크
                if(this.user.user_id === ''){
                    alert('아이디를 입력해주세요');
                    return;
                }
                // //아이디 중복체크
                // if(this.isDuplicatedId()){
                //     return;
                // }
                //비밀번호 값 존재 체크
                if(this.user.password === ''){
                    alert('비밀번호를 입력해주세요');
                    return;
                }
                //비밀번호 확인 값 존재 체크
                if(this.user.check_password === ''){
                    alert('비밀번호 확인 값을 입력해주세요');
                    return;
                }

                //비밀번호 동일한지 체크
                if(this.user.password !== this.user.password){
                    alert('비밀번호를 동일하게 입력해주세요.');
                    return;
                }

                //이름 값 존재 체크
                if(this.user.user_name === ''){
                    alert('이름을 입력해주세요.');
                    return;
                }

                //주소 값 존재 체크
                if(this.user.postcode === '' || this.user.address === '' || this.user.address_detail === ''){
                    alert('주소를 입력해주세요.');
                    return;
                }

                //휴대폰 번호 값 존재 체크
                if(this.user.phone === ''){
                    alert('휴대폰 번호를 입력해주세요.');
                    return;
                }

                //이메일 값 존재 체크
                if(this.user.email === ''){
                    alert('이메일을 입력해주세요.');
                    return;
                }

                const params = {
                    user: this.user,
                };

                const rs = await SIGNUP_API.signUp(params);

                if(rs.data.code === 'success'){
                    alert('회원가입 완료');
                    location.href='/login';
                } else{
                    alert('회원가입 실패');
                }
            },

            //--------------------------------------------------
            // 우편주소
            //--------------------------------------------------
            showPostPopup() {
                this.UI.IS_SHOW_POST_POPUP = true;
            },
            hidePostPopup() {
                this.UI.IS_SHOW_POST_POPUP = false;
            },
            handleAddress(address, code) {
                this.user.postcode = code;
                this.user.address = address;
                this.user.address_detail= '';
                this.$refs.address_detail.focus();
                this.hidePostPopup();
            },

            //전화번호는 -을 제외한 숫자만 입력해주세요

        }
    }
</script>

<style scoped>
    table{
        margin-bottom: 36px;
    }
    table td {
        padding: 5px 10px;
        font-size: 13px;
    }
    table td:first-child{
        width: 35%;
        padding-top: 15px;
    }
</style>