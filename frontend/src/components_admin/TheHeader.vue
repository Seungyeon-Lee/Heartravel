<template>
  <CHeader fixed with-subheader light>
    <CToggler
            in-header
            class="ml-3 d-lg-none"
            v-c-emit-root-event:toggle-sidebar-mobile
    />
    <CToggler
            in-header
            class="ml-3 d-md-down-none"
            v-c-emit-root-event:toggle-sidebar
    />
    <CHeaderNav
            class="mx-auto d-lg-none"
    />
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/admin">
         메인
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/admin/orders" exact>
        주문/배송
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/admin/users" exact>
        회원
       </CHeaderNavLink>
      </CHeaderNavItem>
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <TheHeaderDropdownAccnt />
    </CHeaderNav>
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0"/>
    </CSubheader>
  </CHeader>
</template>


<script>
  import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt
  }
}
</script>
