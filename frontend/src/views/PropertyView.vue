<template>
  <body>
    <h4>Welcome to A single Property's page</h4>
    <p>
      Here you can create and manage your individual Property
    </p>

    <h6>My Property</h6>
    <div>
      <!-- <div
        v-for="Property in Property"
        :key="Property.id"
      > -->

      <br>
        
        <div style="border: 1px solid black; border-radius:15px;">
          ID:&nbsp;&nbsp;{{ Property.id }} <br>
          No.:&nbsp;&nbsp;{{ Property.number }}<br>
          Address:&nbsp;&nbsp;{{ Property.address }} <br>
          Name:&nbsp;&nbsp;{{ Property.name }}
        </div>
        
      </div>
    <!-- </div> -->
  </body>
</template>

<script>
import PropertyCRUD from "../modules/propertyCRUD";

export default {
  setup() {
    const {
      pState,
      Property,
      PropertyId,
      GetAllProperties,
      GetSpecificProperty
    } = PropertyCRUD();

    GetSpecificProperty()

    return {
      pState,
      Property,
      PropertyId,
      GetAllProperties,
      GetSpecificProperty
    };
  },
};
</script>

<style lang="scss" scoped>

</style>