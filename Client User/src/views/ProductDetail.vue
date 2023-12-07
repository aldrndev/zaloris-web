<script>
import { mapActions, mapState } from 'pinia'
import { useDataStore } from '../stores/data'
import Carousel from './Carousel.vue'
import Navbar from '../components/Navbar.vue'

export default {
  name: 'ProductDetail',
  data() {
    return {
      productId: this.$route.params.id ?? 0
    }
  },
  components: {
    Carousel,
    Navbar
  },
  computed: {
    ...mapState(useDataStore, ['productDetail'])
  },
  methods: {
    ...mapActions(useDataStore, ['fecthProductDetail']),

    productDetailHandler() {
      this.fecthProductDetail(this.productId)
    },
    formatCurrency(number) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
        .format(number)
        .replace(/(\.|,)00$/g, '')
    }
  },
  created() {
    this.productDetailHandler()
  }
}
</script>

<template>
  <Navbar />
  <div class="mx-auto px-4 w-11/12">
    <Carousel />
    <section class="mt-10 flex gap-6">
      <main class="flex-1 bg-white p-4 shadow-lg">
        <div class="detail-product">
          <div class="px-6 py-6 lg:px-8 flex flex-col justify-center">
            <h1 class="text-center text-4xl mb-10">Detail Product</h1>
            <div class="flex justify-center">
              <img
                :src="productDetail?.imgUrl"
                alt="Product Name"
                class="w-1/2 h-96 object-contain"
              />
            </div>
            <div class="flex flex-col justify-center items-center">
              <h2 class="mt-5 mb-4 text-xl font-medium text-gray-900">
                {{ productDetail?.name }}
              </h2>

              <p class="mb-4">{{ productDetail?.description }}</p>
              <div class="mb-2">
                <strong>Price:</strong>
                {{ formatCurrency(productDetail?.price) }}
              </div>
              <div class="mb-2">
                <strong>Stock:</strong>
                {{ productDetail?.stock }}
              </div>
              <div class="mb-7">
                <strong>Category:</strong>
                {{ productDetail?.Category?.name }}
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  </div>
</template>
