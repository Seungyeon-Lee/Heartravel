<template>
  <div class="app-container">
    <CCard>
      <CCardBody>
        <div>
          <strong>
            <CInput type="text" label="제목" v-model="item.title"/>
          </strong>
          <div>
            <span class="text-muted">  {{item.user_id}}</span>
          </div>
          <div>
            <small> {{getDate(item.registered)}}</small>
          </div>
        </div>
        <hr>
        <div >
          <div> <p>
            <textarea v-model="item.inquiry_content" rows="12" placeholder="문의를 입력하세요" class="form-control">
              </textarea> </p> </div>
        </div>
      </CCardBody>
      <CCardFooter>
        <CButtonGroup>
          <CButton class="btn btn-light" @click="updateInquiry"> 완료 </CButton>
          <CButton class="btn btn-light" @click="goBack"> 취소 </CButton>
        </CButtonGroup>
      </CCardFooter>
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
          <div> <p> {{item.answer_content}} </p></div>
        </div>
      </CCardBody>
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
    updateInquiry: async function(){
      try {
        const rs = await INQUIRY_API.updateInquiry(this.$route.params.id, {inq : this.item});
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
