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

    return {
      registerForm: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          // Perform the registration action
          console.log('Registration data:', this.registerForm);
          // You can call your API here to register the user, for example:
          // this.$axios.post('/api/register', this.registerForm).then(response => {
          //   // Handle success
          // }).catch(error => {
          //   // Handle error
          // });
        } else {
          console.log('Validation failed');
          return false;
        }
      });
    },
    goToLoginPage() {
      this.$router.push({ name: 'login' }); // Navigate to the login page
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
  margin-bottom: 20px; /* Add spacing between form items */
}
</style>
