<script>
import ProductCard from '../components/ProductCard.vue'
import Pagination from '../components/Pagination.vue'
import { mapActions, mapState } from 'pinia'
import { useDataStore } from '../stores/data'
export default {
  name: 'Product',
  data() {
    return {
      nameSearch: ''
    }
  },
  components: {
    Pagination,
    ProductCard
  },
  methods: {
    ...mapActions(useDataStore, ['fetchDataProduct']),
    searchByName() {
      if (this.nameSearch.trim() !== '') {
        this.fetchDataProduct(1, this.nameSearch)
      } else {
        this.fetchDataProduct(1)
      }
    }
  },
  computed: {
    ...mapState(useDataStore, ['dataProduct'])
  },
  created() {
    const page = this.$route.params.page ?? 1
    this.fetchDataProduct(page)
  },
  watch: {
    '$route.params.page'(newPage) {
      this.fetchDataProduct(newPage)
    }
  }
}
</script>
<template>
  <!-- Search By Name -->
  <div class="mb-7 flex flex-col justify-center items-center">
    <label class="block text-sm font-bold mb-2" for="search">Search Product</label>
    <input
      v-model="nameSearch"
      @input="searchByName"
      class="shadow appearance-none border rounded w-1/4 py-2 px-3"
      id="search"
      name="search"
      type="text"
      placeholder="Search by name"
    />
  </div>

  <div class="p-4">
    <div class="grid grid-cols-2 gap-4 md:grid-cols-3 rounded">
      <!-- Card Produk disini -->
      <ProductCard v-for="product in dataProduct" :key="product.id" :getProduct="product" />
    </div>

    <!-- pagination -->
    <Pagination />
    <!-- end of pagination -->
  </div>
</template>
