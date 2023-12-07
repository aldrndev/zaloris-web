<script>
import FormProduct from './FormProduct.vue'
export default {
  name: 'EditProduct',
  emits: ['cancel', 'getDataEdited'],
  props: ['getEditProductData', 'getCategoryName'],
  methods: {
    goToPage(pageName) {
      this.$emit('cancel', pageName)
    },
    getDataEditedHandler(newData) {
      this.$emit('getDataEdited', newData)
    },
    sendDataHandler() {
      this.$refs.formEditProductRef.sendNewDataToEditProductHandler()
    }
  },
  components: {
    FormProduct
  }
}
</script>

<template>
  <section>
    <div class="registration">
      <h2>Edit Product</h2>
      <form v-on:submit.prevent="sendDataHandler">
        <FormProduct
          ref="formEditProductRef"
          v-bind:productData="getEditProductData"
          v-bind:showCategoryFromAddProduct="getCategoryName"
          v-on:sendNewDataToEditProduct="getDataEditedHandler"
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
