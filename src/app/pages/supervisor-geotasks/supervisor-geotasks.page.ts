import { Component, OnInit } from '@angular/core';
import {MapsserviceService} from '../../services/mapsservice.service';
import { MenuController } from '@ionic/angular';
import {SupervisorMainPage} from '../supervisor-main/supervisor-main.page';
import {FDBServiceService} from '../../services/fdbservice.service';
import{ActivatedRoute} from '@angular/router';

declare var mapboxgl: any;
declare var MapboxGeocoder:any; 

@Component({
  selector: 'app-supervisor-geotasks',
  templateUrl: './supervisor-geotasks.page.html',
  styleUrls: ['./supervisor-geotasks.page.scss'],
})
export class SupervisorGeotasksPage implements OnInit {

 idAsignacion:string='';
 latitud:number;
 longitud:number;

  constructor(public menu: MenuController,public mapService:MapsserviceService
    , private rutaActivada:ActivatedRoute, public fdFirebase: FDBServiceService) { 
      //console.log(this.rutaActivada.snapshot.params['id']);
      this.idAsignacion=this.rutaActivada.snapshot.params['id'];
      console.log(this.idAsignacion.length)
      this.traeAsignaciones()
    }

  

  ngOnInit() {
   
  }

  
//muestra mapa según asgnación
  ionViewDidEnter() {
    setTimeout(()=>{

   
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWJlbHRvcnJlczA2MTkiLCJhIjoiY2p3andmcmh6MGk2ZjQ4bjQ2NjB0bW96cSJ9.l4dq4FFF-TlqKqDITKsLBQ";
      let map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v11",
     // center: [-74.057524, 4.657586], // starting position
     center:[this.longitud,this.latitud],
      zoom: 16 // starting zoom
    });

    /*map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
      }));*/

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

  
      console.log(this.longitud,this.latitud)
      let marker = new mapboxgl.Marker({
        draggable: true
        })
        .setLngLat([this.longitud,this.latitud])
        //.setLngLat([-74.0840346,4.6868995])
        .addTo(map);
         
        marker.on('dragend');
  
      },700);
  }

  traeAsignaciones = () => {
   // console.log(this.idAsignacion)
  this.fdFirebase.getFireStore().collection("asignaciones").doc(this.idAsignacion).get()
    .then(snapshot=>{
     // console.log(snapshot.data());
     this.latitud=snapshot.data().geo_punto.latitude;
     this.longitud=snapshot.data().geo_punto.longitude;
     //console.log(this.latitud,this.longitud)
    })
    .catch(err=>console.log(err)); 
  }

}
