export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavTitle',
        _children: ['상품관리']
      },
      {
        _name: 'CSidebarNavItem',
        name: '상품 리스트',
        to: '/admin/product',
        icon: 'cil-list',
      },
      {
        _name: 'CSidebarNavItem',
        name: '상품 등록',
        to: '/admin/add-product',
        icon: 'cil-data-transfer-up',
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['주문관리']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: '주문 리스트',
        to: '/admin/orders',
        icon: 'cil-basket',
        items: [
          {
            name: '주문 통합 리스트',
            to: '/admin/orders/all',
            icon: 'cil-credit-card',
          },
          {
            name: '결제 대기 리스트',
            to: '/admin/orders/order',
            icon: 'cil-battery-alert'
          },
          {
            name: '결제 완료 리스트',
            to: '/admin/orders/pay',
            icon: 'cil-battery-0'
          },
          {
            name: '배송중 리스트',
            to: '/admin/orders/delivery',
            icon: 'cil-battery-3'
          },
          {
            name: '배송 완료 리스트',
            to: '/admin/orders/complete',
            icon: 'cil-battery-5'
          },
          {
            name: '취소/환불 리스트',
            to: '/admin/orders/fail',
            icon: 'cil-battery-slash'
          }
        ]
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['답변관리']
      },
      {
        _name: 'CSidebarNavItem',
        name: '1:1문의',
        to: '/admin/inquiry',
        icon: 'cil-pencil'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['메뉴관리']
      },
      {
        _name: 'CSidebarNavItem',
        name: '메뉴 리스트',
        to: '/admin/category',
        icon: 'cil-list-rich',
      },
      {
        _name: 'CSidebarNavItem',
        name: '메뉴 등록',
        to: '/admin/add-category',
        icon: 'cil-playlist-add',
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['회원관리']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: '회원 리스트',
        route: '/admin/users',
        icon: 'cil-people',
        items: [
          {
            name: '전체 회원 리스트',
            to: '/admin/users/all',
            icon: 'cil-user-follow'
          },
          {
            name: '탈퇴 회원 리스트',
            to: '/admin/users/black',
            icon: 'cil-trash'
          },
          {
            name: '휴먼 회원 리스트',
            to: '/admin/users/sleep',
            icon: 'cil-user-unfollow'
          }
        ]
      }
      ]
}
]