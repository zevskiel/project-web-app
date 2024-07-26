<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <router-link v-if="isLoggedIn" to="/dashboard/projects">View Projects</router-link>
    <router-link v-if="isLoggedIn" to="/dashboard/projects/new">Add Project</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      isLoggedIn: sessionStorage.getItem('userId') !== null && sessionStorage.getItem('userId') !== ''
    };
  }
};
</script>