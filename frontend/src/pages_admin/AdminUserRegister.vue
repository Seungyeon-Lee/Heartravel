<template>
  <div class="app-container">
    <CCard>
      <CCardHeader>
        <strong>회원 등록</strong>
      </CCardHeader>
      <CCardBody>
        <CForm>
          <CInput placeholder="이름"
                  type="text" v-model="user.user_name" autocomplete="off">
            <template #prepend-content><CIcon name="cil-user-follow"/></template>
          </CInput>
          <CInput placeholder="아이디"
                  type="text" v-model="user.user_id" autocomplete="off">
            <template #prepend-content><CIcon name="cil-user"/></template>
          </CInput>
          <CInput placeholder="비밀번호"
                  type="password" v-model="user.password" autocomplete="off">
            <template #prepend-content><CIcon name="cil-lock-locked"/></template>
          </CInput>
          <CInput placeholder="전화번호"
                  type="tel" v-model="user.phone" autocomplete="off">
            <template #prepend-content><CIcon name="cil-phone"/></template>
          </CInput>
          <CInput placeholder="이메일"
                  valid-feedback="이메일 양식과 일치합니다 :)"
                  invalid-feedback="이메일 양식과 일치하지 않습니다 :("
                  :is-valid="validator"
                  v-model="user.email" autocomplete="off" prepend="@"/>
          <CInput placeholder="우편번호 검색"
                  type="text" v-model="user.postcode" autocomplete="off">
            <template #append>
              <CButton color="secondary" @click="execDaumPostcode">우편번호 찾기</CButton>
            </template>
          </CInput>
          <div
                  ref="searchWindow"
                  :style="searchWindow"
                  style="border:1px solid;width:500px;margin:5px 0;position:relative"
          >
            <img
                    src="//t1.daumcdn.net/postcode/resource/images/close.png"
                    id="btnFoldWrap"
                    style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1"
                    @click="searchWindow.display = 'none'"
                    alt="close"
            >
          </div>
          <CInput placeholder="주소"
                  type="text" v-model="user.address" autocomplete="off"/>
          <CInput placeholder="상세주소"
                  type="text" v-model="user.address_detail" autocomplete="off"/>
        </CForm>
        <CButtonGroup class="h_center">
        <CButton type="submit" color="secondary" @click="signUp">등록</CButton>
        <CButton type="submit" color="secondary" @click="goBack">취소</CButton>
        </CButtonGroup>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
  import * as LOGIN_API from "../api/login";

  export default {
    name: 'Register',
    data:function() {
      return {
        user: {
          user_id: '',
          password: '',
          user_name: '',
          postcode: '',
          address: '',
          address_detail: '',
          phone: '',
          email: ''
        },
        searchWindow: {
          display: 'none',
          height: '300px',
        },

      }
    },
    methods : {
      goBack() {
        this.$router.push('/admin/users')
      },
      signUp: async function () {
        try {
          const rs = await LOGIN_API.signUp({user : this.user});
          if (rs.data.code === "success") {
            alert(this.user.user_name + '님 가입되었습니다.');
            this.goBack()
            return;
          }
        } catch (err) {
          // console.error(err)
        }
      },
      validator (val) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(val);
      },
      execDaumPostcode() {
        this.isSearch = true
        const currentScroll = Math.max(
                document.body.scrollTop,
                document.documentElement.scrollTop,
        );
        // eslint-disable-next-line
        new daum.Postcode({
          onComplete: (data) => {
            if (data.userSelectedType === 'R') {
              this.user.address = data.roadAddress;
            } else {
              this.user.address = data.jibunAddress;
            }
            if (data.userSelectedType === 'R') {
              if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                this.user.address_detail += data.bname;
              }
              if (data.buildingName !== '' && data.apartment === 'Y') {
                this.user.address_detail +=
                        this.user.address_detail !== ''
                                ? `, ${data.buildingName}`
                                : data.buildingName;
              }
              if (this.user.address_detail !== '') {
                this.user.address_detail = ` (${this.user.address_detail})`;
              }
            } else {
              this.user.address_detail = '';
            }
            this.user.postcode = data.zonecode;
            this.searchWindow.display = 'none';
            document.body.scrollTop = currentScroll;
          },
          onResize: (size) => {
            this.searchWindow.height = `${size.height}px`;
          },
          width: '100%',
          height: '100%',
        }).embed(this.$refs.searchWindow);
        this.searchWindow.display = 'block';
      },
    }
  }
</script>
