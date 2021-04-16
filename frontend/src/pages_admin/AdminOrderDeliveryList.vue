<template>
    <div class="app-container">
        <CCard>
            <CCardHeader>
                <strong>배송중 리스트</strong>
            </CCardHeader>
            <CCardBody>
                <CDataTable
                        :items="items"
                        :fields="fields"
                        :items-per-page="perPage"
                        hover
                        sorter
                        table-filter
                        :pagination="$options.paginationProps"
                        index-column
                >
                    <template #order_id="{item}">
                        <td>
                            <CLink @click="rowClicked(item)">
                                {{item.order_id}}
                            </CLink>
                        </td>
                    </template>
                    <template #amount="{item}">
                        <td>
                            {{numberWithCommas(item.tot_price)}}
                        </td>
                    </template>
                    <template #delivery="{item}">
                        <td>
                            {{item.delivery_status}}
                        </td>
                    </template>
                    <template #status_index="{item}">
                        <td>
                            <CBadge :color="getBadge(item.status_index)">
                                {{item.status_index === 1 ? '상품준비중' :
                                item.status_index === 2 ? '배송중' :
                                item.status_index === 3 ? '배송완료' : '구매확정'}}
                            </CBadge>
                        </td>
                    </template>
                    <template #registered="{item}">
                        <td>
                            {{getDate(item.registered)}}
                        </td>
                    </template>
                    <template #show_details="{item}">
                        <td>
                            <CButton class="btn btn-light" size="sm" @click="updateStatus(item.order_description, item.delivery_id)">배송완료</CButton>
                        </td>
                    </template>
                </CDataTable>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>
    import * as DELIVERY_API from "../api/delivery";
    export default {
        name: 'AdminOrderList',
        data() {
            return {
                items: [],
                fields: [
                    {key: 'order_id', label: '주문번호', sorter: false},
                    {key: 'user_id', label: '아이디'},
                    {key: 'user_name', label: '이름'},
                    {key: 'order_description', label: '주문내역', sorter: false},
                    {key: 'registered', label: '주문일자'},
                    {key: 'amount', label: '가격', sorter: false},
                    {key: 'delivery_company', label :'배송회사', sorter:false},
                    {key: 'invoice_num', label:'송장번호', sorter:false},
                    {key: 'status_index', label: '상태', sorter: false},
                    {
                        key: 'show_details',
                        label: '',
                        sorter: false
                    }
                ],
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
            refreshPage() {
                this.$router.go(0)
            },
            getBadge(status) {
                return status === 1 ? 'secondary'
                    : status === 2 ?  'info'
                        : status === 3 ? 'danger' : 'primary'
            },
            orderLink(id) {
                return `/admin/orders/${id.toString()}`
            },
            rowClicked(item) {
                const orderLink = this.orderLink(item.order_id);
                this.$router.push({path: orderLink})
            },
            getOrderData: async function () {
                try {
                    const rs = await DELIVERY_API.getOrderDataDelivery(2);
                    this.items = rs.data.result;//.sort((a, b) => a.index - b.index)
                } catch (err) {
                    // console.error(err)
                }
            },
            getDate(date) {
                let ts = new Date(date);
                return ts.toLocaleString();
            },
            numberWithCommas(x) {
                if(x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,  ",");
            },
            updateStatus: async function (name, id) {
                if (confirm(name + "의 배송 상태를 '배송완료'로 변경하시겠습니까?")) {
                    try {
                        const rs = await DELIVERY_API.updateOrderDataDelivery(id, {status_index: 3});
                        if (rs.data.code === "success") {
                            alert("변경되었습니다");
                            this.refreshPage()
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

<style scoped>

</style>