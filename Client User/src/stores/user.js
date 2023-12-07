import axios from 'axios'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

const BASE_URL = 'https://zaloris.aldrincloud.com'
// const BASE_URL = 'http://localhost:3000'

export const useUserStore = defineStore('user', {
  state() {
    return {
      isLogin: !!localStorage.getItem('access_token'),
      currentLoginUser: {
        currentUsername: localStorage.getItem('username') ?? '',
        currentEmail: localStorage.getItem('email') ?? ''
      },
      userDetails: null
    }
  },
  actions: {
    async loginUser(dataLogin) {
      try {
        const { data } = await axios({
          url: `${BASE_URL}/pub/login`,
          method: 'POST',
          data: {
            email: dataLogin.email,
            password: dataLogin.password
          }
        })

        localStorage.setItem('access_token', data.data.access_token)
        this.isLogin = true
        this.currentLoginUser.currentUsername = data.data.user.username
        this.currentLoginUser.currentEmail = data.data.user.email
        localStorage.setItem('username', data.data.user.username)
        localStorage.setItem('email', data.data.user.email)

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
          icon: 'success',
          title: data.data.message
        })
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
    },
    async logout() {
      localStorage.clear()
      this.isLogin = false

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
        icon: 'success',
        title: `User ${this.currentLoginUser.currentUsername} logout successfully`
      })
      this.currentLoginUser = {}
    },
    async registerUser(dataRegister) {
      try {
        const { data } = await axios({
          url: `${BASE_URL}/pub/register`,
          method: 'POST',
          data: {
            username: dataRegister.username,
            email: dataRegister.email,
            password: dataRegister.password,
            phoneNumber: dataRegister.phoneNumber,
            address: dataRegister.address
          }
        })
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
          icon: 'success',
          title: data.message
        })
        return true
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
        return false
      }
    },
    async googleLogin(idToken) {
      try {
        const { data } = await axios({
          url: `${BASE_URL}/pub/login-google`,
          method: 'POST',
          data: {
            token: idToken
          }
        })
        localStorage.setItem('access_token', data.access_token)
        this.isLogin = true
        this.currentLoginUser.currentUsername = data.data.username
        this.currentLoginUser.currentEmail = data.data.email
        localStorage.setItem('username', data.data.username)
        localStorage.setItem('email', data.data.email)
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
          icon: 'success',
          title: data.message
        })
      } catch (error) {
        console.log(error)
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
  } //end of actions
})
