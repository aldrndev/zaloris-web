import axios from 'axios'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

const BASE_URL = 'https://zaloris.aldrincloud.com'
// const BASE_URL = 'http://localhost:3000'

export const useDataStore = defineStore('data', {
  state() {
    return {
      dataProduct: [],
      currentPage: 1,
      totalPage: 0,
      productDetail: {},
      wishlistData: [],
      wishlistIds: []
    }
  },
  actions: {
    async fetchDataProduct(page = 1, name = '') {
      try {
        let params = {
          page
        }
        if (name) {
          params.name = name
        }

        const { data } = await axios({
          url: `${BASE_URL}/pub/product`,
          method: 'GET',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          params: params
        })

        this.dataProduct = data.data
        this.currentPage = data.pagination.currentPage
        this.totalPage = data.pagination.totalPages
      } catch (error) {
        console.log(error)
      }
    },

    setPage(page) {
      this.currentPage = page
      this.fetchDataProduct(page)
    },

    async fecthProductDetail(productId) {
      try {
        const { data } = await axios({
          url: `${BASE_URL}/pub/product/${productId}`,
          method: 'GET',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.productDetail = data.data
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

    async addWishlist(productId) {
      try {
        const { data } = await axios({
          url: `${BASE_URL}/pub/wishlist/${productId}`,
          method: 'POST',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.wishlistIds.push(productId)
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

    async fectWishlist() {
      try {
        const { data } = await axios({
          url: `${BASE_URL}/pub/wishlist`,
          method: 'GET',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.wishlistData = data.data
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

    async deleteWishlist(productId) {
      try {
        const { data } = await axios({
          url: `${BASE_URL}/pub/wishlist/${productId}/delete`,
          method: 'DELETE',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.fectWishlist()
        this.wishlistIds = this.wishlistIds.filter((wishlistId) => wishlistId !== productId)
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
    async getWishlist(id) {
      try {
        const { data } = await axios({
          url: `${BASE_URL}/pub/wishlist/${id}`,
          method: 'GET',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        if (data.data) {
          this.wishlistIds.push(id)
        } else {
          this.wishlistIds = this.wishlistIds.filter((wishlistId) => wishlistId !== id)
        }
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
  } // end of actions
})
