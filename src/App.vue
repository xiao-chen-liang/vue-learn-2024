<template>
  <div class="common-layout">
    <el-container>
      <el-header height="100px">
        <h1 class="headline">{{ headline }}</h1>
      </el-header>
      <el-container>
        <el-aside width="200px" class="aside">
          <!-- Apply background color to el-menu -->
          <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="vertical"
              @select="handleSelect"
              style="background-color: #a0cfff;"
          >
            <!-- Apply custom styles to el-menu-item -->
            <el-menu-item
                index="1"
                style="font-size: 20px; display: flex; justify-content: center; align-items: center;"
            >
              成绩单
            </el-menu-item>
            <el-menu-item
                index="2"
                style="font-size: 20px; display: flex; justify-content: center; align-items: center;"
            >
              得分项
            </el-menu-item>
            <el-menu-item
                index="3"
                style="font-size: 20px; display: flex; justify-content: center; align-items: center;"
            >
              Info
            </el-menu-item>
            <el-menu-item
                index="4"
                style="font-size: 20px; display: flex; justify-content: center; align-items: center;"
            >
              Orders
            </el-menu-item>
            <el-menu-item
                index="5"
                style="font-size: 20px; display: flex; justify-content: center; align-items: center;"
            >
              Orders
            </el-menu-item>
            <el-menu-item
                index="6"
                style="font-size: 20px; display: flex; justify-content: center; align-items: center;"
            >
              Orders
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      headline: 'This is the headline',
      activeIndex: '1',
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key === '1') {
        this.$router.push({name: 'home'})
      } else if (key === '2') {
        this.$router.push({name: 'score-item'})
      } else if (key === '3') {
        this.$router.push({name: 'info'})
      } else if (key === '4') {
        this.$router.push({name: 'orders'})
      } else if (key === '5') {
        this.$router.push({name: 'orders'})
      } else if (key === '6') {
        this.$router.push({name: 'orders'})
      }
    },

    updateActiveIndex(route) {
      // Extract the index from the route's name or path
      switch (route.name) {
        case 'home':
          this.activeIndex = '1';
          break;
        case 'score-item':
          this.activeIndex = '2';
          break;
        case 'info':
          this.activeIndex = '3';
          break;
        case 'orders':
          this.activeIndex = '4';
          break;
          // Handle other routes if needed
        default:
          this.activeIndex = '1'; // Default to the first item
      }
    },
    scrollToActiveItem() {
      // Scroll the menu to the active item if needed
      const el = document.querySelector(`.el-menu-item[index="${this.activeIndex}"]`);
      if (el) {
        el.scrollIntoView();
      }
    }
  },
  watch: {
    // Update activeIndex when the route changes
    $route(to, from) {
      this.updateActiveIndex(to);
    }
  },
  mounted() {
    // Ensure the menu is initially scrolled to the active item
    this.scrollToActiveItem();
  },
  updated() {
    // Ensure the menu is scrolled to the active item after navigation
    this.scrollToActiveItem();
  }
}

</script>

<style scoped>
.el-container {
  height: calc(100vh - 20px); /* Adjust for header height */
}

.el-header {
  background-color: #337ecc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.headline {
  font-size: 48px;
}

.aside {
  background-color: #a0cfff; /* Background color for el-aside */
}

.el-main {
  background-color: #8bc4fe;
  height: 100%;
}
</style>
