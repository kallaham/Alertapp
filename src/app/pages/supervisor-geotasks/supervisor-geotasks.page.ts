import { Component, OnInit } from '@angular/core';
//import {MapsserviceService} from '../../services/mapsservice.service';
import { MenuController } from '@ionic/angular';
//import {FDBServiceService} from '../../services/fdbservice.service';

declare var mapboxgl: any;
declare var MapboxGeocoder:any; 

@Component({
  selector: 'app-supervisor-geotasks',
  templateUrl: './supervisor-geotasks.page.html',
  styleUrls: ['./supervisor-geotasks.page.scss'],
})
export class SupervisorGeotasksPage implements OnInit {

  constructor(public menu: MenuController) { }

  ngOnInit() {
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

    var marker = new mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([0, 0])
      .addTo(map);
       
      marker.on('dragend');
  }

}
