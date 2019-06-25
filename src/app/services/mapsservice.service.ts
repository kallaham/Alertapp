import { Injectable } from '@angular/core';
//import {FDBServiceService} from '../services/fdbservice.service';
//import { MenuController } from '@ionic/angular';

declare var mapboxgl: any;
declare var MapboxGeocoder:any; 

@Injectable({
  providedIn: 'root'
})
export class MapsserviceService {

  constructor() { 
    
  }

  ionViewDidEnter() {

    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWJlbHRvcnJlczA2MTkiLCJhIjoiY2p3andmcmh6MGk2ZjQ4bjQ2NjB0bW96cSJ9.l4dq4FFF-TlqKqDITKsLBQ";
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.057524, 4.657586], // starting position
      zoom: 9 // starting zoom
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
      .setLngLat([-74.0652613, 4.6564875])
      .addTo(map);
       
      marker.on('dragend');
  }
}
