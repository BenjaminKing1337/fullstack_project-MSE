<template>
  <body>
    <h4>Welcome to Properties page</h4>
    <p>
      Here you can create and manage your Properties
    </p>


    <div>
      <div>
        <div>
          <div>Create new Property</div>
        </div>

        <div>
          <input
            v-model="pState.number"
          /> <br>
          <input
            v-model="pState.address"
          /> <br>
          <input
            v-model="pState.name"
          />
          <div>
          </div>
        </div>

        <div>
          <button @click="NewProperty()">Create New Property</button>
        </div>
      </div>
    </div>


    <h6>My Properties</h6>
    <div>
      <div
        v-for="Property in pState.Properties"
        :key="Property.id"
      >
      <br>
        <div>{{ Property.name }}</div>
        <div style="border: 1px solid black; border-radius:15px;">
          ID:&nbsp;&nbsp;{{ Property.id }} <br>
          No.:&nbsp;&nbsp;{{ Property.number }}<br>
          Address:&nbsp;&nbsp;{{ Property.address }} <br>
          Name:&nbsp;&nbsp;{{ Property.name }}
        </div>
       
        <router-link :to="`/properties/${Property.id}`" class="remove_linkStyle">
          <button class="full-width">
            <strong>Edit</strong>
          </button>
        </router-link>
        <button @click="DeleteProperty(Property.id)">Delete</button>
        
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
      GetSpecificProperty,
      NewProperty,
      DeleteProperty
    } = PropertyCRUD();


    onMounted(() => {
      GetAllProperties();
    });

    return {
      pState,
      GetAllProperties,
      GetSpecificProperty,
      NewProperty,
      DeleteProperty
    };
  },
};
</script>

<style lang="scss" scoped>

</style>