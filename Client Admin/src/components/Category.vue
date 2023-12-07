<script>
export default {
  name: 'Category',
  props: ['showCategory'],
  emits: ['navigate', 'refreshAfterAddProduct', 'editedCategory', 'deletedCategory'],
  methods: {
    goToPage(pageName) {
      this.$emit('navigate', pageName)
    },
    refreshAfterAddProductHandler() {
      this.$emit('refreshAfterAddProduct')
    },
    editCategoryHandler(category) {
      this.$emit('editedCategory', category)
      this.goToPage('editCategory')
    },

    deleteCategoryHandler(categoryId) {
      this.$emit('deletedCategory', categoryId)
    }
  },
  created() {
    this.refreshAfterAddProductHandler()
  }
}
</script>

<template>
  <section>
    <div class="header">
      <h1 class="title">Category</h1>
      <button class="add-btn" v-on:click.prevent="goToPage('addCategory')">Add New Category</button>
    </div>
    <table class="category-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in showCategory" :key="category.id">
          <td>{{ index + 1 }}</td>
          <td>{{ category.name }}</td>
          <td>
            <a href="" v-on:click.prevent="editCategoryHandler(category)">
              <i class="bx bx-edit"></i>
            </a>
            <a href="" v-on:click.prevent="deleteCategoryHandler(category.id)">
              <i class="bx bx-trash"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style></style>
