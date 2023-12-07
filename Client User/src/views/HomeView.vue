<script>
import Carousel from './Carousel.vue'
import Navbar from '../components/Navbar.vue'
import Product from './Product.vue'

export default {
  name: 'HomeView',
  components: {
    Carousel,
    Navbar,
    Product
  }
}
</script>

<template>
  <Navbar />
  <div class="mx-auto px-4 w-11/12">
    <Carousel />
    <section class="mt-10 flex gap-6">
      <main class="flex-1 bg-white p-4 shadow-lg">
        <Product />
      </main>
    </section>
  </div>
</template>
