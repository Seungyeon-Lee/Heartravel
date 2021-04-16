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
      <CCardFooter>
        <CButtonGroup>
          <CButton class="btn btn-light" @click="updateInquiry"> 수정 </CButton>
          <CButton class="btn btn-light" @click="deleteInquiry"> 삭제 </CButton>
        </CButtonGroup>
        <CButtonGroup class="float-right">
          <CButton type="button" class="btn btn-light" @click="goBackContent()">
            <CIcon name="cil-caret-left"/>
          </CButton>
          <CButton type="button" class="btn btn-light" @click="goNextContent()" >
            <CIcon name="cil-caret-right"/>
          </CButton>
        </CButtonGroup>
      </CCardFooter>
    </CCard>
    <CCard v-show="(item.is_answered === 1)">
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
      <CCardFooter>
        <CButtonGroup>
          <CButton class="btn btn-light" @click="updateAnswer"> 수정 </CButton>
          <CButton class="btn btn-light" @click="deleteAnswerContent"> 삭제 </CButton>
        </CButtonGroup>
      </CCardFooter>
    </CCard>
    <div  v-show="(item.is_answered === 0)">
              <textarea id="message" v-model="inq.answer_content" rows="12" placeholder="답변을 입력하세요" class="form-control">
              </textarea>
      <CButtonGroup>
        <CButton class="btn btn-light" @click="answerInquiry()">답변하기</CButton>
      </CButtonGroup>
    </div>
  </div>
</template>

<script>
  import * as INQUIRY_API from "../api/inquries";

export default {
  name: 'AdminInquiryDetail',
  data: function(){
    return {
      inq : {
        answer_content : '',
        is_answered: '',
      },
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
    refreshPage() {
      this.$router.go(0)
    },
    updateInquiry() {
      this.$router.push('/admin/inquiry/' + this.$route.params.id + '/update_question')
    },
    updateAnswer() {
      this.$router.push('/admin/inquiry/' + this.$route.params.id + '/update_answer')
    },
    goNextContent: async function() {
      var nextIdx =  (this.$route.params.id * 1 + 1)
      try {
        const rs = await INQUIRY_API.getInquiry(nextIdx);
        if(rs.code !=="fail") {
          const inquiry = rs.data.result[0]
          this.item = inquiry
          this.$router.push('/admin/inquiry/' + nextIdx)
        }
      } catch (err) {
        // console.error(err)
      }
    },
    goBackContent: async function() {
      var backIdx =  (this.$route.params.id * 1 - 1)
      try {
        const rs = await INQUIRY_API.getInquiry(backIdx);
        if(rs.code !=="fail") {
          const inquiry = rs.data.result[0]
          this.item = inquiry
          this.$router.push('/admin/inquiry/' + backIdx)
        }
      } catch (err) {
        // console.error(err)
      }
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
    answerInquiry: async function(){
      try {
        this.inq.is_answered = 1;
        const rs = await INQUIRY_API.answerInquiry(this.$route.params.id, {inq : this.inq});
        if(rs.code !=="fail") {
          alert("답변되었습니다.")
          this.refreshPage()
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
    deleteInquiry: async function() {
      if(confirm("문의를 삭제하시겠습니까?\n답변이 있을 경우 답변도 함께 삭제됩니다.")) {
        try {
          const rs = await INQUIRY_API.deleteInquiry(this.$route.params.id, {inq: this.inq});
          if (rs.data.code === "success") {
            this.goBack()
            alert('삭제되었습니다');
            return;
          }
        } catch (err) {
          // console.error(err)
        }
      }
    },
    deleteAnswerContent : async function() {
      if(confirm("답변을 삭제하시겠습니까?")) {
        try {
          const rs = await INQUIRY_API.deleteAnswer(this.$route.params.id, {inq : this.inq});
          if (rs.data.code === "success") {
            this.refreshPage()
            alert('삭제되었습니다');
            return;
          }
        } catch (err) {
          // console.error(err)
        }
      }
    }
  }
}
</script>
