<template>
  <CHeader>
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
    <CHeaderNav class="d-mr-down-none mx-auto">
      <CHeaderNavItem>
        <CHeaderNavLink to="/">
          <img src="/static/images/logo.png"
               width="120"/>
        </CHeaderNavLink>
      </CHeaderNavItem>
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <CHeaderNavItem class="d-mr-down-none mx-auto">
        <CHeaderNavLink to="/basket">
          <span class="basket"></span>
        </CHeaderNavLink>
      </CHeaderNavItem>
    </CHeaderNav>
  </CHeader>
</template>

<script>

  export default {
    name: 'TheHeader',
    components: {
    }
  }
</script>

<style scoped>
  .basket{
    background-image: url("/static/images/basket.png");
    width: 20px;
    height: 20px;
    background-size: 20px;
    background-repeat: no-repeat;
  }
  .hamburger{
    background-image: url("/static/images/hamburger.png");
    width: 20px;
    height: 20px;
    background-size: 20px;
    background-repeat: no-repeat;
  }
</style>
