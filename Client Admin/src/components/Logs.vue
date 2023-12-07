<script>
export default {
  name: 'Logs',
  props: ['showLogs'],
  emits: ['refreshLogs'],
  methods: {
    formatDate(dateString) {
      const options = {
        // weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }
      return new Date(dateString).toLocaleDateString('en-US', options)
    },
    refreshLogsHandler() {
      this.$emit('refreshLogs')
    }
  }, //end of methods
  created() {
    this.refreshLogsHandler()
  }
}
</script>

<template>
  <section>
    <h1 class="title-logs">Logs</h1>
    <table class="logs-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Created At</th>
          <th>Updated By</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(log, index) in showLogs" :key="log.id">
          <td>{{ index + 1 }}</td>
          <td>{{ log.name }}</td>
          <td>{{ log.description }}</td>
          <td>{{ formatDate(log.createdAt) }}</td>
          <td>{{ log.updatedBy }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style></style>
