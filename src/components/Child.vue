<script>
export default {
  name: "Child",
  data(){
    return{
      data: "This is from the child component, I am the child data"
    }
  },


  methods:{
    hello() {
      console.log("Hello from the child component")
      window.alert("Hello from the child component")
    }
  }
}


</script>

<template>

  <h1>Child</h1>
  <p>This is the child component</p>



  <slot :data="data" :hello="hello"></slot>

</template>

<style scoped>

</style>