<template>
  <div>
    <div class="wrapper">
      <div class="contents_wrapper">
        <div class="item_wrapper" :id="item.prod_id" v-for="item in items" :key="item.prod_id">
          <img class="pointer" :src="item.image_path" @click="goDetailPage">
          <div class="title pointer" @click="goDetailPage">{{item.prod_name}}</div>
          <div class="price"><b>{{item.price}}</b>원</div>
          <div class="sold_out" :id="item.index" :class="{hidden: item.status_index === 2}">{{item.status_index | statusFilter(item.index)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
    name: "Main",
    created() {
      this.getAllItemList();
    },

    data(){
        return{
            UI :{ IS_SHOW_MENU: false},
            items: []
        };
    },

    filters: {
        statusFilter: function(status, index){
            if(status === 1){
                return 'HOT'
            } else if(status === 3){
                return 'SOLD OUT'
            } else if(status === 4){
              return 'NEW'
            }
        }
    },
    methods:{
        goDetailPage: function(e){
            const item = e.path[1].id;
            this.$router.push({
                name: 'DetailPage',
                params: {id: item},
            });
            // console.log("item: ",item);
        },
        getAllItemList: function(){
            this.$http.get("/api/products").then(response => {
                this.items = response.data.result;
                console.log(response)
            });
        }
    }
  }
</script>

<style scoped>
    .show{
        display: block !important;
    }
    .hidden{
        display: none;
    }

</style>
