import { Component, OnInit } from '@angular/core';
import {FDBServiceService} from '../services/fdbservice.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string ='';
  contrasena: string = '';
  esSupervisor;

  constructor(public fireDb: FDBServiceService,public router:Router,public toastController:ToastController) { }

  ngOnInit() {
  }

//inicio sesion
iniciarSesion(correo: string, clave: string){
  this.fireDb.getFireBase().auth().signInWithEmailAndPassword(correo, clave)
  .then(respuesta => {
    this.validarRol(respuesta.user.uid);
    
  })
  .catch(err=>{
    console.log(err)
  });
}

//validacion por rol
validarRol(uid) {
  this.esSupervisor = false;
  this.fireDb.getFireStore().collection("supervisores").get()
  .then(snapshot => {
    snapshot.forEach(dato => {
        if (uid === dato.id) { 
          this.esSupervisor = true;
         }
        });
        if (this.esSupervisor) {
          this.router.navigate(['/supervisor-main']);
          this.fireDb.presentToast('Bienvenido Supervisor');
          this.usuario='';
          this.contrasena='';
          this.cambiaEstado('supervisores');
      } 
      else {
        this.router.navigate(['/operario-main']);
        this.cambiaEstado('operarios');
    }
  })
  .catch(err=>console.log(err));
}

cambiaEstado(tipoUsuario: string){
  this.fireDb.getFireBase().auth().onAuthStateChanged(user=>{
    if(user) {
      this.fireDb.getFireStore().collection(tipoUsuario).doc(user.uid)
      .update({
        online : true
      })
      .then(e=>{
        console.log('lo de online',e);
      })
      .catch(err=>console.log(err));
    }
  });
}

}
