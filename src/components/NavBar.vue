<template>
  <header class="top-bar">
    <div class="top-bar-content">
      <h1>Gimmick Vortex</h1>
      <nav class="navigation"></nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'NavBar'
})
</script>

<style scoped>
.top-bar {
  background-color: #22212c; /* Background color */
  padding: 10px 20px;
  display: flex;
  align-items: left;
  justify-content: space-between;
  width: 100%; /* Full width */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000; /* Ensure it's above other content */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.top-bar-content {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  max-width: 1200px; /* Optional: Limit content width */
  margin: 0 auto; /* Optional: Center content */
}

.logo img {
  height: 40px;
}

.navigation ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.navigation li {
  margin-right: 20px;
}

.navigation a {
  color: #c4a7e7; /* Text color */
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
}

.navigation a:hover {
  color: #f5c2e7; /* Hover color */
}
</style>
