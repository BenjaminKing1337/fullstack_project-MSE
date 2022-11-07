<template>
  <body>
    <h4>Welcome to A single Property's page</h4>
    <p>Here you can create and manage your individual Property</p>

    <h6>My Property</h6>

    <!-- <div v-for="Item in Property" :key="Item.id"> -->
    <div>
      <div style="border: 1px solid black; border-radius: 15px">
        No.:&nbsp;&nbsp;{{ Property.number }}<br />
        Address:&nbsp;&nbsp;{{ Property.address }} <br />
        Name:&nbsp;&nbsp;{{ Property.name }}
      </div>
      <form @submit.prevent="EditProperty">
        <input type="text" placeholder="Number" required v-model="pState.number" />
        <br />
        <input type="text" placeholder="Address" v-model="pState.address" />
        <br />
        <input type="text" placeholder="Name" v-model="pState.name" />
        <br />
        <button type="submit">Update</button>
      </form>
      <button type="button" @click="goBack()">Back</button>
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
      // GetAllProperties,
      GetSpecificProperty,
      EditProperty,
    } = PropertyCRUD();

    GetSpecificProperty();

    const Router = useRouter();

    return {
      pState,
      Property,
      PropertyId,
      // GetAllProperties,
      GetSpecificProperty,
      EditProperty,
      goBack() {
        // return Router.go(-1);
        Router.push("/properties");
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>