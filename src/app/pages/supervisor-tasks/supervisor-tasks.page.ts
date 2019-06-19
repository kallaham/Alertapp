import { Component, OnInit } from '@angular/core';
import {FDBServiceService} from '../../services/fdbservice.service';


@Component({
  selector: 'app-supervisor-tasks',
  templateUrl: './supervisor-tasks.page.html',
  styleUrls: ['./supervisor-tasks.page.scss'],
})
export class SupervisorTasksPage implements OnInit {

  operarioSeleccionado:any;


  constructor(public dbFireStore: FDBServiceService) { }

  ngOnInit() {
  }

  //asignacion tarea por el supervisor
  asignarTarea(){
    this.dbFireStore.getFireStore().collection("operarios").doc(this.operarioSeleccionado.uid).update({
      disponible: false
    })
    .then()
    .catch(err=>console.log(err)); 
  /*   const so=document.getElementById('selectOperario');
    console.dir(so) 
    console.log(this.operarioSeleccionado)*/
  }



}
