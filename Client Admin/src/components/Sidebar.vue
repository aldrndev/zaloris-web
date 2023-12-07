<script>
export default {
  name: 'Sidebar',
  emits: ['navigate', 'userLogout'],
  methods: {
    goToPage(pageName) {
      this.$emit('navigate', pageName)
    },
    logoutHandler() {
      this.$emit('userLogout')
    }
  },
  props: ['getUsername']
}
</script>

<template>
  <div class="menu-bar">
    <div class="menu">
      <ul class="menu">
        <li class="nav-link" v-on:click.prevent="goToPage('dashboard')">
          <a href="">
            <i class="bx bxs-dashboard icon"></i>
            <span class="text nav-text"> Dashboard</span>
          </a>
        </li>
        <li class="nav-link" v-on:click.prevent="goToPage('product')">
          <a href="">
            <i class="bx bx-store-alt icon"></i>
            <span class="text nav-text"> Product</span>
          </a>
        </li>
        <li class="nav-link" v-on:click.prevent="goToPage('category')">
          <a href="">
            <i class="bx bxs-label icon"></i>
            <span class="text nav-text"> Category</span>
          </a>
        </li>
        <li class="nav-link" v-on:click.prevent="goToPage('logs')">
          <a href="">
            <i class="bx bx-history icon"></i>
            <span class="text nav-text"> Logs</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="bottom-content">
      <li class="">
        <i class="bx bxs-user icon"></i>
        <span class="text nav-text">{{ getUsername ?? 'Username' }}</span>
      </li>
      <li class="" v-on:click.prevent="logoutHandler">
        <a href="">
          <i class="bx bx-log-out icon"></i>
          <span class="text nav-text">logout</span>
        </a>
      </li>
    </div>
  </div>
</template>

<style></style>
