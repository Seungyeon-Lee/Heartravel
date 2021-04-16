import '@babel/polyfill'
import Vue from 'vue'
import Router from 'vue-router'
import Main from '../pages/Main'
import Login from '../pages/Login'
import FindIdPw from "../pages/FindIdPw"
import Detail from "../pages/Detail"
import EditProfile from "../pages/EditProfile"
import Qna from "../pages/Qna"
import OrderForm from "../pages/OrderForm"
import OrderList from '../pages/OrderList'
import Basket from '../pages/Basket'
import SignUp from '../pages/SignUp'

const TheUserContainer = () => import('../components_user/TheContainer')

/* admin */
const AdminLogin = () => import('../pages_admin/AdminLogin')
const TheContainer = () => import('../components_admin/TheContainer')
const AdminMainPage = () => import('../pages_admin/AdminMainPage')
const AdminProductList = () => import('../pages_admin/AdminProductList')
const AdminProductDetail = () => import('../pages_admin/AdminProductDetail')
const AdminProductRegister = () => import('../pages_admin/AdminProductRegister')
const AdminProductUpdate = () => import('../pages_admin/AdminProductUpdate')
const AdminOrderList = () => import('../pages_admin/AdminOrderList')
const AdminOrderWaitList = () => import('../pages_admin/AdminOrderWaitList')
const AdminOrderPayList = () => import('../pages_admin/AdminOrderPayList')
const AdminOrderDeliveryList = () => import('../pages_admin/AdminOrderDeliveryList')
const AdminOrderCompleteList = () => import('../pages_admin/AdminOrderCompleteList')
const AdminOrderFailList = () => import('../pages_admin/AdminOrderFailList')
const AdminOrderDetail = () => import('../pages_admin/AdminOrderDetail')
const AdminInquiry = () => import('../pages_admin/AdminInquiry')
const AdminInquiryDetail = () => import('../pages_admin/AdminInquiryDetail')
const AdminInquiryUpdate = () => import('../pages_admin/AdminInquiryUpdate')
const AdminInquiryAnswerUpdate = () =>import('../pages_admin/AdminInquiryAnswerUpdate')
const AdminCategoryList = () => import('../pages_admin/AdminCategoryList')
const AdminCategoryUpdate = () => import('../pages_admin/AdminCategoryUpdate')
const AdminCategoryRegister = () => import('../pages_admin/AdminCategoryRegister')
const AdminUserList = () => import('../pages_admin/AdminUserList')
const AdminUserDetail = () => import('../pages_admin/AdminUserDetail')
const AdminUserRegister = () => import('../pages_admin/AdminUserRegister')
const AdminUserUpdate = () => import('../pages_admin/AdminUserUpdate')
const AdminUserBlackList = () => import('../pages_admin/AdminUserBlackList')
const AdminUserSleepList = () => import('../pages_admin/AdminUserSleepList')

Vue.use(Router);

export default new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})


