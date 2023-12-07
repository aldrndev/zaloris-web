<script>
export default {
  name: 'Dashboard',
  props: ['getProduct', 'getCategory'],
  computed: {
    totalActiveAndArchivedProduct() {
      const data = this.getProduct.filter((product) => product.status !== 'Inactive')
      return data.length
    },
    totalInactiveProduct() {
      const data = this.getProduct.filter((product) => product.status === 'Inactive')
      return data.length
    }
  }
}
</script>

<template>
  <section>
    <h1 class="title">Dashboard</h1>
    <div class="dashboard-info">
      <div class="dashboard-item">
        <div class="dashboard-content">
          <span class="dashboard-label">Total Active and Archived Products</span>
          <span class="dashboard-number">{{ totalActiveAndArchivedProduct }}</span>
        </div>
      </div>
      <div class="dashboard-item">
        <div class="dashboard-content">
          <span class="dashboard-label">Total Inactive Products</span>
          <span class="dashboard-number">{{ totalInactiveProduct }}</span>
        </div>
      </div>
      <div class="dashboard-item">
        <div class="dashboard-content">
          <span class="dashboard-label">Total Categories</span>
          <span class="dashboard-number">{{ getCategory }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
