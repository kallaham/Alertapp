import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SupervisorTasksPage } from './supervisor-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: SupervisorTasksPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SupervisorTasksPage]
})
export class SupervisorTasksPageModule {}
