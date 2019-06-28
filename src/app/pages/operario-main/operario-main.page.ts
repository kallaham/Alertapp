import { Component, OnInit } from '@angular/core';

import {FDBServiceService} from '../../services/fdbservice.service';
import {ToastController} from '@ionic/angular';
import { toDate } from '@angular/common/src/i18n/format_date';

@Component({
  selector: 'app-operario-main',
  templateUrl: './operario-main.page.html',
  styleUrls: ['./operario-main.page.scss'],
})
export class OperarioMainPage implements OnInit {

  operarioActual: any;
/*   asignacion: any; */
  asignacion: any;
  ventana = 'asignaciones';
  tieneAsignacion: boolean;
  verDetalleHabilitado: boolean ;


  constructor(private bdService: FDBServiceService, private toastController: ToastController) {
    this.operarioActual = this.bdService.getFireBase().auth().currentUser.uid;
   // console.log(this.operarioActual)
    this.operarioTieneAsignacion();
  }
// captura el operario actual y pregunta si tiene asignaciones vigentes
  ngOnInit() {
    //this.tieneAsignacion = false;
    this.verDetalleHabilitado = false;
    
  }

  // determina si el operario que inicio sesión tiene o no una asignación
  // en caso de tenerla la asigna a la variable this.asignacion
  operarioTieneAsignacion(): void {
    this.bdService.getFireStore().collection('asignaciones').get()
    .then(snapshot => {
      snapshot.forEach(asignacion => {
        const infoAsignacion = asignacion.data();
        if (infoAsignacion.uid_operario === this.operarioActual) {
          this.tieneAsignacion = true;
          this.asignacion = infoAsignacion;
          this.asignacion.hora_asignacion = new Date(this.asignacion.hora_asignacion.seconds*1000);
        }
      });
    
      console.log(this.asignacion.hora_asignacion);
      if(this.tieneAsignacion){
        this.bdService.presentToast(`tienes una asignación`);
      } else {
        this.bdService.presentToast(`No tienes asignaciones`);
        this.asignacion = false;
      }

    })
    .catch(err => console.log(err));
  }

  verDetalle() {
    if(!this.verDetalleHabilitado) {
      this.verDetalleHabilitado = true;
      console.log(this.asignacion);
    } else {
      this.verDetalleHabilitado = false;
    }
  }
}
