<template>
  <div id="LoginPage">Login
    <div class="formContainer">
      <form id="LoginForm" 
    @submit.prevent="onSubmit"
    @reset="onReset">
    <input placeholder="Email" type="text">
    <input placeholder="Password" type="text">
    </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>