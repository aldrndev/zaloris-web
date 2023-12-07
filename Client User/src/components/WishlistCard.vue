<script>
import { useDataStore } from '../stores/data'
import { mapActions } from 'pinia'

export default {
  name: 'WishlistCard',
  props: ['wishlist'],
  methods: {
    ...mapActions(useDataStore, ['deleteWishlist', 'fectWishlist']),
    deleteWishlistHandler() {
      this.deleteWishlist(this.wishlist.Product.id)
    }
  }
}
</script>

<template>
  <div class="bg-white shadow rounded p-4 relative">
    <!-- Logo hati untuk remove wishlist -->
    <div
      class="absolute right-2 top-2 text-red-500 cursor-pointer"
      @click.prevent="deleteWishlistHandler"
    >
      <span class="text-red-500 cursor-pointer">
        <i class="fa-solid fa-heart"></i>
      </span>
    </div>
    <img
      :src="wishlist.Product.imgUrl"
      alt="Product Name"
      class="w-full h-96 object-contain mb-6"
    />
    <h3 class="mb-2 text-lg font-medium text-gray-900">{{ wishlist.Product.name }}</h3>
    <div class="mb-2"><strong>Price:</strong> {{ wishlist.Product.price }}</div>
    <div class="mb-2"><strong>Stock:</strong> {{ wishlist.Product.stock }}</div>
  </div>
</template>
