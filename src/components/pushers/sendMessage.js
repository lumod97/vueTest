
import Vue from 'vue'

const sendMessage = () => {
    window.socket.bind('pif-upload-notification', async data => {
    //   let temps = false
    // //   const sessionId = 1
    // //   data.to_id.forEach(element => {
    // //     if (element === sessionId) {
    //     //   temps = true
    // //     }
    // //   })
    //   if (temps) {
  
        const res = await Vue. Vue.swal.fire({
          html: `<h2 style="font-weight: 600;">${data.message}</h2>
          <hr>
          <div>
                  <span style="font-size: 16px "><span style="font-weight:600;">Upload by : </span> ${data.advisor_name}</span><br>
                  <span style="font-size: 16px "><span style="font-weight:600;">Client: </span> ${data.client_name}</span><br>
                  <span style="font-size: 16px "><span style="font-weight:600;">Creditor: </span> ${data.creditor_name}</span>    
          </div>`,
           lowOutsideClick: false,
           icon:'success'
        }) 
    //   }
    })
  }
  export default uploadPifNotification