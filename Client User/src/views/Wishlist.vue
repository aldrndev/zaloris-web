<script>
import WishlistCard from '../components/WishlistCard.vue'
import Carousel from './Carousel.vue'
import Navbar from '../components/Navbar.vue'
import Product from './Product.vue'
import { mapActions, mapState } from 'pinia'
import { useDataStore } from '../stores/data'

WishlistCard
export default {
  name: 'Wishlist',
  components: {
    WishlistCard,
    Carousel,
    Navbar,
    Product
  },
  computed: {
    ...mapState(useDataStore, ['wishlistData'])
  },
  methods: {
    ...mapActions(useDataStore, ['fectWishlist']),
    fecthWishlistHandler() {
      this.fectWishlist()
    }
  },
  created() {
    this.fecthWishlistHandler()
  }
}
</script>

<template>
  <Navbar />
  <div class="mx-auto px-4 w-11/12">
    <Carousel />
    <section class="p-4">
      <h2 class="text-2xl font-bold mb-4">My Wishlist</h2>
      <!-- Daftar produk di wishlist -->
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4 rounded">
        <!-- produk wishlist disini -->
        <WishlistCard v-for="list in wishlistData" :key="list.id" :wishlist="list" />
      </div>
    </section>
  </div>
</template>

<style></style>
