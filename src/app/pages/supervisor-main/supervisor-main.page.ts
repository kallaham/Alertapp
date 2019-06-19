import { Component, OnInit } from '@angular/core';
import {FDBServiceService} from '../../services/fdbservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-supervisor-main',
  templateUrl: './supervisor-main.page.html',
  styleUrls: ['./supervisor-main.page.scss'],
})
export class SupervisorMainPage implements OnInit {

  constructor(public fireDB: FDBServiceService,public router: Router) { }
  
  ngOnInit() {
  }

  irATareas(){
    this.router.navigate(['/supervisor-tasks']);
  }

}
