<template>
  <CSidebar class="bg-white"
          fixed light
          :minimize="minimize"
          :show.sync="show"
  >
    <c-sidebar-nav>
      <div class="content_login">
        <button class="login_btn" @click="switchMenu('/login')" v-show="UI.IS_LOGIN === false">로그인</button>
        <button class="font_12 font_600" v-show="UI.IS_LOGIN === true" @click="switchMenu('/edit')">{{userName}} 님</button>
        <button class="icon_arrow_down margin_left_4"></button>
        <div>
          <ul v-show="UI.IS_LOGIN === true">
            <li class="pointer margin_top_12 font_11" @click="switchMenu('/order/list')">주문내역</li>
            <li class="pointer margin_top_2 font_11" @click="switchMenu('/qna')">1:1 문의</li>
            <li class="pointer margin_top_2 font_11" @click="logout">로그아웃</li>
            <button  v-show="false" @click="switchMenu('/admin')"> <li>관리자 페이지</li></button>
          </ul>
        </div>
      </div>
      <div class="content_menu font_roboto">
        <button class="font_20 margin_top_24" @click="switchMenu('/')"></button>
        <ul class="menu_list">
          <li class="current_season">ALL</li>
          <template v-for="list in MENU_LIST">
            <li :class="{current_season: list.order === 1}">{{list.name}}</li>
          </template>
        </ul>
      </div>
      <div class="content_social font_roboto">
        <a href="https://www.instagram.com/" target="_blank">Instagram<img class="icon_16 margin_left_10" src="/static/images/icon_24_instagram.png" alt="instagram"></a>
        <a href="https://blog.naver.com/" target="_blank">Blog<img class="icon_16 margin_left_10" src="/static/images/icon_24_blog.png" alt="blog"></a>
<!--        <input style="margin-top:54px" class="search_input" placeholder="__________">-->
      </div>
    </c-sidebar-nav>
  </CSidebar>
</template>

<script>
import * as TOKEN_API from '../api/token'
import * as API from '../api/category'

export default {
  name: 'TheSidebar',
  data () {
    return {
      UI: {
        IS_LOGIN: false,
      },
      userName: '',
      minimize: false,
      show: 'responsive',
      MENU_LIST: [],
    }
  },

  created: function(){
    this.checkLogin();
    this.getMenuInfo();
  },
  mounted () {
    this.responsive();
  },
  methods:{
      checkLogin: function(){
          const userInfo = this.$session.get('user_name');
          if(userInfo === undefined || userInfo === ''){
              this.UI.IS_LOGIN = false;
              return;
          }
          this.UI.IS_LOGIN = true;
          this.userName = userInfo;
      },
      switchMenu:function(target){
          this.$router.push(target);
          this.show = false;
      },
      responsive: function(){
        this.$root.$on('toggle-sidebar', () => {
          const sidebarOpened = this.show === true || this.show === 'responsive'
          this.show = sidebarOpened ? false : 'responsive'
        });
        this.$root.$on('toggle-sidebar-mobile', () => {
          const sidebarClosed = this.show === 'responsive' || this.show === false
          this.show = sidebarClosed ? true : 'responsive'
        })
      },
      //*******************************
      //로그아웃
      //*******************************
      logout: async function(){
        await TOKEN_API.removeAuthToken(this);
        this.$session.remove('user_name');
        this.$session.remove('user_id');
        this.$session.remove('role_index')
        this.$router.push('/');
        setTimeout(function(){
          location.reload();
        },1000);
      },
      //*******************************
      //메뉴가져오기
      //*******************************
      getMenuInfo: async function(){
        try{
          const rs = await API.getCategoryList();
          this.MENU_LIST = rs.data.result;
        } catch (e) {
          console.error(e);
        }
      }
  }
}
</script>

<style scoped>
  .login_btn{
    font-size: 12px;
    line-height: 63px;
    font-weight: 600;
  }
  .login_btn:hover{
    font-weight: 700;
  }
</style>
