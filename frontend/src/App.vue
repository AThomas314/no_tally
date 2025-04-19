<template>
  <div id="app">
    <banner></banner>
    <router-view ></router-view>
  </div>
</template>

<script>
import banner from "./components/banner.vue";
import login from "./components/login.vue";
import home from "./components/home.vue";
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: login 
  },
  {
    path: '/home',
    name: 'Home',
    component: home 
  }
]
const router = new VueRouter({
  mode: 'history',
  routes
});

export default {
  name: 'App',
  components: {
    banner,
  },
  router
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
