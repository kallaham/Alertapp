import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OperarioGeotasksPage } from './operario-geotasks.page';

const routes: Routes = [
  {
    path: '',
    component: OperarioGeotasksPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OperarioGeotasksPage]
})
export class OperarioGeotasksPageModule {}
