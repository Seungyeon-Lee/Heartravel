<template>
    <CDropdown
            inNav
            class="c-header-nav-items"
            placement="bottom-end"
            add-menu-classes="pt-0"
    >
        <template #toggler>
            <CHeaderNavLink>
                <CIcon name="cil-chevron-bottom"/>
            </CHeaderNavLink>
        </template>
        <CDropdownHeader tag="div" class="text-center" color="light">
            <strong>계정</strong>
        </CDropdownHeader>
        <CDropdownItem @click="logout">
            <CIcon name="cil-lock-locked"/> 로그아웃
        </CDropdownItem>
        <CDropdownItem @click="goAdminDetail">
            <CIcon name="cil-user" /> 관리자 정보
        </CDropdownItem>
    </CDropdown>
</template>

<script>
    import * as TOKEN_API from "../api/token";

    export default {
        name: 'TheHeaderDropdownAccnt',
        data () {
            return {
                itemsCount: 42
            }
        },
        methods: {
            logout: async function(){
                await TOKEN_API.removeAuthToken(this);
                this.$session.remove('user_name');
                this.$session.remove('user_id');
                this.$session.remove('role_index');
                this.$router.push('/admin/login');
                setTimeout(function(){
                    location.reload();
                },1000);
            },
            goAdminDetail() {
                this.$router.push('/admin/users/'+this.$session.get('user_id'));
            }
        }
    }

</script>

<style scoped>
    .c-icon {
        margin-right: 0.3rem;
    }
</style>