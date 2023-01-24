<template>
  <div>
    <b-row>
      <b-col sm="9">
        <h3>Clientes</h3>
      </b-col>
      <b-col>
        <b-button-group class="float-right">
          <b-button
            v-b-tooltip.hover.top="'Agregar un nuevo cliente'"
            @click="openModal('Agregar')"
            variant="primary"
            >AddClient</b-button
          >
          <b-form-checkbox
            @change="filterOrNot()"
            v-model="filterWithoutTransactions"
            v-b-tooltip.hover.top="'Tienes clientes sin pago'"
            v-if="clientWithoutTransactions > 0"
            button-variant="danger"
            button
          >
            {{ this.clientWithoutTransactions }}
          </b-form-checkbox>
        </b-button-group>
      </b-col>
    </b-row>
    <b-alert variant="danger" v-show="this.filterWithoutTransactions" class="fixed-bottom" show>Mostrando Clientes sin pagos</b-alert>
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
          <b-button
            variant="warning"
            v-b-tooltip.hover.top="
              'Modificar datos de cliente y sus transacciones'
            "
            @click="openModal('Modificar', data.item.id)"
            >Modificar</b-button
          >

          <b-button
            v-b-tooltip.hover.top="'Eliminar este cliente'"
            @click="dClient(data.item.id)"
            variant="danger"
            >Eliminar</b-button
          >
        </b-button-group>
      </template>
    </b-table>

    <ModalClient
      v-if="sModal"
      :titleModal="titleModal"
      :isUpdate="isUpdate"
      :idClientSearch="idClientSearch"
      @hidden="(sModal = false), (isUpdate = false), getClientsWithoutTransactions(), getClients()"
    />
  </div>
</template>
<script>
import axios from "axios";
import ModalClient from "./ModalClient.vue";
import ClientActionService from "./scripts/clientActions.service";
export default {
  components: {
    ModalClient,
  },
  props: {},
  data() {
    return {
      titleModal: "",
      sModal: false,
      isUpdate: false,
      filterWithoutTransactions: false,
      clientWithoutTransactions: 0,
      tableHeaders: [
        {
          key: "name",
          label: "Nombre",
          thStyle: "width:auto",
          thClass: "text-nowrap",
        },
        {
          key: "dob",
          label: "Fecha de Nacimiento",
          thStyle: "width:auto",
          thClass: "text-nowrap",
        },
        {
          key: "phone",
          label: "Telefono",
          thStyle: "width:auto",
          thClass: "text-nowrap",
        },
        {
          key: "email",
          label: "Email",
          thStyle: "width:auto",
          thClass: "text-nowrap",
        },
        {
          key: "address",
          label: "Direccion",
          thStyle: "width:auto",
          thClass: "text-nowrap",
        },
        {
          key: "totalPayments",
          label: "Total de Transacciones",
          thStyle: "width:auto",
          thClass: "text-nowrap",
        },
        {
          key: "totalAmountPayments",
          label: "Monto Total",
          thStyle: "width:auto",
          thClass: "text-nowrap",
        },
        {
          key: "actions",
          label: "Acciones",
          thStyle: "width:auto",
          thClass: "text-nowrap",
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
            },
          ],
        },
      ],
      readClients: [],
      idClientSearch: "",
    };
  },

  mounted() {
    // this.getClientsWithoutTransactions();
    this.getClients();
    //this.setTotalAmount();
  },
  methods: {
    async getClients() {
      const data = await ClientActionService.getAllClients()
      this.readClients = data.data
    },
    async dClient(idClient){
      const data = await ClientActionService.confirmAlert(idClient,'warning','drop')
      
    },
    filterOrNot() {
      if (this.filterWithoutTransactions) {
        this.getClientsWithoutTransactions();
      } else {
        this.getClients();
        this.filterWithoutTransactions = false;
      }
    },
    
    async getClientsWithoutTransactions() {
      const data = await ClientActionService.getClientsWithoutTransactions()
      this.clientWithoutTransactions = data.data.length;
      this.readClients = data.data;
    },
    async addClients() {
      let url = "http://localhost:8000/api/add";
      const response = await axios.post(url, this.clients);
      this.getClientsWithoutTransactions();
      this.getClients();
      // console.log(this.clients)
    },
    confirmAlert(idClientDelete,icon,action) {
      swal("",
      {
        title: "Estas seguro?",
        text: "Estas seguro que deseas eliminar este cliente? Una vez eliminado debes volver a agregarlo.",
        icon: icon,
        dangerMode: true,
        buttons:{
          cancel:"Cancelar",
          confirm:{
            text: "Confirmar",
            value: action
          }
        },
      }).then((value) => {
        switch(value){
          case "drop":
            this.deleteClient(idClientDelete)
            swal("Cliente eliminado con exito!",{
            icon: "success"
            })
            break
          case "add":
            this.addClients()
            swal("Cliente agregado con exito!",{
            icon: "success"
            })
            break
        }
      });
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
      this.sModal = true;
      if (actionModal == "Agregar") {
        this.idClientSearch = "";
      } else if (actionModal == "Modificar") {
        this.isUpdate = true;
        this.idClientSearch = String(idClientSearch);
      }
      this.titleModal = actionModal;
    },
  },
};
</script>