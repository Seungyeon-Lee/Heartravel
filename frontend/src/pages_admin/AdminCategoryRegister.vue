<template>
    <div>
        <CCard>
            <CCardHeader>
                <strong>메뉴 등록</strong>
            </CCardHeader>
            <CCardBody>
                <CForm>
                    <CInput
                            description="메뉴 이름을 입력하세요"
                            label="메뉴 이름"
                            v-model="category.name"
                            horizontal
                            autocomplete="off"
                    />
                    <template v-for="(name, key) in radioNames">
                        <div class="form-row form-group" :key="name">
                            <CCol sm="3">
                                {{name}}
                            </CCol>
                            <CCol>
                                <CInputRadio
                                        v-for="(option, optionIndex) in options"
                                        :key="key + option"
                                        :label="option"
                                        type="radio"
                                        :value="option"
                                        :custom="true"
                                        :name="`Option 1${key}`"
                                        :checked="optionIndex === key"
                                        :inline="true"
                                         @update:checked="changeOption"
                                />
                            </CCol>
                        </div>
                    </template>
                </CForm>
            </CCardBody>
            <CCardFooter>
                <CButton type="submit" size="sm" color="primary" @click="addCategory"><CIcon name="cil-check-circle"/> 등록</CButton>
                <CButton type="reset" size="sm" color="danger" @click="goBack"><CIcon name="cil-ban"/> 취소</CButton>
            </CCardFooter>
        </CCard>
    </div>
</template>

<script>
    import * as CATEGORY_API from "../api/category";

    export default {
        name: "AdminMenuUpdate",
        data() {
            return {
                category : {
                    name: '',
                    status: 'on',
                },
                options: ['보이기', '숨김'],
                radioNames: ['메뉴 노출 여부']
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            refreshPage() {
                this.$router.go(0)
            },
            changeOption() {
              this.category.status = (this.category.status === 'off') ? 'on' : 'off';
            },
            addCategory : async function () {
                try {
                    const rs = await CATEGORY_API.addCategory({categ : this.category});
                    if (rs.data.code === "success") {
                        alert('메뉴가 등록되었습니다.');
                        this.refreshPage()
                        return;
                    }
                } catch (err) {
                    // console.error(err)
                }
            }
        }
    }
</script>

<style scoped>

</style>