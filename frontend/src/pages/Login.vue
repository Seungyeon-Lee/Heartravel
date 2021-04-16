<template>
  <div>
    <div class="contents_wrapper" v-if="UI.SHOW_CONTENT === 'login'">
      <div class="login_wrapper">
        <h2 class="align-center">로그인</h2>
        <input type="text" v-model="user.user_id" class="margin_top_40 input_nor width_100"  placeholder="아이디">
        <input type="password" v-model="user.password" class="margin_top_24 input_nor width_100" placeholder="비밀번호">
        <div class="margin_top_24 checkbox_gray checkbox_nor">
          <input type="checkbox" id="keep_login">
          <label for="keep_login">로그인 상태 유지</label>
        </div>
        <button class="btn_nor margin_top_24 h_center width_90" @click="login">확인</button>
        <div class="flex margin_top_12 width_90 h_center font_12" style="justify-content: space-evenly;">
          <button class="col_gray" @click="goPage('/find')">아이디 찾기</button><span class="bar"></span>
          <button class="col_gray" @click="goPage('/find')">비밀번호 찾기</button><span class="bar"></span>
          <button class="col_gray" @click="showSignUpPopup">회원가입</button>
        </div>
      </div>
      <div class="line margin_top_60">
        <div class="line_text"></div>
      </div>
      <div class="login_wrapper">
        <button class="btn_nor margin_top_24 width_90 h_center" @click="showPage('guest_order')">비회원 주문조회</button>
      </div>
    </div>

    <div class="contents_wrapper" v-if="UI.SHOW_CONTENT==='guest_order'">
      <div class="login_wrapper">
        <h2 class="align-center">비회원 주문조회</h2>
        <input class="margin_top_40 input_nor width_100" placeholder="주문자명">
        <input type="password" class="margin_top_24 input_nor width_100" placeholder="휴대폰번호">
        <button class="btn_nor margin_top_24">확인</button>
      </div>
    </div>

  </div>

</template>

<script>
  import * as LOGIN_API from '../api/login';
  import * as TOKEN_API from '../api/token'

  export default {
    name: "LoginPage",
    data:function(){
      return{
        user: {
          user_id: '',
          password: ''
        },
        UI: {
          SHOW_CONTENT: 'login',
          IS_SHOW_MENU: false,
        }
      }
    },
    methods:{
      goPage: function(){
        this.$router.push('find');
      },
      showPage: function(page){
        this.UI.SHOW_CONTENT = page;
      },
      showSignUpPopup: function(){
        this.$router.push('/sign_up');
      },

      login: async function(){
        try {
          const rs = await LOGIN_API.login(this.user);

          if (rs.data.code !== "success") {
            alert('이메일과 비밀번호를 다시 확인하세요.');
            return;
          }

          this.$session.set('user_name', rs.data.user.user_name);
          this.$session.set('user_id', rs.data.user.user_id);
          this.$session.set('role_index', rs.data.user.role_index);
          await TOKEN_API.setToken(this, rs.data.token);
          location.href='/';
        } catch (error) {
          console.error(error);
        }
      },
    }
  }
</script>

<style scoped>
  .line{
    height: 0.5px;
    width: 100%;
    background-color: #707070;
  }
  .line_text{
    background-color: #fff;
    position: absolute;
    color: #181818;
    left: 50%;
    transform: translateX(-50%) translateY(-8px);
    width: 40px;
    text-align: center;
    z-index: 100;
  }
  .bar{
    width: 1px;
    height:20px;
    background-color: #707070;
  }

</style>