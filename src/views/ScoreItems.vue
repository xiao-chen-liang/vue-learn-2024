<template>
  <div>
    <el-row :gutter="20">
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
        <div class="grid-content bg-purple">
          <el-form :model="rule" ref="ruleForm" :rules="rules" label-width="120px">
            <el-form-item label="PE">
              <el-radio-group v-model="rule.pe">
                <el-radio :label="1">Included</el-radio>
                <el-radio :label="0">Not Included</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Policy">
              <el-radio-group v-model="rule.policy">
                <el-radio :label="1">Included</el-radio>
                <el-radio :label="0">Not Included</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Public">
              <el-radio-group v-model="rule.public">
                <el-radio :label="1">Included</el-radio>
                <el-radio :label="0">Not Included</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Skill">
              <el-radio-group v-model="rule.skill">
                <el-radio :label="1">Included</el-radio>
                <el-radio :label="0">Not Included</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Specialized">
              <el-radio-group v-model="rule.specialized">
                <el-radio :label="1">Included</el-radio>
                <el-radio :label="0">Not Included</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Theory">
              <el-radio-group v-model="rule.theory">
                <el-radio :label="1">Included</el-radio>
                <el-radio :label="0">Not Included</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Score">
              <el-input v-model="rule.score" placeholder="Enter score" type="number" :step="0.01" class="input_box"
                        :max="1" :min="0"></el-input>
            </el-form-item>
            <el-form-item label="Comprehensive">
              <el-input v-model="rule.comprehensive" placeholder="Enter comprehensive" type="number" :step="0.01"
                        class="input_box" :max="1" :min="0"></el-input>
            </el-form-item>


            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
              <el-button @click="resetForm('ruleForm')">Reset</el-button>
            </el-form-item>
          </el-form>
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
      selectedValue: [],
      rule: {
        college: '',
        comprehensive: 0,
        grade: null,
        id: null,
        pe: 0,
        policy: 0,
        public: 0,
        score: 0,
        skill: 0,
        specialized: 0,
        theory: 0
      }, // Define the rule variable
      originalRule: null, // Variable to store original values of rule
      rules: {
        score: [{required: true, message: 'Score is required', trigger: 'blur'}],
        comprehensive: [{required: true, message: 'Comprehensive is required', trigger: 'blur'}]
      }
    };
  },
  computed: {
    selectedValueHeadline() {
      if (this.selectedValue === null) {
        return 'No selection';
      } else {
        if (this.selectedValue.length === 0) {
          return 'No selection';
        } else {
          return 'Selected value: ' + this.selectedValue.join(' > ');
        }
      }
    }
  },
  methods: {
    areDecimalNumbersEqualToOne(num1, num2) {
      const tolerance = 1; // Define a tolerance level for floating-point comparisons
      const sum = num1 + num2;
      return Math.abs(sum - 1) < tolerance;
    },
    async getOptions() {
      try {
        const response = await axios.get('http://localhost:5000/get_grades_and_colleges');
        this.options = response.data;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async handleCascaderChange(selectedValues) {
      try {
        const url = `http://localhost:5000/get_rule_data/${selectedValues[0]}/${selectedValues[1]}`;
        const response = await axios.get(url);
        this.rule = response.data;
        this.originalRule = {...this.rule}; // Save original values
        console.log('Rule data:', this.rule)
      } catch (error) {
        console.error('Error fetching rule data:', error);
      }
    },
    submitForm(formName) {
      // Validate the form
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // Ensure that this.rule.score is a number before calling toFixed
          const scoreNumber = parseFloat(this.rule.score);
          const comprehensiveNumber = parseFloat(this.rule.comprehensive);

          // Check if scoreNumber and comprehensiveNumber are numbers
          if (!isNaN(scoreNumber) && !isNaN(comprehensiveNumber)) {
            // Check if sum of score and comprehensive equals 1
            if (scoreNumber + comprehensiveNumber === 1) {
              // Submit form data
              console.log('Form submitted:', this.rule);

              // send the form data to the server at http://localhost:5000/update_rule_data
              axios.post('http://localhost:5000/update_rule_data', this.rule)
                  .then(response => {
                    console.log('Server response:', response.data);
                    // Display success message
                    this.$message.success('Form submitted successfully');
                  })
                  .catch(error => {
                    console.error('Error updating rule data:', error);
                    // Display error message
                    this.$message.error('Error submitting form. Please try again later.');
                  });
              // Copy values from rule to originalRule
              this.originalRule = {...this.rule};
            } else {
              // Display alert message if sum of score and comprehensive is not 1
              this.$message.error('Sum of score and comprehensive must equal 1');
            }
          } else {
            // Display alert message if score or comprehensive is not a valid number
            this.$message.error('Score and comprehensive must be valid numbers');
          }
        } else {
          // Display alert message if form validation fails
          this.$message.error('Validation failed. Please fill in all required fields.');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.rule = {...this.originalRule}; // Reset to original values
      this.$refs[formName].resetFields();
    }
  },

  created() {
    // Fetch options data and set default selected value
    this.getOptions().then(() => {
      // Check if options array is not empty
      if (this.options.length > 0) {
        // Set default selected value
        const defaultGrade = this.options[0].value;
        const defaultCollege = this.options[0].children[0].value;
        this.selectedValue = [defaultGrade, defaultCollege];

        // Optionally, you can fetch data or perform other actions based on the default selected value
        this.handleCascaderChange(this.selectedValue);
      }
    });
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
</style>
