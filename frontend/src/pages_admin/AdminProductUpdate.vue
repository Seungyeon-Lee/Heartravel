<template>
  <CRow>
    <CCol col="12">
      <CCard>
        <CCardHeader>
          <strong>{{this.product_name}} </strong>
          <small class="text-muted">  {{ $route.params.id }} </small>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            striped
            small
            fixed
            :items="items"
            :fields="fields"
          >
            <template #key="{item}">
              <td>
                <div v-if="item.key === 'index'">번호</div>
                <div v-else-if="item.key === 'prod_id'">상품코드</div>
                <div v-else-if="item.key === 'price'">가격</div>
                <div v-else-if="item.key === 'prod_name'">상품명</div>
                <div v-else-if="item.key === 'image_path'">이미지</div>
                <div v-else-if="item.key === 'type_index'">상품분류</div>
                <div v-else-if="item.key === 'status_index'">상태</div>
                <div v-else-if="item.key === 'detail'">상품상세</div>
                <div v-else-if="item.key === 'registered'">등록일</div>
                <div v-else-if="item.key === 'categ_index'">메뉴</div>
                <div v-else>{{item.key}}</div>
              </td>
            </template>
            <template #value="{item}">
              <td>
                <div v-if="item.key === 'price'">
                  <CInput type="text" side="sm" name="price" v-model="prod.price" autocomplete="off"/>
                </div>
                <div v-else-if="item.key === 'prod_name'">
                  <CInput type="text" side="sm" name="prod_name" v-model="prod.prod_name" autocomplete="off"/>
                </div>
                <div v-else-if="item.key === 'image_path'">
                  <CInput type="text" side="sm" name="image_path" v-model="prod.image_path" autocomplete="off"/>
                </div>
                <div v-else-if="item.key === 'type_index'">
                  <CSelect :options="['반지','목걸이','기타']" id="type_index" v-model="prod_data.type"/>
                </div>
                <div v-else-if="item.key === 'detail'">
                  <quill-editor ref="myTextEditor"
                                v-model="prod.detail"
                                :options="editorOption"
                                @change="onEditorChange($event)">
                  </quill-editor>
                </div>
                <div v-else-if="item.key === 'status_index'">
                  <CSelect :options="['NONE', 'NEW', 'HOT', 'SOLD OUT']" id="status_index" v-model="prod_data.status"/>
                </div>
                <div v-else-if="item.key === 'categ_index'">
                  <CInputCheckbox
                          v-for="(option, index) in categories"
                          :key=index
                          :label="option"
                          :value="option"
                          :custom="true"
                          :checked="getIndex(index)"
                          :inline="true"
                          @update:checked="checkedCategory(index)"
                  />
                </div>
                <div v-else-if="item.key === 'registered'">{{getDate(item.value)}}</div>
                <div v-else>{{item.value}}</div>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
        <CCardFooter>
          <CButtonGroup>
            <CButton @click="goBack">뒤로</CButton>
            <CButton type="submit" @click="updateProductDetailData">수정완료</CButton>
          </CButtonGroup>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import { quillEditor } from 'vue-quill-editor'

  import * as PRODUCT_API from "../api/product";
  import * as CATEGORY_API from "../api/category";

export default {
  name: 'AdminProductDetail',
  data: () => {
    return {
      prod : [],
      categories : [],
      checked_category : [],
      prod_data :  {
        type: '',
        status: '',
        category : '',
      },
      items: [],
      product_name: '',
      fields: [
        {key: 'key', label : '분류', _style: 'width:200px'},
        {key: 'value', label : '정보'}
      ],
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
    this.getProductDetailData(this.$route.params.id);
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    goUpdate() {
      this.$router.push({path: '/admin/product/update/' + this.$route.params.id })
    },
    onEditorChange({ editor, html, text }) {
      this.prod.detail = html;
    },
    getTypeOption (index) {
      return (index === 1) ? "반지" : (index === 2) ? "목걸이" : "기타"
    },
    getStatusOption (index) {
      return (index === 1) ? "NONE" : (index === 2) ? "NEW" : (index === 3) ? "HOT" : "SOLD OUT"
    },
    checkedCategory(index) {
      this.checked_category[index] = !this.checked_category[index];
    },
    updateProductDetailData: async function(){
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
        const rs = await PRODUCT_API.updateProduct(this.prod.prod_id, {prod : this.prod});
        if (rs.data.code === "success") {
          this.$router.go(-1);
          alert(this.prod.prod_name+'의 제품정보가 수정되었습니다.');
        }
      } catch (err) {
        // console.error(err)
      }
    },
    getIndex(index) {
      return this.checked_category[index]
    },
    getProductDetailData:async function () {
      let rs = await PRODUCT_API.getProduct(this.$route.params.id);
      this.prod = rs.data.result[0];
      this.product_name = this.prod.prod_name;
      this.prod_data.type = this.getTypeOption(this.prod.type_index);
      this.prod_data.status = this.getStatusOption(this.prod.status_index);

      for(let index in rs.data.result)
        this.checked_category[rs.data.result[index].categ_index - 1] = true;

      rs = await CATEGORY_API.getCategoryList();
      let category_list = rs.data.result;
      for(let index in category_list)
        this.categories[index] = category_list[index].name;

      this.prod_data.category = this.categories[this.prod.categ_index - 1];

      const productDetails = this.prod ? Object.entries(this.prod) : [['index', 'Not found']];
      this.items = productDetails.map(([key, value]) => {return {key, value}})
    },
    deleteProduct:async function () {
      if(confirm(this.product_name + " 제품을 삭제하시겠습니까?")) {
        try {
          const rs = await PRODUCT_API.deleteProduct(this.$route.params.id);
          if (rs.data.code === "success") {
            this.goBack();
            alert(this.product_name + " 제품이 삭제되었습니다");
          }
        } catch (err) {
          // console.error(err)
        }
      }
    },
    getDate (date) {
      let ts = new Date(date);
      return ts.toLocaleString();
    },
    numberWithCommas(x) {
      if(x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,  ",");
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    }
  }
}
</script>
