<template>
  <b-modal scrollable id="modalClient" ref="modal-client" @hidden="$emit('hidden')">
    <template #modal-header>
      <h3>{{ titleModal }} Cliente</h3>
    </template>
    <template #modal-footer>
      <b-button @click="addClients()" variant="outline-primary"
        >Guardar</b-button
      >
    </template>
    <validation-observer ref="form">
      <div class="mb-3">
        <div class="row mb-2">
          <div class="col">
            <validation-provider v-slot="{ errors }" rules="required">
              <small id="First Name" class="text-muted">First Name</small>
              <b-row>
                <b-input-group>
                  <template v-if="errors[0]" #append>
                    <b-icon
                      icon="exclamation-circle"
                      variant="danger"
                      animation="throb"
                      font-scale="2.5"
                    ></b-icon>
                  </template>
                  <input
                    type="text"
                    id="fname"
                    v-model="client.fname"
                    class="form-control"
                    placeholder=""
                    aria-describedby="helpId"
                  />
                </b-input-group>
              </b-row>
            </validation-provider>
          </div>
          <div class="col">
            <validation-provider v-slot="{ errors }" rules="required">
              <small id="helpId" class="text-muted">Last Name</small>
              <b-row>
                <b-input-group>
                  <template v-if="errors[0]" #append>
                    <b-icon
                      icon="exclamation-circle"
                      variant="danger"
                      animation="throb"
                      font-scale="2.5"
                    ></b-icon>
                  </template>
                  <input
                    type="text"
                    id="lname"
                    v-model="client.lname"
                    class="form-control"
                    placeholder=""
                    aria-describedby="helptotalPaymentsId"
                  />
                </b-input-group>
              </b-row>
            </validation-provider>
          </div>
        </div>

        <div class="row mb-2">
          <div class="col">
            <validation-provider v-slot="{ errors }" rules="required">
              <small class="text-muted">Date of Birthday</small>
              <b-row>
                <b-input-group>
                  <template v-if="errors[0]" #append>
                    <b-icon
                      icon="exclamation-circle"
                      variant="danger"
                      animation="throb"
                      font-scale="2.5"
                    ></b-icon>
                  </template>
                  <input
                    type="date"
                    v-model="client.dob"
                    id="dob"
                    class="form-control"
                  />
                </b-input-group>
              </b-row>
            </validation-provider>
          </div>
          <div class="col">
            <validation-provider v-slot="{ errors }" rules="required">
              <small class="text-muted">Phone</small>
              <b-row>
                <b-input-group>
                  <template v-if="errors[0]" #append>
                    <b-icon
                      icon="exclamation-circle"
                      variant="danger"
                      animation="throb"
                      font-scale="2.5"
                    ></b-icon>
                  </template>
                  <input
                    type="text"
                    v-mask="'### ### ###'"
                    v-model="client.phone"
                    id="phone"
                    class="form-control"
                  />
                </b-input-group>
              </b-row>
            </validation-provider>
          </div>
        </div>

        <div class="row mb-2">
          <div class="col">
            <validation-provider v-slot="{ errors }" rules="required">
              <small class="text-muted">Email</small>
              <b-row>
                <b-input-group>
                  <template v-if="errors[0]" #append>
                    <b-icon
                      icon="exclamation-circle"
                      variant="danger"
                      animation="throb"
                      font-scale="2.5"
                    ></b-icon>
                  </template>
                  <input
                    type="email"
                    v-model="client.email"
                    id="email"
                    class="form-control"
                  />
                </b-input-group>
              </b-row>
            </validation-provider>
          </div>
        </div>

        <div class="row mb-2">
          <div class="col">
            <validation-provider v-slot="{ errors }" rules="required">
              <small class="text-muted">Address</small>
              <b-row>
                <b-input-group>
                  <template v-if="errors[0]" #append>
                    <b-icon
                      icon="exclamation-circle"
                      variant="danger"
                      animation="throb"
                      font-scale="2.5"
                    ></b-icon>
                  </template>
                  <input
                    type="text"
                    v-model="client.address"
                    id="address"
                    class="form-control"
                  />
                </b-input-group>
              </b-row>
            </validation-provider>
          </div>
        </div>
        <div class="container" id="transactionsAdd">
          <h3>Payments</h3>
          <b-button v-if="btnAddTransaction" @click="addFieldsTransactions()"
            >Add Transaction</b-button
          >

          <b-table
            v-if="client.payments"
            :items="client.payments"
            :fields="tableHeaders"
          >
            <template #cell(transactionID)="data">
              <b-form-input v-mask="'pay-####'" v-model="data.item.transactionID"></b-form-input>
            </template>
            <template #cell(amount)="data">
              <b-form-input v-mask="'###.##'" v-model="data.item.amount"></b-form-input>
            </template>
            <template #cell(date)="data">
              <b-form-input type="date" v-model="data.item.date"></b-form-input>
            </template>
            <template #cell(actions)="data">
              <b-button
                variant="danger"
                @click="deleteTransaction(data.item.id)"
              >
                <b-icon-trash></b-icon-trash>
              </b-button>
            </template>
          </b-table>
        </div>
        <div class="container"></div>
      </div>
    </validation-observer>
  </b-modal>
