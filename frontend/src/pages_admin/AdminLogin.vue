<template>
    <div>
        <div class="admin_contents_wrapper">
            <div class="admin_login_wrapper">
                <h2 class="align-center">관리자 로그인</h2>
                <form>
                    <input type="text" @keyup.enter="login" v-model="user.user_id" class="margin_top_40 input_nor width_100"  placeholder="아이디">
                    <input type="password" @keyup.enter="login"
                           v-model="user.password" class="margin_top_24 input_nor width_100" placeholder="비밀번호">
                </form>
        <button class="btn_nor margin_top_24 h_center width_90"  @click="login">확인</button>
    </div>
        </div>
    </div>
</template>

<script>
  import * as LOGIN_API from "../api/login";
  import * as TOKEN_API from "../api/token";

    export default {
        name: 'login',
        data() {
            return {
                user: {
                    user_id: '',
                    password: ''
                }
            }
        },
        methods: {
            login: async function () {
                try {
                    const rs = await LOGIN_API.login(this.user);

                    if (rs.data.code !== "success") {
                        alert('아이디와 비밀번호를 다시 확인하세요.');
                        return;
                    }

                    // console.log('rs: ',JSON.stringify(rs));
                    alert(rs.data.user.user_name + "님 반갑습니다");
                    this.$session.set('user_name', rs.data.user.user_name);
                    this.$session.set('user_id', rs.data.user.user_id);
                    this.$session.set('role_index', rs.data.user.role_index);
                    await TOKEN_API.setToken(this, rs.data.token);
                    this.$router.push({path: '/admin'})

                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                } catch (err) {
                    // console.error(err)
                }
            }
        }
    }
</script>
