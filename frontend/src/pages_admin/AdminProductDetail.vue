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
                <div v-if="item.key === 'price'"> {{numberWithCommas(item.value)}}원</div>
                <div v-else-if="item.key === 'image_path'">
                  <img :src="item.value" width="70" height="70"/>
                </div>
                <div v-else-if="item.key === 'type_index'"> {{getTypeOption(item.value)}}</div>
                <div v-else-if="item.key === 'detail'">
                  <p v-html="item.value"></p>
                </div>
                <div v-else-if="item.key === 'status_index'">
                  <div class="sold_out" v-show="item.value !== 1">{{getStatusOption(item.value)}}</div>
                  <div v-show="item.value === 1">-</div>
                </div>
                <div v-else-if="item.key === 'registered'"> {{getDate(item.value)}}</div>
                <div v-else-if="item.key === 'categ_index'">
                  <div v-for="category in categories"> {{(category !== null) ? category : ' '}}</div>
                </div>
                <div v-else>{{item.value}}</div>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
        <CCardFooter>
          <CButtonGroup class="h_center">
            <CButton color="btn btn-light" @click="goUpdate">수정</CButton>
            <CButton color="btn btn-light" @click="goBack">목록</CButton>
            <CButton color="btn btn-light" @click="deleteProduct">삭제</CButton>
          </CButtonGroup>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
  import * as PRODUCT_API from "../api/product";
  import * as CATEGORY_API from "../api/category";

export default {
  name: 'AdminProductDetail',
  data: () => {
    return {
      items: [],
      categories : [],
      product_name: '',
      fields: [
        {key: 'key', label : '분류', _style: 'width:200px'},
        {key: 'value', label : '정보'}
      ]
    }
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
    getTypeOption (index) {
      return (index === 1) ? "반지" : (index === 2) ? "목걸이" : "기타"
    },
    getStatusOption (index) {
      return (index === 1) ? "NONE" : (index === 2) ? "NEW" : (index === 3) ? "HOT" : "SOLD OUT"
    },
    getProductDetailData:async function () {
      let rs = await PRODUCT_API.getProduct(this.$route.params.id);
      let product = rs.data.result[0];
      this.product_name = product.prod_name;

      for(let index in rs.data.result)
        this.categories[rs.data.result[index].categ_index - 1] = true;

      rs = await CATEGORY_API.getCategoryList();
      let category_list = rs.data.result;
      for(let index in category_list)
        if(this.categories[index])
          this.categories[index] = category_list[index].name;

      const productDetails = product ? Object.entries(product) : [['index', 'Not found']];
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