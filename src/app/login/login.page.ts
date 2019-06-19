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
  esSupervisor=false;

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
  this.fireDb.getFireStore().collection("supervisores").get()
  .then(snapshot => {
    snapshot.forEach(dato => {
       if (uid === dato.id) { 
          this.esSupervisor = true;
        }
       });
      if(this.esSupervisor){this.router.navigate(['/supervisor-main']);} 
      else {this.router.navigate(['/operario-main']);}
  })
  .catch(err=>console.log(err));
}

}
