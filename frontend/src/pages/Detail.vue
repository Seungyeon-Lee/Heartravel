<template>
    <div class="c-app">
        <TheSidebar/>
        <div class="c-wrapper">
            <TheHeader/>
            <div class="c-body">
                <main class="c-main" style="padding-bottom: 100px; min-height:100%">
                    <CContainer fluid>
                        <transition name="fade">
                            <div style="margin: -2rem -15px 0 -15px">
                                <CCardBody>
                                    <CCarousel
                                            arrows
                                            indicators
                                            animate
                                            class="pointer width_100"
                                            alt="ring"
                                    >
                                        <CCarouselItem
                                                image="http://drive.google.com/uc?export=view&id=15nfAuHlMPI7jxzl39Dux2D0KsknXtFQ0"
                                        />
                                        <CCarouselItem
                                                image="http://drive.google.com/uc?export=view&id=1_5OPPYfu4PuRT64CgJf1Rmtwi9ezbGqy"
                                        />
                                        <CCarouselItem
                                                image="https://avatars.githubusercontent.com/u/55937575?v=4"
                                        />
                                    </CCarousel>
                                </CCardBody>
                                <div class="item_wrapper">
                                    <div class="title pointer">{{item}}</div>
                                    <span class="price">128,000원</span>
                                    <span class="sold_out">SOLD OUT</span>
                                </div>
                                <div class="detail_wrapper">
                                    상품에 대한 상세내역을 적자 상품에 대한 상세내역을 적자상품에 대한 상세내역을 적자 상품에 대한 상세내역을 적자 상품에 대한 상세내역을 적자상품에 대한 상세내역을 적자상품에 대한 상세내역을 적자상품에 대한 상세내역을 적자상품에 대한 상세내역을 적자상품에 대한 상세내역을 적자상품에 대한 상세내역을 적자
                                </div>
                                <!--        <div style="margin: inherit">-->
                                <!--            <div class="order_btn">-->
                                <!--                <button>장바구니</button>-->
                                <!--                <button>구매하기</button>-->
                                <!--            </div>-->
                                <!--        </div>-->
                            </div>
                        </transition>
                    </CContainer>
                </main>
            </div>
            <div v-show="UI.IS_SHOW_SELECT_POPUP" class="select_popup">
                <label class="select_option">
                    필수 옵션 / Option
                    <select>
                        <option>yellow</option>
                        <option>white</option>
                    </select>
                </label>
            </div>
            <div class="order_btn">
                <button>장바구니</button>
                <button @click="showSelectPopup">구매하기</button>
            </div>
            <TheFooter/>
        </div>
    </div>
</template>

<script>
    import TheSidebar from '../components_user/TheSidebar'
    import TheHeader from '../components_user/TheHeader'
    import TheFooter from '../components_user/TheFooter'

    export default {
        name: "Detail",
        components: {
            TheSidebar,
            TheHeader,
            TheFooter
        },
        data: function(){
            return{
                UI:{
                  IS_SHOW_SELECT_POPUP: false,
                },
                item: '',
            }
        },
        created: function(){
            this.item = this.$route.params.id;
        },
        mounted: function(){

        },
        methods: {
            goPage:function(target){
                this.$router.push(target);
            },
            showSelectPopup: function(){
                this.UI.IS_SHOW_SELECT_POPUP = true;
            },
        }
    }
</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
    .item_wrapper{
        padding: 20px;
    }
    .item_wrapper img{
        position: relative;
        width: 100%;
    }
    .item_wrapper > .title{
        font-size: 12px;
        font-family: 'Roboto', sans-serif;
        text-align: left;
    }
    .item_wrapper > .price{
        font-size: 12px;
        font-family: 'Roboto', sans-serif;
    }
    .item_wrapper > .sold_out{
        background-color: #2D2A26;
        color: #fff;
        font-size: 10px;
        text-align: center;
        width: fit-content;
        margin-left: 10px;
        padding: 2px;
        font-weight: 200;
        font-family: 'Roboto', sans-serif;
    }
    .order_btn{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        z-index: 1000;
        margin: inherit;
    }
    .order_btn button{
        background-color: #2D2A26;
        width: 50%;
        height: 100%;
        color: #fff;
    }
    .order_btn button:first-child{
        border-right: 1px solid #707070;
    }
    .select_popup{
        position: fixed;
        bottom: 50px;
        left: 0;
        right: 0;
        height: 90px;
        z-index: 1000;
        margin: inherit;
        background-color: #fff;
        box-shadow: 0 -10px 20px -17px rgba(32, 56, 117, 0.35);
        padding: 20px 30px 10px 30px;
    }
    .select_option{
        font-size: 12px;
        width: 100%;
    }
    .select_option select{
        width: 100%;
        margin-top: 8px;
        border: 0.3px solid #707070;
        height: 20px;
    }
</style>