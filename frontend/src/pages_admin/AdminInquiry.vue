<template>
    <div>
        <CDataTable
                :items="items"
                :fields="fields"
                table-filter
                items-per-page-select
                :items-per-page="perPage"
                hover
                pagination
                @row-clicked="rowClicked"
                clickable-rows
        >
            <template #is_answered="{item}">
                <td>
                    <CBadge :color="getColor(item.is_answered)">
                        {{item.is_answered === 1 ? "답변완료" : "진행중"}}
                    </CBadge>
                </td>
            </template>
            <template #registered="{item}">
                <td>
                    {{getDate(item.registered)}}
                </td>
            </template>
    </CDataTable>
    </div>
</template>

<script>
    import * as INQUIRY_API from "../api/inquries";
    export default {
        name: 'AdminInquiry',
        data: function(){
            return {
                items: [],
                fields: [
                    { key: 'index', label: '번호' },
                    { key: 'title', label: '제목' },
                    { key: 'user_id', label: '작성자'},
                    { key: 'registered', label: '작성일자'},
                    { key: 'is_answered', label: '상태' }
                ],
                perPage: 10,
            }
        },
        mounted() {
            this.getInquiryData()
        },
        methods: {
            getColor (is_answered) {
                return is_answered === 1 ? 'success'
                        : is_answered === 0 ? 'warning' : 'info'
            },
            inquiryLink (id) {
                return `/admin/inquiry/${id.toString()}`
            },
            rowClicked (item) {
                const inquiryLink = this.inquiryLink(item.index);
                this.$router.push({path: inquiryLink})
            },
            getInquiryData: async function(){
                try {
                    const rs = await INQUIRY_API.getInquiryAll();
                    this.items = rs.data.result;//.sort((a, b) => a.index - b.index)
                } catch (err) {
                    // console.error(err)
                }
            },
            getDate (date) {
                let ts = new Date(date);
                return ts.toLocaleString();
            }
        }
    }
</script>
