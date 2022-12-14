import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import baseURL from './baseURL';

const GetCustomers = () => {
  const Route = useRoute();
  const Router = useRouter();
  const CustomerId = computed(() => Route.params.id);

  const cState = ref({
    forename: '',
    surname: '',
    email: '',
    company_name: '',
    contact_number: '',
    user_id: 'None',
    created_by: localStorage.getItem('userid'),
    Customers: {},
  });

  // GET ALL CUSTOMERS
  const GetAllCustomers = async () => {
    try {
      await fetch(baseURL + '/customers')
        .then((Res) => Res.json())
        .then((Data) => {
          cState.value.Customers = Data;
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  // GET CUSTOMERS CREATED BY THE LOGGED IN USER
  const GetUsersCustomers = async () => {
    try {
      await fetch(
        baseURL + '/customers/get/byUser/' + localStorage.getItem('userid')
      )
        .then((Res) => Res.json())
        .then((Data) => {
          cState.value.Customers = Data;
        });
    } catch (Error) {
      console.log(Error);
    }
  };
  // CREATE NEW CUSTOMER
  const NewCustomer = () => {
    const RequestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        forename: cState.value.forename,
        surname: cState.value.surname,
        email: cState.value.email,
        company_name: cState.value.company_name,
        contact_number: cState.value.contact_number,
        user_id: 'None',
        created_by: cState.value.created_by,
      }),
    };
    fetch(baseURL + '/customers/new', RequestOptions).then(() => {
      GetUsersCustomers(); // Updates page
    });
  };

  // DELETE CUSTOMER BY ID
  const DeleteCustomer = (_id) => {
    fetch(baseURL + '/customers/delete/' + _id, {
      method: 'DELETE',
    }).then(() => {
      GetUsersCustomers(); // Updates page
    });
  };

  // UPDATE CUSTOMER BY ID
  const EditCustomer = () => {
    const RequestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // id:Route.params.id,
        forename: Customer.value.forename,
        surname: Customer.value.surname,
        email: Customer.value.email,
        company_name: Customer.value.company_name,
        contact_number: Customer.value.contact_number,
        user_id: Customer.value.user_id,
        created_by: Customer.value.created_by,
      }),
    };
    fetch(
      baseURL + '/customers/update/' + CustomerId.value,
      RequestOptions
    ).then((res) => res.body);
    Router.push('/customers');
  };

  // GET CUSTOMER BY ID
  const Customer = ref({});
  const GetSpecificCustomer = async () => {
    try {
      fetch(baseURL + '/customers/get/' + CustomerId.value)
        .then((Res) => Res.json())
        .then((Data) => {
          Customer.value = Data;
          // .filter((P) => P._id === CustomerId.value);
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  return {
    Customer,
    CustomerId,
    GetSpecificCustomer,
    cState,
    GetAllCustomers,
    GetUsersCustomers,
    NewCustomer,
    DeleteCustomer,
    EditCustomer,
  };
};
export default GetCustomers;
