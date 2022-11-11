<template>
  <div id="RegisterPage">Register
    <form id="RegisterForm" 
    @submit.prevent="onSubmit"
    @reset="onReset">
    <input type="text">
    <input type="text">
    <input type="text">
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>