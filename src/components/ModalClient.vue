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
        <b-button v-if="btnAddTransaction" @click="addFieldsTransactions()">Add Transaction</b-button>

        <b-table v-if="client.payments" :items="client.payments" :fields="tableHeaders">
          <template #cell(transactionID)="data">
            <b-form-input v-model="data.item.transactionID" ></b-form-input>
          </template>
          <template #cell(amount)="data">
            <b-form-input v-model="data.item.amount" ></b-form-input>
          </template>
          <template #cell(date)="data">
            <b-form-input type="date" v-model="data.item.date" ></b-form-input>
          </template>
          <template #cell(actions)="data">
            {{data.item.id}}
            <b-button variant="danger" @click="deleteTransaction(data.item.id)"> <b-icon-trash></b-icon-trash> </b-button>
          </template>
        </b-table>
      </div>
      <div class="container">
      </div>
    </div>
  </b-modal>
</template>
<script>
import axios from "axios";
export default {
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
          payments:[]
        }
      ,lastIDClient: "",
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
    }else{
      this.addFieldsTransactions()
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
      this.client = data[0]
          this.client.fname = data[0].fname
          this.client.lname = data[0].lname
          this.client.dob = data[0].dob
          this.client.phone = data[0].phone
          this.client.email = data[0].email
          this.client.address = data[0].address
          if(this.client.payments==null){
            this.client.payments =[{
            transactionID: "",
            amount: "",
            date: ""
          }]
          }else{
            this.client.payments = JSON.parse(data[0].payments)
          }
    },
    addFieldsTransactions(){      
        this.client.payments.push({
          id:"",
          client_id: "",
          transactionID: "",
          amount: "",
          date: ""
        })
        this.client.payments.length<5 ? this.btnAddTransaction=true : this.btnAddTransaction=false
        
    },
    async addTransactions(){
        // console.log(this.client.payments)
      let url = "http://localhost:8000/api/addTransactions"
      const response = await axios.post(url,this.client.payments)
      console.log(response)
      
    },
    async addClients() {
      if(this.isUpdate){
        
      }else{
        if(this.client.payments[0].transactionID !== ""){
          let url = "http://localhost:8000/api/add";
          const response = await axios.post(url,this.client)
          let lastIDClient = response.data[0].lastIDClient

          this.client.payments.forEach((element, index) => {
            this.client.payments[index].client_id = lastIDClient
            this.addTransactions();
            this.$refs['modal-client'].hide()
          });
          
          // this.$refs['modal-client'].hide()
          // this.addTransactions()
        }
        else{
          if(confirm("Seguro que quiere agregar un cliente sin pagos?")){
            let url = "http://localhost:8000/api/add";
            const response = await axios.post(url,this.client)
            
          }
        }
      }
    },
    async deleteTransaction(idTransaction){
      
      if(confirm("Estas seguro que deseas eliminar el pago?")){
        let url =  "http://127.0.0.1:8000/api/deleteTransaction";
        const response = await axios.post(url,{idTransaction:idTransaction});
        this.getClientByID()
      }
    },
    closeModal() {
      
      
    },
  },
};
</script>