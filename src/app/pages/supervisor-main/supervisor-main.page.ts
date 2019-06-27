import { Component, OnInit } from '@angular/core';
import {FDBServiceService} from '../../services/fdbservice.service';
import { Router } from '@angular/router';
import { PopoverController, NavParams } from '@ionic/angular';
import { PopoverPage } from '../popover/popover.page';
@Component({
  selector: 'app-supervisor-main',
  templateUrl: './supervisor-main.page.html',
  styleUrls: ['./supervisor-main.page.scss'],
})
export class SupervisorMainPage implements OnInit {

  asigna:any;
  asignaciones:any[]=[];
  mostrarAsignaciones=false;

  constructor(public fireDB: FDBServiceService,public router: Router,
    private popover: PopoverController) {
    
   }

  ngOnInit() {
    this.traerAsignaciones()
  }

  traerAsignaciones(){
     this.fireDB.getFireStore().collection('asignaciones').onSnapshot(querySnapshot=>{
       this.asignaciones = [];
       querySnapshot.forEach(asignacion=>{
         this.asignaciones.push(asignacion.data());
       });
       console.log(this.asignaciones);
     });
    /*  .get()
     .then(snapshot=>{
       snapshot.forEach(dato=>{
       // console.log(dato.data())
        this.asignaciones.push(dato.data());
       });
       console.log(this.asignaciones)
     }) */
    /*  .catch(); */
  }



  irATareas(){
    this.router.navigate(['/supervisor-tasks']);
  }

  muestraAsignaciones(){
    if(this.mostrarAsignaciones){
    this.mostrarAsignaciones=false;
    }
    else{
      this.mostrarAsignaciones=true;
    }
    
  }

  asig(){
console.log(this.asigna)
  }

  async verDetalle(ev: Event, asignacion){
    const popover= await this.popover.create({
      component : PopoverPage,
      componentProps:{
        lugar:asignacion.lugar,
        operario:asignacion.nombre_operario
      },
      event: ev
    });
    popover.present();
  }

}
