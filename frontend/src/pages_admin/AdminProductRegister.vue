<template>
    <div>
        <CCard>
            <CCardHeader>
                <strong>상품 등록</strong>
            </CCardHeader>
            <CCardBody>
                <CForm>
                    <CInput label="상품명" horizontal autocomplete="off" v-model="prod.prod_name"/>
                    <CInput label="가격" horizontal autocomplete="off" v-model="prod.price"/>
                    <template v-for="(name, key) in radioNames">
                        <div class="form-row form-group" :key="name">
                            <CCol sm="3">
                                {{name}}
                            </CCol>
                            <CCol sm="9" :class="'form-inline'">
                                <CInputCheckbox
                                        v-for="(option, index) in categories"
                                        :label="option.name"
                                        :value="option.name"
                                        :custom="true"
                                        :inline="true"
                                        @update:checked="checkedCategory(index)"
                                />
                            </CCol>
                        </div>
                    </template>
                    <CSelect label="분류" horizontal
                             :options="['반지','목걸이','기타']" id="type_index"/>
                    <CSelect label="판매 상태" horizontal
                             :options="['NONE', 'NEW', 'HOT', 'SOLD OUT']" id="status_index"/>
                    <CInputFile label="이미지" ref="file" horizontal/>
                    <CInput label="이미지 URL" horizontal autocomplete="off" v-model="prod.image_path"/>
                </CForm>
                <br><div>상세 설명</div><br>
                <quill-editor ref="myTextEditor"
                              v-model="prod.detail"
                              :options="editorOption"
                              @change="onEditorChange($event)">
                </quill-editor>
            </CCardBody>
            <CCardFooter>
                <CButton size="sm" color="primary" @click="addProductData"><CIcon name="cil-check-circle"/> 등록</CButton>
                <CButton size="sm" color="danger" @click="goBack"><CIcon name="cil-ban"/> 취소</CButton>
            </CCardFooter>
        </CCard>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    import { quillEditor } from 'vue-quill-editor'
    import * as PRODUCT_API from "../api/product";
    import * as CATEGORY_API from "../api/category";

    export default {
        name: "AdminProductUpdate",
        data: function () {
            return {
                categories : [],
                prod: {
                    prod_name: '',
                    price: '',
                    image_path: '',
                    type_index: '',
                    status_index: '',
                    categ_index: '',
                    detail : ''
                },
                checked_category : [],
                radioNames: ['카테고리'],
                editorOption: {
                    placeholder: '상품 정보를 입력하세요',
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [
                                { list: 'ordered' },
                                { list: 'bullet' },
                                { indent: '-1' },
                                { indent: '+1' }
                            ],
                            ['link', 'image'],
                            ['clean']
                        ]
                    }
                }
            }
        },
        components: {
            quillEditor
        },
        mounted() {
            this.getCategory();
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            refreshPage() {
                this.$router.go(0)
            },
            onEditorChange({ editor, html, text }) {
                this.prod.detail = html;
            },
            getCategory:async function() {
                try {
                    const rs = await CATEGORY_API.getCategoryList();
                    this.categories = rs.data.result;

                    for(let index in this.categories)
                        this.checked_category[index] = false
                }catch (e) {

                }
            },
            checkedCategory(index) {
                this.checked_category[index] = !this.checked_category[index];
            },
            addProductData: async function () {
                try {
                    let si = document.getElementById("status_index");
                    let ti = document.getElementById("type_index");
                    this.prod.status_index = si.selectedIndex + 1;
                    this.prod.type_index = ti.selectedIndex + 1;
                    let category = [];
                    let c_index = 0;
                    for(let index in this.checked_category)
                    {
                        if(this.checked_category[index])
                        category[c_index++] = index * 1 + 1;
                    }
                   this.prod.categ_objs = category;
                    const rs = await PRODUCT_API.addProduct({prod: this.prod});
                    if (rs.data.code === "success") {
                        alert('상품이 등록되었습니다.');
                        this.refreshPage();
                    }
                } catch (err) {
                    // console.error(err)
                }
            }
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor;
            }
        }
    }
</script>

<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
</style>