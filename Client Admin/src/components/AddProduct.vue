<script>
import FormProduct from './FormProduct.vue'
export default {
  name: 'AddProduct',
  emits: ['navigate', 'dataAddProduct'],
  props: ['showCategoryFromApp'],
  methods: {
    goToPage(pageName) {
      this.$emit('navigate', pageName)
    },
    dataAddProductHandler(dataProduct) {
      this.$emit('dataAddProduct', dataProduct)
    },
    sendDataHandler() {
      this.$refs.formProductRef.sendDataHandler()
    }
  }, //end of methods
  components: {
    FormProduct
  }
}
</script>

<template>
  <section>
    <div class="registration">
      <h2>Add Product</h2>
      <form v-on:submit.prevent="sendDataHandler">
        <FormProduct
          ref="formProductRef"
          v-bind:showCategoryFromAddProduct="showCategoryFromApp"
          v-on:sendDataProduct="dataAddProductHandler"
        />
        <div class="double-input">
          <button type="button" v-on:click.prevent="goToPage('product')">Cancel</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </section>
</template>

<style></style>
