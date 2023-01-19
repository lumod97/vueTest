<template>
  <b-modal id="modalClient" ref="modal-client" @hidden="$emit('hidden')">
    <template #modal-header> <h3>{{titleModal}} Cliente</h3> </template>
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
            v-model="client.fname"
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
            v-model="client.lname"
            class="form-control"
            placeholder=""
            aria-describedby="helptotalPaymentsId"
          />
        </div>
      </div>

      <div class="row mb-2">
        <div class="col">
          <small class="text-muted">Date of Birthday</small>
          <input type="date" v-model="client.dob" id="dob" class="form-control" />
        </div>
        <div class="col">
          <small class="text-muted">Phone</small>
          <input type="text" v-model="client.phone" id="phone" class="form-control" />
        </div>
      </div>

      <div class="row mb-2">
        <div class="col">
          <small class="text-muted">Email</small>
          <input type="email" v-model="client.email" id="email" class="form-control" />
        </div>
      </div>

      <div class="row mb-2">
        <div class="col">
          <small class="text-muted">Address</small>
          <input type="text" v-model="client.address" id="address" class="form-control" />
        </div>
      </div>
      <div class="container" id="transactionsAdd">
        <h3>Payments</h3>


        <b-button v-if="btnAddTransaction" @click="addTransactions()">Add Transaction</b-button>

        <b-table v-if="client.payments" :items="client.payments" :fields="tableHeaders">
          <template #cell(transaction_id)="data">
            <b-form-input v-model="data.item.transaction_id" ></b-form-input>
          </template>
          <template #cell(amount)="data">
            <b-form-input v-model="data.item.amount" ></b-form-input>
          </template>
          <template #cell(date)="data">
            <b-form-input type="date" v-model="data.item.date" ></b-form-input>
          </template>
          <template #cell(actions)="data">
            <b-button variant="danger" @click="deleteTransaction(data.item.id)"> <b-icon-trash></b-icon-trash> </b-button>
          </template>
        </b-table>
        
        
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
import axios from "axios";
export default {
  data() {
    return {
      tableHeaders: [
        {
          key: "transaction_id",
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
          label: "Accion"
        }
      ],
      client: 
        {
          id: "",
          fname: "",
          lname: "",
          dob: "",
          phone: "",
          email: "",
          address: "",
          payments: [
            {}
          ]
        }
      ,
      // clientAdd:[
      //   {
      //     id: "",
      //     fname: "",
      //     lname: "",
      //     dob: "",
      //     phone: "",
      //     email: "",
      //     address: "",
      //   }
      // ],
      btnAddTransaction:true
    }
  },
  mounted() {
    this.$refs['modal-client'].show();
    if(this.isUpdate){
      this.getClientByID()
    }
  },
  props:{
    isUpdate: {
      type: Boolean,
      default:false
    },
    titleModal: {},
    idClientSearch: {},
  },
  methods: {
    async getClientByID(){
      let url = "http://127.0.0.1:8000/api/sort";
      const response = await axios.post(url, { idClient: this.idClientSearch });
      let data = response.data
      //this.client = data[0]
          this.client.fname = data[0].fname
          this.client.lname = data[0].lname
          this.client.dob = data[0].dob
          this.client.phone = data[0].phone
          this.client.email = data[0].email
          this.client.address = data[0].address
          if(this.client.payments.length<1){
            this.client.payments ={
            id:"",
            transaction_id: "",
            amount: "",
            date: ""
          }
          }else{
            this.client.payments = JSON.parse(data[0].payments)
          }
          

      console.log(this.client)
    },
    addTransactions(){      
        this.client.payments.push({
          id:this.client.payments+1,
          transaction_id: "",
          amount: "",
          date: ""
        })
        this.client.payments.length<5 ? this.btnAddTransaction=true : this.btnAddTransaction=false
    },
    async addClients() {

      if(this.isUpdate){
      }else{
        let url = "http://localhost:8000/api/add";
        const response = await axios.post(url,this.client)
      }
      //this.client.splice(0)
      // this.client.push({
      //     fname: "Yaritza",
      //     lname: "Aguayo",
      //     dob: "25-10-1999",
      //     phone: "921019751",
      //     email: "yaritza@gmail.com",
      //     address: "Psj. Circunvalacion 117",
      //     payments: [
            
      //     ]
      // });
    },
    async deleteTransaction(idTransaction){
      if(confirm("Estas seguro que deseas eliminar el pago?")){
        let url =  "http://127.0.0.1:8000/api/deleteTransaction";
        const response = await axios.post(url,{idTransaction:idTransaction});
      }
    },
    closeModal() {
      console.log(this.$bvModal)
      
    },
  },
};
</script>