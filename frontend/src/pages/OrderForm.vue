<template>
    <div class="padding_40" style="padding-top:0">
        <h3 class="font_16 text-center font_600">주문서 작성</h3>
        <div class="order_section merchant">
            <h1>주문상품</h1>
            <div class="flex">
                <div class="width_20">
                    <img src="http://drive.google.com/uc?export=view&id=10XbB7yb2l1bCKCEPxPQX-uaRxpd8EVpv">
                </div>
                <div class="width_100 margin_left_10">
                    <p>Silver Ring Fabric - Wool70, poly15, acryilc8</p>
                    <p>128,000원</p>
                </div>
            </div>
        </div>
        <div class="order_section">
            <h1>주문자</h1>
            <div class="form">
                <input class="input_nor" v-model="ORDER_INFO.name" readonly>
                <input class="input_nor" v-model="ORDER_INFO.phone" readonly>
            </div>
        </div>
        <div class="order_section">
            <div class="checkbox_gray float-right col_gray font_12">
                <input type="checkbox" id="is_same_addr" v-model="is_same_addr">
                <label for="is_same_addr">주문자 정보와 같음</label>
            </div>
            <h1>받으시는분</h1>
            <div class="form">
                <input class="input_nor" v-model="ORDER_FORM.name" placeholder="이름">
                <input class="input_nor" v-model="ORDER_FORM.phone" placeholder="휴대전화">
                <input class="input_nor" v-model="ORDER_FORM.number" placeholder="긴급연락처">
                <div class="flex">
                <input class="input_nor width_50" v-model="ORDER_FORM.zip_code" placeholder="우편번호">
                <button class="btn_nor btn_small_gr">우편번호</button>
                </div>
                <input class="input_nor" v-model="ORDER_FORM.address" placeholder="주소">
                <input class="input_nor" v-model="ORDER_FORM.address_detail" placeholder="나머지 주소">
                <input class="input_nor" v-model="ORDER_FORM.delivery_request" placeholder="배송시 요청사항을 입력해주세요">
            </div>
        </div>
        <div class="order_section">
            <h1>결제수단<span class="col_red">*</span></h1>
            <div class="checkbox_gray">
                <input type="radio" id="card" value="card" v-model="ORDER_FORM.payment">
                <label for="card">신용카드</label>
            </div>
            <div class="checkbox_gray margin_left_10">
                <input type="radio" id="bank" value="bank" v-model="ORDER_FORM.payment">
                <label for="bank">무통장 입금</label>
            </div>
        </div>
        <div class="order_section" style="border-bottom: none;">
            <h1>결제정보</h1>
            <table>
                <tbody>
                <tr>
                    <td>주문금액</td>
                    <td>45528</td>
                </tr>
                <tr>
                    <td>배송비</td>
                    <td>2500</td>
                </tr>
                <tr>
                    <td>할인 / 쿠폰</td>
                    <td>-0</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td>총 결제금액<span class="col_red">*</span></td>
                    <td>58028</td>
                </tr>
                </tfoot>
            </table>
        </div>
        <button class="btn_nor width_90 h_center margin_top_60" style="max-width: 400px">결제하기</button>
    </div>
</template>

<script>
    export default {
        name: "OrderForm",
        data: function(){
            return{
                ORDER_INFO: {
                    name: '이두유',
                    phone: '01026199767',
                },
                ORDER_FORM:{
                    name: '',
                    phone: '',
                    number: '',
                    zip_code: '',
                    address: '',
                    address_detail: '',
                    delivery_request: '',
                    payment: '',
                },
                is_same_addr: false,
            }
        },
        watch:{
            'is_same_addr': function(){
                if(this.is_same_addr){
                    this.ORDER_FORM.name = this.ORDER_INFO.name;
                    this.ORDER_FORM.phone = this.ORDER_INFO.phone;
                    return;
                }
                this.ORDER_FORM.name = '';
                this.ORDER_FORM.phone = '';
            }
        }
    }
</script>

<style scoped>
    .order_section{
        border-bottom: 0.3px solid #707070;
        padding: 20px 0;
        margin-top: 50px;
    }
    .order_section h1{
        font-size: 12px;
        color: #707070;
        font-weight: 800;
        margin-bottom: 10px;
    }
    .order_section > .form{
        padding: 10px 20px 20px 20px;
        box-sizing: border-box;
        border: 0.3px solid #707070;
        font-size: 12px;
    }
    .order_section > .form input{
        width: 100%;
        margin-top: 12px;
        font-weight: 600;
    }
    .order_section > .form input::placeholder{
        font-weight: 500;
    }
    .order_section > .checkbox_gray{
        color: #707070;
        font-size: 12px;
        display: inline-block;
    }
    .order_section table {
        width: 100%;
        font-size: 12px;
        color: #707070;
        font-weight: 500;
        margin-top: 25px;
    }
    .order_section table td{
        padding: 7px 0;
    }
    .order_section table td:first-child{
        text-align: left;
    }
    .order_section table td:last-child{
          text-align: right;
    }
    .order_section table tr:last-child td{
        padding-bottom: 15px;
    }
    .order_section tfoot{
        border-top: 0.3px solid #707070;
    }
    .order_section tfoot td{
        font-size: 14px;
        padding: 30px 0;
        color: #2D2A26;
        font-weight: 800;
    }
    .merchant img{
        width: 100%;
    }
    .merchant p{
        font-size: 12px;
        margin-bottom:5px;
    }
    .width_20{
        max-width: 100px;
    }

</style>