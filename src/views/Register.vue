<template>
  <div class="register-container">
    <h1 class="register-header">西南林业大学保研评分系统</h1>
    <h1 class="register-header">注册新账号</h1>
    <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px" class="register-form">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="registerForm.confirmPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleRegister">注册</el-button>
        <el-button type="primary" @click="goToLoginPage" class="login-button">返回登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import config from "@/config/config";

export default {
  name: 'Register',
  data() {
    const validateEmail = (rule, value, callback) => {
      const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!value) {
        callback(new Error('请输入邮箱地址')); // Error message for empty email field
      } else if (!emailPattern.test(value)) {
        callback(new Error('请输入有效的邮箱地址')); // Error message for invalid email format
      } else {
        callback();
      }
    };

    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码')); // Error message for empty password field
      } else if (value.length < 6) {
        callback(new Error('密码长度不能少于6位')); // Error message for minimum password length
      } else if (value.length > 50) {
        callback(new Error('密码长度不能多于50位')); // Error message for maximum password length
      } else if (!isStrongPassword(value)) {
        callback(new Error('密码必须包含至少一个小写字母、一个大写字母、一个数字和一个特殊字符')); // Error message for weak password
      } else {
        callback();
      }
    };

    const validateConfirmPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码')); // Error message for empty confirm password field
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入的密码不一致')); // Error message for password mismatch
      } else {
        callback();
      }
    };

    const isStrongPassword = (value) => {
      // Check if password contains at least one lowercase letter
      // const hasLowercase = /[a-z]/.test(value);
      // Check if password contains at least one uppercase letter
      // const hasUppercase = /[A-Z]/.test(value);
      // Check if password contains at least one digit
      const hasDigit = /\d/.test(value);
      // Check if password contains at least one special character
      // const hasSpecialChar = /[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(value);

      // Password is considered strong if it meets all the criteria
      // return hasLowercase && hasUppercase && hasDigit && hasSpecialChar;
      return hasDigit;
    };

    return {
      registerForm: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {validator: validateEmail, trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: validatePassword, trigger: 'blur'}
        ],
        confirmPassword: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
          {validator: validateConfirmPassword, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    handleRegister() {
      // Validate the form using the built-in validation of the form component
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          // Form data is valid, proceed to register the user
          const formData = {
            username: this.registerForm.email, // Assuming 'username' in the backend corresponds to 'email'
            password: this.registerForm.password
          };

          // Send an HTTP POST request to register the user
          const registerUrl = `${config.API_BASE_URL}${config.API_PATHS.register}`;
          console.log(registerUrl);
          axios.post(registerUrl, formData)
              .then(response => {
                if (response.status === 200) {
                  // Registration successful, handle the response
                  console.log('User registration successful:', response.data);
                  this.$message.success('注册成功'); // Display success message
                  // Redirect the user to the login page or perform other actions as needed
                  // this.$router.push({ name: 'login' });
                }
              })
              .catch(error => {
                if (error.response && error.response.status === 400) {
                  // Registration failed, handle the error
                  console.error('User registration failed:', error.response.data);
                  this.$message.error('注册失败: ' + error.response.data.message); // Display error message
                  this.registerForm = {
                    email: '',
                    password: '',
                    confirmPassword: ''
                  };
                } else {
                  // Handle other errors
                  console.error('An error occurred:', error);
                  this.$message.error('发生了一个错误，请稍后重试'); // Display generic error message
                }
              });
        } else {
          // Form data is invalid, do nothing as the validation messages will be displayed
          console.log('Validation failed');
          return false;
        }
      });
    },
    goToLoginPage() {
      this.$router.push({name: 'login'}); // Navigate to the login page
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.register-header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.register-form {
  width: 400px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.login-button {
  margin-left: 149px; /* Adjusted margin for spacing between buttons */
}

/* Override Element UI default styles for form items */
.el-form-item {
  margin-bottom: 40px; /* Add spacing between form items */
}
</style>
