<template>
  <CRow>
    <CCol col="12" >
      <CCard>
        <CCardHeader>
          {{ $route.params.id }}님 상세페이지 수정
        </CCardHeader>
        <CCardBody>
          <CDataTable
                  striped
                  small
                  fixed
                  :items="items"
                  :fields="fields"
          >
            <template #key="{item}">
              <td>
                <div v-if="item.key === 'index'">번호</div>
                <div v-else-if="item.key === 'user_id'">아이디</div>
                <div v-else-if="item.key === 'password'">비밀번호</div>
                <div v-else-if="item.key === 'user_name'">이름</div>
                <div v-else-if="item.key === 'email'">이메일</div>
                <div v-else-if="item.key === 'phone'">전화번호</div>
                <div v-else-if="item.key === 'postcode'">우편번호</div>
                <div v-else-if="item.key === 'address'">주소</div>
                <div v-else-if="item.key === 'address_detail'">상세주소</div>
                <div v-else-if="item.key === 'status_index'">상태</div>
                <div v-else-if="item.key === 'role_index'">권한</div>
                <div v-else-if="item.key === 'registered'">가입 일시</div>
                <div v-else-if="item.key === 'logined'">마지막 로그인 일시</div>
                <div v-else>{{item.key}}</div>
              </td>
            </template>
            <template #value="{item}">
              <td>
                <div v-if="item.key === 'password'">
                  <CInput type="password" name="password" v-model="user.password" autocomplete="off">
                    <template #append>
                      <CButton type="submit" color="secondary" @click="updateUserPassword">비밀번호 변경</CButton>
                    </template>
                  </CInput>
                </div>
                <div v-else-if="item.key === 'index'"> {{item.value}} </div>
                <div v-else-if="item.key === 'user_id'"> {{item.value}} </div>
                <div v-else-if="item.key === 'user_name'"> {{item.value}} </div>
                <div v-else-if="item.key === 'status_index'">
                  <CSelect :options="['정상','휴면','탈퇴']" id="status_index" v-model="user_data.status"/>
                </div>
                <div v-else-if="item.key === 'role_index'">
                  <CSelect :options="['일반','비회원','관리자']" id="role_index"  v-model="user_data.role"/>
                </div>
                <div v-else-if="item.key === 'registered'"> {{getDate(item.value)}} </div>
                <div v-else-if="item.key === 'logined'"> {{getDate(item.value)}} </div>
                <div v-else-if="item.key === 'email'">
                  <CInput type="email" side="sm" name="email" v-model="user.email" autocomplete="email"
                          valid-feedback="이메일 양식과 일치합니다 :)"
                          invalid-feedback="이메일 양식과 일치하지 않습니다 :("
                          :is-valid="validator"
                  />
                </div>
                <div v-else-if="item.key === 'phone'">
                  <CInput type="text" side="sm" name="phone" v-model="user.phone" autocomplete="off"/>
                </div>
                <div v-else-if="item.key === 'postcode'">
                  <CInput type="text" side="sm" name="postcode" v-model="user.postcode" autocomplete="off">
                    <template #append>
                      <CButton type="submit" color="secondary" @click="execDaumPostcode">우편번호 찾기</CButton>
                    </template>
                  </CInput>
                  <div
                          ref="searchWindow"
                          :style="searchWindow"
                          style="border:1px solid;width:500px;margin:5px 0;position:relative"
                          v-show="isSearch"
                  >
                    <img
                            src="//t1.daumcdn.net/postcode/resource/images/close.png"
                            id="btnFoldWrap"
                            style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1"
                            @click="searchWindow.display = 'none'"
                            alt="close"
                    >
                  </div>
                </div>
                <div v-else-if="item.key === 'address'">
                  <CInput type="text" side="sm" name="address" v-model="user.address" autocomplete="off"/>
                </div>
                <div v-else-if="item.key === 'address_detail'">
                  <CInput type="text" side="sm" name="address_detail" v-model="user.address_detail" autocomplete="off"/>
                </div>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
        <CCardFooter>
          <CButtonGroup>
            <CButton @click="goBack">뒤로</CButton>
            <CButton type="submit" @click="updateUserDetailData">수정완료</CButton>
          </CButtonGroup>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
  import * as USER_API from "../api/users";

  export default {
    name: 'AdminUserDetail',
    data: () => {
      return {
        items: [],
        user_data :  {
          role: '',
          status: ''
        },
        isSearch:false,
        user: [],
        fields: [
          {key: 'key', label : '분류', _style: 'width:200px'},
          {key: 'value', label : '정보'}
        ],
        searchWindow: {
          display: 'none',
          height: '300px',
        },
      }
    },
    mounted() {
      this.getUserDetailData(this.$route.params.id)
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      getBadge (status) {
        return status === 1 ? 'success'
                : status === 2 ? 'secondary'
                        : status === 3 ? 'danger': 'primary'
      },
      getUserDetailData:async function (id) {
        const rs = await USER_API.getUserData(id);
        this.user = rs.data.result[0]
        this.user_data.role = this.getAuthOption(this.user.role_index)
        this.user_data.status = this.getStatusOption(this.user.status_index)
        const userDetails = this.user ? Object.entries(this.user) : [['index', 'Not found']]
        this.items = userDetails.map(([key, value]) => {return {key, value}})
      },
      updateUserDetailData: async function(){
        try {
          var si = document.getElementById("status_index") ;
          var ri = document.getElementById("role_index") ;
          this.user.status_index = si.selectedIndex + 1;
          this.user.role_index = ri.selectedIndex + 1;
          const rs = await USER_API.updateUserData(this.user.user_id, {user : this.user});
          if (rs.data.code === "success") {
            this.$router.go(-1)
            alert(this.user.user_name+'님의 회원정보가 수정되었습니다.');
            return;
          }
        } catch (err) {
          // console.error(err)
        }
      },
      updateUserPassword: async function(){
        try {
          const rs = await USER_API.updateUserPassword(this.user.user_id, {user : this.user});
          if (rs.data.code === "success") {
            alert(this.user.user_name+'님의 비밀번호가 수정되었습니다.');
            return;
          }
        } catch (err) {
          // console.error(err)
        }
      },
      getDate (date) {
        let ts = new Date(date);
        return ts.toLocaleString();
      },
      getStatusOption (index) {
        return (index === 1) ? "정상" : (index === 2) ? "휴면" : "탈퇴"
      },
      getAuthOption (index) {
        return (index === 1) ? "일반" : (index === 2) ? "비회원" : "관리자"
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
