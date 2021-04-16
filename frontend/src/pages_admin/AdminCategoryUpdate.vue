<template>
  <CRow>
    <CCol col="12">
      <CCard>
        <CCardHeader>
          <strong>{{this.cate_name}} </strong>
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
                <div v-else-if="item.key === 'name'">메뉴명</div>
                <div v-else-if="item.key === 'order'">표시 순서</div>
                <div v-else-if="item.key === 'status'">노출 상태</div>
                <div v-else-if="item.key === 'registered'">등록일</div>
                <div v-else>{{item.key}}</div>
              </td>
            </template>
            <template #value="{item}">
              <td>
                <div v-if="item.key === 'name'">
                  <CInput type="text" side="sm" name="price" v-model="category.name" autocomplete="off"/>
                </div>
                <div v-else-if="item.key === 'status'">
                  <CSelect :options="['노출', '미노출']" id="status_index" v-model="cate_status"/>
                </div>
                <div v-else-if="item.key === 'registered'"> {{getDate(item.value)}}</div>
                <div v-else>{{item.value}}</div>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
        <CCardFooter>
          <CButtonGroup class="h_center">
            <CButton color="btn btn-light" @click="updateCategory">완료</CButton>
            <CButton color="btn btn-light" @click="goBack">목록</CButton>
            <CButton color="btn btn-light" @click="deleteCategory">삭제</CButton>
          </CButtonGroup>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
  import * as CATEGORY_API from "../api/category";
  export default {
    name: 'AdminProductDetail',
    data: () => {
      return {
        category : [],
        cate_name : '',
        cate_status : '',
        items: [],
        fields: [
          {key: 'key', label : '분류', _style: 'width:200px'},
          {key: 'value', label : '정보'}
        ]
      }
    },
    mounted() {
      this.getCategory(this.$route.params.id)
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      updateCategory: async function(){
        try {
          var si = document.getElementById("status_index") ;
          this.category.status = si.selectedIndex === 0 ? 'on' : 'off';
          const rs = await CATEGORY_API.updateCategory(this.$route.params.id, {categ : this.category});
          if (rs.data.code === "success") {
            this.$router.go(-1);
            alert(this.cate_name+' 카테고리가 수정되었습니다.');
          }
        } catch (err) {
          // console.error(err)
        }
      },
      getCategory:async function () {
        const rs = await CATEGORY_API.getCategory(this.$route.params.id);
        this.category = rs.data.result[0];
        this.cate_name = this.category.name;
        this.cate_status = this.category.status === 'on' ? '노출' : '미노출';
        const categoryDetails = this.category ? Object.entries(this.category) : [['index', 'Not found']]
        this.items = categoryDetails.map(([key, value]) => {return {key, value}})
      },
      deleteCategory:async function () {
        if(confirm(this.cate_name + " 카테고리를 삭제하시겠습니까?")) {
          try {
            const rs = await CATEGORY_API.deleteCategory(this.$route.params.id);
            if (rs.data.code === "success") {
              this.goBack()
              alert(this.cate_name + " 카테고리가 삭제되었습니다");
              return;
            }
          } catch (err) {
            // console.error(err)
          }
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
  .sold_out{
    background-color: #2D2A26;
    color: #fff;
    font-size: 10px;
    text-align: center;
    width: fit-content;
    padding: 2px;
    font-weight: 200;
    font-family: 'Roboto', sans-serif;
  }
</style>