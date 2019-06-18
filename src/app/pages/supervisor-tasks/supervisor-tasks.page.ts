import { Component, OnInit } from '@angular/core';
import {FDBServiceService} from '../../services/fdbservice.service';

@Component({
  selector: 'app-supervisor-tasks',
  templateUrl: './supervisor-tasks.page.html',
  styleUrls: ['./supervisor-tasks.page.scss'],
})
export class SupervisorTasksPage implements OnInit {

  constructor(public dbFireStore: FDBServiceService) { }

  ngOnInit() {
  }

}
