import { Component, OnInit } from '@angular/core';
import {FDBServiceService} from '../services/fdbservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string ='';
  contrasena: string = '';

  constructor(public fireDb: FDBServiceService) { }

  ngOnInit() {
  }

}
