<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <h1>This is a home page</h1>
<!--    100 random words within a p tag-->
    <p>
      apple banana orange mango pineapple grapefruit strawberry kiwi lemon lime peach pear cherry blueberry raspberry blackberry watermelon cantaloupe honeydew apricot plum avocado coconut papaya fig grape lemonade limeade orangeade cherryade peachade blueberryade strawberryade watermelonade kiwiade pineappleade cranberryade grapefruitade cantaloupeade honeydewade raspberryade blackberryade passionfruitade tangerineade persimmonade mulberryade lycheeade pomegranateade dragonfruitade guavaade gooseberryade kiwifruitade mandarinade nectarineade starfruitade ugli fruitade prickly pearade kumquatade feijoaade carambolaade pawpawade rambutanade longanade tamarilloade horned melonade pomeloade sapodillaade
    </p>
    <p>
      apple banana orange mango pineapple grapefruit strawberry kiwi lemon lime peach pear cherry blueberry raspberry blackberry watermelon cantaloupe honeydew apricot plum avocado coconut papaya fig grape lemonade limeade orangeade cherryade peachade blueberryade strawberryade watermelonade kiwiade pineappleade cranberryade grapefruitade cantaloupeade honeydewade raspberryade blackberryade passionfruitade tangerineade persimmonade mulberryade lycheeade pomegranateade dragonfruitade guavaade gooseberryade kiwifruitade mandarinade nectarineade starfruitade ugli fruitade prickly pearade kumquatade feijoaade carambolaade pawpawade rambutanade longanade tamarilloade horned melonade pomeloade sapodillaade
    </p>

    <Child/>

    <Child v-slot="{ hello}">
      SLOT OF CHILD
      <button @click="pressed()">Click me</button>
      <button @click="hello()">Hello</button>

      {{ data }}
    </Child>

    {{data}}
    {{msg}}




  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Child from "@/components/Child.vue";

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    Child
  },
  data(){
    return{
      msg: 'Welcome to Your Vue.js App',
      data: "fffffffffffffffffffffffff"
    }
  },
  methods: {
    messages() {
      return messages
    },
    pressed(){
      console.log("pressed")
      alert("pressed")
    }
  }
}
</script>
