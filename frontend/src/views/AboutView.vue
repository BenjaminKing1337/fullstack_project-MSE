<template>
  <body>
    <h4>Welcome to Properties page</h4>
    <p>
      Here you can create and manage your Properties
    </p>

    <h6>My Properties</h6>
    <div>
      <div
        v-for="Property in pState.Properties"
        :key="Property.id"
      >
        <div style="border: 1px solid black; border-radius:15px;">
          No.:&nbsp;&nbsp;{{ Property.recordset[0].number }} <br>
          Address:&nbsp;&nbsp;{{ Property.address }} <br>
          Name:&nbsp;&nbsp;{{ Property.name }}
        </div>

        <div>all properties: {{Property.recordsets}}</div>
        
      </div>
    </div>
  </body>
</template>

<script>
import PropertyCRUD from "../modules/propertyCRUD";
import { onMounted } from "vue";

export default {
  setup() {
    const {
      pState,
      GetAllProperties,
      GetSpecificProperty
    } = PropertyCRUD();


    onMounted(() => {
      GetAllProperties();
    });

    return {
      pState,
      GetAllProperties,
      GetSpecificProperty
    };
  },
};
</script>

<style lang="scss" scoped>

</style>