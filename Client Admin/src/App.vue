<script>
import AddCategory from './components/AddCategory.vue'
import AddProduct from './components/AddProduct.vue'
import Category from './components/Category.vue'
import Dashboard from './components/Dashboard.vue'
import EditCategory from './components/EditCategory.vue'
import EditProduct from './components/EditProduct.vue'
import Login from './components/Login.vue'
import Logs from './components/Logs.vue'
import Product from './components/Product.vue'
import Register from './components/Register.vue'
import Sidebar from './components/Sidebar.vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const baseUrl = 'https://zaloris.aldrincloud.com'
// const baseUrl = 'http://localhost:3000'

export default {
  name: 'App',
  components: {
    Category,
    Dashboard,
    Login,
    Logs,
    Product,
    Register,
    Sidebar,
    EditCategory,
    EditProduct,
    AddCategory,
    AddProduct
  },
  data() {
    return {
      isLogin: false,
      page: 'login',
      dataProduct: [],
      dataCategory: [],
      dataHistory: [],
      lenProduct: 0,
      lenCategory: 0,
      currentUsername: '',
      currentUserRole: '',
      currentUserId: '',
      dataEditProduct: {},
      categoryToEdit: {}
    }
  },
  methods: {
    changePage(name) {
      this.page = name
    },
    async register(dataRegister) {
      try {
        const { data } = await axios({
          url: `${baseUrl}/register`,
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
    async login(dataLogin) {
      try {
        const { data } = await axios({
          url: `${baseUrl}/login`,
          method: 'POST',
          data: {
            email: dataLogin.email,
            password: dataLogin.password
          }
        })

        localStorage.setItem('access_token', data.data.access_token)
        localStorage.setItem('username', data.data.user.username)
        localStorage.setItem('role', data.data.user.role)
        localStorage.setItem('id', data.data.user.id)
        this.isLogin = true
        this.page = 'dashboard'
        this.currentUsername = data.data.user.username
        this.currentUserRole = data.data.user.role
        this.currentUserId = data.data.user.id

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
    async getProduct() {
      try {
        const { data } = await axios({
          url: `${baseUrl}/product/all`,
          method: 'GET',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        this.dataProduct = data.data
        this.lenProduct = data.data.length
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
    async getCategory() {
      try {
        const { data } = await axios({
          url: `${baseUrl}/category/all`,
          method: 'GET',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        this.dataCategory = data.data
        this.lenCategory = data.data.length
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
    async getLog() {
      try {
        const { data } = await axios({
          url: `${baseUrl}/history/all`,
          method: 'GET',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        this.dataHistory = data.data
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
    async addProduct(dataAddProduct) {
      try {
        const { data } = await axios({
          url: `${baseUrl}/product/add`,
          method: 'POST',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            name: dataAddProduct.name,
            categoryId: dataAddProduct.category,
            description: dataAddProduct.description,
            stock: dataAddProduct.stock,
            price: dataAddProduct.price,
            imgUrl: dataAddProduct.imgUrl
          }
        })
        this.page = 'product'
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
    async addCategory(dataAddCategory) {
      try {
        const { data } = await axios({
          url: `${baseUrl}/category/add`,
          method: 'POST',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            name: dataAddCategory
          }
        })
        this.page = 'category'
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
    logout() {
      localStorage.clear()
      this.page = 'login'
      this.isLogin = false
      this.currentUsername = ''
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
        title: `User ${this.currentUsername} logout successfully`
      })
    },
    async editProduct(newData) {
      try {
        const { data } = await axios({
          url: `${baseUrl}/product/${newData.id}/edit`,
          method: 'PUT',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            name: newData.name,
            description: newData.description,
            price: newData.price,
            stock: newData.stock,
            imgUrl: newData.imgUrl,
            categoryId: newData.category
          }
        })
        this.page = 'product'
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
    editedProduct(product) {
      this.dataEditProduct = product
      this.page = 'editProduct'
    },
    async editStatus({ id, status }) {
      try {
        const { data } = await axios({
          url: `${baseUrl}/product/${id}/edit-status`,
          method: 'PATCH',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: { status }
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
    async editCategory(newData) {
      try {
        const { data } = await axios({
          url: `${baseUrl}/category/${newData.id}/edit`,
          method: 'PUT',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            name: newData.name
          }
        })
        this.page = 'category'
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
    editCategoryHandler(category) {
      this.categoryToEdit = category
    },
    async deleteCategory(id) {
      try {
        const { data } = await axios({
          url: `${baseUrl}/category/${id}/delete`,
          method: 'DELETE',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.getCategory()
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
    handleGoogleLogin(data) {
      localStorage.setItem('username', data.data.username)
      localStorage.setItem('role', data.data.role)
      localStorage.setItem('id', data.data.id)
      this.isLogin = true
      this.page = 'dashboard'
      this.currentUsername = data.data.username
      this.currentUserRole = data.data.role
      this.currentUserId = data.data.id

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
    }
  }, // end of methods
  created() {
    const token = localStorage.getItem('access_token')
    const username = localStorage.getItem('username')
    const role = localStorage.getItem('role')
    const id = localStorage.getItem('id')
    if (token) {
      this.page = 'dashboard'
      this.isLogin = true
      this.currentUsername = username
      this.currentUserRole = role
      this.currentUserId = id
    }
  },
  watch: {
    isLogin(newValue) {
      if (newValue) {
        this.getProduct()
        this.getCategory()
        this.getLog()
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <!-- Sidebar Section -->
    <nav class="sidebar" v-if="isLogin">
      <header>
        <div class="image-text">
          <span class="image">
            <a href="" v-on:click="changePage('dashboard')"
              ><img src="./assets/logo.png" alt="logo"
            /></a>
          </span>
        </div>
      </header>
      <Sidebar
        v-if="isLogin"
        v-on:navigate="changePage"
        v-bind:getUsername="currentUsername"
        v-on:userLogout="logout"
        v-bind:getRole="currentUserRole"
      />
    </nav>
    <!-- End Sidebar Section -->

    <!-- Home Section -->
    <section class="home">
      <!-- Registration Form -->
      <Register
        v-if="page === 'register'"
        v-on:userRegister="register"
        v-on:navigate="changePage"
        v-on:autoLogin="login"
      />
      <!--End Registration Form -->

      <!-- Login Form -->
      <Login
        v-if="page === 'login'"
        v-on:userLogin="login"
        v-on:navigate="changePage"
        v-on:googleLoginSuccessful="handleGoogleLogin"
      />

      <!-- End Login Form -->

      <!-- Dashboard -->
      <Dashboard
        v-if="page === 'dashboard'"
        v-bind:getProduct="dataProduct"
        v-bind:getCategory="lenCategory"
      />
      <!-- End Dashboard -->

      <!-- Product -->
      <Product
        v-if="page === 'product'"
        v-bind:showProduct="dataProduct"
        v-on:getFormatCurrency="formatCurrency"
        v-on:navigate="changePage"
        v-on:refreshAfterAddProduct="getProduct"
        v-on:productId="editProduct"
        v-on:editProduct="editedProduct"
        v-on:editStatus="editStatus"
        v-bind:userRole="currentUserRole"
        v-bind:userId="currentUserId"
      />
      <!-- End Product -->

      <!-- Add Product Form -->
      <AddProduct
        v-if="page === 'addProduct'"
        v-on:navigate="changePage"
        v-bind:showCategoryFromApp="dataCategory"
        v-on:dataAddProduct="addProduct"
      />
      <!-- End add product -->

      <!-- Edit Product Form -->
      <EditProduct
        v-if="page === 'editProduct'"
        v-on:cancel="changePage"
        v-bind:getEditProductData="dataEditProduct"
        v-bind:getCategoryName="dataCategory"
        v-on:getDataEdited="editProduct"
      />
      <!-- End edit product -->

      <!-- Category -->
      <Category
        v-if="page === 'category'"
        v-bind:showCategory="dataCategory"
        v-on:navigate="changePage"
        v-on:refreshAfterAddProduct="getCategory"
        v-on:editedCategory="editCategoryHandler"
        v-on:deletedCategory="deleteCategory"
      />
      <!-- End Category -->

      <!-- Add Category Form -->
      <AddCategory
        v-if="page === 'addCategory'"
        v-on:navigate="changePage"
        v-on:dataCategoryName="addCategory"
      />
      <!-- End add category -->

      <!-- Edit Category Form -->
      <EditCategory
        v-if="page === 'editCategory'"
        v-on:cancel="changePage"
        v-bind:categoryName="categoryToEdit"
        v-on:sendDataEditCategory="editCategory"
      />
      <!-- End edit category -->

      <!-- Logs -->
      <Logs v-if="page === 'logs'" v-bind:showLogs="dataHistory" v-on:refreshLogs="getLog" />
      <!-- End Logs -->
    </section>
  </div>
</template>

<style></style>
