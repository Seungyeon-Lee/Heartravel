(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3ec0a208"],{"4e60":function(e,t,n){"use strict";n.d(t,"e",(function(){return a})),n.d(t,"d",(function(){return s})),n.d(t,"a",(function(){return u})),n.d(t,"f",(function(){return o})),n.d(t,"c",(function(){return c})),n.d(t,"b",(function(){return d}));var r=n("bc3a"),i=n.n(r);function a(e){return i()({method:"get",url:"/api/inquiries/",data:e})}function s(e,t){return i()({method:"get",url:"/api/inquiries/"+e,data:t})}function u(e,t){return i()({method:"put",url:"/api/inquiries/"+e+"/answer",data:t})}function o(e,t){return i()({method:"put",url:"/api/inquiries/"+e,data:t})}function c(e,t){return i()({method:"delete",url:"/api/inquiries/"+e,data:t})}function d(e,t){return i()({method:"delete",url:"/api/inquiries/"+e+"/answer",data:t})}},8473:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("CCard",[n("CCardBody",[n("div",[n("strong",[e._v(" "+e._s(e.item.title)+" ")]),e._v(" "),n("CBadge",{attrs:{color:e.getColor(e.item.is_answered)}},[e._v(" "+e._s(1===e.item.is_answered?"답변완료":"진행중")+" ")]),n("div",[n("span",{staticClass:"text-muted"},[e._v(" "+e._s(e.item.user_id))])]),n("div",[n("small",[e._v(" "+e._s(e.getDate(e.item.registered)))])])],1),n("hr"),n("div",[n("div",[n("p",[e._v(" "+e._s(e.item.inquiry_content)+" ")])])])])],1),n("CCard",{directives:[{name:"show",rawName:"v-show",value:1===e.item.is_answered,expression:"(item.is_answered === 1)"}]},[n("CCardBody",[n("div",[n("strong",[e._v(" 관리자 답변 ")]),n("div",[n("small",[e._v(" "+e._s(e.getDate(e.item.answered)))])])]),n("hr"),n("div",[n("div",[n("p",[n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.item.answer_content,expression:"item.answer_content"}],staticClass:"form-control",attrs:{rows:"12",placeholder:"답변을 입력하세요"},domProps:{value:e.item.answer_content},on:{input:function(t){t.target.composing||e.$set(e.item,"answer_content",t.target.value)}}})])])])]),n("CCardFooter",[n("CButtonGroup",[n("CButton",{staticClass:"btn btn-light",on:{click:e.answerInquiry}},[e._v(" 완료 ")]),n("CButton",{staticClass:"btn btn-light",on:{click:e.goBack}},[e._v(" 취소 ")])],1)],1)],1)],1)},i=[],a=(n("96cf"),n("1da1")),s=n("4e60"),u={name:"AdminInquiryDetail",data:function(){return{item:[],fields:[{key:"index",label:"번호"},{key:"title",label:"제목"},{key:"user_id",label:"작성자"},{key:"registered",label:"작성일자"},{key:"is_answered",label:"상태"},{key:"inquiry_content",label:"내용"}]}},mounted:function(){this.getInquiryDetailData(this.$route.params.id)},methods:{goBack:function(){this.$router.go(-1)},getInquiryDetailData:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s["d"](t);case 3:n=e.sent,"fail"!==n.code&&(r=n.data.result[0],this.item=r),e.next=9;break;case 7:e.prev=7,e.t0=e["catch"](0);case 9:case"end":return e.stop()}}),e,this,[[0,7]])})));function t(t){return e.apply(this,arguments)}return t}(),getDate:function(e){var t=new Date(e);return t.toLocaleString()},getColor:function(e){return 1===e?"success":0===e?"warning":"info"},answerInquiry:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s["a"](this.$route.params.id,{inq:this.item});case 3:t=e.sent,"fail"!==t.code&&(alert("수정되었습니다"),this.goBack()),e.next=9;break;case 7:e.prev=7,e.t0=e["catch"](0);case 9:case"end":return e.stop()}}),e,this,[[0,7]])})));function t(){return e.apply(this,arguments)}return t}()}},o=u,c=n("2877"),d=Object(c["a"])(o,r,i,!1,null,null,null);t["default"]=d.exports}}]);
//# sourceMappingURL=chunk-3ec0a208.96c9cf17.js.map