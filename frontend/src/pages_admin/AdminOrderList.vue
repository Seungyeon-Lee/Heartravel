<template>
    <div class="app-container">
        <CCard>
            <CCardHeader>
                <strong>주문 통합 리스트</strong>
            </CCardHeader>
            <CCardBody>
                <CDataTable
                        :items="items"
                        :fields="fields"
                        :items-per-page="perPage"
                        hover
                        sorter
                        table-filter
                        @row-clicked="rowClicked"
                        :pagination="$options.paginationProps"
                        index-column
                        clickable-rows
                >
                    <template #user_id="{item}">
                        <td>
                          <CLink @click="goUserPage(item.user_id)">
                              {{item.user_id}} </CLink>
                        </td>
                    </template>
                    <template #price="{item}">
                        <td>
                            {{numberWithCommas(item.tot_price)}}
                        </td>
                    </template>
                    <template #delivery="{item}">
                        <td>
                            {{item.delivery_status === '상품준비중' ? ' ' : item.delivery_status}}
                        </td>
                    </template>
                    <template #payment="{item}">
                        <td>
                            {{item.payment_status}}
                        </td>
                    </template>
                    <template #registered="{item}">
                        <td>
                            {{getDate(item.registered)}}
                        </td>
                    </template>
                </CDataTable>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>
    import * as ORDER_API from "../api/orders";
    import fields from './OrderDataFilter'

    export default {
        name: 'AdminOrderList',
        data () {
            return {
                items : [],
                fields,
                details: [],
                perPage: 10,
            }
        },
        paginationProps: {
            align: 'center',
            doubleArrows: true,
            previousButtonHtml: 'prev',
            nextButtonHtml: 'next'
        },
        mounted() {
            this.getOrderData()
        },
        methods: {
            getBadge (status) {
                return status === 1 ? 'success'
                    : status === 2 ? 'secondary'
                        : status === 3 ? 'danger': 'primary'
            },
            orderLink (id) {
                return `/admin/orders/${id.toString()}`
            },
            rowClicked (item) {
                const orderLink = this.orderLink(item.order_id);
                this.$router.push({path: orderLink})
            },
            getOrderData: async function(){
                try {
                    const rs = await ORDER_API.getOrderDataAll();
                    this.items = rs.data.result;//.sort((a, b) => a.index - b.index)
                } catch (err) {
                     console.error(err)
                }
            },
            getDate (date) {
                let ts = new Date(date);
                return ts.toLocaleString();
            },
            numberWithCommas(x) {
                if(x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,  ",");
            },
            goUserPage(id) {
                this.$router.push({path: '/admin/users/' + id});
            }
        }
    }
</script>

<style scoped>

</style>