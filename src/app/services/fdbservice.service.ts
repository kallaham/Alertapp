import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';

//opcionales
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class FDBServiceService implements OnInit {

  operariosDisponibles: any [] = [];
  ubicaciones:any[]=[];
  public db :firebase.app.App;
  //db:any=firebase.firestore;

  // Your web app's Firebase configuration
  firebaseConfig = {
    apiKey: "AIzaSyCNQvdmkMMGyXJ9pDf1dNFbub0SOzuMmgc",
    authDomain: "pruebafirestore-67d01.firebaseapp.com",
    databaseURL: "https://pruebafirestore-67d01.firebaseio.com",
    projectId: "pruebafirestore-67d01",
    storageBucket: "pruebafirestore-67d01.appspot.com",
    messagingSenderId: "738349578431",
    appId: "1:738349578431:web:3b194990ca10067e"
  };

  
  constructor(public router: Router, public toastController: ToastController) {
    this.inicializarBaseDatos();
    // console.log("todo bien")
    this.traerListaOperarios();
 this.traerUbicaciones()
  }

   ngOnInit() {
  
   }

  inicializarBaseDatos(){
    this.db = firebase.initializeApp(this.firebaseConfig);
  }
  
  public getFireStore(){
    return firebase.firestore();
  }

  public getBaseDatos(){
    return this.db;
  }

  traerListaOperarios(){
  firebase.firestore().collection("operarios").get()
     .then(snapshot=>{
       snapshot.forEach(dato=>{
         console.log(dato);
         if(dato.data().disponible){
          this.operariosDisponibles.push(dato.data());
         }
      });
       console.log(this.operariosDisponibles);
     })
     .catch(err=>console.log(err))
  }

traerUbicaciones(){
  firebase.firestore().collection("lugares").get()
  .then(snapshot=>{
     snapshot.forEach(lugar=>this.ubicaciones.push(lugar.data()));
     console.log(this.ubicaciones)
  })
  .catch(err=>console.log(err));
}

}
