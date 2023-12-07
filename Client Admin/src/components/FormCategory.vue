<script>
export default {
  name: 'FormCategory',
  data() {
    return {
      name: ''
    }
  },
  emits: ['categoryName', 'sendNewDataToEditCategory'],
  props: ['categoryToEdit'],
  methods: {
    addCategoryHandler() {
      this.$emit('categoryName', this.name)
    },
    sendNewDataToEditCategoryHandler() {
      this.$emit('sendNewDataToEditCategory', {
        id: this.categoryToEdit.id,
        name: this.name
      })
    }
  },
  created() {
    if (this.categoryToEdit) {
      this.name = this.categoryToEdit.name
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
      placeholder="Category name"
      v-model="name"
    />
  </div>
</template>

<style></style>
