<script>
export default {
  name: "Header",
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <button class="nav-link" @click="logout">Logout</button>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/view-card">View Card</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/list-order">List Order</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>

</style>