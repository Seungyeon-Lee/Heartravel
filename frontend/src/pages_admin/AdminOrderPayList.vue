<template>
    <div class="app-container">
        <CCard>
            <CCardHeader>
                <strong>결제 완료 리스트</strong>
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
                    <template #payment_status="{item}">
                        <td>
                            <CBadge :color="getBadge(item.payment_status)">
                                {{item.payment_status === 1 ? '결제대기' :
                                item.payment_status === 2 ? '결제완료' :
                                item.payment_status === 3 ? '주문취소' : '환불완료'}}
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
                            <CInput placeholder="배송회사 입력" size="sm"
                                    type="text" v-model="item.delivery_company" autocomplete="off"/>
                            <CInput placeholder="송장번호 입력" size="sm"
                                    type="text" v-model="item.invoice_num" autocomplete="off">
                                <template #append>
                                    <CButton class="btn btn-light" size="sm" @click="updateStatus(item.delivery_id, item.delivery_company, item.invoice_num, item.order_description)">배송중</CButton>
                                </template>
                            </CInput>
                        </td>
                    </template>
                </CDataTable>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>
    import * as PAYMENT_API from "../api/payment";
    import * as DELIVERY_API from "../api/delivery";
    import * as ORDER_API from "../api/orders";
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
                    {key: 'payment_status', label: '상태', sorter: false},
                    {
                        key: 'show_details',
                        label: '',
                        sorter: false
                    }
                ],
                delivery : {
                    delivery_id : '',
                    delivery_company : '',
                    invoice_num : '',
                    status_index : '',
                },
                order : [],
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
            this.getOrderData();
        },
        methods: {
            refreshPage() {
                this.$router.go(0)
            },
            getBadge(status) {
                return status === 1 ? 'secondary'
                    : status === 2 ? 'success'
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
                    let rs = await PAYMENT_API.getOrderDataPayment(2,{idx : 2});
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
            updateStatus: async function (id, company, invoice, name) {
                this.delivery.delivery_company = company;
                this.delivery.invoice_num = invoice;
                this.delivery.status_index = 2;

                if (confirm(name + "의 배송 상태를 '배송중'으로 변경하시겠습니까?")) {
                    try {
                        const rs = await DELIVERY_API.updateDeliveryInformation(id, {delivery: this.delivery});
                        if (rs.data.code === "success") {
                            alert("변경되었습니다");
                            this.refreshPage();
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