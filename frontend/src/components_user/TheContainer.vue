<template>
  <div class="c-app">
    <TheSidebar/>
    <div class="c-wrapper">
      <TheHeader/>
      <div class="c-body">
        <main class="c-main" style="padding-bottom: 100px; min-height:100%">
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </main>
      </div>
      <TheFooter/>
    </div>
  </div>
</template>

<script>
import TheSidebar from './TheSidebar'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'

export default {
  name: 'TheContainer',
  components: {
    TheSidebar,
    TheHeader,
    TheFooter
  },
  methods: {
    burgerMenuSidebar() {
      this.$parent.$emit('toggle-sidebar')
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
