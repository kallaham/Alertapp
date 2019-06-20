import { Component, OnInit } from '@angular/core';
import {FDBServiceService} from '../../services/fdbservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-supervisor-main',
  templateUrl: './supervisor-main.page.html',
  styleUrls: ['./supervisor-main.page.scss'],
})
export class SupervisorMainPage implements OnInit {

  asigna:any;
  asignaciones:any[]=[];
  mostrarAsignaciones=false;

  constructor(public fireDB: FDBServiceService,public router: Router) {
    
   }

  ngOnInit() {
    this.traerAsignaciones()
  }

  traerAsignaciones(){
     this.fireDB.getFireStore().collection("asignaciones").get()
     .then(snapshot=>{
       snapshot.forEach(dato=>{
       // console.log(dato.data())
        this.asignaciones.push(dato.data());
       });
       console.log(this.asignaciones)
     })
     .catch();
  }



  irATareas(){
    this.router.navigate(['/supervisor-tasks']);
  }

  muestraAsignaciones(){
    this.mostrarAsignaciones=true;
  }

  asig(){
console.log(this.asigna)
  }

}
