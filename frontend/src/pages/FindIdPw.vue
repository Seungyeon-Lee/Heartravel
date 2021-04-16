<template>
  <div class="c-app">
    <div class="c-wrapper">
      <div class="login_wrapper padding_60">
        <h2 class="align-center">아이디 찾기</h2>
        <input type="text" v-model="FIND_ID.name" class="margin_top_40 input_nor width_100" placeholder="이름">
        <input type="tel" v-model="FIND_ID.phone" class="margin_top_24 input_nor width_100" placeholder="휴대폰번호">
        <input type="email" v-model="FIND_ID.email" class="margin_top_24 input_nor width_100" placeholder="이메일">
        <button class="btn_nor margin_top_40" @click="findId">확인</button>
      </div>
      <div class="line margin_top_60">
      </div>
      <div class="login_wrapper padding_60">
        <h2 class="align-center">비밀번호 찾기</h2>
        <input type="text" v-model="FIND_PW.user_id" class="margin_top_40 input_nor width_100" placeholder="아이디">
        <!-- <input class="margin_top_24 input_nor width_100" placeholder="이름"> -->
        <input type="tel" v-model="FIND_PW.phone" class="margin_top_24 input_nor width_100" placeholder="휴대폰번호">
        <input type="email" v-model="FIND_PW.email" class="margin_top_24 input_nor width_100" placeholder="이메일">
        <button class="btn_nor margin_top_40" @click="findPw">확인</button>
      </div>
    </div>
  </div>
</template>
<script>
import * as LOGIN_API from '../api/login'

  export default {
    name: "FindIdPW", 
    data: function() {
      return{
        FIND_ID: {
          name: '',
          phone: '', 
          email: '',
        },
        FIND_PW: {
          id: '',
          name: '',
          phone: '',
          email: '',
        }
      }
    },

    methods: {
      findId: async function () {
        try{
          const rs = await LOGIN_API.findId(this.FIND_ID);

          if (rs.data.code !== 'fail') {
            alert('아이디를 찾을 수 없습니다.');
            return;
          }

          alert("메일로 아이디 정보가 전송되었습니다.")

        } catch(err){
            alert('아이디를 찾을 수 없습니다.');
        }
      },
      findPw: function () {
        this.$http.post('api/user/find-user/pw', {
          user: {
            user_id: this.user.user_id, 
            phone: this.user.phone, 
            email: this.user.email
          }
        })
        .then (
          alert("메일로 인증번호가 전송되었습니다")
          // (res) => {
          //   alert("메일로 인증번호가 전송되었습니다.")
          //   // alert(res.data.msg);
          // }
          )
          .catch (err => {
            alert(err.response.data.msg); 
          })
      }


    }, 

  }
</script>

<style scoped>
  .line{
    height: 1px;
    width: 100%;
    background-color: gray;
  }
  .line_text{
    background-color: #fff;
    position: relative;
    color: #181818;
    left: 50%;
    transform: translateX(-50%) translateY(-8px);
    width: 40px;
    text-align: center;
    z-index: 100;
  }

</style>
