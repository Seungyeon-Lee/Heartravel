<template>
    <div>
        <div class="content_top text-center">
            <h1 class="font_16"><b>1:1 문의</b></h1>
            <h2 class="font_15 margin_top_60 margin_bottom_24">이두유님 안녕하세요!</h2>
        </div>
        <div class="content_bottom">
            <div class="qna_section question">
                <button @click="showPopup"></button>
                <p class="name">이두유</p>
                <p class="date">2020.01.04  21:09</p>
                <p class="content">반품 배송비 5000원 이두유 이름으로 입금했습니다! 확인 후 반품 처리 부탁드려요=)</p>
            </div>
            <div class="qna_section answer">
                <p class="name">관리자</p>
                <p class="date">2020.01.04  21:09</p>
                <p class="content">해당건 확인되어 취소처리 도와드렸습니다! 감사합니다 ^^ 앞으로도 많이 구매해주세요. 저 부자되게^^</p>
            </div>
            <div class="qna_section question">
                <button @click="showPopup"></button>
                <p class="name">이두유</p>
                <p class="date">2020.01.04  21:09</p>
                <p class="content">반품 배송비 5000원 이두유 이름으로 입금했습니다! 확인 후 반품 처리 부탁드려요=)</p>
            </div>
            <div class="qna_section answer">
                <p class="name">관리자</p>
                <p class="date">2020.01.04  21:09</p>
                <p class="content">해당건 확인되어 취소처리 도와드렸습니다! 감사합니다 ^^ 앞으로도 많이 구매해주세요. 저 부자되게^^</p>
            </div>
            <div class="qna">
                <textarea class="qna_input" placeholder="문의할 글을 입력해주세요"></textarea>
                <input type="file">
                <button class="btn_nor qna_btn">문의하기</button>
            </div>
        </div>

        <div v-show="UI.IS_SHOW_POPUP">
            <div class="a_wrapper" style="z-index: 10000">
                <div class="gray_background" @click="closePopup" style="z-index: 0"></div>
                <div class="qna_popup h_center">
                    <button class="width_100">수정</button>
                    <button class="btn_white width_100 margin_bottom_20">삭제</button>
                    <button class="btn_white width_100" @click="closePopup">취소</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Qna",
        data: function() {
            return{
                UI:{
                    IS_SHOW_POPUP: false
                }

            }
        },
        methods:{
            showPopup:function(){
                //TODO: 상품 아이디 전달받기
                this.UI.IS_SHOW_POPUP = true;
            },
            closePopup: function(){
                this.UI.IS_SHOW_POPUP = false;
            }
        }
    }
</script>

<style scoped>
    .qna_section{
        background-color: #fff;
        padding: 30px 45px;
    }
    .qna_section button{
        background-image: url(/static/images/icon_24_more.png);
        background-repeat: no-repeat;
        background-size: 24px;
        background-position: center;
        width: 24px;
        height: 18px;
        margin-right: -15px;
        padding: 0;
        float: right;
    }
    .qna_section > .name{
        font-size: 14px;
        margin: 0;
    }
    .question > .name:before{
        content: 'Q.';
        position: absolute;
        margin-left: -20px;
    }
    .answer > .name:before{
        content: 'A.';
        position: absolute;
        margin-left: -20px;
    }
    .qna_section > .date{
        font-size: 12px;
        font-weight: 500;
    }
    .qna_section > .content{
        font-size: 12px;
        font-weight: 500;
    }
    .question{
        background-color: #fff;
    }
    .answer{
        background-color: #f2f2f2;
    }
    .qna_popup{
        padding: 40px;
        position: absolute;
        bottom: 0;
    }
    .qna_popup button{
        display: block;
        width: 300px;
        background-color: #fff;
        border-radius: 8px;
        height: 40px;
        font-size: 12px;
        border: 0.1px solid #707070;
    }
    .qna_popup button:first-child{
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    .qna_popup button:nth-child(2){
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    .qna{
        background-color: #fff;
        padding: 30px 45px;
        height: 300px;
        width: 100%;
    }
    .qna_input{
        width: 100%;
        height: 80%;
        border: 0.5px solid lightgray;
        padding: 20px;
        border-radius: 8px;
    }
    .qna_btn{
        width: 100%;
        margin-top: 24px;
    }
</style>