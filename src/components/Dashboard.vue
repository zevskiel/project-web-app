<template>
    <div class="dashboard">
      <h2>Dashboard</h2>
      <router-link to="/dashboard/projects">View Projects</router-link>
      <router-link to="/dashboard/projects/new">Add Project</router-link>
      <router-view></router-view>
    </div>  </template>

  
  <script>
  export default {
    name: 'Dashboard'
  };
  </script>