<template>
  <div class="login-container">
    <h1 class="login-header">西南林业大学保研评分系统</h1>
    <h1 class="login-header">登录账号</h1>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="login-form">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="loginForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
        <el-button type="primary" @click="goToRegisterPage" class="register-button">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
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

    return {
      loginForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // Perform the login action
          console.log('Login data:', this.loginForm);
          // You can call your API here, for example:
          // this.$axios.post('/api/login', this.loginForm).then(response => {
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
    goToRegisterPage() {
      this.$router.push({ name: 'register' }); // Navigate to the 'register' route
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.login-form {
  width: 400px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.register-button {
  margin-left: 178px; /* Adjusted margin for better alignment */
}

/* Align the right side of the buttons with the right edge of the input boxes */
.el-form-item {
  display: flex;
  justify-content: flex-end;
}
</style>
