<template>
  <body>
    <h4>Welcome to A single Property's page</h4>
    <p>Here you can create and manage your individual Property</p>

    <h6>My Property</h6>
    <div>
      <!-- <div
        v-for="Item in Property"
        :key="Item.id"
      > -->

      <br />
      <div style="border: 1px solid black; border-radius: 15px">
        ID:&nbsp;&nbsp;{{ Property.id }} <br />
        No.:&nbsp;&nbsp;{{ Property.number }}<br />
        Address:&nbsp;&nbsp;{{ Property.address }} <br />
        Name:&nbsp;&nbsp;{{ Property.name }}
      </div>
      <button type="submit" @click="goBack()">Back</button>
    </div>

    <!-- {{ Property.id }} -->
    <!-- </div> -->
  </body>
</template>

<script>
import PropertyCRUD from "../modules/propertyCRUD";
import { useRouter } from "vue-router";

export default {
  setup() {
    const {
      pState,
      Property,
      PropertyId,
      GetAllProperties,
      GetSpecificProperty,
    } = PropertyCRUD();

    const Router = useRouter();

    GetSpecificProperty();

    return {
      pState,
      Property,
      PropertyId,
      GetAllProperties,
      GetSpecificProperty,
      goBack() {
        return Router.go(-1);
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>