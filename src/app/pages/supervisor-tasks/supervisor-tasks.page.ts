import { Component, OnInit } from '@angular/core';
import {FDBServiceService} from '../../services/fdbservice.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supervisor-tasks',
  templateUrl: './supervisor-tasks.page.html',
  styleUrls: ['./supervisor-tasks.page.scss'],
})
export class SupervisorTasksPage implements OnInit {

  operarioSeleccionado: any;
  lugarSeleccionado: any;
  tareaSeleccionada: any;
  descripcion:string;
  horaActual:any;
  asignacion:any={}

  constructor(public dbFireStore: FDBServiceService, public toastController: ToastController
    ,public router: Router) { }

  ngOnInit() {
   console.log(new Date().valueOf())
   
  }

  async presentToast(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 5000
    });
    toast.present();
  }

  //cambia el estado del operario a no disponible
  cambioDeDisponibilidadOperario(){
    this.dbFireStore.getFireStore().collection("operarios").doc(this.operarioSeleccionado.uid)
    .update({disponible: true})
    .then(dato=>this.presentToast("Asignación exitosa"))
    .catch(err=>this.presentToast("Ha ocurrido un error"));
  }


  //asignacion tarea por el supervisor
  asignarTarea(){
    const usuarioActual=this.dbFireStore.getFireBase().auth().currentUser;

    if(usuarioActual == null){
      this.presentToast("Para crear usuario debe estar debe estar autenticado");
      return;
    }
    this.cambioDeDisponibilidadOperario();
    this.dbFireStore.getFireStore().collection("asignaciones").add({
        nombre_operario:`${this.operarioSeleccionado.nombre} ${this.operarioSeleccionado.apellido}`,
        uid_operario:this.operarioSeleccionado.uid,
        uid_supervisor:usuarioActual.uid,
        lugar:this.lugarSeleccionado.nombre,
        geo_punto:this.lugarSeleccionado.ubicacion,
        uid_lugar:this.lugarSeleccionado.uid,
        hora_asignacion:this.dbFireStore.getFireBase().firestore.FieldValue.serverTimestamp(),
        tarea: this.tareaSeleccionada.tarea,
        uid_tarea:this.tareaSeleccionada.uid,
        descripcion_tarea: this.descripcion,
        activa:true
    })
    .then(docRef=>{
      this.asignacion={nombre_operario:`${this.operarioSeleccionado.nombre} ${this.operarioSeleccionado.apellido}`,
      uid_operario:this.operarioSeleccionado.uid,
      uid_supervisor:usuarioActual.uid,
      lugar:this.lugarSeleccionado.nombre,
      geo_punto:this.lugarSeleccionado.ubicacion,
      uid_lugar:this.lugarSeleccionado.uid,
      hora_asignacion:this.dbFireStore.getFireBase().firestore.FieldValue.serverTimestamp(),
      tarea: this.tareaSeleccionada.tarea,
      uid_tarea:this.tareaSeleccionada.uid,
      descripcion_tarea: this.descripcion,
      activa:true}
      this.presentToast("Asignación exitosa");
      this.router.navigate(['/supervisor-main']);
    })
    .catch(err=>console.error(err));
  }

   irAMain(){
     this.router.navigate(['/supervisor-main']);
   }

   getAsignacion() {
     
     if(Object.entries(this.asignacion).length!==0){
      return this.asignacion;
     }
      
   }

}
