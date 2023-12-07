<script>
export default {
  name: 'FormProduct',
  data() {
    return {
      dataProduct: {
        name: '',
        category: '',
        description: '',
        stock: '',
        price: '',
        imgUrl: ''
      }
    }
  },
  props: ['showCategoryFromAddProduct', 'productData'],
  emits: ['sendDataProduct', 'sendNewDataToEditProduct'],
  methods: {
    sendDataHandler() {
      this.$emit('sendDataProduct', this.dataProduct)
    },
    sendNewDataToEditProductHandler() {
      this.$emit('sendNewDataToEditProduct', this.dataProduct)
    }
  },

  created() {
    if (this.productData) {
      this.dataProduct = { ...this.productData }
      this.dataProduct.category = this.productData.categoryId
    }
  }
}
</script>

<template>
  <div class="input-group">
    <label for="productName">Name</label>
    <input
      type="text"
      id="productName"
      name="productName"
      placeholder="Product name"
      v-model="dataProduct.name"
    />
  </div>

  <div class="input-group">
    <label for="category">Category</label>
    <select id="category" name="category" v-model="dataProduct.category">
      <option disabled value="">Please select a category</option>
      <option
        v-for="category in showCategoryFromAddProduct"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
  </div>

  <div class="input-group">
    <label for="description">Description</label>
    <textarea
      id="description"
      name="description"
      rows="4"
      placeholder="Product description"
      v-model="dataProduct.description"
    ></textarea>
  </div>

  <div class="input-group double-input">
    <div>
      <label for="stock">Stock</label>
      <input
        type="number"
        id="stock"
        name="stock"
        placeholder="Stock amount"
        v-model="dataProduct.stock"
      />
    </div>

    <div>
      <label for="price">Price</label>
      <input
        type="number"
        id="price"
        name="price"
        placeholder="Product price"
        v-model="dataProduct.price"
      />
    </div>
  </div>

  <div class="input-group">
    <label for="image">Image</label>
    <input
      type="text"
      id="image"
      name="image"
      placeholder="Image URL"
      v-model="dataProduct.imgUrl"
    />
  </div>
</template>

<style></style>
