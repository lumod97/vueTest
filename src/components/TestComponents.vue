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
        </b-button-group>
      </b-col>
    </b-row>
    <b-alert
      variant="danger"
      v-show="this.filterWithoutTransactions"
      class="fixed-bottom"
      show
      >Mostrando Clientes sin pagos</b-alert
    >
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
      @hidden="
        (sModal = false),
          (isUpdate = false),
          getClientsWithoutTransactions(),
          getClients()
      "
    />
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
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
    this.getClients(this.$route.params.status);
    //this.setTotalAmount();
  },
  computed: {
    typeTab() {
      if (this.$route.name == "test-component-general") {
        return "general";
      } else if (this.$route.name == "test-component-sin-datos") {
        return "no-pays";
      } else {
        return "with-pays";
      }
    },
  },
  methods: {
    async getClients() {
      if (this.typeTab == "general") {
        const data = await ClientActionService.getAllClients();
        this.readClients = data.data;
        this.$store.dispatch("A_UPDATE_TABLE_MAIN",this.readClients);
      } else if (this.typeTab == "no-pays") {
        const data = await ClientActionService.getClientsWithoutTransactions();
        this.readClients = data.data;
      } else if (this.typeTab == "with-pays") {
        const data = await ClientActionService.getClientsWithTransactions();
        this.readClients = data.data;
      }
    },
    async dClient(idClient) {
      const data = await ClientActionService.confirmAlert(
        idClient,
        "warning",
        "drop"
      );
    },
    async addClients() {
      let url = "http://localhost:8000/api/add";
      const response = await axios.post(url, this.clients);
      this.getClientsWithoutTransactions();
      this.getClients();
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