<script>
export default {
  name: 'Product',
  props: ['showProduct', 'userRole', 'userId'],
  emits: ['navigate', 'refreshAfterAddProduct', 'editProduct', 'editStatus'],
  methods: {
    formatCurrency(number) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
        .format(number)
        .replace(/(\.|,)00$/g, '')
    },
    goToPage(pageName) {
      this.$emit('navigate', pageName)
    },
    refreshAfterAddProductHandler() {
      this.$emit('refreshAfterAddProduct')
    },
    editProductHandler(product) {
      this.$emit('editProduct', product)
      this.goToPage('editProduct')
    },
    updateStatusHandler(productId, status) {
      this.$emit('editStatus', { id: productId, status })
    }
  },
  created() {
    this.refreshAfterAddProductHandler()
  },
  computed: {
    filteredProducts() {
      return this.showProduct.filter((product) => product.status !== 'Inactive')
    }
  }
}
</script>

<template>
  <section>
    <div class="header">
      <h1 class="title">Product</h1>
      <button class="add-btn" v-on:click.prevent="goToPage('addProduct')">Add New Product</button>
    </div>

    <table class="product-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Image</th>
          <th>Description</th>
          <th>Stock</th>
          <th>Price</th>
          <th>Author</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in filteredProducts" :key="product.id">
          <td>{{ index + 1 }}</td>
          <td>{{ product.name }}</td>
          <td>
            <img :src="product.imgUrl" alt="Product Image" class="product-img" />
          </td>
          <td>{{ product.description }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ formatCurrency(product.price) }}</td>
          <td>{{ product.User.email }}</td>
          <td v-if="userRole === 'admin'">
            <select
              v-model="product.status"
              v-on:change="updateStatusHandler(product.id, product.status)"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Archived">Archived</option>
            </select>
          </td>
          <td v-else>{{ product.status }}</td>

          <td>
            <a
              href=""
              v-if="userRole === 'admin' || product.authorId === userId"
              v-on:click.prevent="editProductHandler(product)"
            >
              <i class="bx bx-edit"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style></style>
