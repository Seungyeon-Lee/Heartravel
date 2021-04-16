<template>
  <CRow>
    <CCol col="12">
      <CCard>
        <CCardHeader>
          {{ this.order.order_description }}
          <small class="text-muted">  {{ $route.params.id }} </small>
        </CCardHeader>
        <CCardBody>
          <div>
            <CRow>
              <CCol class="bg-dark py-2">
                주문내역
              </CCol>
            </CRow>
            <table class="basket_table">
              <tbody>
              <tr v-for="item in product">
                <td><img :src="item.image_path" alt="product"></td>
                <td>
                  <p class="font_12">{{item.prod_name}}</p>
                  <p class="font_11">{{item.prod_id}}</p>
                  <p class="font_11"><b>{{item.prod_cnt}}개</b></p>
                  <p class="font_12">주문금액</p>
                </td>
                <td class="font_12">{{numberWithCommas(item.tot_price)}}원</td>
              </tr>

              </tbody>
            </table>
            <hr>
            <p class="float-right">총 주문금액 <b>{{numberWithCommas(this.order.tot_price)}}원</b> </p><br>
          </div>
          <div>
            <br>
            <CRow>
              <CCol class="bg-dark py-2">
                주문정보
              </CCol>
            </CRow>
            <table class="table">
              <tr><td>아이디</td><td> {{this.order.user_id}}</td></tr>
              <tr><td>가격</td><td>{{numberWithCommas(this.order.tot_price)}}원</td></tr>
              <tr><td>주문내역</td><td>{{this.order.order_description}}</td></tr>
              <tr><td>주문일</td><td> {{getDate(this.order.registered)}}</td></tr>
              <tr><td>받는 사람</td><td>
                  <CInput type="text" side="sm" name="receiver_name" v-model="delivery.receiver_name" autocomplete="off"/>
                </td></tr>
                <tr><td>연락처</td><td>
                  <CInput type="text" side="sm" name="receiver_phone" v-model="delivery.receiver_phone" autocomplete="off"/>
                </td></tr>
                <tr><td>비상 연락처</td><td>
                  <CInput type="text" side="sm" name="emerge_phone" v-model="delivery.emerge_phone" autocomplete="off"/>
                </td></tr>
                <tr><td>우편번호</td><td>
                  <CInput type="text" side="sm" name="postcode" v-model="delivery.receiver_postcode" autocomplete="off">
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
                </td></tr>
                <tr><td>주소</td><td>
                  <CInput type="text" side="sm" name="receiver_address"
                          v-model="delivery.receiver_address" autocomplete="off"/>
                </td></tr>
                <tr><td>상세주소</td><td>
                  <CInput type="text" side="sm" name="address_detail"
                          v-model="delivery.receiver_address_detail" autocomplete="off"/>
                </td></tr>
                <tr><td>요청사항</td><td>
                  <CInput type="text" side="sm" name="receiver_request"
                          v-model="delivery.receiver_request" autocomplete="off"/>
                </td></tr>
            </table>
          </div>
          <div>
            <CRow>
              <CCol class="bg-dark py-2">
                결제정보
              </CCol>
            </CRow>
            <table class="table">
              <tr><td>결제상태</td>
                <td><select @change="updatePaymentStatus" class="form-control"
                         id="payment_status" v-model="order_data.payment">
                  <option value="결제대기">결제대기</option>
                  <option value="결제완료">결제완료</option>
                  <option value="주문취소">주문취소</option>
                  <option value="환불완료">환불완료</option>
                </select>
                </td></tr>
              <tr v-show="this.payment.is_paid === 1"><td>결제일</td><td> {{getDate(this.payment.paid)}}</td></tr>
            </table>
          </div>
          <div v-show="this.payment.is_paid === 1">
            <CRow>
              <CCol class="bg-dark py-2">
                배송정보
              </CCol>
            </CRow>
            <table class="table">
              <tr><td>송장번호</td><td>
               <CInput type="text" side="sm" name="invoice_num"
                        v-model="delivery.invoice_num" autocomplete="off"/>
              </td></tr>
              <tr><td>배송회사</td><td>
                <CInput type="text" side="sm" name="delivery_company"
                        v-model="delivery.delivery_company" autocomplete="off"/>
              </td></tr>
              <tr><td>배송상태</td>
                <td><select @change="updateDeliveryStatus" class="form-control"
                            id="delivery_status" v-model="order_data.delivery">
                  <option value="상품준비중">상품준비중</option>
                  <option value="배송준비중">배송준비중</option>
                  <option value="배송중">배송중</option>
                  <option value="배송완료">배송완료</option>
                </select>
                </td></tr>
              <tr v-show="this.delivery.is_delivered === 1"><td>배송일</td><td> {{getDate(this.delivery.delivered)}}</td></tr>
            </table>
          </div>
        </CCardBody>
        <CCardFooter>
          <CButtonGroup class="h_center">
            <CButton color="btn btn-light" @click="updateReceiverInfo">주문정보 변경</CButton>
            <CButton color="btn btn-light" @click="goBack">목록</CButton>
          </CButtonGroup>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
  import * as ORDER_API from "../api/orders";
  import * as PAYMENT_API from "../api/payment";
  import * as DELIVERY_API from "../api/delivery";
  export default {
    name: 'AdminUserDetail',
    data: () => {
      return {
        product : [],
        order: [],
        payment : [],
        delivery : {
          receiver_address: '',
          receiver_address_detail : ''
        },
        receiver : {
          name : '',
          phone : '',
          emerge_phone :'',
          postcode :'',
          address : '',
          address_detail : '',
          request : ''
        },
        order_data : {
          payment : '',
          delivery : ''
        },
        isSearch:false,
        searchWindow: {
          display: 'none',
          height: '300px',
        },
      }
    },
    mounted() {
      this.getOrderDetailData(this.$route.params.id)
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      refreshPage() {
        this.$router.go(0)
      },
      goUpdate() {
        this.$router.push({path: '/admin/users/update/' + this.$route.params.id })
      },
      getBadge (status) {
        return status === 1 ? 'success'
                : status === 2 ? 'secondary'
                        : status === 3 ? 'danger': 'primary'
      },
      getData(event) {
        alert(event.target.value)
      },
      getOrderDetailData:async function (id) {
        const rs = await ORDER_API.getOrderData(id);
        this.order = rs.data.result[0];
        this.getProductDetailData(id);
        this.getPaymentDetailData(this.order.payment_id);
        this.getDeliveryDetailData(this.order.delivery_id);
      },
      getProductDetailData:async function (id) {
        const rs = await ORDER_API.getOrderProductData(id);
        this.product = rs.data.result;
      },
      getPaymentDetailData:async function (id) {
        const rs = await PAYMENT_API.getPaymentData(id);
        this.payment = rs.data.result[0];
        this.order_data.payment = this.getPaymentStatusOption(this.payment.status_index);
      },
      getDeliveryDetailData:async function (id) {
        const rs = await DELIVERY_API.getDeliveryData(id);
        this.delivery= rs.data.result[0];
        this.order_data.delivery = this.getDeliveryStatusOption(this.delivery.status_index);
      },
      getDate (date) {
        let ts = new Date(date);
        return ts.toLocaleString();
      },
      getPaymentStatusOption (index) {
        return (index === 1) ? "결제대기" : (index === 2) ? "결제완료" : (index === 3) ? "주문취소" : "환불완료"
      },
      getDeliveryStatusOption (index) {
        return (index === 1) ? "상품준비중" : (index === 2) ? "배송준비중" : (index === 3) ? "배송중" : "배송완료"
      },
      numberWithCommas(x) {
        if(x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      updatePaymentStatus: async function (event) {
        let index = (event.target.value === '결제대기') ? 1 : (event.target.value === '결제완료') ? 2 :
                (event.target.value === '주문취소') ? 3 : 4;
        if (confirm("결제 상태를 " + event.target.value + "로 변경하시겠습니까?")) {
          try {

            const rs = await PAYMENT_API.updateOrderDataPayment(this.payment.payment_id, {payment: {status_index: index}});
            if (rs.data.code === "success") {
              alert("변경되었습니다");
              this.refreshPage();
            }
          } catch (err) {
            // console.error(err)
          }
        }
      },
      updateDeliveryStatus: async function (event) {
        let index = (event.target.value === '배송준비중') ? 2 : (event.target.value === '배송중') ? 3 :
                (event.target.value === '배송완료') ? 4 : 1;

        this.delivery.status_index = index;
        if (confirm("배송 상태를 "+event.target.value+"로 변경하시겠습니까?")) {
          try {
            const rs = await DELIVERY_API.updateDeliveryInformation(this.delivery.delivery_id, {delivery: this.delivery});
            if (rs.data.code === "success") {
              alert("변경되었습니다");
              this.refreshPage();
            }
          } catch (err) {
            // console.error(err)
          }
        }
      },
      updateReceiverInfo : async function () {
        try {
          this.receiver.name = this.delivery.receiver_name;
          this.receiver.phone = this.delivery.receiver_phone;
          this.receiver.emerge_phone = this.delivery.emerge_phone;
          this.receiver.postcode = this.delivery.receiver_postcode;
          this.receiver.address = this.delivery.receiver_address;
          this.receiver.address_detail = this.delivery.receiver_address_detail;
          this.receiver.request = this.delivery.receiver_request;

          const rs = await DELIVERY_API.updateReceiverInfoDelivery(this.delivery.delivery_id, {receiver: this.receiver});
          if (rs.data.code === "success") {
            alert("변경되었습니다");
            this.refreshPage();
          }
        } catch (err) {
          // console.error(err)
        }
      },
      execDaumPostcode() {
        this.isSearch = true;
        const currentScroll = Math.max(
                document.body.scrollTop,
                document.documentElement.scrollTop,
        );
        // eslint-disable-next-line
        new daum.Postcode({
          onComplete: (data) => {
            if (data.userSelectedType === 'R') {
              this.delivery.receiver_address = data.roadAddress;
            } else {
              this.delivery.receiver_address = data.jibunAddress;
            }
            if (data.userSelectedType === 'R') {
              if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                this.delivery.receiver_address_detail += data.bname;
              }
              if (data.buildingName !== '' && data.apartment === 'Y') {
                this.delivery.receiver_address_detail +=
                        this.delivery.receiver_address_detail !== ''
                                ? `, ${data.buildingName}`
                                : data.buildingName;
              }
              if (this.delivery.receiver_address_detail !== '') {
                this.delivery.receiver_address_detail = ` (${this.delivery.receiver_address_detail})`;
              }
            } else {
              this.delivery.receiver_address_detail = '';
            }
            this.delivery.receiver_postcode = data.zonecode;
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
    },
    computed: {
      rawColumnNames () {
        if (this.fields) {
          return this.fields.map(el => el.key || el)
        }
        return this.generatedColumnNames
      },
      columnNames () {
        if (this.fields) {
          return this.fields.map(f => {
            return f.label !== undefined ? f.label : this.pretifyName(f.key || f)
          })
        }
        return this.rawColumnNames.map(el => this.pretifyName(el))
      },
      dragOptions() {
        return {
          animation: 0,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        };
      }
    }
  }
</script>
