import { Component, OnInit } from '@angular/core';
import { FDBServiceService} from '../../services/fdbservice.service';
import { ActivatedRoute } from '@angular/router';
import {ChatPage} from '../chat/chat.page';

@Component({
  selector: 'app-operario-chat',
  templateUrl: './operario-chat.page.html',
  styleUrls: ['./operario-chat.page.scss'],
})
export class OperarioChatPage implements OnInit {

  idDestinatario: string;
  nombreDestinatario: string;
  idUsuarioActual: string;
  idChatActual: string;
  nombreOperadorActual: string;
  mensaje: string;
  mensajes: any[]=[];
  autorActual: string;

  constructor(private db: FDBServiceService, private activatedRoute : ActivatedRoute) {
    this.idDestinatario = this.activatedRoute.snapshot.params['ids'];
    this.nombreDestinatario = this.activatedRoute.snapshot.params['nombre'];
    this.idUsuarioActual = this.db.getFireBase().auth().currentUser.uid;
    this.idChatActual = `${this.idDestinatario}-${this.idUsuarioActual}`; 
    this.capturaDatosOperarioActual();
  }

  ngOnInit() {
    /* console.log(this.idDestinatario);
    console.dir(this.nombreDestinatario);
    console.log(this.idUsuarioActual); */
  this.detectaCambios();
  }

  capturaDatosOperarioActual(){
    this.db.getFireStore().collection('operarios').doc(this.idUsuarioActual)
    .get()
    .then(operario=>{
      //console.log(operario.data());
      this.nombreOperadorActual = `${operario.data().nombre} ${operario.data().apellido}`;
      //console.log(this.nombreOperadorActual);
    })
    .catch(err=>console.log(err));
  }

  escribeMensaje(){
    this.db.getFireStore().collection(`chats/${this.idChatActual}/mensajes`)
    //.doc(`${ChatPage.getNumer()}`)
    .add({
      autor: this.nombreOperadorActual,
      mensaje: this.mensaje,
      fecha: new  Date().valueOf()
    })
    .then(()=>{
      this.autorActual=this.nombreOperadorActual;
    })
    .catch();
  }

  detectaCambios(){
    this.db.getFireStore().collection(`chats/${this.idChatActual}/mensajes`)
    .onSnapshot(snapshot=>{
      this.mensajes=[];
      snapshot.forEach(mensaje=>{
        this.mensajes.push(mensaje.data());
      });
      this.mensajes = this.organizarMensajesPorFecha(this.mensajes);
      //console.log(this.mensajes);
    })
  }

  organizarMensajesPorFecha(mensajes: any[]) {
   return mensajes.sort((mensaje1,mensaje2)=>mensaje1.fecha-mensaje2.fecha);
  }

}
