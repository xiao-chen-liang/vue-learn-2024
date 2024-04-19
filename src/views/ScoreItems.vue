<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-cascader :options="options" clearable @change="handleCascaderChange"></el-cascader>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <!-- Display the data stored in the rule variable -->
          <pre>{{ rule }}</pre>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: null,
      options: null,
      rule: null, // Define the rule variable
    };
  },
  methods: {
    async getOptions() {
      try {
        const response = await axios.get('http://localhost:5000/get_grades_and_colleges');
        return response.data;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async handleCascaderChange(selectedValues) {
      try {
        // Append the selected value to the request URL
        const url = `http://localhost:5000/get_rule_data/${selectedValues[0]}/${selectedValues[1]}`;
        const response = await axios.get(url);
        // Save the fetched data to the rule variable
        this.rule = response.data;
        console.log('Rule data:', this.rule)
      } catch (error) {
        console.error('Error fetching rule data:', error);
      }
    }
  },
  async created() {
    this.options = await this.getOptions();
  }
};
</script>

<style scoped>
/* Your scoped styles here */
</style>


