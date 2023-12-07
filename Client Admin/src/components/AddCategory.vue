<script>
import FormCategory from './FormCategory.vue'

export default {
  name: 'AddCategory',
  emits: ['navigate', 'dataCategoryName'],
  methods: {
    goToPage(pageName) {
      this.$emit('navigate', pageName)
    },
    dataCategoryNameHandler(name) {
      this.$emit('dataCategoryName', name)
    },
    sendDataHandler() {
      this.$refs.formCategoryRef.addCategoryHandler()
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
      <h2>Add Category</h2>
      <form v-on:submit.prevent="sendDataHandler">
        <FormCategory ref="formCategoryRef" v-on:categoryName="dataCategoryNameHandler" />
        <div class="double-input">
          <button type="button" v-on:click.prevent="goToPage('category')">Cancel</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </section>
</template>

<style></style>
