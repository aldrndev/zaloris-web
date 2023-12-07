<script>
import axios from 'axios'
import Swal from 'sweetalert2'

const baseUrl = 'https://zaloris.aldrincloud.com'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  emits: ['userLogin', 'navigate', 'googleLoginSuccessful'],
  methods: {
    userLoginHandler() {
      this.$emit('userLogin', {
        email: this.email,
        password: this.password
      })
    },
    goToPage(pageName) {
      this.$emit('navigate', pageName)
    },
    handleCredentialResponse(response) {
      const idToken = response.credential
      this.googleLogin(idToken)
    },
    async googleLogin(idToken) {
      try {
        const { data } = await axios({
          url: `${baseUrl}/login-google`,
          method: 'POST',
          data: {
            token: idToken
          }
        })
        localStorage.setItem('access_token', data.access_token)
        this.$emit('googleLoginSuccessful', data)
      } catch (error) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'error',
          title: error.response.data.message
        })
      }
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
      <form v-on:submit.prevent="userLoginHandler">
        <div class="input-group">
          <label for="email-login">Email</label>
          <input
            type="email"
            id="email-login"
            name="email-login"
            placeholder="Enter your email"
            v-model="email"
          />
        </div>
        <div class="input-group">
          <label for="password-login">Password</label>
          <input
            type="password"
            id="password-login"
            name="password-login"
            placeholder="Enter your password"
            v-model="password"
          />
        </div>
        <div class="double-input">
          <button type="submit">Login</button>
        </div>
        <div class="link-register2" id="buttonDiv"></div>
        <div class="link-register" v-on:click.prevent="goToPage('register')">
          <span>Don't have account? </span><a href="">Register</a>
        </div>
      </form>
    </div>
  </section>
</template>

<style></style>
