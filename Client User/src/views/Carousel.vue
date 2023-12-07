<script>
export default {
  name: 'Carousel',
  data() {
    return {
      currentSlide: 0,
      slides: [
        'https://images.ctfassets.net/9q8du028z7sn/4BjKEKLRIC52S5lfKxEZXY/a9dd0deb78b16d1e2b001baf0d1e114f/1920x480_FATSKINNYAPPSLIDER_APPDESKTOP_CU_CLEARANCE50CB1.jpg',
        'https://images.ctfassets.net/9q8du028z7sn/32TjbKwI33qDipirxF3NFb/488e9c30f46ac054124ec78403e0b6b5/1920x480_SECONDARYDESKTOP_.jpg',
        'https://images.ctfassets.net/9q8du028z7sn/3VcC7gErm3VG2PcuHGDenh/59106f7342ef6465679df92a6ad6e295/1920x480_APPSLIDER_.jpg'
      ]
    }
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length
    }
  },
  mounted() {
    setInterval(() => {
      this.nextSlide()
    }, 3000)
  }
}
</script>

<template>
  <!-- carousel -->
  <section class="mt-10 shadow-lg">
    <div id="default-carousel" class="relative w-full">
      <div class="relative h-56 overflow-hidden md:h-96">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          :class="{ hidden: currentSlide !== index }"
          class="absolute duration-700 ease-in-out top-0 w-full h-full"
        >
          <img
            :src="slide"
            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="Carousel slide"
          />
        </div>
      </div>
    </div>
  </section>
</template>
