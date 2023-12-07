<script>
import { mapState, mapActions } from 'pinia'
import { useDataStore } from '../stores/data'

export default {
  name: 'Pagination',
  computed: {
    ...mapState(useDataStore, ['currentPage', 'totalPage'])
  },
  methods: {
    ...mapActions(useDataStore, ['setPage']),
    changePage(page) {
      this.setPage(page)
      this.$router.push(`/product/page/${page}`)
    }
  }
}
</script>

<template>
  <!-- Paginasi -->
  <div class="mt-10">
    <ul class="flex justify-center">
      <li class="mx-1" v-for="page in totalPage" :key="page">
        <a
          href="#"
          @click.prevent="changePage(page)"
          :class="[
            'px-4 py-2 rounded',
            currentPage === page
              ? 'bg-blue-500 text-white hover:bg-blue-800'
              : 'bg-gray-200 text-black'
          ]"
          >{{ page }}</a
        >
      </li>
    </ul>
  </div>
</template>