</template>
<script>
import axios from "axios";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required",
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      tableHeaders: [
        {
          key: "transactionID",
          label: "Transaction ID",
        },
        {
          key: "amount",
          label: "Amount $",
        },
        {
          key: "date",
          label: "Date",
        },
        {
          key: "actions",
          label: "Accion",
        },
      ],
      client: {
        id: "",
        fname: "",
        lname: "",
        dob: "",
        phone: "",
        email: "",
        address: "",
        payments: [],
      },
      lastIDClient: "",
      btnAddTransaction: true,
    };
  },
  mounted() {
    this.$refs["modal-client"].show();
    if (this.isUpdate) {
      this.getClientByID();
    } else {
      this.addFieldsTransactions();
    }
  },
  props: {
    isUpdate: {
      type: Boolean,
      default: false,
    },
    titleModal: {},
    idClientSearch: {},
  },
  methods: {
    async getClientByID() {
      let url = "http://127.0.0.1:8000/api/sort";
      const response = await axios.post(url, { idClient: this.idClientSearch });
      let data = response.data;
      this.client = data[0];
      this.client.fname = data[0].fname;
      this.client.lname = data[0].lname;
      this.client.dob = data[0].dob;
      this.client.phone = data[0].phone;
      this.client.email = data[0].email;
      this.client.address = data[0].address;
      if (this.client.payments == null) {
        this.client.payments = [
          {
            id: null,
            clientID: this.idClientSearch,
            transactionID: "",
            amount: "",
            date: "",
          },
        ];
      } else {
        this.client.payments = JSON.parse(data[0].payments);
      }
    },
    addFieldsTransactions() {
      this.client.payments.push({
        id: null,
        clientID: this.idClientSearch,
        transactionID: "",
        amount: "",
        date: "",
      });
      this.client.payments.length < 5
        ? (this.btnAddTransaction = true)
        : (this.btnAddTransaction = false);
    },
    async addTransactions() {
      // console.log(this.client.payments)
      let url = "http://localhost:8000/api/addTransactions";
      const response = await axios.post(url, {
        payments: this.client.payments,
      });
    },
    async addClients() {
      if (await this.$refs.form.validate()) {
        if (this.isUpdate) {
          let url = "http://localhost:8000/api/update";
          const response = await axios.post(url, this.client);
          if (this.client.payments[0].transactionID !== "") {
            this.addTransactions();
          }
          this.$refs["modal-client"].hide();
        } else {
          //agregar
          if (this.client.payments[0].transactionID !== "") {
            let url = "http://localhost:8000/api/add";
            const response = await axios.post(url, this.client);
            let lastIDClient = response.data[0].lastIDClient;
            this.client.payments.forEach((element, index) => {
              this.client.payments[index].clientID = lastIDClient;
              // console.log(this.client.payments[index].clientID)
            });
            this.$refs["modal-client"].hide();
            this.addTransactions();
          } else {
            if (confirm("Seguro que quiere agregar un cliente sin pagos?")) {
              let url = "http://localhost:8000/api/add";
              const response = await axios.post(url, this.client);
              this.$refs["modal-client"].hide();
            }
          }
        }
      }
    },
    async deleteTransaction(idTransaction) {
      if (confirm("Estas seguro que deseas eliminar el pago?")) {
        let url = "http://127.0.0.1:8000/api/deleteTransaction";
        const response = await axios.post(url, {
          idTransaction: idTransaction,
        });
        this.getClientByID();
      }
    },
    closeModal() {},
  },
};
</script>