<template>
    <div>
        <div class="content_top text-center">
            <h1 class="font_18 margin_top_12"><b>주문내역</b></h1>
            <h2 class="font_12 margin_top_24 margin_bottom_24" style="line-height: 1.8">* 배송 이후에는 주문취소가 불가능합니다.<br>1:1 문의를 통해 교환/환불을 문의해주세요.</h2>
        </div>
        <div v-if="ORDER_LIST.length !== 0" class="content_bottom">
            <div class="list_section flex" :class="isEvenIndex(index)" v-for="(list, index) in ORDER_LIST">
                <div class="width_80 border_right_gr flex">
                    <img class="image" src="http://drive.google.com/uc?export=view&id=1DLC2lBT6wluz3kIPXFj3Cdhi0dcOTlYK" alt="product">
                    <div class="table">
                        <div class="table_row">
                            <div class="table_cell">상품명</div>
                            <div class="table_cell">{{list.order_description}}</div>
                        </div>
                        <div class="table_row">
                            <div class="table_cell">날짜</div>
                            <div class="table_cell">{{list.registered}}</div>
                        </div>
                        <div class="table_row">
                            <div class="table_cell">주문번호</div>
                            <div class="table_cell">{{list.order_id}}</div>
                        </div>
                    </div>
                </div>
                <div class="width_20 text-center font_11">
                    <div class="v_center" style="position: relative">
                        <p class="order_status">배송중</p>
                        <p class="delivery">[배송추적]</p>
                        <p class="slash">-</p>
                    </div>
                </div>
            </div>
<!--            <div class="list_section answer flex">-->
<!--                <div class="width_80 border_right_gr flex">-->
<!--                    <img class="image" src="https://avatars.githubusercontent.com/u/55937575?v=4" alt="product">-->
<!--                    <div class="table">-->
<!--                        <div class="table_row">-->
<!--                            <div class="table_cell">상품명</div>-->
<!--                            <div class="table_cell">TURTLE DODIE</div>-->
<!--                        </div>-->
<!--                        <div class="table_row">-->
<!--                            <div class="table_cell">날짜</div>-->
<!--                            <div class="table_cell">2020. 01.13</div>-->
<!--                        </div>-->
<!--                        <div class="table_row">-->
<!--                            <div class="table_cell">주문번호</div>-->
<!--                            <div class="table_cell">2020015893</div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="width_20 text-center font_11">-->
<!--                    <div class="v_center" style="position: relative">-->
<!--                        <p class="order_status">결제완료</p>-->
<!--                        <button class="btn_transparent margin_top_12">주문취소</button>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="list_section question flex">-->
<!--                <div class="width_80 border_right_gr flex">-->
<!--                    <img class="image" src="http://drive.google.com/uc?export=view&id=1eW99LsM5ouGD3DWts09EaMZMi5HwZBr6" alt="product">-->
<!--                    <div class="table">-->
<!--                        <div class="table_row">-->
<!--                            <div class="table_cell">상품명</div>-->
<!--                            <div class="table_cell">SOYBEAN MILK</div>-->
<!--                        </div>-->
<!--                        <div class="table_row">-->
<!--                            <div class="table_cell">날짜</div>-->
<!--                            <div class="table_cell">2020. 01.13</div>-->
<!--                        </div>-->
<!--                        <div class="table_row">-->
<!--                            <div class="table_cell">주문번호</div>-->
<!--                            <div class="table_cell">2020015893</div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="width_20 text-center font_11">-->
<!--                    <div class="v_center" style="position: relative">-->
<!--                        <p class="order_status">배송완료</p>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="list_section answer flex">-->
<!--                <div class="width_80 border_right_gr flex">-->
<!--                    <img class="image" src="http://drive.google.com/uc?export=view&id=10XbB7yb2l1bCKCEPxPQX-uaRxpd8EVpv" alt="product">-->
<!--                    <div class="table">-->
<!--                        <div class="table_row">-->
<!--                            <div class="table_cell">상품명</div>-->
<!--                            <div class="table_cell"ZZIBU LEE</div>-->
<!--                        </div>-->
<!--                        <div class="table_row">-->
<!--                            <div class="table_cell">날짜</div>-->
<!--                            <div class="table_cell">2020. 01.13</div>-->
<!--                        </div>-->
<!--                        <div class="table_row">-->
<!--                            <div class="table_cell">주문번호</div>-->
<!--                            <div class="table_cell">2020015893</div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="width_20 text-center font_11">-->
<!--                    <div class="v_center" style="position: relative">-->
<!--                        <p class="order_status">배송중</p>-->
<!--                        <p class="delivery">[배송추적]</p>-->
<!--                        <p class="slash">-</p>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
        </div>
        <div v-else class="content_bottom text-center margin_top_60" >
            주문한 내역이 없습니다.
        </div>
    </div>
</template>

<script>
    import * as API from '../api/orders'

    export default {
        name: "OrderList",
        data(){
            return{
                ORDER_LIST: [],
            }
        },
        created() {
            this.getList();
        },
        methods: {
            isEvenIndex(index){
                return (index % 2)? "question":"answer";
            },
            getList: async function(){
                try{
                    const rs = await API.getUserOrderData('please');
                    console.log("rs",rs);
                    this.ORDER_LIST = rs.data.result;
                } catch (e) {
                    console.error(e);
                }
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