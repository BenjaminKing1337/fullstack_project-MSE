<template>
  <q-page class="flex flex-center">
    <img
      alt="MSE logo"
      src="../assets/logo.png"
      style="width: 200px; height: 200px"
    />
  </q-page>
</template>

<script>
export default {
  name: 'WelcomeComp',
  props: {
    msg: String,
  },
};
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
