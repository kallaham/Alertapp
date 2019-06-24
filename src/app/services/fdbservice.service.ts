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
 // ubicacionesEnserio:any[]=[]
  objeto:any={}
  nombrelugar:string='';
  geopoint:any;
  tareas:any[]=[];
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
    this.traerTareas()
  }

   ngOnInit() {
  
   }

  inicializarBaseDatos(){

    firebase.initializeApp(this.firebaseConfig);
    /*  const settings ={timestampsInSnapshots:true}
     firebase.firestore().settings(settings); */
  }
  
  public getFireStore(){
    
    return firebase.firestore();
  }

 public getFireBase(){
    return firebase;
  } 

  traerListaOperarios(){

    firebase.firestore().collection("operarios").onSnapshot(query=>{
       query.forEach(operario=>{
        if(operario.data().disponible){
          this.operariosDisponibles.push(operario.data());
         }
       });
       console.log(this.operariosDisponibles)
    });
 /*  firebase.firestore().collection("operarios").get()
     .then(snapshot=>{
       snapshot.forEach(dato=>{
         console.log(dato);
         if(dato.data().disponible){
          this.operariosDisponibles.push(dato.data());
         }
      });
      //console.log(this.operariosDisponibles);
     })
     .catch(err=>console.log(err)) */
  }

traerUbicaciones(){
  firebase.firestore().collection("lugares").get()
  .then(snapshot=>{
     //snapshot.forEach(lugar=>this.ubicaciones.push(lugar.data()));
       snapshot.forEach(dato=>{this.ubicaciones.push(dato.data())
      })
    
      // console.log(Object.keys(this.ubicaciones[0]))
      // console.log(Object.values(this.ubicaciones[0]))
     /*   Object.keys(this.ubicaciones[0]).forEach(name=>{
         this.objeto={nombre:name}
          this.ubicacionesEnserio.push(this.objeto)
       }) */
      
      /* for(let l in Object.values(this.ubicaciones[0])){
        this.ubicacionesEnserio[l].ubicacion=Object.values(this.ubicaciones[0])[l] */
    /*   } */
      //console.log(this.ubicaionesEnserio)

  })
  .catch(err=>console.log(err));
}

traerTareas(){
  firebase.firestore().collection("tareas").get()
  .then(snapshot=>{
    snapshot.forEach(tarea=>this.tareas.push(tarea.data()));
    console.log(this.tareas)
  })
  .catch(err=>console.log(err));
}

async presentToast(texto: string) {
  const toast = await this.toastController.create({
    message: texto,
    duration: 5000,
    cssClass: 'background-color:red'
  });
  toast.present();
}

}
