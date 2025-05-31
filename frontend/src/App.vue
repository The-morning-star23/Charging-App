<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/chargers">Chargers</router-link> |
      <router-link to="/map">Map View</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script setup>
</script>

<style scoped>
nav {
  padding: 12px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
}
nav a {
  margin-right: 15px;
  text-decoration: none;
  color: #333;
}
nav a.router-link-active {
  font-weight: bold;
}
</style>
