<template>
  <div>
    <b-row>
      <b-col>
        <h3>Cliente</h3>
      </b-col>
      <b-col>
        <b-button @click="openModal('Nuevo Cliente')" variant="primary">AddClient</b-button>
      </b-col>
    </b-row>

    <b-table :items="clients" :fields="tableHeaders">
      <template #cell(name)="data">
        {{ data.item.fname + " " + data.item.lname }}
      </template>
      <template #cell(totalPayments)="data">
        {{ data.item.payments.length }}
      </template>
      <template #cell(totalAmountPayments)="data">
        {{ data.item.totalAmount }}
      </template>
      <template #cell(actions)="data">
        {{data.item.id}}
        <b-button-group>
            <b-button variant="warning" @click="openModal('Modificar Cliente',data.item.id)" >Modificar</b-button>
            <b-button @click="deleteClient(data.item.id)" variant="danger">Eliminar</b-button>
        </b-button-group>
      </template>
    </b-table>
    <ModalClient :modalClients="clients.find(x => x.id == idClientSearch)" :titleModal="titleModal"/>
  </div>
</template>
<script>
import ModalClient from "./ModalClient.vue";
export default {
  components: {
    ModalClient,
  },
  data() {
    return {
      titleModal: '',
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
          id: "0001",
          fname: "Luiggi",
          lname: "Moretti",
          dob: "08-07-1997",
          phone: "946027276",
          email: "luiggigmd.97@gmail.com",
          address: "Av. Manuel Gonzales Prada 1201",
          payments: [
            {
              idPay: "pay-001",
              transactionID: "005-8647",
              amount: 250.0,
              date: "12-01-2023",
            },
            {
              idPay: "pay-002",
              transactionID: "005-8648",
              amount: 320.0,
              date: "12-01-2023",
            },
          ],
          totalAmount: 0
        },
        {
          id:"0002",
          fname: "Yaritza",
          lname: "Aguayo",
          dob: "25-10-1999",
          phone: "921019751",
          email: "yaritza@gmail.com",
          address: "Psj. Circunvalacion 117",
          payments: [
            {
              idPay: "pay-003",
              transactionID: "7489",
              amount: 320.0,
              date: "17-01-2023"
            },
            {
              idPay: "pay-004",
              transactionID: "7489",
              amount: 320.0,
              date: "17-01-2023"
            },
            {
              idPay: "pay-005",
              transactionID: "7489",
              amount: 320.0,
              date: "17-01-2023"
            }
          ],
          totalAmount:0
        }
      ],
      items: [],
      idClientSearch: ""
    };
  },
  
  mounted() {
    this.setTotalAmount();
  },
  methods: {
    setTotalAmount() {
      this.clients.map((el) => {
        el.payments.map((pay) => {
          el.totalAmount += pay.amount;
        });
      });
      this.items = this.clients;
    },
    openModal(actionModal, idClient) {
      this.idClientSearch=idClient
      this.titleModal=actionModal
      this.$bvModal.show("modalClient");
    },
  },
};
</script>fname