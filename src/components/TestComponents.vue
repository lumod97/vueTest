<template>
  <div>
    <b-row>
      <b-col>
        <h3>Cliente</h3>
      </b-col>
      <b-col>
        <b-button @click="openModal('Agregar')" variant="primary">AddClient</b-button>
      </b-col>
    </b-row>
    <b-table :items="readClients" :fields="tableHeaders">
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
    
    <ModalClient v-if="sModal" :titleModal="titleModal" :idClientSearch="idClientSearch" @hidden="sModal = false" />
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
      tableHeaders: [
        {
          key: "name",
          label: "Nombre",
        },
        {
          key: "dob",
          label: "Fecha de Nacimiento",
        },
        {
          key: "phone",
          label: "Telefono",
        },
        {
          key: "email",
          label: "Email",
        },
        {
          key: "address",
          label: "Direccion",
        },
        {
          key: "totalPayments",
          label: "Total de Transacciones",
        },
        {
          key: "totalAmountPayments",
          label: "Monto Total",
        },
        {
          key: "actions",
          label: "Acciones",
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
      console.log(this.clients)
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
        this.idClientSearch=String(idClientSearch)
      }
      this.titleModal=actionModal
    },
  },
};
</script>