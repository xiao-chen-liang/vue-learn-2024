<script>
export default {
  data(){
    return {
      // a list of jobs with 3 items, each with a title, an id  and a description
      jobs: [
        {id: 1, title: 'Job 1', description: 'This is the first job'},
        {id: 2, title: 'Job 2', description: 'This is the second job'},
        {id: 3, title: 'Job 3', description: 'This is the third job'}
      ]

    }
  }
}
</script>

<template>

  <h1>Jobs</h1>
  <div v-for="job in jobs" :key="job.id">
    <h2>{{job.title}}</h2>
    <p>{{job.description}}</p>
    <router-link :to="{name: 'job-details', params: {id: job.id}}">View {{job.title}} 's Details</router-link>
  </div>

</template>

<style scoped>

</style>