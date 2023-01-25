import axios from "axios";
class clientActions{
    async confirmAlert(idClient,icon,action){
        
        swal("Click on either the button or outside the modal.",
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
                this.deleteClient(idClient)
                swal("Cliente eliminado con exito!",{
                icon: "success"
                })
                this.getAllClients()
                
            break
            case "add":
                this.addClients()
                swal("Cliente agregado con exito!",{
                icon: "success"
                })
            break
        }
        })
    }
    async getAllClients(){
        let url = "http://localhost:8000/api/all";   
        return await axios.get(url);
    }

    async deleteClient(idClientDelete){
        let url = "http://localhost:8000/api/delete";
        await axios.post(url, { idClientDelete });
        console.log(this.$route.name)
        // this.getClientsWithoutTransactions();
    }

    async getClientsWithoutTransactions() {
        let url = "http://localhost:8000/api/without-transactions";
        return await axios.get(url);

    }

    async getClientsWithTransactions() {
        let url = "http://localhost:8000/api/with-transactions";
        return await axios.get(url);

    }
}
export default new clientActions()