<template>
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
        <template #status="{item}">
            <td>
                <CBadge :color="getBadge(item.status_index)">
                    {{item.status_index === 1 ? '정상' :
                    item.status_index === 2 ? '휴면' : '탈퇴'}}
                </CBadge>
            </td>
        </template>
        <template #role="{item}">
            <td>
                {{item.role_index === 1 ? '회원' :
                item.role_index === 2 ? '비회원' : '관리자'}}
            </td>
        </template>
        <template #registered="{item}">
            <td>
                {{getDate(item.registered)}}
            </td>
        </template>
    </CDataTable>
</template>

<script>
    import * as USER_API from "../api/users";
    import fields from './UsersDataFilter'

    export default {
        name: 'AdminUserBlackList',
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
            this.getUserData()
        },
        methods: {
            getBadge (status) {
                return status === 1 ? 'success'
                    : status === 2 ? 'secondary'
                        : status === 3 ? 'danger': 'primary'
            },
            userLink (id) {
                return `/admin/users/${id.toString()}`
            },
            rowClicked (item) {
                const userLink = this.userLink(item.user_id)
                this.$router.push({path: userLink})
            },
            getUserData: async function(){
                try {
                    const rs = await USER_API.getUserDataStatus(3);
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

<style scoped>

</style>