<template>
    <div>
        <div class="edit_title h_center">개인정보수정</div>
        <div class="h_center edit_profile_wrapper">
            <div class="input_with_label">
                <label for="id">아이디</label>
                <input type="text" name="id" autocomplete="off"/>
            </div>
            <div class="input_with_label">
                <label for="password">비밀번호</label>
                <input type="password" name="password" autocomplete="off"/>
            </div>
            <div class="input_with_label">
                <label for="password_check">비밀번호 확인</label>
                <input type="password" name="password_check" autocomplete="off"/>
            </div>
            <div class="input_with_label">
                <label for="name">이름</label>
                <input type="text" name="name" autocomplete="off"/>
            </div>
            <div class="input_with_label">
                <label for="address">주소</label>
                <input type="text" name="address" autocomplete="off"/>
            </div>
            <div class="input_with_label">
                <label for="phone">휴대폰 번호</label>
                <input type="tel" name="phone"  autocomplete="off"/>
            </div>
            <div class="input_with_label">
                <label for="email">이메일</label>
                <input type="text" name="email" autocomplete="off"/>
            </div>


            <table v-show="false">
                <tbody>
                <tr>
                    <td>아이디</td>
                    <td class="flex">
                        <input type="text" class="input_nor width_100">
                        <button class="btn_nor btn_small_gr">중복확인</button>
                    </td>
                </tr>
                <tr>
                    <td>비밀번호</td>
                    <td>
                        <input type="password" class="input_nor">
                    </td>
                </tr>
                <tr>
                    <td>비밀번호 확인</td>
                    <td><input type="password" name="passwordcheck" class="input_nor"></td>

                </tr>
                <tr>
                    <td>이름</td>
                    <td><input type="name" class="input_nor"></td>
                </tr>
                <tr>
                    <td>주소</td>
                    <td>
                        <div class="flex">
                            <input type="text" class="input_nor width_50">
                            <button class="btn_nor btn_small_wh">우편번호</button>
                        </div>
                        <input type="text" class="input_nor width_100">
                        <input type="text" class="input_nor width_100">
                    </td>
                </tr>
                <tr>
                    <td>휴대폰 번호</td>
                    <td><input type="tel" class="input_nor"></td>
                </tr>
                <tr>
                    <td>이메일</td>
                    <td class="flex">
                        <input type="text" class="input_nor width_70">
                        <button class="btn_nor btn_small_gr">중복확인</button>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="justify">
                <button class="half_btn btn_nor margin_right_3">수정완료</button>
                <button class="half_btn btn_white">취소</button>
            </div>
            <button class="font_11 col_gray margin_top_5">*회원탈퇴</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EditProfile"
    }
</script>

<style scoped>
    table{
        margin-bottom: 36px;
    }
    table td {
        padding: 5px 10px;
        font-size: 13px;
    }
    table td:first-child{
        width: 35%;
        padding-top: 15px;
    }
</style>