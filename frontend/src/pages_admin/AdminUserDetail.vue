<template>
  <CRow>
    <CCol col="12" >
      <CCard>
        <CCardHeader>
          {{ $route.params.id }}님 상세페이지
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
                <div v-if="item.key === 'password'">******</div>
                <div v-else-if="item.key === 'registered' || item.key === 'logined'">{{getDate(item.value)}}</div>
                <div v-else-if="item.key === 'status_index'">
                  <CBadge :color="getBadge(item.value)">
                    {{getStatusOption(item.value)}}
                  </CBadge>
                </div>
                <div v-else-if="item.key === 'role_index'">
                  {{getAuthOption(item.value)}}
                </div>
                <div v-else>{{item.value}}</div>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
        <CCardFooter>
          <CButtonGroup class="h_center">
            <CButton color="btn btn-light" @click="goUpdate">수정</CButton>
            <CButton color="btn btn-light" @click="goBack">목록</CButton>
            <CButton color="btn btn-light" @click="deleteUser">삭제</CButton>
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
        fields: [
          {key: 'key', label : '분류', _style: 'width:200px'},
          {key: 'value', label : '정보'}
        ]
      }
    },
    mounted() {
      this.getUserDetailData(this.$route.params.id)
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      goUpdate() {
        this.$router.push({path: '/admin/users/update/' + this.$route.params.id })
      },
      getBadge (status) {
        return status === 1 ? 'success'
                : status === 2 ? 'secondary'
                        : status === 3 ? 'danger': 'primary'
      },
      getUserDetailData:async function (id) {
        const rs = await USER_API.getUserData(id);
        const user = rs.data.result[0]
        const userDetails = user ? Object.entries(user) : [['index', 'Not found']]
        this.items = userDetails.map(([key, value]) => {return {key, value}})
      },
      deleteUser:async function () {
        if(confirm(this.$route.params.id + "님의 회원 정보가 삭제하시겠습니까?")) {
          try {
            const rs = await USER_API.deleteUserData(this.$route.params.id);
            if (rs.status === 204) {
              alert(this.$route.params.id + '님의 회원정보가 삭제되었습니다');
              this.goBack();
            }
          } catch (err) {
            // console.error(err)
          }
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
      setNumber(number) {
        number.match( /^\d{11}$/ )
        /* 휴대폰 번호에 대시 삽입 */
        number= number.substr(0, 3) + "-" + number.substr(3, 4) + "-" + number.substr(7,4);
      }
    }
  }
</script>
