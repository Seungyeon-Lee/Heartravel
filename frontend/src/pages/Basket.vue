<template>
    <div>
        <div class="content_top text-center">
            <h1 class="font_18 margin_top_12"><b>장바구니</b></h1>
            <h2 class="font_12 margin_top_24 margin_bottom_24" style="line-height: 1.8"><span class="col_red">*</span>장바구니에 담긴 상품은 3일 동안 보관됩니다.</h2>
        </div>
        <div class="content_bottom">
            <!--TODO: v-if="LIST === undefined || LIST.length === 0"-->
            <div v-if="false" class="text-center margin_top_60 col_right_black font_500">
                현재 장바구니에 담긴 상품은 없습니다.
            </div>
            <div v-else>
                <div class="content_top padding_40" style="padding-bottom: 0">
                    <table class="basket_table">
                        <thead>
                        <tr>
                            <th colspan="4">
                                <div class="checkbox_gray font_12">
                                    <input type="checkbox" id="check_all">
                                    <label for="check_all">전체선택</label>
                                </div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <div class="checkbox_gray">
                                    <input type="checkbox" id="01">
                                    <label for="01"></label>
                                </div>
                            </td>
                            <td><img src="http://drive.google.com/uc?export=view&id=15nfAuHlMPI7jxzl39Dux2D0KsknXtFQ0"></td>
                            <td>
                                <p class="font_12">ZZIBU LEE</p>
                                <p class="font_11">Color - Cute</p>
                                <p class="font_11"><b>1EA</b></p>
                                <p class="font_12">총 주문금액</p>
                            </td>
                            <td class="font_12">56000원</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="checkbox_gray">
                                    <input type="checkbox" id="02">
                                    <label for="02"></label>
                                </div>
                            </td>
                            <td><img src="http://drive.google.com/uc?export=view&id=1_5OPPYfu4PuRT64CgJf1Rmtwi9ezbGqy"></td>
                            <td>
                                <p class="font_12">SOYBEAN MILK</p>
                                <p class="font_11">soy tasty</p>
                                <p class="font_11"><b>1EA</b></p>
                                <p class="font_12">총 주문금액</p>
                            </td>
                            <td class="font_12">56000원</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="padding_40">
                    <table class="price_table">
                        <thead>
                        <tr>
                            <th>결제정보</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>주문금액</td>
                            <td>45528</td>
                        </tr>
                        <tr>
                            <td>배송비</td>
                            <td>2500</td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td>총 결제금액<span class="col_red">*</span></td>
                            <td>47529</td>
                        </tr>
                        </tfoot>
                    </table>
                    <button class="btn_nor margin_top_24" style="border-radius: 2px">주문하기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Basket",
        data: function(){
            return{
                LIST: [],
            }
        }
    }
</script>

<style scoped>
    .list_section{
        background-color: #fff;
        padding: 30px 45px;
    }
    .question{
        background-color: #fff;
    }
    .answer{
        background-color: #f2f2f2;
    }
    .image {
        width: 70px;
        height: 70px;
    }
    .table{
        width: auto;
        display: table;
        margin: 0 10px;
        font-size: 11px;
        height: 100%;
    }
    .table_row{
        display: table-row;
    }
    .table_cell{
        display: table-cell;
        vertical-align: middle;
        color: #2d2a26;
        padding: 0 5px;
    }
    .table_cell:last-child{
        font-weight: 500;
    }
    .order_status{
        margin-bottom:2px;
    }
    .delivery{
        cursor: pointer;
        color: #2D2A26;
        font-weight: 500;
    }
    .slash{
        margin-bottom: 0;
    }

</style>