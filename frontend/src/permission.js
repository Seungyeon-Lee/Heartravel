import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const sessionKey = sessionStorage.getItem('sessionKey');
  const userInfo = sessionStorage.getItem(sessionKey);

  if(userInfo != null)  { // 로그인 되었을 때
    if (userInfo.includes("\"role_index\":3"))  // 관리자이고
      {
        if (to.path == '/admin/login') // 현재 페이지가 관리자 로그인 페이지였으면
        {
          next({path: '/admin'})
          NProgress.done()
        } else
          next()
      }
     else {
      if (!to.path.startsWith("/admin")) next() // 관리자가 아니라면 관리자 페이지 접근한 것이 아니라면 넘어가기
      else
      {
        alert("권한이 없습니다")
        next('/')
      }
    }
  }
  else {
    if (to.path !== '/admin/login') { // 로그인 되지 않았을 때
      if (!(to.path.startsWith("/admin") || to.path.startsWith("/ADMIN"))) next() // 관리자 페이지 접근한 것이 아니라면 넘어가기 (login 페이지 제외)
      else {
        next({path : '/admin/login' }) // 관리자 페이지에 접근했다면 관리자 로그인 페이지로
        NProgress.done()
      }
    }
    else next()
  }
})

router.afterEach(() => {
  NProgress.done()
})