export const requireAuth = (to, from, next) =>
{
  const sessionKey = sessionStorage.getItem('sessionKey');
  const userInfo = sessionStorage.getItem(sessionKey);

  if(userInfo != null)
    return next();

    next({path : '/login'});
};

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/',
      name: 'Main',
      component: TheUserContainer,
      children: [
        {
          path: '/',
          name: 'MainPage',
          component: Main
        },
        {
          path: '/qna',
          name: 'Qna',
          component: Qna,
          beforeEnter(to, from, next) {
            requireAuth(to, from, next)
          }
        },
        {
          path: '/order',
          name: 'OrderForm',
          component: OrderForm
        },
        {
          path: '/order/list',
          name: 'OrderList',
          component: OrderList
        },
        {
          path: '/basket',
          name: 'Basket',
          component: Basket
        },
      ]
    },
    {
      path: '/detail/:id',
      name: 'DetailPage',
      component: Detail
    },
    {
      path: '/login', component: TheUserContainer,
      children: [
        {
          path: '/login',
          name: 'Login', component: Login
        },
        {
          path: '/sign_up',
          name: 'SignUp', component: SignUp
        }
      ]
    },
    {
      path: '/edit', component: TheUserContainer,
      children: [
        {
          path: '/edit',
          name: 'EditProfile',
          component: EditProfile,
          beforeEnter(to, from, next) {
            requireAuth(to, from, next)
          }
        }
      ]
    },
    {
      path: '/find', component: TheUserContainer,
      children: [
        {
          path: '/find',
          name: 'FindIdPw', component: FindIdPw
        }
      ]
    },
    {
      path: '/admin/login',
      component: AdminLogin,
      hidden: true
    },
    {
      path: '/admin',
      redirect: '/admin',
      name: '관리자',
      component: TheContainer,
      children: [
        {
          path: '',
          component: AdminMainPage
        },
        {
          path: 'product',
          redirect: 'product/all',
          name: '상품 리스트',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'all',
              component: AdminProductList,
            },
            {
              path: 'update/:id',
              name: '상품 상세 수정',
              component: AdminProductUpdate
            },
            {
              path: ':id',
              meta: {label: '상품 수정'},
              name: '상품 수정',
              component: AdminProductDetail,
            }
          ]
        },
        {
          path: 'add-product',
          name: '상품 등록',
          component: AdminProductRegister
        },
        {
          path: 'orders',
          redirect:'orders/all',
          meta: {label: '주문 통합 리스트'},
          name: '주문 통합 리스트',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'all',
              component: AdminOrderList,
            },
            {
              path: 'order',
              name: '입금 대기 리스트',
              component:AdminOrderWaitList,
            },
            {
              path: 'pay',
              name: '결제 완료 리스트',
              component:AdminOrderPayList
            },
            {
              path: 'delivery',
              name: '배송중 리스트',
              component:AdminOrderDeliveryList
            },
            {
              path: 'complete',
              name: '배송 완료 리스트',
              component:AdminOrderCompleteList
            },
            {
              path: 'fail',
              name: '취소/환불 리스트',
              component:AdminOrderFailList
            },
            {
              path: ':id',
              meta: {label: '주문 상세'},
              name: '주문 상세',
              component: AdminOrderDetail,
            }
          ]
        },
        {
          path: 'inquiry',
          redirect:'inquiry/all',
          name: '1:1문의',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'all',
              component: AdminInquiry,
            },
            {
              path: ':id',
              meta: {label: '1:1문의 내용'},
              name: '1:1문의 내용',
              component: AdminInquiryDetail,
            },
            {
              path:':id/update_question',
              name:'1:1문의 수정',
              component : AdminInquiryUpdate
            },
            {
              path:':id/update_answer',
              name:'1:1문의 답변 수정',
              component : AdminInquiryAnswerUpdate
            },
          ]
        },
        {
          path: 'category',
          redirect:'category/all',
          name: '메뉴 리스트',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'all',
              component: AdminCategoryList,
            },
            {
              path: ':id',
              meta: {label: '메뉴 수정'},
              name: '메뉴 수정',
              component: AdminCategoryUpdate,
            }
          ]
        },
        {
          path: 'add-category',
          name: '메뉴 등록',
          component: AdminCategoryRegister
        },
        {
          path: 'users',
          redirect: 'users/all',
          meta: {label: '전체 회원 리스트'},
          name: '전체 회원 리스트',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'all',
              component: AdminUserList,
            },
            {
              path: 'black',
              name: '탈퇴 회원 리스트',
              component: AdminUserBlackList
            },
            {
              path: 'sleep',
              name: '휴먼 회원 리스트',
              component: AdminUserSleepList
            },
            {
              path: 'update/:id',
              name: '회원 상세 수정',
              component: AdminUserUpdate
            },
            {
              path: ':id',
              meta: {label: '회원 상세'},
              name: '회원 상세',
              component: AdminUserDetail,
            },
          ]
        },
        {
          path: 'add-user',
          name: '회원 등록',
          component:AdminUserRegister
        },
      ]
    }
  ]
}
