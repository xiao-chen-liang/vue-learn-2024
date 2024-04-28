<template>
  <div>
    <el-row>
      <el-col :span="8">
        <div>
          <el-cascader :options="options" clearable @change="handleCascaderChange" v-model="selectedValue"
                       size="large"></el-cascader>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="headline">
          <h2>{{ selectedValueHeadline }}</h2>
        </div>
        <div class="grid-content bg-purple" id="report_table">
          <el-table
              :data="reportData"
              v-loading="reportData === null"
              stripe
              class="centered-table"
          >
            <el-table-column
                prop="name"
                label="Name"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="sn"
                label="SN"
                align="center"
            ></el-table-column>

            <el-table-column
                prop="score"
                :label="scoreLabel"
                align="center"
                sortable
            ></el-table-column>
            <el-table-column
                prop="comprehensive"
                :label="comprehensiveLabel"
                align="center"
                sortable
            ></el-table-column>
            <el-table-column
                prop="sum"
                label="Sum"
                align="center"
                sortable
            ></el-table-column>
            <!--            add a column-->
            <el-table-column
                label="Change Comprehensive"
                align="center"
            >
              <!--              an input box combined with the value of inputValue-->
              <template #default="{ row }">
                <el-input v-model="row.inputValue" class="input_box" style="width: 100px"></el-input>
                <el-button type="primary" :disabled="row.inputValue < 0 || row.inputValue > 100"
                           @click="submitInput(row)">Submit
                </el-button>
                <el-alert
                    v-if="row.inputValue < 0 || row.inputValue > 100"
                    type="warning"
                    :closable="false"
                    show-icon
                    title="Input value must be between 0 and 100"
                ></el-alert>
              </template>

            </el-table-column>
            s

          </el-table>
        </div>


      </el-col>
    </el-row>
  </div>
</template>

<script>
import {ElTable, ElTableColumn} from 'element-plus';
import axios from 'axios';

export default {
  components: {
    ElTable,
    ElTableColumn
  },
  data() {
    return {
      options: null,
      selectedValue: [],
      reportData: [], // Initialize reportData as an empty array
      rule: {
        college: '',
        comprehensive: 0.15,
        grade: null,
        id: null,
        pe: 1,
        policy: 1,
        public: 1,
        score: 0.85,
        skill: 1,
        specialized: 1,
        theory: 1
      }, // Define the rule variable
    };
  },
  computed: {
    selectedValueHeadline() {
      if (!this.selectedValue || this.selectedValue.length === 0) {
        return 'No selection';
      } else {
        return 'Selected value: ' + this.selectedValue.join(' > ');
      }
    },
    // To dynamically change the label of the "Score" column in your el-table component based on the value of rule[score],use a computed property for the label text. Here's how you can achieve this in your Vue.js component
    scoreLabel() {
      return 'score ' + this.rule.score * 100 + '%'
    },
    // To dynamically change the label of the "Comprehensive" column in your el-table component based on the value of rule[comprehensive], use a computed property for the label text. Here's how you can achieve this in your Vue.js component
    comprehensiveLabel() {
      return 'comprehensive ' + this.rule.comprehensive * 100 + '%'
    }
  },
  async created() {
    await this.getOptions(); // Fetch options for the cascader
    if (this.options && this.options.length > 0) {
      // Set default selected values for cascader
      const defaultGrade = this.options[0].value;
      const defaultCollege = this.options[0].children[0].value;
      const defaultMajor = this.options[0].children[0].children[0].value; // Assuming major is the third level

      this.selectedValue = [defaultGrade, defaultCollege, defaultMajor];

      // Fetch data based on the default selected value
      await this.fetchReportData(defaultGrade, defaultCollege, defaultMajor); // Await the data fetch
    }
  },
  methods: {
    async getOptions() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/get_options_of_grades_colleges_majors');
        this.options = response.data;
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    },
    async handleCascaderChange(selectedValues) {
      // Check if selectedValues is empty
      if (!selectedValues || selectedValues.length === 0) {
        // If selectedValues is empty, set reportData to an empty array
        this.reportData = [];

        this.rule = {
          college: '',
          comprehensive: 0.15,
          grade: null,
          id: null,
          pe: 1,
          policy: 1,
          public: 1,
          score: 0.85,
          skill: 1,
          specialized: 1,
          theory: 1
        };

        return; // Exit early
      }

      // Destructure the selectedValues array into grade, college, and major
      const [grade, college, major] = selectedValues;

      const url = `http://localhost:5000/get_rule_data/${grade}/${college}`;
      const response = await axios.get(url);
      this.rule = response.data;

      // Fetch data based on the selected values from cascader
      await this.fetchReportData(grade, college, major); // Await the data fetch
    },

    async fetchReportData(grade, college, major) {
      try {
        const url = `http://localhost:5000/get_rule_data_by_grade_college_major/${grade}/${college}/${major}`;
        const response = await axios.get(url);
        this.reportData = response.data || []; // Assign fetched data to reportData variable (default to empty array if null)

        // Add inputValue property to each item in reportData
        this.reportData.forEach(item => {
          item.inputValue = item.comprehensive; // Directly assign inputValue property
        });

        console.log('Report data:', this.reportData);
        // Handle the fetched rule data as needed (e.g., update state, display data)
      } catch (error) {
        console.error('Error fetching rule data:', error);
        // Handle error (e.g., display error message)
      }
    },


    async submitInput(row) {
      try {
        // Update the 'comprehensive' field of the row with the inputValue
        row.comprehensive = row.inputValue;

        // Send the updated row data to the backend API
        const updateUrl = `http://localhost:5000/update_comprehensive`;
        const response = await axios.put(updateUrl, row);
        console.log('Updated comprehensive value:', response.data);

        // Reload reportData after successful update
        await this.fetchReportData(this.selectedValue[0], this.selectedValue[1], this.selectedValue[2]);

      } catch (error) {
        console.error('Error updating comprehensive value:', error);
        // Handle error (e.g., display error message)
      }
    },
  }
};
</script>
<style scoped>
/* Your scoped styles here */
.input_box {
  width: 200px;
}

.headline {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
}

.centered-table {
  margin: 0 auto; /* Center the table horizontally */
  max-width: 100%; /* Set the maximum width of the table */
}

</style>
