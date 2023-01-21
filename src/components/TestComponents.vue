<template>
  <div>
    <b-row>
      <b-col sm="10">
        <h3>Cliente</h3>
      </b-col>
      <b-col>
        <b-button @click="openModal('Agregar')" variant="primary">AddClient</b-button>
      </b-col>
    </b-row>
    <b-table striped hover :items="readClients" :fields="tableHeaders">
        
      <template #cell(name)="data">
        {{ data.item.fullname }}
      </template>
      <template #cell(totalPayments)="data">
        {{ data.item.totalTransactions }}
      </template>
      <template #cell(totalAmountPayments)="data">
        {{ data.item.totalAmount }}
      </template>
      <template #cell(actions)="data">
        
        <b-button-group>
            <b-button variant="warning" @click="openModal('Modificar',data.item.id)">Modificar</b-button>
            
            <b-button @click="deleteClient(data.item.id)" variant="danger">Eliminar</b-button>
        </b-button-group>
      </template>
    </b-table>
    
    <ModalClient v-if="sModal" :titleModal="titleModal" :isUpdate="isUpdate" :idClientSearch="idClientSearch" @hidden="sModal = false, isUpdate=false, getClients()" />
  </div>
</template>
<script>
import axios from "axios";
import ModalClient from "./ModalClient.vue";
export default {
  components: {
    ModalClient,
  },
  props: {
    
  },
  data() {
    return {
      titleModal: '',
      sModal: false,
      isUpdate: false,
      tableHeaders: [
        {
          key: "name",
          label: "Nombre",
          thStyle: "width:auto",
          thClass: "text-nowrap"
        },
        {
          key: "dob",
          label: "Fecha de Nacimiento",
          thStyle: "width:auto",
          thClass: "text-nowrap"
        },
        {
          key: "phone",
          label: "Telefono",
          thStyle: "width:auto",
          thClass: "text-nowrap"
        },
        {
          key: "email",
          label: "Email",
          thStyle: "width:auto",
          thClass: "text-nowrap"
        },
        {
          key: "address",
          label: "Direccion",
          thStyle: "width:auto",
          thClass: "text-nowrap"
        },
        {
          key: "totalPayments",
          label: "Total de Transacciones",
          thStyle: "width:auto",
          thClass: "text-nowrap"
        },
        {
          key: "totalAmountPayments",
          label: "Monto Total",
          thStyle: "width:auto",
          thClass: "text-nowrap"
        },
        {
          key: "actions",
          label: "Acciones",
          thStyle: "width:auto",
          thClass: "text-nowrap"
        },
      ],
      clients: [
        {
          id: "",
          fname: "",
          lname: "",
          dob: "",
          phone: "",
          email: "",
          address: "",
          payments: [
            {
              idPay: "",
              transactionID: "",
              amount: "",
              date: "",
            }
          ]
        }
      ],
      readClients: [],
      idClientSearch: "",
    };
  },
  
  mounted() {
    this.getClients();
    //this.setTotalAmount();
  },
  methods: {
    async getClients(){
      let url = "http://localhost:8000/api/search";
      const response = await axios.get(url);
      this.readClients=response.data
      
    },
    async addClients(){
      let url = "http://localhost:8000/api/add";
      const response = await axios.post(url,this.clients);
      this.getClients()
      // console.log(this.clients)
    },
    async deleteClient(idClientDelete){
      if(confirm("Est[as seguro que deseas eliminar el cliente")){
      let url = "http://localhost:8000/api/delete";
      const response = await axios.post(url, {idClientDelete})
      this.getClients()
      // console.log(response)
      }
    },
    setTotalAmount() {
      this.clients.map((el) => {
        el.payments.map((pay) => {
          el.totalAmount += pay.amount;
        });
      });
      this.items = this.clients;
    },
    openModal(actionModal, idClientSearch) {
      this.sModal=true
      if(actionModal=="Agregar"){
        this.idClientSearch = ""
      }else if(actionModal=="Modificar"){
        this.isUpdate=true
        this.idClientSearch=String(idClientSearch)
      }
      this.titleModal=actionModal
    },
  },
};
</script>