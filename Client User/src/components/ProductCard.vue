<script>
import { mapActions, mapState } from 'pinia'
import { useDataStore } from '../stores/data'

export default {
  name: 'ProductCard',
  props: ['getProduct'],
  computed: {
    ...mapState(useDataStore, ['wishlistIds']),
    isProductInWishlist() {
      return this.wishlistIds.includes(this.getProduct.id)
    }
  },
  methods: {
    ...mapActions(useDataStore, ['addWishlist', 'getWishlist', 'deleteWishlist']),
    formatCurrency(number) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
        .format(number)
        .replace(/(\.|,)00$/g, '')
    },
    goToDetail(id) {
      this.$router.push(`/product/detail/${id}`)
    },
    toggleWishlistHandler() {
      if (!localStorage.getItem('access_token')) {
        this.$router.push('/login')
      }
      if (this.isProductInWishlist) {
        this.deleteWishlist(this.getProduct.id)
      } else {
        this.addWishlist(this.getProduct.id)
      }
    },
    getWishlistHandler() {
      if (localStorage.getItem('access_token')) {
        this.getWishlist(this.getProduct.id)
      }
    }
  },
  created() {
    this.getWishlistHandler()
  }
}
</script>

<template>
  <div class="bg-white p-4 rounded shadow-xl">
    <img :src="getProduct.imgUrl" alt="Product Name" class="w-full h-96 object-contain rounded" />
    <h4 class="mt-2 text-lg mb-2">{{ getProduct.name }}</h4>
    <div class="mb-2"><strong>Category:</strong> {{ getProduct.Category.name }}</div>
    <div class="mb-2"><strong>Price:</strong> {{ formatCurrency(getProduct.price) }}</div>
    <div class="flex justify-between items-center mt-4">
      <button
        @click.prevent="goToDetail(getProduct.id)"
        class="px-3 py-2 bg-blue-600 text-white rounded"
      >
        Detail
      </button>
      <span class="text-red-500 cursor-pointer" @click.prevent="toggleWishlistHandler">
        <i :class="isProductInWishlist ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i>
      </span>
    </div>
  </div>
</template>
