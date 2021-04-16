<template>
  <div class="app-container">
    <CCard>
      <CCardBody>
        <div>
          <strong> {{item.title}} </strong> <CBadge :color="getColor(item.is_answered)">
          {{item.is_answered === 1 ? "답변완료" : "진행중"}}
        </CBadge>
          <div>
            <span class="text-muted">  {{item.user_id}}</span>
          </div>
          <div>
            <small> {{getDate(item.registered)}}</small>
          </div>
        </div>
        <hr>
        <div >
          <div> <p> {{item.inquiry_content}} </p> </div>
        </div>
      </CCardBody>
    </CCard>
    <CCard  v-show="(item.is_answered === 1)">
      <CCardBody>
        <div>
          <strong> 관리자 답변 </strong>
          <div  >
            <small> {{getDate(item.answered)}}</small>
          </div>
        </div>
        <hr>
        <div >
          <div> <p>
            <textarea v-model="item.answer_content" rows="12" placeholder="답변을 입력하세요" class="form-control">
              </textarea> </p> </div>
        </div>
      </CCardBody>
      <CCardFooter>
        <CButtonGroup>
          <CButton class="btn btn-light" @click="answerInquiry"> 완료 </CButton>
          <CButton class="btn btn-light" @click="goBack"> 취소 </CButton>
        </CButtonGroup>
      </CCardFooter>
    </CCard>
  </div>
</template>

<script>
  import * as INQUIRY_API from "../api/inquries";

export default {
  name: 'AdminInquiryDetail',
  data: function(){
    return {
      item:[],
      fields: [
        { key: 'index', label: '번호' },
        { key: 'title', label: '제목' },
        { key: 'user_id', label: '작성자'},
        { key: 'registered', label: '작성일자'},
        { key: 'is_answered', label: '상태' },
        { key: 'inquiry_content', label: '내용'},
      ],
    }
  },
  mounted() {
    this.getInquiryDetailData(this.$route.params.id)
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    getInquiryDetailData: async function(index){
      try {
        const rs = await INQUIRY_API.getInquiry(index);
        if(rs.code !=="fail") {
          const inquiry = rs.data.result[0]
          this.item = inquiry
        }
      } catch (err) {
        // console.error(err)
      }
    },
    getDate (date) {
      let ts = new Date(date);
      return ts.toLocaleString();
    },
    getColor (is_answered) {
      return is_answered === 1 ? 'success'
              : is_answered === 0 ? 'warning' : 'info'
    },
    answerInquiry: async function(){
      try {
        const rs = await INQUIRY_API.answerInquiry(this.$route.params.id, {inq : this.item});
        if(rs.code !=="fail") {
          alert("수정되었습니다")
          this.goBack()
        }
      } catch (err) {
        // console.error(err)
      }
    },
  }
}
</script>
