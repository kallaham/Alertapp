import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FDBServiceService} from '../../services/fdbservice.service';

declare var mapboxgl: any;
declare var MapboxGeocoder:any; 


@Component({
  selector: 'app-operario-geotasks',
  templateUrl: './operario-geotasks.page.html',
  styleUrls: ['./operario-geotasks.page.scss'],
})
export class OperarioGeotasksPage implements OnInit {

  longitud = 0;
  latitud = 0;
  idAsignacion = '';
  idS='TMzL19sb37Vhaw7Ul85ZCVnzG4M2';
  nombreSupervisor="Juan Supervisor";

  constructor(private rutaActivada: ActivatedRoute, private db: FDBServiceService ) {
    this.idAsignacion=this.rutaActivada.snapshot.paramMap.get('id');
    // console.log(this.idAsignacion)
     this.traeAsignaciones();
   }

  ngOnInit() {
  
  }

 

  // muestra mapa según asgnación
  ionViewDidEnter() {

    setTimeout(() => {
      console.log(this.latitud)
      mapboxgl.accessToken =
      "pk.eyJ1IjoiYWJlbHRvcnJlczA2MTkiLCJhIjoiY2p3andmcmh6MGk2ZjQ4bjQ2NjB0bW96cSJ9.l4dq4FFF-TlqKqDITKsLBQ";
    var map = new mapboxgl.Map({
      container: 'mapa', // container id
      style: "mapbox://styles/mapbox/streets-v11",
    center: [this.longitud, this.latitud], // starting position

      //center: [this.latitud,this.longitud],
      zoom: 16 // starting zoom
    });

    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
      }));

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );
   
    var marker = new mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([this.longitud, this.latitud])
      //.setLngLat([this.longitud,this.latitud])
      .addTo(map);
       
      marker.on('dragend');


    },1000);
   
  }

  traeAsignaciones = () => {
    // console.log(this.idAsignacion)
    this.db.getFireStore().collection('asignaciones').doc(this.idAsignacion).get()
      .then(snapshot => {
        // console.log(snapshot.data());
        this.latitud = snapshot.data().geo_punto.latitude;
        this.longitud = snapshot.data().geo_punto.longitude;
        console.log(this.latitud,this.longitud)
      })
      .catch(err => console.log(err));
  }

}
