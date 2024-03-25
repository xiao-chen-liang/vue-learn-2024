<template>
  <div>
    <button @click="getData">Fetch Data</button>
    <div v-if="data">
      <h2>Data:</h2>
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: null
    };
  },
  methods: {
    async getData() {
      console.log('ScoreItems.vue getData()');
      try {
        const response = await axios.get('http://127.0.0.1:5000/me');
        this.data = response.data;
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
};
</script>
