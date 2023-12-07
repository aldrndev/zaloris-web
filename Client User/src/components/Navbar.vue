<script>
import { mapState, mapActions } from 'pinia'
import { RouterLink } from 'vue-router'
import { useUserStore } from '../stores/user'

export default {
  name: 'Navbar',
  data() {
    return {
      dropdownOpen: false
    }
  },
  components: {
    RouterLink
  },
  methods: {
    ...mapActions(useUserStore, ['logout']),
    changePage(page) {
      this.$router.push({ name: page })
    },
    logoutHandler() {
      this.logout().then(() => {
        this.$router.push('/')
      })
      this.dropdownOpen = false
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    }
  },
  computed: {
    ...mapState(useUserStore, ['isLogin', 'currentLoginUser'])
  }
}
</script>

<template>
  <section>
    <nav class="bg-white border-b border-gray-200 shadow-md">
      <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a href="" @click.prevent="changePage('home')" class="flex items-center">
          <span class="self-center text-2xl font-semibold whitespace-nowrap text-gray-650"
            >Zaloris</span
          >
        </a>

        <!-- Links Section -->
        <div class="flex items-center space-x-6" style="position: relative">
          <!-- Menu Links -->
          <div class="hidden md:flex items-center space-x-6">
            <a
              href=""
              @click.prevent="changePage('home')"
              class="text-gray-650 hover:text-blue-500 dark:text-gray-650 dark:hover:text-blue-400 hover:underline transition duration-300"
              >Home</a
            >
            <a
              href=""
              v-if="!isLogin"
              @click.prevent="changePage('register')"
              class="text-gray-600 hover:text-blue-500 dark:text-gray-650 dark:hover:text-blue-400 hover:underline transition duration-300"
              >Register</a
            >
            <a
              href=""
              v-if="!isLogin"
              @click.prevent="changePage('login')"
              class="text-gray-600 hover:text-blue-500 dark:text-gray-650 dark:hover:text-blue-400 hover:underline transition duration-300"
              >Login</a
            >
          </div>

          <!-- User Menu -->
          <button
            v-if="isLogin"
            @click.prevent="toggleDropdown"
            type="button"
            class="ml-4 flex text-sm bg-gray-800 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Open user menu</span>
            <img class="w-10 h-10" src="../assets/avatar.png" alt="user photo" />
          </button>

          <!-- Dropdown menu -->
          <div
            v-if="dropdownOpen"
            class="z-50 mt-2 text-base list-none bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            style="position: absolute; top: 100%; left: 0; min-width: 200px"
          >
            <div class="px-4 py-3">
              <span class="block text-sm text-gray-900 dark:text-white">{{
                currentLoginUser.currentUsername
              }}</span>
              <span class="block text-sm text-gray-500 truncate dark:text-gray-400">{{
                currentLoginUser.currentEmail
              }}</span>
            </div>
            <ul class="py-2">
              <li>
                <a
                  href=""
                  @click.prevent="changePage('wishlist')"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 dark:hover:bg-blue-600 dark:text-blue-200 dark:hover:text-white"
                  >Wishlist</a
                >
              </li>
              <li>
                <a
                  href=""
                  @click.prevent="logoutHandler"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 dark:hover:bg-blue-600 dark:text-blue-200 dark:hover:text-white"
                  >Logout</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </section>
</template>
