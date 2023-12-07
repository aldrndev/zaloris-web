<script>
import FormCategory from './FormCategory.vue'

export default {
  name: 'EditCategory',
  emits: ['cancel', 'sendDataEditCategory'],
  props: ['categoryName'],
  methods: {
    goToPage(pageName) {
      this.$emit('cancel', pageName)
    },
    sendDataEditCategoryHandler(newData) {
      this.$emit('sendDataEditCategory', newData)
    },
    sendDataHandler() {
      this.$refs.formEditCategoryRef.sendNewDataToEditCategoryHandler()
    }
  },
  components: {
    FormCategory
  }
}
</script>

<template>
  <section>
    <div class="registration">
      <h2>Edit Category</h2>
      <form v-on:submit.prevent="sendDataHandler">
        <FormCategory
          ref="formEditCategoryRef"
          v-bind:categoryToEdit="categoryName"
          v-on:sendNewDataToEditCategory="sendDataEditCategoryHandler"
        />
        <div class="double-input">
          <button type="button" v-on:click.prevent="goToPage('category')">Cancel</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </section>
</template>

<style></style>
