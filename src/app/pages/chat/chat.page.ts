import { Component, OnInit } from '@angular/core';
import { FDBServiceService} from '../../services/fdbservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit  {

  mensaje: string;
  uidMensaje: string;
  idDestinatario:string;
  uidSupervisor:string;
  nombreSupervisor:string;
  nombreDestinatario:string;
  mensajes:any[]=[];
  autorActual:string;

  constructor(private db: FDBServiceService,
    private activatedRoute :ActivatedRoute) { 
      this.idDestinatario=this.activatedRoute.snapshot.params['ido'];
      this.nombreDestinatario=this.activatedRoute.snapshot.params['nombre'];
     /*  console.log(this.idDestinatario);
      console.log(this.nombreDestinatario); */
      this.uidSupervisor=this.db.getFireBase().auth().currentUser.uid;
      this.funcionDectaUsuario();
    }

 ngOnInit(): void {
   this.detectarCambios();
   //this.db.getFireBase().database().ref(`chats/${ this.uidDocumento}/mensajes`).remove();
  }

    funcionDectaUsuario(){
      if(this.uidSupervisor=='TMzL19sb37Vhaw7Ul85ZCVnzG4M2'){
   
        this.uidMensaje = `${this.uidSupervisor}-${this.idDestinatario}`;
       // console.log(this.uidDocumento);
       this.nombreSupervisor='Juan Supervisor';
      } 
     /*  else {
        // this.uidDocumento = `${this.idDestinatario}-${this.uidDocumento}`;
         this.db.getFireStore().collection("operarios").doc(this.uidDocumento)
         .get()
         .then(user=>{
           this.nombreDestinatario=user.data().nombre;
           this.uidDocumento = `${this.idDestinatario}-${this.uidDocumento}`;
           console.log(this.uidDocumento);
           console.log(this.nombreDestinatario);
         })
         .catch();
      } */
    }

  escribeMensaje(){
    if(this.mensaje === ''){
      alert('Falta autor y/o mensaje');
    } else {
     // const fecha: Date = new Date();
      this.db.getFireStore().collection("chats").doc(this.uidMensaje).collection("mensajes")
      .add({
        autor: this.nombreSupervisor,
        mensaje: this.mensaje,
      // fecha : this.db.getFireBase().firestore.FieldValue.serverTimestamp(),
       fecha: new Date().valueOf()
      })
      .then(vl=>{
        this.autorActual=this.nombreSupervisor;

        console.log(this.autorActual);
        this.leerMensajes();

      })
      .catch(err=>console.log(err));
    }
  }

  leerMensajes(){
    this.db.getFireBase().database().ref(`chats/${this.uidMensaje}/mensajes`)
    .once('value')
    .then(snap=>console.log(snap.val()))
    .catch();
  }

  detectarCambios(){
    this.db.getFireStore().collection(`chats/${this.uidMensaje}/mensajes`)
    .onSnapshot(snapshot=>{
      this.mensajes=[];
      snapshot.forEach(mensaje=>{
        //mensaje.data().fecha = new Date(mensaje.data().fecha);
        this.mensajes.push(mensaje.data());
        //console.log(this.mensajes[0].autor);
      });
      
    });
  }

/*   detectarCambiosf() {
    firebase.database().ref('mensajes').on('value', snap => {
      this.mensajes = [];
      snap.forEach(element => {
        this.mensajes.push(element.val());
      });
      console.log(this.mensajes);
    });
   } */

}
