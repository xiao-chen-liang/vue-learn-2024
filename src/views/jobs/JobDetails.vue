<script>
export default {
  name: "JobDetails",
  data(){
    return{
      // id: this.$route.params.id
    }
  },
  props: ['id'],
}
</script>

<template>
  <div class="job-details">
    <h1>Job Details</h1>
    <p>The job id is {{$route.params.id}}</p>
    <p>The job id is {{id}}</p>
  </div>

</template>

<style scoped>

</style>