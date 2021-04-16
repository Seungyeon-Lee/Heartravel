<template>
    <div class="app-container">
        <CCard>
            <CCardHeader>
                <strong>상품 리스트</strong>
                <CButton @click="addProduct">
                    <small class="text-muted"> 추가</small>
                </CButton>
            </CCardHeader>
            <CCardBody>
            <CDataTable
                    hover
                    striped
                    :loading="isLoading"
                    :items="items"
                    :fields="fields"
                    :items-per-page="perPage"
                    @row-clicked="rowClicked"
                    :pagination="$options.paginationProps"
                    index-column
                    clickable-rows
            >
                <template #prod_name="{item}">
                    <td>
                        <strong>{{item.prod_name}}</strong>
                    </td>
                </template>
                <template #price="{item}">
                    <td>
                       {{numberWithCommas(item.price)}}원
                    </td>
                </template>
                <template #image_path="{item}">
                    <td>
                        <img :src="item.image_path" width="70" height="70"/>
                    </td>
                </template>
                <template #type_index="{item}">
                    <td>
                        <div>
                            {{getTypeOption(item.type_index)}}
                        </div>
                    </td>
                </template>
                <template #status_index="{item}">
                    <td>
                        <div class="sold_out" v-show="item.status_index !== 1">
                            {{getStatusOption(item.status_index)}}
                        </div>
                        <div v-show="item.status_index === 1">-</div>
                    </td>
                </template>
            </CDataTable>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>
    import * as PRODUCT_API from "../api/product";
    export default {
        name: "AdminProductList",
        data () {
            return {
                items: [],
                fields: [
                    { key: 'index', label:'번호'},
                    { key: 'prod_id', label: '상품 아이디' },
                    { key: 'image_path', label: '상품 이미지' },
                    { key: 'type_index', label: '상품분류' },
                    { key: 'prod_name', label: '상품명' },
                    { key: 'price', label: '가격' },
                    { key: 'status_index', label: '상태' }
                ],
                isLoading : true,
                perPage: 5,
            }
        },
        paginationProps: {
            align: 'center',
            doubleArrows: true,
            previousButtonHtml: 'prev',
            nextButtonHtml: 'next'
        },
        mounted() {
            this.getProductData()
        },
        methods: {
            productLink (id) {
                return `/admin/product/${id.toString()}`
            },
            rowClicked (item) {
                const productLink = this.productLink(item.prod_id)
                this.$router.push({path: productLink})
            },
            getProductData: async function(){
                try {
                    const rs = await PRODUCT_API.getProductAll();
                    this.items = rs.data.result;//.sort((a, b) => a.index - b.index)
                    this.isLoading = false;
                } catch (err) {
                    // console.error(err)
                }
            },
            getTypeOption (index) {
                return (index === 1) ? "반지" : (index === 2) ? "목걸이" : "기타"
            },
            getStatusOption (index) {
                return (index === 1) ? "NONE" : (index === 2) ? "NEW" : (index === 3) ? "HOT" : "SOLD OUT"
            },
            getDate (date) {
                let ts = new Date(date);
                return ts.toLocaleString();
            },
            numberWithCommas(x) {
                if(x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,  ",");
            },
            addProduct() {
                this.$router.push('/admin/add-product')
            }
        }
    }
</script>


<style scoped>
    .sold_out{
        background-color: #2D2A26;
        color: #fff;
        font-size: 10px;
        text-align: center;
        width: fit-content;
        padding: 2px;
        font-weight: 200;
        font-family: 'Roboto', sans-serif;
    }
</style>