<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores/user'

export default {
  name: 'Login',
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState(useUserStore, ['isLogin'])
  },
  methods: {
    ...mapActions(useUserStore, ['loginUser', 'googleLogin']),
    handleCredentialResponse(response) {
      const idToken = response.credential
      this.googleLogin(idToken).then(() => {
        this.$router.push('/')
      })
    },
    loginHandler() {
      this.loginUser(this.loginData).then(() => {
        if (this.isLogin) {
          this.$router.push('/')
        }
      })
    },
    changePage(page) {
      this.$router.push({ name: page })
    }
  },
  mounted() {
    google.accounts.id.initialize({
      client_id: '675504661602-2pk3gcgtes6pg88e302ogffr488jlm5j.apps.googleusercontent.com',
      callback: this.handleCredentialResponse
    })
    google.accounts.id.renderButton(document.getElementById('buttonDiv'), {
      theme: 'outline',
      size: 'large'
    })
  }
}
</script>

<template>
  <section>
    <div class="registration">
      <h2>Login</h2>
      <form @submit.prevent="loginHandler">
        <div class="input-group">
          <label for="email-login">Email</label>
          <input
            type="email"
            id="email-login"
            name="email-login"
            placeholder="Enter your email"
            v-model="loginData.email"
          />
        </div>
        <div class="input-group">
          <label for="password-login">Password</label>
          <input
            type="password"
            id="password-login"
            name="password-login"
            placeholder="Enter your password"
            v-model="loginData.password"
          />
        </div>
        <div class="double-input">
          <button type="submit" class="mt-5 px-10 py-3 bg-blue-600 text-white rounded">
            Login
          </button>
        </div>
        <div class="link-register2" id="buttonDiv"></div>
        <div class="link-register mt-4">
          <span>Don't have account? </span
          ><a
            href=""
            @click.prevent="changePage('register')"
            class="mt-3 underline transition duration-300"
            >Register</a
          >
        </div>
      </form>
    </div>
  </section>
</template>
