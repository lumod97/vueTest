<template>
  <b-modal id="modalClient">
    <template #modal-header> <h3>{{titleModal}}</h3> </template>
    <template #modal-footer>
      
      <b-button @click="addClients()" variant="outline-primary">Guardar</b-button>
    </template>
    <!-- <p v-if="errors.length">
                      <b> Faltan algunos campos </b>
                      <ul v-for="(error, index) in errors" :key="index">
                        <li> {{ error }}</li>
                      </ul>
                    </p> -->

    <div class="mb-3">
      <div class="row mb-2">
        <div class="col">
          <small id="First Name" class="text-muted">First Name</small>
          <input
            type="text"
            id="fname"
            v-model="modalClients.fname"
            class="form-control"
            placeholder=""
            aria-describedby="helpId"
          />
        </div>
        <div class="col">
          <small id="helpId" class="text-muted">Last Name</small>
          <input
            type="text"
            id="lname"
            v-model="modalClients.lname"
            class="form-control"
            placeholder=""
            aria-describedby="helptotalPaymentsId"
          />
        </div>
      </div>

      <div class="row mb-2">
        <div class="col">
          <small class="text-muted">Date of Birthday</small>
          <input type="date" v-model="modalClients.dob" id="dob" class="form-control" />
        </div>
        <div class="col">
          <small class="text-muted">Phone</small>
          <input type="text" v-model="modalClients.phone" id="phone" class="form-control" />
        </div>
      </div>

      <div class="row mb-2">
        <div class="col">
          <small class="text-muted">Email</small>
          <input type="email" v-model="modalClients.email" id="email" class="form-control" />
        </div>
      </div>

      <div class="row mb-2">
        <div class="col">
          <small class="text-muted">Address</small>
          <input type="text" v-model="modalClients.address" id="address" class="form-control" />
        </div>
      </div>

      <div class="container" id="transactionsAdd">
        <h3>Payments</h3>

        <button type="button" @click="addTransactions()" class="btn btn-primary">
          Add
        </button>
      </div>
      <div class="container">
        <!-- <div class="row" v-for="p, index in totalPayments" :key="index">
                                <div class="col clearField">
                                    <small>TransactionID</small>
                                    
                                    <input type="text" v-model="p.transactionId" id="" class="form-control">
                                </div>

                                <div class="col">
                                    <small>Amount</small>
                                    <input type="text" v-model="p.amount" id="" class="form-control clearField">
                                </div>
                                <div class="col">
                                    <small>Date</small>
                                    <input type="date" v-model="p.date" id="" class="form-control clearField">
                                </div>
                        </div> -->
      </div>
    </div>

    <!-- <button
                        type="button"
                        ref="closeModal"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button name="btnSave" @click="checkForm()" v-if="modalAction" class="btn btn-primary">
                        Save
                      </button>
                      <button v-else @click="updateClient()" data-bs-dismiss="modal" class="btn btn-primary">
                        Update
                      </button> -->
  </b-modal>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  mounted() {},
  props:{
    modalClients: [
      fname
    ],
    clientInputs:[],
    titleModal: String,
    idClientSearch:""
  },
  methods: {
    addTransactions(){
      console.log(this.modalClients.find(x => x.id == this.idClientSearch).payments.push(
        {
          idPay: "pay-008",
          transactionID: "7489",
          amount: 400.00,
          date: "17-01-2023"
        }))
    },
    addClients() {
      //this.clients.splice(0)
      this.modalClients.push({
          fname: "Yaritza",
          lname: "Aguayo",
          dob: "25-10-1999",
          phone: "921019751",
          email: "yaritza@gmail.com",
          address: "Psj. Circunvalacion 117",
          payments: [
            {
              idPay: "002",
              transactionID: "7489",
              amount: 400.00,
              date: "17-01-2023"
            }
          ]
      });
    },
    closeModal() {
      this.$bvModal.hide("modalClient");
    },
  },
};
</script>